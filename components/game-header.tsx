"use client"

import type { GameState } from "@/lib/game-state"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EraProgressBar } from "@/components/era-progress-bar"

interface GameHeaderProps {
  gameState: GameState
}

export function GameHeader({ gameState }: GameHeaderProps) {
  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case "intro":
        return "Introduction"
      case "era1":
        return "Era 1"
      case "era2":
        return "Era 2"
      case "era3":
        return "Era 3"
      case "era4":
        return "Era 4"
      case "era5":
        return "Era 5"
      case "ending":
        return "Final Assessment"
      default:
        return "Unknown"
    }
  }

  const getMonthName = (month: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[month - 1]
  }

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Bitcoin Stacks Command</h1>
          <p className="text-muted-foreground">Guardian of the Bitcoin Protocol - Strategic Dashboard</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold">
              {getMonthName(gameState.currentMonth)} {gameState.currentYear}
            </div>
            <Badge variant="secondary" className="mt-1">
              {getPhaseLabel(gameState.gamePhase)}
            </Badge>
          </div>

          <div className="text-right">
            <div className="text-sm text-muted-foreground">Term Progress</div>
            <div className="text-xl font-semibold">{Math.round(gameState.termProgress)}%</div>
            <div className="w-24 h-2 bg-muted rounded-full mt-1">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${gameState.termProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Era Progress Bar */}
      <div className="border-t pt-4">
        <EraProgressBar 
          currentPhase={gameState.gamePhase}
          currentDecision={gameState.currentDecision}
          totalDecisions={gameState.totalDecisionsInEra}
        />
      </div>
    </Card>
  )
}
