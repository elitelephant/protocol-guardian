"use client"

import { useState } from "react"
import type { GameState } from "@/lib/game-state"
import type { EducationalLesson } from "@/lib/educational-content"
import { educationalLessons, getLessonsByCategory } from "@/lib/educational-content"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, CheckCircle } from "lucide-react"

interface EducationalSidebarProps {
  gameState: GameState
  onLessonComplete: (lessonId: string) => void
  onSelectLesson: (lesson: EducationalLesson) => void
}

export function EducationalSidebar({ gameState, onLessonComplete, onSelectLesson }: EducationalSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("blockchain")

  const categories = [
    { id: "blockchain", label: "Bitcoin Tech", icon: "₿" },
    { id: "regulation", label: "Protocol Governance", icon: "🏛️" },
    { id: "economics", label: "Bitcoin Economics", icon: "📊" },
    { id: "security", label: "Network Security", icon: "🔒" },
    { id: "governance", label: "Layer 2 Solutions", icon: "📚" },
  ]

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

  const isLessonCompleted = (lessonId: string) => {
    return gameState.completedLessons.includes(lessonId)
  }

  const getProgressStats = () => {
    const total = educationalLessons.length
    const completed = gameState.completedLessons.length
    return { completed, total, percentage: Math.round((completed / total) * 100) }
  }

  const progress = getProgressStats()

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Learning Center
        </h2>
        <Badge variant="outline">
          {progress.completed}/{progress.total} ({progress.percentage}%)
        </Badge>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="blockchain">Bitcoin</TabsTrigger>
          <TabsTrigger value="regulation">Stacks</TabsTrigger>
        </TabsList>

        <TabsContent value="blockchain" className="space-y-3">
          {getLessonsByCategory("blockchain").map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={isLessonCompleted(lesson.id)}
              onSelect={() => onSelectLesson(lesson)}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
          {getLessonsByCategory("security").map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={isLessonCompleted(lesson.id)}
              onSelect={() => onSelectLesson(lesson)}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </TabsContent>

        <TabsContent value="regulation" className="space-y-3">
          {getLessonsByCategory("governance").map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={isLessonCompleted(lesson.id)}
              onSelect={() => onSelectLesson(lesson)}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
          {getLessonsByCategory("regulation").map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={isLessonCompleted(lesson.id)}
              onSelect={() => onSelectLesson(lesson)}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
          {getLessonsByCategory("economics").map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={isLessonCompleted(lesson.id)}
              onSelect={() => onSelectLesson(lesson)}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  )
}

interface LessonCardProps {
  lesson: EducationalLesson
  isCompleted: boolean
  onSelect: () => void
  getDifficultyColor: (difficulty: string) => string
}

function LessonCard({ lesson, isCompleted, onSelect, getDifficultyColor }: LessonCardProps) {
  return (
    <Card className={`p-3 cursor-pointer transition-all hover:border-primary/50 ${isCompleted ? "bg-green-50" : ""}`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-sm">{lesson.title}</h3>
        {isCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Badge className={`${getDifficultyColor(lesson.difficulty)} text-xs`}>{lesson.difficulty}</Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {lesson.estimatedReadTime}m
        </div>
      </div>

      <Button size="sm" variant="outline" onClick={onSelect} className="w-full text-xs bg-transparent">
        {isCompleted ? "Review" : "Learn"}
      </Button>
    </Card>
  )
}
