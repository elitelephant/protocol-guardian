import './globals.css'
import { StacksAuthProvider } from '../contexts/stacks-auth'

export const metadata = {
  title: 'Protocol Guardian: Stacks Edition - Blockchain Governance Simulation',
  description: 'Shape the future of Bitcoin\'s smart contract layer through governance decisions in the Stacks ecosystem.',
  keywords: ['blockchain', 'governance', 'simulation', 'game', 'protocol', 'stacks', 'bitcoin', 'decentralization'],
  authors: [{ name: 'Protocol Guardian Team' }],
  openGraph: {
    title: 'Protocol Guardian: Stacks Edition - Blockchain Governance Game',
    description: 'Make critical decisions that shape the Bitcoin and Stacks ecosystem. Balance security, decentralization, and adoption.',
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
      <body>
        <StacksAuthProvider testnet={process.env.NODE_ENV === 'development'}>
          {children}
        </StacksAuthProvider>
      </body>
    </html>
  )
}