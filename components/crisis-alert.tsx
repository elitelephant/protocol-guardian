"use client"

import type { GameState, Crisis } from "@/lib/game-state"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Clock, Zap } from "lucide-react"

interface CrisisAlertProps {
  gameState: GameState
  onRespondToCrisis?: (crisis: Crisis) => void
  timeRemaining?: number
}

export function CrisisAlert({ gameState, onRespondToCrisis, timeRemaining }: CrisisAlertProps) {
  if (!gameState.currentCrisis) {
    return null
  }

  const crisis = gameState.currentCrisis

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-600 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      case "low":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    return null
  }

  const timeProgress =
    timeRemaining && crisis.timeLimit ? ((crisis.timeLimit - timeRemaining) / crisis.timeLimit) * 100 : 0

  return (
    <Card className="p-6 border-l-4 border-destructive bg-gradient-to-r from-destructive/10 to-destructive/5">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">{getUrgencyIcon(crisis.urgency)}</div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-destructive">🚨 Crisis Alert</h2>
              <Badge className={getUrgencyColor(crisis.urgency)}>{crisis.urgency.toUpperCase()} PRIORITY</Badge>
            </div>
            <div className="text-sm text-muted-foreground">Year {crisis.year}</div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">{crisis.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{crisis.description}</p>
          </div>

          {crisis.timeLimit && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Response Deadline</span>
                </div>
                <span className="font-medium">
                  {timeRemaining ? `${timeRemaining} days remaining` : `${crisis.timeLimit} days to respond`}
                </span>
              </div>
              {timeRemaining !== undefined && (
                <div className="space-y-1">
                  <Progress value={timeProgress} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {timeProgress > 75
                      ? "Urgent action required"
                      : timeProgress > 50
                        ? "Time running short"
                        : "Time available"}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              {crisis.decisions.length} critical decision{crisis.decisions.length !== 1 ? "s" : ""} required
            </div>
            <Button
              onClick={() => onRespondToCrisis?.(crisis)}
              className="bg-destructive hover:bg-destructive/90"
              size="lg"
            >
              Respond to Crisis
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
