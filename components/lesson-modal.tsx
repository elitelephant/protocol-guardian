"use client"

import type { EducationalLesson } from "@/lib/educational-content"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Clock, CheckCircle, Lightbulb } from "lucide-react"

interface LessonModalProps {
  lesson: EducationalLesson | null
  isOpen: boolean
  isCompleted: boolean
  onClose: () => void
  onComplete: (lessonId: string) => void
}

export function LessonModal({ lesson, isOpen, isCompleted, onClose, onComplete }: LessonModalProps) {
  if (!lesson) return null

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-yellow-500"
      case "advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleComplete = () => {
    if (!isCompleted) {
      onComplete(lesson.id)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <DialogTitle className="text-2xl">{lesson.title}</DialogTitle>
            {isCompleted && <CheckCircle className="h-6 w-6 text-green-600" />}
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getDifficultyColor(lesson.difficulty)}>{lesson.difficulty}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {lesson.estimatedReadTime} minute read
            </div>
            <Badge variant="outline">{lesson.category}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Content */}
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-line text-foreground leading-relaxed">{lesson.content}</div>
          </div>

          <Separator />

          {/* Key Points */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Key Points</h3>
            </div>
            <ul className="space-y-2">
              {lesson.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-blue-800">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Real World Example */}
          {lesson.realWorldExample && (
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-600">🌍</span>
                <h3 className="font-semibold text-green-900">Real World Example</h3>
              </div>
              <p className="text-green-800 text-sm">{lesson.realWorldExample}</p>
            </Card>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleComplete} className={isCompleted ? "bg-green-600 hover:bg-green-700" : ""}>
              {isCompleted ? "Completed ✓" : "Mark as Complete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
