"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Settings, Palette, Volume2, Zap, Eye } from "lucide-react"

interface UserPreferences {
  theme: "light" | "dark" | "auto"
  reducedMotion: boolean
  highContrast: boolean
  fontSize: number
  soundEnabled: boolean
  soundVolume: number
  autoSave: boolean
  notifications: boolean
  animationSpeed: number
  compactMode: boolean
}

const defaultPreferences: UserPreferences = {
  theme: "auto",
  reducedMotion: false,
  highContrast: false,
  fontSize: 16,
  soundEnabled: true,
  soundVolume: 50,
  autoSave: true,
  notifications: true,
  animationSpeed: 1,
  compactMode: false,
}

export default function UserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem("user-preferences")
    if (saved) {
      try {
        setPreferences({ ...defaultPreferences, ...JSON.parse(saved) })
      } catch (error) {
        console.error("Failed to load user preferences:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Apply preferences to document
    const root = document.documentElement

    // Apply theme
    if (preferences.theme === "dark") {
      root.classList.add("dark")
    } else if (preferences.theme === "light") {
      root.classList.remove("dark")
    }

    // Apply font size
    root.style.fontSize = `${preferences.fontSize}px`

    // Apply reduced motion
    if (preferences.reducedMotion) {
      root.classList.add("reduce-motion")
    } else {
      root.classList.remove("reduce-motion")
    }

    // Apply high contrast
    if (preferences.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    // Apply compact mode
    if (preferences.compactMode) {
      root.classList.add("compact-mode")
    } else {
      root.classList.remove("compact-mode")
    }

    // Apply animation speed
    root.style.setProperty("--animation-speed", preferences.animationSpeed.toString())

    // Save to localStorage
    localStorage.setItem("user-preferences", JSON.stringify(preferences))
  }, [preferences])

  const updatePreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const resetPreferences = () => {
    setPreferences(defaultPreferences)
  }

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 shadow-lg"
        aria-label="Open user preferences"
      >
        <Settings className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            User Preferences
          </CardTitle>
          <CardDescription>Customize your experience with accessibility and usability options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <Label className="text-sm font-medium">Appearance</Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={preferences.theme}
                  onValueChange={(value: "light" | "dark" | "auto") => updatePreference("theme", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size: {preferences.fontSize}px</Label>
                <Slider
                  value={[preferences.fontSize]}
                  onValueChange={([value]) => updatePreference("fontSize", value)}
                  min={12}
                  max={24}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Accessibility Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <Label className="text-sm font-medium">Accessibility</Label>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="reducedMotion">Reduce Motion</Label>
                <Switch
                  id="reducedMotion"
                  checked={preferences.reducedMotion}
                  onCheckedChange={(checked) => updatePreference("reducedMotion", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="highContrast">High Contrast</Label>
                <Switch
                  id="highContrast"
                  checked={preferences.highContrast}
                  onCheckedChange={(checked) => updatePreference("highContrast", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="compactMode">Compact Mode</Label>
                <Switch
                  id="compactMode"
                  checked={preferences.compactMode}
                  onCheckedChange={(checked) => updatePreference("compactMode", checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Audio Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <Label className="text-sm font-medium">Audio</Label>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="soundEnabled">Sound Effects</Label>
                <Switch
                  id="soundEnabled"
                  checked={preferences.soundEnabled}
                  onCheckedChange={(checked) => updatePreference("soundEnabled", checked)}
                />
              </div>
              {preferences.soundEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="soundVolume">Volume: {preferences.soundVolume}%</Label>
                  <Slider
                    value={[preferences.soundVolume]}
                    onValueChange={([value]) => updatePreference("soundVolume", value)}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Performance Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <Label className="text-sm font-medium">Performance</Label>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoSave">Auto Save</Label>
                <Switch
                  id="autoSave"
                  checked={preferences.autoSave}
                  onCheckedChange={(checked) => updatePreference("autoSave", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notifications</Label>
                <Switch
                  id="notifications"
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => updatePreference("notifications", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="animationSpeed">Animation Speed: {preferences.animationSpeed}x</Label>
                <Slider
                  value={[preferences.animationSpeed]}
                  onValueChange={([value]) => updatePreference("animationSpeed", value)}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={resetPreferences}>
              Reset to Defaults
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save & Close</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
