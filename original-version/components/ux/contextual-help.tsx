"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, X, Lightbulb, BookOpen, AlertCircle } from "lucide-react"

interface HelpTip {
  id: string
  title: string
  content: string
  type: "tip" | "warning" | "info"
  context: string
  trigger: string
}

const helpTips: HelpTip[] = [
  {
    id: "decision-making",
    title: "Making Effective Decisions",
    content:
      "Consider the long-term implications of your regulatory choices. Balance innovation with consumer protection.",
    type: "tip",
    context: "decision-modal",
    trigger: "decision-options",
  },
  {
    id: "score-interpretation",
    title: "Understanding Your Scores",
    content:
      "Regulatory Effectiveness measures compliance, Market Stability tracks economic impact, and Innovation Score reflects technological progress.",
    type: "info",
    context: "score-display",
    trigger: "score-area",
  },
  {
    id: "crisis-handling",
    title: "Crisis Management",
    content:
      "During market crises, swift action is crucial. Consider emergency measures but be mindful of precedent-setting decisions.",
    type: "warning",
    context: "crisis-alert",
    trigger: "crisis-scenario",
  },
  {
    id: "educational-resources",
    title: "Learning Resources",
    content:
      "Use the educational sidebar to deepen your understanding of regulatory frameworks and real-world case studies.",
    type: "tip",
    context: "educational-sidebar",
    trigger: "lesson-access",
  },
  {
    id: "market-events",
    title: "Market Event Analysis",
    content:
      "Pay attention to market events as they provide context for your decisions and may influence optimal regulatory approaches.",
    type: "info",
    context: "events-feed",
    trigger: "event-interaction",
  },
]

export default function ContextualHelp() {
  const [activeHelp, setActiveHelp] = useState<HelpTip | null>(null)
  const [availableHelp, setAvailableHelp] = useState<HelpTip[]>([])
  const [showHelpButton, setShowHelpButton] = useState(false)

  useEffect(() => {
    // Listen for context changes
    const handleContextChange = (event: CustomEvent) => {
      const context = event.detail.context
      const relevantTips = helpTips.filter((tip) => tip.context === context)
      setAvailableHelp(relevantTips)
      setShowHelpButton(relevantTips.length > 0)
    }

    // Listen for help triggers
    const handleHelpTrigger = (event: CustomEvent) => {
      const trigger = event.detail.trigger
      const tip = helpTips.find((tip) => tip.trigger === trigger)
      if (tip) {
        setActiveHelp(tip)
      }
    }

    window.addEventListener("context-change" as any, handleContextChange)
    window.addEventListener("help-trigger" as any, handleHelpTrigger)

    return () => {
      window.removeEventListener("context-change" as any, handleContextChange)
      window.removeEventListener("help-trigger" as any, handleHelpTrigger)
    }
  }, [])

  const showHelp = (tip: HelpTip) => {
    setActiveHelp(tip)
  }

  const closeHelp = () => {
    setActiveHelp(null)
  }

  const getIcon = (type: HelpTip["type"]) => {
    switch (type) {
      case "tip":
        return <Lightbulb className="h-4 w-4" />
      case "warning":
        return <AlertCircle className="h-4 w-4" />
      case "info":
        return <BookOpen className="h-4 w-4" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: HelpTip["type"]) => {
    switch (type) {
      case "tip":
        return "bg-blue-500"
      case "warning":
        return "bg-yellow-500"
      case "info":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <>
      {/* Help Button */}
      {showHelpButton && !activeHelp && (
        <div className="fixed bottom-20 right-4 z-40">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => availableHelp.length > 0 && showHelp(availableHelp[0])}
              className="shadow-lg animate-pulse"
              aria-label="Get contextual help"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
            {availableHelp.length > 1 && (
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {availableHelp.length}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Help Modal */}
      {activeHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-full ${getTypeColor(activeHelp.type)} text-white`}>
                    {getIcon(activeHelp.type)}
                  </div>
                  <CardTitle className="text-lg">{activeHelp.title}</CardTitle>
                </div>
                <Button variant="ghost" size="sm" onClick={closeHelp} aria-label="Close help">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed">{activeHelp.content}</CardDescription>

              {availableHelp.length > 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Other helpful tips:</p>
                  <div className="space-y-1">
                    {availableHelp
                      .filter((tip) => tip.id !== activeHelp.id)
                      .map((tip) => (
                        <Button
                          key={tip.id}
                          variant="ghost"
                          size="sm"
                          onClick={() => showHelp(tip)}
                          className="w-full justify-start text-left h-auto p-2"
                        >
                          <div className="flex items-center gap-2">
                            {getIcon(tip.type)}
                            <span className="text-xs">{tip.title}</span>
                          </div>
                        </Button>
                      ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={closeHelp} size="sm">
                  Got it
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
