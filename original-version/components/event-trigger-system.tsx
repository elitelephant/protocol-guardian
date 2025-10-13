"use client"

import { useEffect } from "react"
import { useEventManagement } from "@/hooks/use-event-management"
import type { GameEvent } from "@/lib/event-types"

interface EventTriggerSystemProps {
  gameState: any
  onEventTriggered?: (event: GameEvent) => void
}

export function EventTriggerSystem({ gameState, onEventTriggered }: EventTriggerSystemProps) {
  const { getTriggeredEvents } = useEventManagement()

  useEffect(() => {
    if (!gameState) return

    // Get events that should be triggered based on current game state
    const triggeredEvents = getTriggeredEvents(gameState)

    // Notify parent component of triggered events
    triggeredEvents.forEach((event) => {
      if (onEventTriggered) {
        onEventTriggered(event)
      }
    })

    // Apply event consequences to game state if needed
    triggeredEvents.forEach((event) => {
      if (event.consequences) {
        console.log("[v0] Event triggered with consequences:", event.title, event.consequences)
        // This could be used to automatically apply event effects to game state
        // For now, we just log them for visibility
      }
    })
  }, [gameState, getTriggeredEvents, onEventTriggered])

  // This component doesn't render anything visible
  return null
}
