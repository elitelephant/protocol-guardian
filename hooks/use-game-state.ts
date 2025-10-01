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
          case "networkHealth":
            newState.networkHealth = Math.max(0, Math.min(100, prev.networkHealth + consequence.change))
            break
          case "publicConfidence":
            newState.publicConfidence = Math.max(0, Math.min(100, prev.publicConfidence + consequence.change))
            break
          case "techAdvancement":
            newState.techAdvancement = Math.max(0, Math.min(100, prev.techAdvancement + consequence.change))
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

  const resolveCrisis = useCallback((crisisId?: string) => {
    setGameState((prev) => ({
      ...prev,
      currentCrisis: undefined,
      unresolvedCrises: prev.unresolvedCrises.filter(uc => uc.crisisId !== (crisisId || prev.currentCrisis?.id)),
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
        if (yearInTerm <= 1) gamePhase = "era1"
        else if (yearInTerm <= 2) gamePhase = "era2"
        else if (yearInTerm <= 3) gamePhase = "era3"
        else if (yearInTerm <= 4) gamePhase = "era4"
        else if (yearInTerm <= 5) gamePhase = "era5"
        else gamePhase = "ending"

        // Check for era transition and apply unresolved crisis penalties
        const currentEra = parseInt(prev.gamePhase.replace('era', '')) || 0
        const newEra = parseInt(gamePhase.replace('era', '')) || 0
        let newUnresolvedCrises = [...prev.unresolvedCrises]
        let penaltyConsequences: Consequence[] = []

        if (newEra > currentEra && newEra <= 5) {
          // Era transition - apply degradation for unresolved crises
          newUnresolvedCrises = prev.unresolvedCrises.map(uc => {
            const updatedEras = uc.erasUnresolved + 1
            // Find the crisis to get penalty info
            const crisis = crisisEvents.find(c => c.id === uc.crisisId)
            if (crisis?.unresolvedPenalty) {
              const penaltyChange = crisis.unresolvedPenalty.change * updatedEras // Compounding penalty
              penaltyConsequences.push({
                type: crisis.unresolvedPenalty.type,
                change: penaltyChange,
                description: `Unresolved crisis penalty after ${updatedEras} eras`
              })
            }
            return { ...uc, erasUnresolved: updatedEras }
          })
        }

        // Apply penalty consequences
        let newNetworkHealth = prev.networkHealth
        let newPublicConfidence = prev.publicConfidence
        let newTechAdvancement = prev.techAdvancement

        penaltyConsequences.forEach(consequence => {
          switch (consequence.type) {
            case "networkHealth":
              newNetworkHealth = Math.max(0, Math.min(100, newNetworkHealth + consequence.change))
              break
            case "publicConfidence":
              newPublicConfidence = Math.max(0, Math.min(100, newPublicConfidence + consequence.change))
              break
            case "techAdvancement":
              newTechAdvancement = Math.max(0, Math.min(100, newTechAdvancement + consequence.change))
              break
          }
        })

        // Early termination checks
        if (newNetworkHealth <= 20 || newPublicConfidence <= 15) {
          gamePhase = "ending"
        }

        return {
          ...prev,
          currentYear: newYear,
          currentMonth: finalMonth,
          termProgress,
          gamePhase,
          networkHealth: newNetworkHealth,
          publicConfidence: newPublicConfidence,
          techAdvancement: newTechAdvancement,
          unresolvedCrises: newUnresolvedCrises,
        }
      })

      // Update crisis timer
      if (crisisTimeRemaining !== undefined) {
        const newTimeRemaining = Math.max(0, crisisTimeRemaining - months * 30) // Approximate days
        setCrisisTimeRemaining(newTimeRemaining)

        if (newTimeRemaining <= 0 && gameState.currentCrisis) {
          // Crisis deadline passed - add to unresolved crises
          setGameState(prev => ({
            ...prev,
            unresolvedCrises: [...prev.unresolvedCrises, { crisisId: prev.currentCrisis!.id, erasUnresolved: 0 }],
            currentCrisis: undefined,
          }))
          setCrisisTimeRemaining(undefined)
        }
      }

      // Check for era-based crises
      const currentEra = parseInt(gameState.gamePhase.replace('era', '')) || 0
      if (currentEra >= 1 && currentEra <= 5 && !gameState.currentCrisis) {
        const eraCrises = crisisEvents.filter(crisis => crisis.era === currentEra)
        if (eraCrises.length > 0 && Math.random() < 0.3) {
          const crisis = eraCrises[Math.floor(Math.random() * eraCrises.length)]
          triggerCrisis(crisis)
        }
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
      gameState.gamePhase,
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
