const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const http = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running!' });
});

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Mock response - replace with actual Qwen API call
    const response = {
      id: Date.now(),
      message: 'This is a test response from the Qwen chatbot API',
      timestamp: new Date()
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// WebSocket events
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);
  
  socket.on('chat_message', (data) => {
    console.log('Message received:', data);
    io.emit('chat_message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});
