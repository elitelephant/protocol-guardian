"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, TrendingUp, Users, Zap, ChevronRight } from "lucide-react"

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="max-w-2xl w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <Shield className="h-12 w-12 text-primary" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Welcome, Guardian</h2>
          <p className="text-lg text-muted-foreground mb-6">
            You are the <strong>Bitcoin Protocol Guardian</strong>, a decentralized steward overseeing Bitcoin and its Layer 2 ecosystems.
          </p>
          <p className="text-muted-foreground mb-6">
            Your mission spans five transformative eras of Bitcoin's evolution, where you'll navigate consensus challenges, protocol upgrades, and network evolution in the maturing Bitcoin ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
            <TrendingUp className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold">Network Health</h3>
            <p className="text-sm text-muted-foreground">Stability and security of the Bitcoin network</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
            <Users className="h-8 w-8 text-chart-2 mb-2" />
            <h3 className="font-semibold">Public Confidence</h3>
            <p className="text-sm text-muted-foreground">Trust in Bitcoin as a financial system</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
            <Zap className="h-8 w-8 text-chart-3 mb-2" />
            <h3 className="font-semibold">Tech Advancement</h3>
            <p className="text-sm text-muted-foreground">Innovation in Bitcoin Layer 2 solutions</p>
          </div>
        </div>
        <Button onClick={onNext} size="lg" className="w-full">
          Begin Your Mission
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </Card>
    </div>
  )
}