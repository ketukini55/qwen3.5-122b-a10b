import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Qwen AI - Premium Chatbot Experience',
  description: 'Experience the power of Qwen AI with a premium, beautiful chatbot interface',
  keywords: 'AI, chatbot, Qwen, artificial intelligence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-white antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
