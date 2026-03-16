'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Send, Plus, Trash2, MessageSquare, LogOut, Sparkles, Menu, X } from 'lucide-react'
import ChatMessage from '@/components/ChatMessage'
import TypingIndicator from '@/components/TypingIndicator'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  title: string
  updatedAt: string
  messageCount: number
}

export default function ChatPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConvId, setActiveConvId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const getToken = useCallback(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('token')
    return null
  }, [])

  const fetchConversations = useCallback(async () => {
    const token = getToken()
    if (!token) return
    try {
      const res = await fetch(`${API_URL}/api/chat/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setConversations(data.conversations)
      }
    } catch {}
  }, [getToken])

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push('/auth')
      return
    }
    const userData = localStorage.getItem('user')
    if (userData) {
      try { setUser(JSON.parse(userData)) } catch {}
    }
    fetchConversations()
  }, [router, getToken, fetchConversations])

  const loadConversation = async (convId: string) => {
    const token = getToken()
    if (!token) return
    setActiveConvId(convId)
    try {
      const res = await fetch(`${API_URL}/api/chat/conversations/${convId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setMessages(data.conversation.messages)
      }
    } catch {}
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return
    const token = getToken()
    if (!token) return

    const userMsg: Message = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setIsTyping(true)

    try {
      const res = await fetch(`${API_URL}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: text, conversationId: activeConvId })
      })

      const data = await res.json()
      setIsTyping(false)

      if (res.ok) {
        setMessages(prev => {
          const filtered = prev.filter(m => m.id !== userMsg.id)
          return [...filtered, data.userMessage, data.aiMessage]
        })
        if (!activeConvId) setActiveConvId(data.conversationId)
        fetchConversations()
      } else {
        setMessages(prev => prev.filter(m => m.id !== userMsg.id))
      }
    } catch {
      setIsTyping(false)
      setMessages(prev => prev.filter(m => m.id !== userMsg.id))
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const startNewChat = () => {
    setActiveConvId(null)
    setMessages([])
    setInput('')
  }

  const deleteConversation = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const token = getToken()
    if (!token) return
    try {
      await fetch(`${API_URL}/api/chat/conversations/${convId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (activeConvId === convId) startNewChat()
      setConversations(prev => prev.filter(c => c.id !== convId))
    } catch {}
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-screen bg-[#0a0a0f] flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 h-full flex flex-col overflow-hidden"
            style={{ background: 'rgba(19, 19, 26, 0.95)', borderRight: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* Sidebar header */}
            <div className="p-4 border-b border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">Qwen AI</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startNewChat}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.3))', border: '1px solid rgba(124,58,237,0.3)' }}
              >
                <Plus className="w-4 h-4" />
                New Chat
              </motion.button>
            </div>

            {/* Conversations list */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
              {conversations.length === 0 ? (
                <div className="text-center text-gray-500 text-sm mt-8 px-4">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>No conversations yet</p>
                  <p className="text-xs mt-1">Start a new chat!</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {conversations.map((conv, i) => (
                    <motion.div
                      key={conv.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => loadConversation(conv.id)}
                      className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                        activeConvId === conv.id
                          ? 'bg-purple-600/20 border border-purple-500/30'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 truncate">{conv.title}</p>
                        <p className="text-xs text-gray-500">{conv.messageCount} messages</p>
                      </div>
                      <button
                        onClick={(e) => deleteConversation(conv.id, e)}
                        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all duration-200 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* User section */}
            {user && (
              <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-400 transition-colors p-1"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Chat header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5"
          style={{ background: 'rgba(19, 19, 26, 0.8)', backdropFilter: 'blur(16px)' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-medium text-white">
              {activeConvId ? conversations.find(c => c.id === activeConvId)?.title || 'Chat' : 'New Chat'}
            </span>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center px-4"
            >
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 40px rgba(124,58,237,0.3)' }}>
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">How can I help you today?</h2>
              <p className="text-gray-400 max-w-md mb-8">
                Start a conversation with Qwen AI. I can help with writing, analysis, coding, math, and much more.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                {[
                  { text: 'Explain quantum computing', icon: '⚛️' },
                  { text: 'Write a poem about the ocean', icon: '🌊' },
                  { text: 'Help me debug my code', icon: '💻' },
                  { text: 'Summarize a topic for me', icon: '📚' },
                ].map((suggestion) => (
                  <motion.button
                    key={suggestion.text}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setInput(suggestion.text); inputRef.current?.focus() }}
                    className="text-left px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-200 glass border border-white/10 hover:border-purple-500/30"
                  >
                    <span className="mr-2">{suggestion.icon}</span>
                    {suggestion.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-2">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="px-4 pb-6 pt-4 border-t border-white/5"
          style={{ background: 'rgba(19, 19, 26, 0.8)', backdropFilter: 'blur(16px)' }}>
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-end glass rounded-2xl p-3 border border-white/10 focus-within:border-purple-500/40 transition-all duration-200">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Qwen AI... (Enter to send, Shift+Enter for newline)"
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm outline-none resize-none max-h-40 scrollbar-hide"
                style={{ minHeight: '24px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 160) + 'px'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={input.trim() && !loading
                  ? { background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 15px rgba(124,58,237,0.4)' }
                  : { background: 'rgba(255,255,255,0.1)' }
                }
              >
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">
              Qwen AI may make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
