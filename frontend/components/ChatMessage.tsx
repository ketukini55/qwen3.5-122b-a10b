'use client'

import { motion } from 'framer-motion'
import { Sparkles, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ChatMessageProps {
  message: Message
}

function formatTime(timestamp: string): string {
  try {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

function formatContent(content: string): string {
  return content
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-black/40 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono text-green-300 border border-white/10"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-black/40 px-1.5 py-0.5 rounded text-xs font-mono text-pink-300">$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold mt-3 mb-1 text-white">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold mt-3 mb-1 text-white">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold mt-3 mb-1 text-white">$1</h1>')
    .replace(/^\s*[-*]\s+(.*)/gim, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n/g, '<br />')
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser
          ? 'bg-gradient-to-br from-pink-500 to-purple-600'
          : ''
      }`}
        style={!isUser ? { background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' } : {}}
      >
        {isUser
          ? <User className="w-4 h-4 text-white" />
          : <Sparkles className="w-4 h-4 text-white" />
        }
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'text-white rounded-tr-none'
              : 'text-gray-200 rounded-tl-none glass border border-white/10'
          }`}
          style={isUser ? { background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' } : {}}
          dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
        />
        <span className="text-xs text-gray-600 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  )
}
