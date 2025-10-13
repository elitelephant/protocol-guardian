import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Protocol Guardian - Blockchain Governance Simulation',
  description: 'A blockchain governance simulation game where your decisions shape the future of decentralized networks.',
  keywords: ['blockchain', 'governance', 'simulation', 'game', 'protocol', 'decentralization'],
  authors: [{ name: 'Protocol Guardian Team' }],
  openGraph: {
    title: 'Protocol Guardian - Blockchain Governance Game',
    description: 'Make critical decisions that shape the future of blockchain protocols. Balance security, decentralization, and adoption.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}