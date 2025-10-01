"use client"

import { useCallback } from "react"
import { analytics, trackGameEvent, trackUserAction, trackPerformance } from "@/lib/analytics"

export function useAnalytics() {
  const track = useCallback((eventName: string, properties?: Record<string, any>) => {
    analytics.track(eventName, properties)
  }, [])

  const trackGame = useCallback((eventName: string, properties?: Record<string, any>) => {
    trackGameEvent(eventName, properties)
  }, [])

  const trackUser = useCallback((action: string, properties?: Record<string, any>) => {
    trackUserAction(action, properties)
  }, [])

  const trackComponentPerformance = useCallback((componentName: string, renderTime: number) => {
    trackPerformance(componentName, renderTime)
  }, [])

  return {
    track,
    trackGame,
    trackUser,
    trackComponentPerformance,
    analytics,
  }
}

export function useGameAnalytics() {
  const { trackGame } = useAnalytics()

  const trackGameStart = useCallback(() => {
    trackGame("started", { timestamp: Date.now() })
  }, [trackGame])

  const trackGameEnd = useCallback(
    (reason: "completed" | "abandoned", duration: number) => {
      trackGame(reason, { duration, timestamp: Date.now() })
    },
    [trackGame],
  )

  const trackDecision = useCallback(
    (decisionId: string, optionSelected: string, consequences?: any) => {
      trackGame("decision_made", {
        decisionId,
        optionSelected,
        consequences,
        timestamp: Date.now(),
      })
    },
    [trackGame],
  )

  const trackCrisis = useCallback(
    (crisisId: string, action: "triggered" | "resolved", duration?: number) => {
      trackGame(`crisis_${action}`, {
        crisisId,
        duration,
        timestamp: Date.now(),
      })
    },
    [trackGame],
  )

  const trackLesson = useCallback(
    (lessonId: string, action: "started" | "completed", duration?: number) => {
      trackGame(`lesson_${action}`, {
        lessonId,
        duration,
        timestamp: Date.now(),
      })
    },
    [trackGame],
  )

  const trackIndicatorChange = useCallback(
    (indicator: string, oldValue: number, newValue: number) => {
      trackGame("indicator_changed", {
        indicator,
        oldValue,
        newValue,
        change: newValue - oldValue,
        timestamp: Date.now(),
      })
    },
    [trackGame],
  )

  return {
    trackGameStart,
    trackGameEnd,
    trackDecision,
    trackCrisis,
    trackLesson,
    trackIndicatorChange,
  }
}
