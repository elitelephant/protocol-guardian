"use client"

import { useState } from "react"
import type { Decision, DecisionOption } from "@/lib/game-state"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, TrendingUp, Users, Globe } from "lucide-react"

interface DecisionModalProps {
  decision: Decision | null
  isOpen: boolean
  onClose: () => void
  onMakeDecision: (decision: Decision, option: DecisionOption) => void
}

export function DecisionModal({ decision, isOpen, onClose, onMakeDecision }: DecisionModalProps) {
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null)
  const [showEducationalContent, setShowEducationalContent] = useState(false)

  if (!decision) return null

  const handleConfirmDecision = () => {
    if (selectedOption) {
      onMakeDecision(decision, selectedOption)
      setSelectedOption(null)
      setShowEducationalContent(false)
      onClose()
    }
  }

  const getConsequenceIcon = (type: string) => {
    switch (type) {
      case "marketStability":
        return <TrendingUp className="h-4 w-4" />
      case "publicConfidence":
        return <Users className="h-4 w-4" />
      case "techAdvancement":
        return <TrendingUp className="h-4 w-4" />
      case "blocRelationship":
        return <Globe className="h-4 w-4" />
      default:
        return null
    }
  }

  const getConsequenceColor = (change: number) => {
    return change > 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{decision.title}</DialogTitle>
          <DialogDescription className="text-base">{decision.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Educational Content Toggle */}
          {decision.educationalContent && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEducationalContent(!showEducationalContent)}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                {showEducationalContent ? "Hide" : "Show"} Educational Content
              </Button>
            </div>
          )}

          {/* Educational Content */}
          {showEducationalContent && decision.educationalContent && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Learn More</h3>
              </div>
              <p className="text-blue-800">{decision.educationalContent}</p>
            </Card>
          )}

          {/* Decision Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Your Response:</h3>
            {decision.options.map((option) => (
              <Card
                key={option.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedOption?.id === option.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50 hover:bg-primary/2"
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-base">{option.text}</p>
                    {selectedOption?.id === option.id && <Badge className="bg-primary">Selected</Badge>}
                  </div>

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
                          className={`text-xs ${getConsequenceColor(consequence.change)}`}
                        >
                          <span className="flex items-center gap-1">
                            {getConsequenceIcon(consequence.type)}
                            {consequence.change > 0 ? "+" : ""}
                            {consequence.change} {consequence.target ? `${consequence.target}` : consequence.type}
                          </span>
                        </Badge>
                      ))}
                    </div>
                    {selectedOption?.id === option.id && (
                      <div className="mt-2 space-y-1">
                        {option.consequences.map((consequence, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground">
                            • {consequence.description}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDecision}
              disabled={!selectedOption}
              className="bg-primary hover:bg-primary/90"
            >
              Confirm Decision
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
