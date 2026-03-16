import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Qwen Chat',
  description: 'Experience the power of advanced AI conversation',
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
