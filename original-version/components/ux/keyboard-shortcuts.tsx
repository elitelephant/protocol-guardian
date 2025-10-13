"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Keyboard, X } from "lucide-react"

interface Shortcut {
  keys: string[]
  description: string
  category: string
}

const shortcuts: Shortcut[] = [
  // Navigation
  { keys: ["?"], description: "Show keyboard shortcuts", category: "Navigation" },
  { keys: ["Escape"], description: "Close modal/dialog", category: "Navigation" },
  { keys: ["Tab"], description: "Navigate forward", category: "Navigation" },
  { keys: ["Shift", "Tab"], description: "Navigate backward", category: "Navigation" },
  { keys: ["Enter"], description: "Activate focused element", category: "Navigation" },
  { keys: ["Space"], description: "Select/toggle focused element", category: "Navigation" },

  // Game Actions
  { keys: ["1"], description: "Select first decision option", category: "Game Actions" },
  { keys: ["2"], description: "Select second decision option", category: "Game Actions" },
  { keys: ["3"], description: "Select third decision option", category: "Game Actions" },
  { keys: ["r"], description: "Reset current scenario", category: "Game Actions" },
  { keys: ["n"], description: "Next scenario", category: "Game Actions" },
  { keys: ["p"], description: "Previous scenario", category: "Game Actions" },

  // Interface
  { keys: ["s"], description: "Toggle sidebar", category: "Interface" },
  { keys: ["f"], description: "Toggle fullscreen", category: "Interface" },
  { keys: ["m"], description: "Toggle mute", category: "Interface" },
  { keys: ["Ctrl", "s"], description: "Save progress", category: "Interface" },
  { keys: ["Ctrl", "z"], description: "Undo last action", category: "Interface" },

  // Admin (when in admin mode)
  { keys: ["a"], description: "Open admin panel", category: "Admin" },
  { keys: ["e"], description: "Edit current event", category: "Admin" },
  { keys: ["d"], description: "Delete selected item", category: "Admin" },
  { keys: ["Ctrl", "n"], description: "Create new item", category: "Admin" },
]

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show shortcuts with '?' key
      if (event.key === "?" && !event.ctrlKey && !event.altKey && !event.metaKey) {
        event.preventDefault()
        setIsOpen(true)
        return
      }

      // Close with Escape
      if (event.key === "Escape" && isOpen) {
        event.preventDefault()
        setIsOpen(false)
        return
      }

      // Don't handle shortcuts when typing in inputs
      const target = event.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true") {
        return
      }

      // Handle other shortcuts
      const key = event.key.toLowerCase()
      const hasCtrl = event.ctrlKey || event.metaKey
      const hasShift = event.shiftKey

      // Game action shortcuts
      if (["1", "2", "3"].includes(key)) {
        event.preventDefault()
        const buttons = document.querySelectorAll("[data-decision-option]")
        const index = Number.parseInt(key) - 1
        if (buttons[index]) {
          ;(buttons[index] as HTMLElement).click()
        }
      }

      // Interface shortcuts
      if (key === "s" && !hasCtrl) {
        event.preventDefault()
        const sidebarToggle = document.querySelector("[data-sidebar-toggle]") as HTMLElement
        sidebarToggle?.click()
      }

      if (key === "f") {
        event.preventDefault()
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.documentElement.requestFullscreen()
        }
      }

      if (key === "m") {
        event.preventDefault()
        // Toggle mute functionality would go here
        console.log("[v0] Mute toggled")
      }

      // Save with Ctrl+S
      if (key === "s" && hasCtrl) {
        event.preventDefault()
        // Trigger save functionality
        const saveEvent = new CustomEvent("game-save")
        window.dispatchEvent(saveEvent)
      }

      // Admin shortcuts
      if (key === "a" && !hasCtrl) {
        event.preventDefault()
        window.location.href = "/admin"
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  const groupedShortcuts = shortcuts.reduce(
    (acc, shortcut) => {
      if (!acc[shortcut.category]) {
        acc[shortcut.category] = []
      }
      acc[shortcut.category].push(shortcut)
      return acc
    },
    {} as Record<string, Shortcut[]>,
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              <CardTitle>Keyboard Shortcuts</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} aria-label="Close shortcuts">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Use these keyboard shortcuts to navigate and interact more efficiently</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{category}</h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <div key={keyIndex} className="flex items-center gap-1">
                          <Badge variant="outline" className="font-mono text-xs px-2 py-1">
                            {key}
                          </Badge>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-xs text-muted-foreground">+</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {category !== Object.keys(groupedShortcuts)[Object.keys(groupedShortcuts).length - 1] && <Separator />}
            </div>
          ))}

          <div className="pt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Press{" "}
              <Badge variant="outline" className="font-mono text-xs">
                ?
              </Badge>{" "}
              anytime to show this dialog
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
