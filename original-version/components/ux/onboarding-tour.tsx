"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, X, Play, SkipForward } from "lucide-react"

interface TourStep {
  id: string
  title: string
  description: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  action?: () => void
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to FiDeFi Regulatory Command",
    description: "Learn how to navigate the complex world of cryptocurrency regulation through interactive scenarios.",
    target: "body",
    position: "bottom",
  },
  {
    id: "game-area",
    title: "Game Interface",
    description: "This is where scenarios are presented. Read carefully and make informed decisions.",
    target: '[data-tour="game-area"]',
    position: "bottom",
  },
  {
    id: "decision-options",
    title: "Decision Options",
    description: "Choose from multiple regulatory approaches. Each choice affects your score and the market.",
    target: '[data-tour="decision-options"]',
    position: "top",
  },
  {
    id: "score-display",
    title: "Performance Metrics",
    description: "Track your regulatory effectiveness, market stability, and innovation scores.",
    target: '[data-tour="score-display"]',
    position: "left",
  },
  {
    id: "educational-sidebar",
    title: "Educational Resources",
    description: "Access lessons, case studies, and regulatory frameworks to improve your understanding.",
    target: '[data-tour="educational-sidebar"]',
    position: "left",
  },
  {
    id: "events-feed",
    title: "Market Events",
    description: "Stay informed about market developments and regulatory news that affect your decisions.",
    target: '[data-tour="events-feed"]',
    position: "left",
  },
  {
    id: "keyboard-shortcuts",
    title: "Keyboard Shortcuts",
    description: 'Press "?" anytime to see available keyboard shortcuts for faster navigation.',
    target: "body",
    position: "bottom",
    action: () => {
      // Simulate showing keyboard shortcuts
      console.log("[v0] Showing keyboard shortcuts demo")
    },
  },
]

export default function OnboardingTour() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenTour, setHasSeenTour] = useState(false)

  useEffect(() => {
    // Check if user has seen the tour
    const tourCompleted = localStorage.getItem("onboarding-tour-completed")
    if (!tourCompleted) {
      // Show tour after a brief delay
      const timer = setTimeout(() => {
        setIsActive(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setHasSeenTour(true)
    }
  }, [])

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      // Execute step action if available
      tourSteps[currentStep + 1].action?.()
    } else {
      completeTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTour = () => {
    completeTour()
  }

  const completeTour = () => {
    setIsActive(false)
    localStorage.setItem("onboarding-tour-completed", "true")
    setHasSeenTour(true)
  }

  const restartTour = () => {
    setCurrentStep(0)
    setIsActive(true)
  }

  // Show restart button for users who have completed the tour
  if (hasSeenTour && !isActive) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={restartTour}
        className="fixed bottom-16 right-4 z-40 shadow-lg bg-transparent"
        aria-label="Restart onboarding tour"
      >
        <Play className="h-4 w-4 mr-2" />
        Tour
      </Button>
    )
  }

  if (!isActive) return null

  const step = tourSteps[currentStep]
  const progress = ((currentStep + 1) / tourSteps.length) * 100

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" />

      {/* Tour Card */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Step {currentStep + 1} of {tourSteps.length}
                </Badge>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={skipTour} aria-label="Skip tour">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="text-sm leading-relaxed">{step.description}</CardDescription>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={skipTour} className="flex items-center gap-2">
                  <SkipForward className="h-4 w-4" />
                  Skip
                </Button>
                <Button onClick={nextStep} size="sm" className="flex items-center gap-2">
                  {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
                  {currentStep < tourSteps.length - 1 && <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
