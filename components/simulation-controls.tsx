"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Users,
  AlertTriangle,
  Clock,
  RotateCcw,
  Play,
  ChevronRight,
} from "lucide-react"

interface SimulationControlsProps {
  isGameLoading: boolean
  onAdvanceTime: () => void
  onTriggerSampleDecision: () => void
  onTriggerRandomCrisis: () => void
  onResetGame: () => void
}

export function SimulationControls({
  isGameLoading,
  onAdvanceTime,
  onTriggerSampleDecision,
  onTriggerRandomCrisis,
  onResetGame,
}: SimulationControlsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Simulation Controls
        </h3>
        <Badge variant="secondary">Development Mode</Badge>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onAdvanceTime}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              disabled={isGameLoading}
            >
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Advance</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Advance simulation by 1 month</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onTriggerSampleDecision}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
              disabled={isGameLoading}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="hidden sm:inline">Decision</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add a new policy decision</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onTriggerRandomCrisis}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
              disabled={isGameLoading}
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Crisis</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Trigger a random crisis event</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onResetGame}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
              disabled={isGameLoading}
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset the entire simulation</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Card>
  )
}