const { v4: uuidv4 } = require('uuid');

// In-memory conversation storage
const conversations = new Map();

const callQwenAPI = async (messages) => {
  const apiKey = process.env.QWEN_API_KEY;
  const baseUrl = process.env.QWEN_BASE_URL || 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1';
  const model = process.env.QWEN_MODEL || 'qwen/qwen3.5-122b-a10b';

  if (!apiKey || apiKey === 'your_qwen_api_key_here') {
    return "I'm your AI assistant! Please configure the QWEN_API_KEY environment variable to enable real AI responses. For now, I'm running in demo mode.";
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages,
      stream: false,
      max_tokens: 2048,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Qwen API error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    const userId = req.user.userId;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    let conversation;
    const convId = conversationId || uuidv4();

    if (conversationId && conversations.has(`${userId}:${conversationId}`)) {
      conversation = conversations.get(`${userId}:${conversationId}`);
    } else {
      conversation = {
        id: convId,
        userId,
        title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
        messages: [
          { role: 'system', content: process.env.SYSTEM_PROMPT || 'You are a helpful, creative, and intelligent AI assistant. Be concise yet comprehensive. Format responses with markdown when helpful.' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString()
    };

    conversation.messages.push({ role: 'user', content: message.trim() });

    const aiResponseText = await callQwenAPI(conversation.messages);

    const aiMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: aiResponseText,
      timestamp: new Date().toISOString()
    };

    conversation.messages.push({ role: 'assistant', content: aiResponseText });
    conversation.updatedAt = new Date().toISOString();
    conversations.set(`${userId}:${convId}`, conversation);

    // Emit via socket if available
    const io = req.app.get('io');
    if (io) {
      io.to(`user:${userId}`).emit('message', { conversationId: convId, message: aiMessage });
    }

    res.json({
      conversationId: convId,
      userMessage,
      aiMessage,
      conversation: {
        id: convId,
        title: conversation.title,
        updatedAt: conversation.updatedAt
      }
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message || 'Failed to process message' });
  }
};

const getConversations = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userConversations = [...conversations.entries()]
      .filter(([key]) => key.startsWith(`${userId}:`))
      .map(([, conv]) => ({
        id: conv.id,
        title: conv.title,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
        messageCount: conv.messages.filter(m => m.role !== 'system').length
      }))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    res.json({ conversations: userConversations });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const conversation = conversations.get(`${userId}:${id}`);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    const messages = conversation.messages
      .filter(m => m.role !== 'system')
      .map((m, idx) => ({
        id: m.id || `msg-${idx}`,
        role: m.role,
        content: m.content,
        timestamp: m.timestamp || conversation.createdAt
      }));
    res.json({ conversation: { ...conversation, messages } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const key = `${userId}:${id}`;
    if (!conversations.has(key)) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    conversations.delete(key);
    res.json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { sendMessage, getConversations, getConversation, deleteConversation };
