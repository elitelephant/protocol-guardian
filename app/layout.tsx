import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SkipNavigation } from "@/components/accessibility/skip-navigation"
import { ScreenReaderAnnouncer } from "@/components/accessibility/screen-reader-announcer"
import { ErrorBoundary } from "@/components/accessibility/error-boundary"
import { StacksAuthProvider } from "@/contexts/stacks-auth"
import { Toaster } from "sonner"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bitcoin Stacks Command",
  description: "Educational Bitcoin & Stacks Protocol Simulation Game",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <StacksAuthProvider testnet={process.env.NODE_ENV === 'development'}>
          <Suspense fallback={null}>
            <SkipNavigation />
            <ScreenReaderAnnouncer />
            <ErrorBoundary>{children}</ErrorBoundary>
            <Toaster />
            <Analytics />
          </Suspense>
        </StacksAuthProvider>
      </body>
    </html>
  )
}
