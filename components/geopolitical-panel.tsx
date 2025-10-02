"use client"

import type { GameState } from "@/lib/game-state"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface GeopoliticalPanelProps {
  gameState: GameState
}

export function GeopoliticalPanel({ gameState }: GeopoliticalPanelProps) {
  const getAdoptionStatus = (value: number) => {
    if (value >= 80) return { label: "Mass Adoption", color: "bg-green-500" }
    if (value >= 60) return { label: "Growing", color: "bg-green-400" }
    if (value >= 40) return { label: "Moderate", color: "bg-yellow-500" }
    if (value >= 20) return { label: "Limited", color: "bg-orange-500" }
    return { label: "Emerging", color: "bg-red-500" }
  }

  const regions = [
    {
      name: "North America",
      value: Math.max(0, Math.min(100, gameState.networkHealth + Math.random() * 20 - 10)),
      description: "US, Canada - Strong institutional adoption and regulatory clarity",
    },
    {
      name: "Europe",
      value: Math.max(0, Math.min(100, gameState.publicConfidence + Math.random() * 20 - 10)),
      description: "EU, UK - Focus on ESG compliance and sustainable finance",
    },
    {
      name: "Asia Pacific",
      value: Math.max(0, Math.min(100, gameState.techAdvancement + Math.random() * 20 - 10)),
      description: "China, Japan, Singapore - Tech innovation and large-scale adoption",
    },
  ]

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Global Bitcoin Adoption</h2>
      <div className="space-y-6">
        {regions.map((region) => {
          const status = getAdoptionStatus(region.value)

          return (
            <div key={region.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{region.name}</h3>
                <Badge className={status.color}>{status.label}</Badge>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-8">0%</span>
                <Progress value={region.value} className="flex-1" />
                <span className="text-sm text-muted-foreground w-8">100%</span>
                <span className="text-lg font-bold w-12 text-right">
                  {Math.round(region.value)}%
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{region.description}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
