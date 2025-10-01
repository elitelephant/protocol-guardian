"use client"

import { useState } from "react"
import { useGameState } from "@/hooks/use-game-state"
import { GameHeader } from "@/components/game-header"
import { IndicatorsPanel } from "@/components/indicators-panel"
import { GeopoliticalPanel } from "@/components/geopolitical-panel"
import { RecentDecisions } from "@/components/recent-decisions"
import { CrisisAlert } from "@/components/crisis-alert"
import { DecisionQueue } from "@/components/decision-queue"
import { DecisionModal } from "@/components/decision-modal"
import { LessonModal } from "@/components/lesson-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PolicyDirection } from "@/components/policy-direction"
import { Progress } from "@/components/ui/progress"
import {
  LazyDynamicEventsFeedWithSuspense,
  LazyEducationalSidebarWithSuspense,
  LazyAdvisorsPanelWithSuspense,
} from "@/components/performance/lazy-components"
import {
  LoadingState,
  GameHeaderSkeleton,
  IndicatorsPanelSkeleton,
  DecisionQueueSkeleton,
  CrisisAlertSkeleton,
} from "@/components/performance/loading-states"
import { usePerformanceMonitor } from "@/hooks/use-performance-monitor"
import {
  Shield,
  TrendingUp,
  Users,
  AlertTriangle,
  Clock,
  RotateCcw,
  Play,
  Info,
  ChevronRight,
  Calendar,
  Globe,
} from "lucide-react"
import type { Decision, Crisis } from "@/lib/game-state"
import type { EducationalLesson } from "@/lib/educational-content"

export default function GamePage() {
  usePerformanceMonitor("GamePage")

  const {
    gameState,
    pendingDecisions,
    crisisTimeRemaining,
    makeDecision,
    advanceTime,
    resetGame,
    triggerSampleDecision,
    triggerRandomCrisis,
    completeLesson,
  } = useGameState()

  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null)
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<EducationalLesson | null>(null)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)
  const [isGameLoading, setIsGameLoading] = useState(false)

  const handleStartGame = () => {
    if (gameState.gamePhase === "intro") {
      setIsGameLoading(true)
      setTimeout(() => {
        advanceTime(0) // This will set the phase to year1
        setIsGameLoading(false)
      }, 500) // Small delay for better UX
    }
  }

  const handleSelectDecision = (decision: Decision) => {
    setSelectedDecision(decision)
    setIsDecisionModalOpen(true)
  }

  const handleMakeDecision = (decision: Decision, option: any) => {
    makeDecision(decision, option)
    setIsDecisionModalOpen(false)
    setSelectedDecision(null)

    // Check if this was a crisis decision and resolve crisis if all decisions are made
    if (gameState.currentCrisis && gameState.currentCrisis.decisions.some((d) => d.id === decision.id)) {
      const remainingCrisisDecisions = pendingDecisions.filter((d) =>
        gameState.currentCrisis?.decisions.some((cd) => cd.id === d.id),
      )
      if (remainingCrisisDecisions.length <= 1) {
        // This decision will be removed, so check if it's the last one
        // Crisis resolved - could add resolution logic here
      }
    }
  }

  const handleRespondToCrisis = (crisis: Crisis) => {
    // Show the first crisis decision
    if (crisis.decisions.length > 0) {
      handleSelectDecision(crisis.decisions[0])
    }
  }

  const handleSelectLesson = (lesson: EducationalLesson) => {
    setSelectedLesson(lesson)
    setIsLessonModalOpen(true)
  }

  const handleCompleteLesson = (lessonId: string) => {
    completeLesson(lessonId)
  }

  const handleSelectPolicy = (policyId: string) => {
    console.log("[v0] Selected policy:", policyId)
    // This could trigger the first major decision or set initial game state
    advanceTime(0) // Move to main game phase
  }

  if (gameState.gamePhase === "intro") {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-balance">Global Crypto Crisis Command</h1>
                    <p className="text-sm text-muted-foreground">Strategic Regulatory Simulation</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Year 2035
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    FiDeFi HQ
                  </Badge>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={resetGame}>
                        <RotateCcw className="h-4 w-4" />
                        <span className="sr-only">Restart Game</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Restart the simulation</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-balance">Mission Briefing</h2>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Info className="h-3 w-3" />
                  Setup Phase
                </Badge>
              </div>
              <Progress value={25} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Step 1 of 4: Choose your leadership approach</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              <div className="space-y-6">
                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Market Indicators
                    </h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Current global crypto market status</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="space-y-4">
                    <div className="h-32 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                      <div className="text-center space-y-2 text-muted-foreground">
                        <TrendingUp className="h-8 w-8 mx-auto opacity-50" />
                        <p className="text-sm">Market data loading...</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-center p-3 bg-muted/30 rounded-lg cursor-help">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <div className="w-3 h-3 bg-primary rounded-full"></div>
                              <span className="text-xs font-medium">Market</span>
                            </div>
                            <span className="text-lg font-bold">50%</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Overall market stability index</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-center p-3 bg-muted/30 rounded-lg cursor-help">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                              <span className="text-xs font-medium">Trust</span>
                            </div>
                            <span className="text-lg font-bold">50%</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Public confidence in crypto regulation</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-center p-3 bg-muted/30 rounded-lg cursor-help">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                              <span className="text-xs font-medium">Innovation</span>
                            </div>
                            <span className="text-lg font-bold">50%</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Technology advancement rate</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              </div>

              <LazyDynamicEventsFeedWithSuspense gameState={gameState} />
              <LazyAdvisorsPanelWithSuspense gameState={gameState} />
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Critical Decision Required</h3>
                  <p className="text-sm text-muted-foreground">
                    Your leadership approach will shape the future of global crypto regulation
                  </p>
                </div>
              </div>

              <PolicyDirection onSelectPolicy={handleSelectPolicy} />
            </div>
          </main>
        </div>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Global Crypto Crisis Command</h1>
                  <p className="text-sm text-muted-foreground">Active Regulatory Operations</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Year {2035 + Math.floor(gameState.currentMonth / 12)}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Month {(gameState.currentMonth % 12) + 1}
                </Badge>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={resetGame}>
                      <RotateCcw className="h-4 w-4" />
                      <span className="sr-only">Restart Game</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Restart the simulation</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 space-y-6">
          <LoadingState isLoading={isGameLoading} skeleton={GameHeaderSkeleton}>
            <GameHeader gameState={gameState} />
          </LoadingState>

          <LoadingState isLoading={isGameLoading} skeleton={CrisisAlertSkeleton}>
            <CrisisAlert
              gameState={gameState}
              onRespondToCrisis={handleRespondToCrisis}
              timeRemaining={crisisTimeRemaining}
            />
          </LoadingState>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <LoadingState isLoading={isGameLoading} skeleton={DecisionQueueSkeleton}>
                <DecisionQueue decisions={pendingDecisions} onSelectDecision={handleSelectDecision} />
              </LoadingState>

              <GeopoliticalPanel gameState={gameState} />
              <RecentDecisions gameState={gameState} />

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
                        onClick={() => advanceTime(1)}
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
                        onClick={triggerSampleDecision}
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
                        onClick={triggerRandomCrisis}
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
                        onClick={resetGame}
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
            </div>

            <div className="space-y-6">
              <LoadingState isLoading={isGameLoading} skeleton={IndicatorsPanelSkeleton}>
                <IndicatorsPanel gameState={gameState} />
              </LoadingState>
              <LazyDynamicEventsFeedWithSuspense gameState={gameState} />
            </div>

            <div>
              <LazyEducationalSidebarWithSuspense
                gameState={gameState}
                onLessonComplete={handleCompleteLesson}
                onSelectLesson={handleSelectLesson}
              />
            </div>
          </div>

          <DecisionModal
            decision={selectedDecision}
            isOpen={isDecisionModalOpen}
            onClose={() => setIsDecisionModalOpen(false)}
            onMakeDecision={handleMakeDecision}
          />

          <LessonModal
            lesson={selectedLesson}
            isOpen={isLessonModalOpen}
            isCompleted={gameState.completedLessons.includes(selectedLesson?.id || "")}
            onClose={() => setIsLessonModalOpen(false)}
            onComplete={handleCompleteLesson}
          />
        </main>
      </div>
    </TooltipProvider>
  )
}
