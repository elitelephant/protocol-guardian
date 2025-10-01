"use client"

import { useState, useCallback, useEffect } from "react"
import {
  type GameState,
  type Decision,
  type DecisionOption,
  type Consequence,
  type Crisis,
  initialGameState,
} from "@/lib/game-state"
import { sampleDecisions } from "@/lib/sample-decisions"
import { crisisEvents, getCrisisByYear } from "@/lib/crisis-events"

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [pendingDecisions, setPendingDecisions] = useState<Decision[]>([])
  const [crisisTimeRemaining, setCrisisTimeRemaining] = useState<number | undefined>(undefined)

  // Crisis timer effect
  useEffect(() => {
    if (gameState.currentCrisis?.timeLimit && crisisTimeRemaining === undefined) {
      setCrisisTimeRemaining(gameState.currentCrisis.timeLimit)
    }
  }, [gameState.currentCrisis, crisisTimeRemaining])

  const applyConsequences = useCallback((consequences: Consequence[]) => {
    setGameState((prev) => {
      const newState = { ...prev }

      consequences.forEach((consequence) => {
        switch (consequence.type) {
          case "marketStability":
            newState.marketStability = Math.max(0, Math.min(100, prev.marketStability + consequence.change))
            break
          case "publicConfidence":
            newState.publicConfidence = Math.max(0, Math.min(100, prev.publicConfidence + consequence.change))
            break
          case "techAdvancement":
            newState.techAdvancement = Math.max(0, Math.min(100, prev.techAdvancement + consequence.change))
            break
          case "blocRelationship":
            if (consequence.target) {
              const currentValue = prev.blocRelationships[consequence.target]
              newState.blocRelationships[consequence.target] = Math.max(
                -100,
                Math.min(100, currentValue + consequence.change),
              )
            }
            break
        }
      })

      return newState
    })
  }, [])

  const makeDecision = useCallback(
    (decision: Decision, selectedOption: DecisionOption) => {
      // Apply consequences
      applyConsequences(selectedOption.consequences)

      // Record the decision
      setGameState((prev) => ({
        ...prev,
        decisions: [
          ...prev.decisions,
          {
            ...decision,
            consequences: selectedOption.consequences,
          },
        ],
      }))

      // Remove from pending decisions
      setPendingDecisions((prev) => prev.filter((d) => d.id !== decision.id))
    },
    [applyConsequences],
  )

  const triggerCrisis = useCallback((crisis: Crisis) => {
    setGameState((prev) => ({
      ...prev,
      currentCrisis: crisis,
    }))
    setCrisisTimeRemaining(crisis.timeLimit)

    // Add crisis decisions to pending queue
    setPendingDecisions((prev) => [...prev, ...crisis.decisions])
  }, [])

  const resolveCrisis = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentCrisis: undefined,
    }))
    setCrisisTimeRemaining(undefined)
  }, [])

  const completeLesson = useCallback((lessonId: string) => {
    setGameState((prev) => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId],
    }))
  }, [])

  const addDecisionToQueue = useCallback((decision: Decision) => {
    setPendingDecisions((prev) => [...prev, decision])
  }, [])

  const triggerSampleDecision = useCallback(() => {
    const availableDecisions = sampleDecisions.filter(
      (decision) => !pendingDecisions.some((pending) => pending.id === decision.id),
    )
    if (availableDecisions.length > 0) {
      const randomDecision = availableDecisions[Math.floor(Math.random() * availableDecisions.length)]
      addDecisionToQueue(randomDecision)
    }
  }, [pendingDecisions, addDecisionToQueue])

  const triggerRandomCrisis = useCallback(() => {
    if (!gameState.currentCrisis) {
      const availableCrises = crisisEvents.filter((crisis) => crisis.id !== gameState.currentCrisis?.id)
      if (availableCrises.length > 0) {
        const randomCrisis = availableCrises[Math.floor(Math.random() * availableCrises.length)]
        triggerCrisis(randomCrisis)
      }
    }
  }, [gameState.currentCrisis, triggerCrisis])

  const advanceTime = useCallback(
    (months = 1) => {
      setGameState((prev) => {
        const newMonth = prev.currentMonth + months
        const newYear = prev.currentYear + Math.floor((newMonth - 1) / 12)
        const finalMonth = ((newMonth - 1) % 12) + 1
        const termProgress = Math.min(100, (((newYear - 2035) * 12 + finalMonth - 1) / 60) * 100)

        let gamePhase = prev.gamePhase
        const yearInTerm = newYear - 2035 + 1
        if (yearInTerm <= 1) gamePhase = "year1"
        else if (yearInTerm <= 2) gamePhase = "year2"
        else if (yearInTerm <= 3) gamePhase = "year3"
        else if (yearInTerm <= 4) gamePhase = "year4"
        else if (yearInTerm <= 5) gamePhase = "year5"
        else gamePhase = "ending"

        return {
          ...prev,
          currentYear: newYear,
          currentMonth: finalMonth,
          termProgress,
          gamePhase,
        }
      })

      // Update crisis timer
      if (crisisTimeRemaining !== undefined) {
        const newTimeRemaining = Math.max(0, crisisTimeRemaining - months * 30) // Approximate days
        setCrisisTimeRemaining(newTimeRemaining)

        if (newTimeRemaining <= 0 && gameState.currentCrisis) {
          // Crisis deadline passed - apply negative consequences
          applyConsequences([
            { type: "publicConfidence", change: -20, description: "Failed to respond to crisis in time" },
            { type: "marketStability", change: -15, description: "Market loses confidence in leadership" },
          ])
          resolveCrisis()
        }
      }

      // Check for year-based crises
      const yearCrises = getCrisisByYear(gameState.currentYear + Math.floor((gameState.currentMonth + months - 1) / 12))
      if (yearCrises.length > 0 && !gameState.currentCrisis && Math.random() < 0.3) {
        const crisis = yearCrises[Math.floor(Math.random() * yearCrises.length)]
        triggerCrisis(crisis)
      }

      // Randomly trigger new decisions when advancing time
      if (Math.random() < 0.4) {
        // 40% chance of new decision each month
        triggerSampleDecision()
      }
    },
    [
      crisisTimeRemaining,
      gameState.currentCrisis,
      gameState.currentYear,
      gameState.currentMonth,
      applyConsequences,
      resolveCrisis,
      triggerCrisis,
      triggerSampleDecision,
    ],
  )

  const resetGame = useCallback(() => {
    setGameState(initialGameState)
    setPendingDecisions([])
    setCrisisTimeRemaining(undefined)
  }, [])

  return {
    gameState,
    pendingDecisions,
    crisisTimeRemaining,
    makeDecision,
    advanceTime,
    resetGame,
    applyConsequences,
    addDecisionToQueue,
    triggerSampleDecision,
    triggerRandomCrisis,
    triggerCrisis,
    resolveCrisis,
    completeLesson,
  }
}
