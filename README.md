# 🤖 Qwen AI Chatbot

A premium full-stack AI chatbot powered by Qwen 3.5 122B model with a beautiful dark-themed UI.

## ✨ Features

- 🎨 Premium dark UI with animated gradients (purple/blue/pink/cyan)
- 💬 Real-time chat with conversation history
- 🔒 JWT authentication (register/login)
- ⚡ Socket.io for real-time updates
- 📱 Fully responsive design
- 🚀 Production-ready architecture

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, JWT, Socket.io
- **AI**: Qwen 3.5 122B via DashScope API

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Clone and setup

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and add your QWEN_API_KEY
npm install
npm start

# Frontend (new terminal)
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Visit `http://localhost:3000`

### 2. Docker Setup

```bash
cp .env.example .env
# Edit .env with your values
docker-compose up --build
```

## 🔐 Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | Secret for JWT tokens | Required |
| `QWEN_API_KEY` | DashScope API key | Required |
| `QWEN_BASE_URL` | Qwen API base URL | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1` |
| `QWEN_MODEL` | Model to use | `qwen/qwen3.5-122b-a10b` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

### Frontend (`frontend/.env.local`)
| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

## 📄 License

MIT