"use client"

import type { GameState } from "@/lib/game-state"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface GeopoliticalPanelProps {
  gameState: GameState
}

export function GeopoliticalPanel({ gameState }: GeopoliticalPanelProps) {
  const getRelationshipStatus = (value: number) => {
    if (value >= 50) return { label: "Allied", color: "bg-green-500" }
    if (value >= 20) return { label: "Friendly", color: "bg-green-400" }
    if (value >= -20) return { label: "Neutral", color: "bg-gray-400" }
    if (value >= -50) return { label: "Tense", color: "bg-orange-500" }
    return { label: "Hostile", color: "bg-red-500" }
  }

  const blocs = [
    {
      name: "Western Alliance",
      key: "westernAlliance" as const,
      value: gameState.blocRelationships.westernAlliance,
      description: "US, EU, UK, Canada, Australia - Focus on consumer protection and AML compliance",
    },
    {
      name: "Eastern Bloc",
      key: "easternBloc" as const,
      value: gameState.blocRelationships.easternBloc,
      description: "China, Russia, North Korea - State-controlled digital currencies and surveillance",
    },
    {
      name: "Global South",
      key: "globalSouth" as const,
      value: gameState.blocRelationships.globalSouth,
      description: "India, Brazil, Nigeria, others - Financial inclusion and remittance focus",
    },
  ]

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Geopolitical Relations</h2>
      <div className="space-y-6">
        {blocs.map((bloc) => {
          const status = getRelationshipStatus(bloc.value)
          const progressValue = ((bloc.value + 100) / 200) * 100 // Convert -100 to 100 range to 0-100%

          return (
            <div key={bloc.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{bloc.name}</h3>
                <Badge className={status.color}>{status.label}</Badge>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-8">-100</span>
                <Progress value={progressValue} className="flex-1" />
                <span className="text-sm text-muted-foreground w-8">+100</span>
                <span className="text-lg font-bold w-12 text-right">
                  {bloc.value > 0 ? "+" : ""}
                  {bloc.value}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{bloc.description}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
