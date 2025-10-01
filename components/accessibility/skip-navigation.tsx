"use client"

import { Button } from "@/components/ui/button"

export function SkipNavigation() {
  const skipToMain = () => {
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView()
    }
  }

  const skipToNav = () => {
    const navigation = document.getElementById("main-navigation")
    if (navigation) {
      navigation.focus()
      navigation.scrollIntoView()
    }
  }

  return (
    <div className="sr-only focus-within:not-sr-only fixed top-0 left-0 z-50 bg-background border border-border p-2 space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={skipToMain}
        className="focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-transparent"
      >
        Skip to main content
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={skipToNav}
        className="focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-transparent"
      >
        Skip to navigation
      </Button>
    </div>
  )
}
