"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { IndicatorsPanel } from "@/components/indicators-panel"
import { DecisionQueue } from "@/components/decision-queue"
import { NewsFeed } from "@/components/news-feed"
import { CrisisAlert } from "@/components/crisis-alert"
import { DecisionModal } from "@/components/decision-modal"
import { LessonModal } from "@/components/lesson-modal"
import { Play, Pause, SkipForward, AlertTriangle } from "lucide-react"
import type { GameState, Decision, Crisis } from "@/lib/game-state"
import type { EducationalLesson } from "@/lib/educational-content"

interface MainGameProps {
  gameState: GameState
  pendingDecisions: Decision[]
  crisisTimeRemaining: number
  isGameLoading: boolean
  selectedDecision: Decision | null
  isDecisionModalOpen: boolean
  selectedLesson: EducationalLesson | null
  isLessonModalOpen: boolean
  onSelectDecision: (decision: Decision) => void
  onMakeDecision: (decision: Decision, option: any) => void
  onRespondToCrisis: (crisis: Crisis) => void
  onSelectLesson: (lesson: EducationalLesson) => void
  onCompleteLesson: (lessonId: string) => void
  onAdvanceTime: () => void
  onTriggerSampleDecision: () => void
  onTriggerRandomCrisis: () => void
  onResetGame: () => void
  onCloseDecisionModal: () => void
  onCloseLessonModal: () => void
}

export function MainGame({
  gameState,
  pendingDecisions,
  crisisTimeRemaining,
  isGameLoading,
  selectedDecision,
  isDecisionModalOpen,
  selectedLesson,
  isLessonModalOpen,
  onSelectDecision,
  onMakeDecision,
  onRespondToCrisis,
  onSelectLesson,
  onCompleteLesson,
  onAdvanceTime,
  onTriggerSampleDecision,
  onTriggerRandomCrisis,
  onResetGame,
  onCloseDecisionModal,
  onCloseLessonModal,
}: MainGameProps) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col space-y-6">
        {/* Game Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Play className="h-3 w-3" />
              Era {gameState.gamePhase.replace('era', '')}
            </Badge>
            {gameState.currentCrisis && (
              <Badge variant="destructive" className="flex items-center gap-2">
                <AlertTriangle className="h-3 w-3" />
                Crisis Active
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onTriggerSampleDecision}>
                  Add Decision
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trigger a sample decision for testing</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onTriggerRandomCrisis}>
                  Add Crisis
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trigger a random crisis event</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPaused(!isPaused)}
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPaused ? 'Resume' : 'Pause'} simulation</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onAdvanceTime}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Advance to next month</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Main Game Layout */}
        <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Left Column - Indicators and Decisions */}
          <div className="lg:col-span-1 space-y-6">
            <IndicatorsPanel gameState={gameState} />
            <DecisionQueue
              decisions={pendingDecisions}
              onSelectDecision={onSelectDecision}
            />
          </div>

          {/* Right Column - News and Events */}
          <div className="lg:col-span-2">
            <NewsFeed gameState={gameState} />
          </div>
        </div>

        {/* Crisis Alert - Overlay */}
        {gameState.currentCrisis && (
          <CrisisAlert
            gameState={gameState}
            onRespondToCrisis={onRespondToCrisis}
            timeRemaining={crisisTimeRemaining}
          />
        )}

        {/* Modals */}
        <DecisionModal
          decision={selectedDecision}
          isOpen={isDecisionModalOpen}
          onClose={onCloseDecisionModal}
          onMakeDecision={onMakeDecision}
        />

        <LessonModal
          lesson={selectedLesson}
          isOpen={isLessonModalOpen}
          isCompleted={selectedLesson ? gameState.completedLessons.includes(selectedLesson.id) : false}
          onClose={onCloseLessonModal}
          onComplete={onCompleteLesson}
        />
      </div>
    </TooltipProvider>
  )
}