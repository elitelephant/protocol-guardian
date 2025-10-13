"use client"

import type { Decision } from "@/lib/game-state"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle } from "lucide-react"

interface DecisionQueueProps {
  decisions: Decision[]
  onSelectDecision: (decision: Decision) => void
}

export function DecisionQueue({ decisions, onSelectDecision }: DecisionQueueProps) {
  if (decisions.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Pending Decisions</h2>
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No pending decisions</p>
          <p className="text-sm">New regulatory issues will appear here</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Pending Decisions</h2>
      <div className="space-y-4">
        {decisions.map((decision) => (
          <Card key={decision.id} className="p-4 border-l-4 border-orange-500">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="font-medium">{decision.title}</h3>
              </div>
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                Urgent
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{decision.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {decision.options.length} response options available
              </span>
              <Button size="sm" onClick={() => onSelectDecision(decision)}>
                Review Decision
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
