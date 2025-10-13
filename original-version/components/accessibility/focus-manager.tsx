"use client"

import React from "react"

interface FocusManagerProps {
  children: React.ReactNode
  restoreFocus?: boolean
  autoFocus?: boolean
}

export function FocusManager({ children, restoreFocus = true, autoFocus = false }: FocusManagerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const previousActiveElement = React.useRef<Element | null>(null)

  React.useEffect(() => {
    if (restoreFocus) {
      previousActiveElement.current = document.activeElement
    }

    if (autoFocus && containerRef.current) {
      const firstFocusable = containerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) as HTMLElement

      if (firstFocusable) {
        firstFocusable.focus()
      }
    }

    return () => {
      if (restoreFocus && previousActiveElement.current) {
        ;(previousActiveElement.current as HTMLElement).focus?.()
      }
    }
  }, [restoreFocus, autoFocus])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab" && containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  return (
    <div ref={containerRef} onKeyDown={handleKeyDown}>
      {children}
    </div>
  )
}
