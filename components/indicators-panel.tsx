"use client"

import type { GameState } from "@/lib/game-state"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface IndicatorsPanelProps {
  gameState: GameState
}

export function IndicatorsPanel({ gameState }: IndicatorsPanelProps) {
  const getIndicatorColor = (value: number) => {
    if (value >= 70) return "text-green-600"
    if (value >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  const getIndicatorIcon = (value: number) => {
    if (value >= 60) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (value >= 40) return <Minus className="h-4 w-4 text-yellow-600" />
    return <TrendingDown className="h-4 w-4 text-red-600" />
  }

  const indicators = [
    {
      name: "Market Stability",
      value: gameState.marketStability,
      description: "Overall cryptocurrency market confidence and volatility levels",
    },
    {
      name: "Public Confidence",
      value: gameState.publicConfidence,
      description: "Citizens' trust in cryptocurrency regulation and FiDeFi leadership",
    },
    {
      name: "Tech Advancement",
      value: gameState.techAdvancement,
      description: "Innovation pace and technological development in the crypto space",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Global Indicators</h2>
      {indicators.map((indicator) => (
        <Card key={indicator.name} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{indicator.name}</h3>
            {getIndicatorIcon(indicator.value)}
          </div>

          <div className="flex items-center gap-3 mb-2">
            <Progress value={indicator.value} className="flex-1" />
            <span className={`text-lg font-bold ${getIndicatorColor(indicator.value)}`}>{indicator.value}%</span>
          </div>

          <p className="text-sm text-muted-foreground">{indicator.description}</p>
        </Card>
      ))}
    </div>
  )
}
