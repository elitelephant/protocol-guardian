"use client"

import { useState, useEffect } from "react"
import { useGameState } from "@/hooks/use-game-state"
import { GameHeader } from "@/components/game-header"
import { IndicatorsPanel } from "@/components/indicators-panel"
import { RecentDecisions } from "@/components/recent-decisions"
import { CrisisAlert } from "@/components/crisis-alert"
import { DecisionQueue } from "@/components/decision-queue"
import { LessonModal } from "@/components/lesson-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
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
  BookOpen,
  Target,
  Zap,
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
  const [selectedLesson, setSelectedLesson] = useState<EducationalLesson | null>(null)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)
  const [isGameLoading, setIsGameLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0) // 0: context, 1: policy, 2: game, 3: metrics, 3: metrics

  // Automatically show the first pending decision as a full screen
  useEffect(() => {
    if (currentStep === 2 && pendingDecisions.length > 0 && !selectedDecision) {
      handleSelectDecision(pendingDecisions[0])
    }
  }, [currentStep, pendingDecisions, selectedDecision])

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
  }

  const handleMakeDecision = (decision: Decision, option: any) => {
    makeDecision(decision, option)
    setSelectedDecision(null)

    // After making a decision, go to metrics screen
    setCurrentStep(3)

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
    setCurrentStep(2) // Move to game step
    // Trigger the first decision to start the sequential flow
    triggerSampleDecision()
  }

  const handleContinueToNextDecision = () => {
    // Go back to game screen and trigger a new decision
    setCurrentStep(2)
    triggerSampleDecision()
  }

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-balance">Bitcoin Stacks Command</h1>
                  <p className="text-sm text-muted-foreground">
                    {currentStep === 0 ? "Guardian of the Bitcoin Protocol" : currentStep === 1 ? "Setup Phase" : currentStep === 3 ? "Protocol Status Update" : "Active Protocol Operations"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {currentStep < 2 && (
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Year 2035
                  </Badge>
                )}
                {currentStep === 2 && (
                  <>
                    <Badge variant="outline" className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      Year {2035 + Math.floor(gameState.currentMonth / 12)}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Month {(gameState.currentMonth % 12) + 1}
                    </Badge>
                  </>
                )}
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

        <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
          {currentStep === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <Card className="max-w-2xl w-full p-4 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome, Guardian</h2>
                  <p className="text-base text-muted-foreground mb-3">
                    You are the <strong>Bitcoin Protocol Guardian</strong>, a decentralized steward overseeing Bitcoin and its Layer 2 ecosystems, particularly Stacks.
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Your mission spans five transformative eras of Bitcoin's evolution, where you'll navigate consensus challenges, protocol upgrades, and network evolution in the maturing Bitcoin ecosystem.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold">Network Health</h3>
                    <p className="text-sm text-muted-foreground">Stability and security of the Bitcoin network</p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                    <Users className="h-8 w-8 text-chart-2 mb-2" />
                    <h3 className="font-semibold">Public Confidence</h3>
                    <p className="text-sm text-muted-foreground">Trust in Bitcoin as a financial system</p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                    <Zap className="h-8 w-8 text-chart-3 mb-2" />
                    <h3 className="font-semibold">Tech Advancement</h3>
                    <p className="text-sm text-muted-foreground">Innovation in Bitcoin Layer 2 solutions</p>
                  </div>
                </div>
                <Button onClick={handleNextStep} size="lg" className="w-full">
                  Begin Your Mission
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Card>
            </div>
          )}

          {currentStep === 1 && (
            <div className="flex-1 flex flex-col justify-center">
              <div className="max-w-2xl mx-auto">
                <PolicyDirection onSelectPolicy={handleSelectPolicy} />
              </div>
            </div>
          )}

          {currentStep === 2 && selectedDecision && (
            <div className="flex-1 flex items-center justify-center">
              <Card className="max-w-4xl w-full p-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2">{selectedDecision.title}</h2>
                    <p className="text-lg text-muted-foreground">{selectedDecision.description}</p>
                  </div>

                  {/* Decision Options */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Choose Your Response:</h3>
                    {selectedDecision.options.map((option) => (
                      <Card
                        key={option.id}
                        className="p-4 cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/2"
                        onClick={() => handleMakeDecision(selectedDecision, option)}
                      >
                        <div className="space-y-3">
                          <p className="font-medium text-base">{option.text}</p>

                          {/* Educational Note */}
                          {option.educationalNote && (
                            <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                              <strong>Note:</strong> {option.educationalNote}
                            </div>
                          )}

                          {/* Consequences Preview */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-muted-foreground">Potential Consequences:</h4>
                            <div className="flex flex-wrap gap-2">
                              {option.consequences.map((consequence, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className={`text-xs ${consequence.change > 0 ? 'text-green-600' : 'text-red-600'}`}
                                >
                                  {consequence.change > 0 ? "+" : ""}{consequence.change} {consequence.type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {currentStep === 2 && !selectedDecision && (
            <div className="space-y-6">
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <RecentDecisions gameState={gameState} />
                </div>

                <div className="space-y-6">
                  <LoadingState isLoading={isGameLoading} skeleton={IndicatorsPanelSkeleton}>
                    <IndicatorsPanel gameState={gameState} />
                  </LoadingState>
                  <LazyDynamicEventsFeedWithSuspense gameState={gameState} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex-1 flex items-center justify-center">
              <div className="max-w-4xl w-full text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <TrendingUp className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Protocol Status Update</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Your recent decision has impacted the Bitcoin ecosystem. Here's the current state of key indicators:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Network Health</h3>
                      <div className={`text-2xl font-bold ${gameState.networkHealth >= 70 ? 'text-green-600' : gameState.networkHealth >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {gameState.networkHealth}%
                      </div>
                    </div>
                    <Progress value={gameState.networkHealth} className="mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Overall Bitcoin network security, decentralization, and operational stability
                    </p>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Public Confidence</h3>
                      <div className={`text-2xl font-bold ${gameState.publicConfidence >= 70 ? 'text-green-600' : gameState.publicConfidence >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {gameState.publicConfidence}%
                      </div>
                    </div>
                    <Progress value={gameState.publicConfidence} className="mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Community trust in Bitcoin protocol governance and Stacks ecosystem
                    </p>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Tech Advancement</h3>
                      <div className={`text-2xl font-bold ${gameState.techAdvancement >= 70 ? 'text-green-600' : gameState.techAdvancement >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {gameState.techAdvancement}%
                      </div>
                    </div>
                    <Progress value={gameState.techAdvancement} className="mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Innovation pace in Layer 2 solutions, smart contracts, and Bitcoin ecosystem development
                    </p>
                  </Card>
                </div>

                <Button onClick={handleContinueToNextDecision} size="lg" className="mt-6">
                  Continue Your Mission
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </TooltipProvider>
  )
}
