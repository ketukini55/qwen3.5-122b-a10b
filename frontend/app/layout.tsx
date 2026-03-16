import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Qwen Chat - Advanced AI Conversation',
  description: 'Experience the power of advanced AI conversation with Qwen Chat',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
