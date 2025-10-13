"use client"

import type { GameState } from "@/lib/game-state"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface RecentDecisionsProps {
  gameState: GameState
}

export function RecentDecisions({ gameState }: RecentDecisionsProps) {
  const recentDecisions = gameState.decisions.slice(-5).reverse() // Show last 5 decisions, most recent first

  if (recentDecisions.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Decisions</h2>
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No decisions made yet</p>
          <p className="text-sm">Your regulatory choices will appear here</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Decisions</h2>
      <div className="space-y-4">
        {recentDecisions.map((decision, index) => (
          <div key={`${decision.id}-${index}`} className="border-l-4 border-primary pl-4 py-2">
            <h3 className="font-medium">{decision.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{decision.description}</p>

            {decision.consequences && decision.consequences.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {decision.consequences.map((consequence, idx) => (
                  <Badge key={idx} variant={consequence.change > 0 ? "default" : "destructive"} className="text-xs">
                    {consequence.change > 0 ? "+" : ""}
                    {consequence.change} {consequence.type}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
