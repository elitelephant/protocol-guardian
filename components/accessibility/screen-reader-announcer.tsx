"use client"

import React from "react"

interface AnnouncementProps {
  message: string
  priority?: "polite" | "assertive"
  delay?: number
}

export function ScreenReaderAnnouncer() {
  const [announcements, setAnnouncements] = React.useState<AnnouncementProps[]>([])

  const announce = React.useCallback((message: string, priority: "polite" | "assertive" = "polite", delay = 0) => {
    const announcement = { message, priority, delay }

    if (delay > 0) {
      setTimeout(() => {
        setAnnouncements((prev) => [...prev, announcement])
      }, delay)
    } else {
      setAnnouncements((prev) => [...prev, announcement])
    }

    // Clear announcement after it's been read
    setTimeout(() => {
      setAnnouncements((prev) => prev.filter((a) => a !== announcement))
    }, delay + 1000)
  }, [])

  // Expose announce function globally
  React.useEffect(() => {
    ;(window as any).announceToScreenReader = announce
  }, [announce])

  return (
    <>
      {announcements.map((announcement, index) => (
        <div key={index} className="sr-only" aria-live={announcement.priority} aria-atomic="true">
          {announcement.message}
        </div>
      ))}
    </>
  )
}

// Hook for components to use announcements
export function useScreenReaderAnnouncement() {
  const announce = React.useCallback((message: string, priority: "polite" | "assertive" = "polite", delay = 0) => {
    if (typeof window !== "undefined" && (window as any).announceToScreenReader) {
      ;(window as any).announceToScreenReader(message, priority, delay)
    }
  }, [])

  return { announce }
}
