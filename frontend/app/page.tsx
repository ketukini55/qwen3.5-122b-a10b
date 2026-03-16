'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageSquare, Zap, Shield, ArrowRight, Sparkles, Brain, Globe } from 'lucide-react'
import Navbar from '@/components/Navbar'

const features = [
  {
    icon: MessageSquare,
    title: 'Real-time Chat',
    description: 'Instant responses powered by the latest Qwen AI model with WebSocket technology.',
    gradient: 'from-purple-600 to-blue-500',
  },
  {
    icon: Brain,
    title: 'Smart AI',
    description: 'Leveraging Qwen 3.5 122B parameters for human-like understanding and responses.',
    gradient: 'from-pink-500 to-purple-600',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'End-to-end security with JWT authentication and encrypted conversations.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized infrastructure delivering responses in milliseconds.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Multilingual',
    description: 'Communicate in dozens of languages with native-level understanding.',
    gradient: 'from-green-400 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: 'Premium Design',
    description: 'Beautiful, responsive UI crafted for the ultimate AI chatbot experience.',
    gradient: 'from-pink-400 to-rose-500',
  },
]

const orbs = [
  { size: 400, x: -100, y: -100, color: 'rgba(124, 58, 237, 0.3)', delay: 0 },
  { size: 300, x: '60%', y: -50, color: 'rgba(59, 130, 246, 0.25)', delay: 1 },
  { size: 350, x: '20%', y: '60%', color: 'rgba(236, 72, 153, 0.2)', delay: 2 },
  { size: 250, x: '80%', y: '70%', color: 'rgba(6, 182, 212, 0.25)', delay: 0.5 },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-8 border border-purple-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Powered by Qwen 3.5 122B</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Experience AI{' '}
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 gradient-animate"
              style={{ backgroundImage: 'linear-gradient(90deg, #a855f7, #ec4899, #06b6d4, #a855f7)' }}
            >
              Like Never Before
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Engage with our premium AI chatbot powered by the latest Qwen model.
            Intelligent, fast, and beautifully designed for the modern web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-lg transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                  boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
                }}
              >
                Start Chatting
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-2xl font-semibold text-gray-300 text-lg glass border border-white/10 hover:border-purple-500/40 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-20 relative max-w-4xl mx-auto"
          >
            <div className="glass rounded-3xl p-6 border border-white/10 shadow-2xl"
              style={{ boxShadow: '0 0 80px rgba(124, 58, 237, 0.15)' }}>
              {/* Mock chat UI */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Qwen AI — Online
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-left">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="glass rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-200 max-w-sm">
                    Hello! I&apos;m Qwen AI. How can I help you today? I can assist with writing, analysis, coding, and much more! ✨
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="px-4 py-3 rounded-2xl rounded-tr-none text-sm text-white max-w-sm"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
                    Can you help me write a poem about the stars?
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex-shrink-0" />
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="glass rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-200 max-w-md">
                    <p className="italic text-purple-300">&quot;In the velvet night they gleam and glow,</p>
                    <p className="italic text-blue-300">A thousand suns from long ago...&quot;</p>
                    <p className="mt-2 text-gray-400">I&apos;d love to continue this poem for you! 🌟</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Everything you need in an{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              AI assistant
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built with cutting-edge technology to deliver the best AI experience possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center glass rounded-3xl p-12 border border-purple-500/20"
          style={{ boxShadow: '0 0 60px rgba(124, 58, 237, 0.1)' }}
        >
          <h2 className="text-4xl font-bold mb-4">Ready to experience the future?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of users exploring the capabilities of Qwen AI.
          </p>
          <Link href="/chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 rounded-2xl font-semibold text-white text-lg"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)',
              }}
            >
              Get Started Free →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2024 Qwen AI Chatbot. Built with ❤️ using Next.js &amp; Qwen AI.</p>
      </footer>
    </div>
  )
}
