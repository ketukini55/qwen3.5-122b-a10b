'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 items-end mb-4"
    >
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
      >
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="glass border border-white/10 rounded-2xl rounded-tl-none px-4 py-3.5 flex items-center gap-2">
        <div className="flex gap-1.5 items-center">
          <span
            className="typing-dot w-2 h-2 rounded-full"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
          />
          <span
            className="typing-dot w-2 h-2 rounded-full"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #ec4899)' }}
          />
          <span
            className="typing-dot w-2 h-2 rounded-full"
            style={{ background: 'linear-gradient(135deg, #ec4899, #06b6d4)' }}
          />
        </div>
        <span className="text-xs text-gray-500 ml-1">Qwen AI is thinking...</span>
      </div>
    </motion.div>
  )
}
