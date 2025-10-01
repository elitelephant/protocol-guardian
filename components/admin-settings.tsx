"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { SampleDataSeeder } from "@/components/sample-data-seeder"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Download, Upload, Trash2, RefreshCw } from "lucide-react"

export function AdminSettings() {
  const handleExportData = () => {
    const data = {
      events: JSON.parse(localStorage.getItem("cre-game-events") || "[]"),
      categories: JSON.parse(localStorage.getItem("cre-game-categories") || "[]"),
      tags: JSON.parse(localStorage.getItem("cre-game-tags") || "[]"),
      analytics: JSON.parse(localStorage.getItem("cre-analytics-events") || "[]"),
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cre-game-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)

        if (data.events) localStorage.setItem("cre-game-events", JSON.stringify(data.events))
        if (data.categories) localStorage.setItem("cre-game-categories", JSON.stringify(data.categories))
        if (data.tags) localStorage.setItem("cre-game-tags", JSON.stringify(data.tags))
        if (data.analytics) localStorage.setItem("cre-analytics-events", JSON.stringify(data.analytics))

        alert("Data imported successfully! Please refresh the page.")
      } catch (error) {
        alert("Error importing data. Please check the file format.")
      }
    }
    reader.readAsText(file)
  }

  const handleClearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.removeItem("cre-game-events")
      localStorage.removeItem("cre-game-categories")
      localStorage.removeItem("cre-game-tags")
      localStorage.removeItem("cre-analytics-events")
      localStorage.removeItem("cre-analytics-session")
      alert("All data cleared! Please refresh the page.")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-muted-foreground">Configure system preferences and manage data</p>
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <SampleDataSeeder />

          {/* Data Management */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Data Management</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Export Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Download all events, categories, tags, and analytics as a backup file
                  </p>
                </div>
                <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Import Data</Label>
                  <p className="text-sm text-muted-foreground">Restore data from a previously exported backup file</p>
                </div>
                <div>
                  <Input type="file" accept=".json" onChange={handleImportData} className="hidden" id="import-file" />
                  <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Label htmlFor="import-file" className="cursor-pointer">
                      <Upload className="h-4 w-4" />
                      Import
                    </Label>
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium text-destructive">Clear All Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete all events, categories, tags, and analytics
                  </p>
                </div>
                <Button onClick={handleClearAllData} variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </div>
          </Card>

          {/* System Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">System Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Storage Type:</span>
                  <Badge variant="outline">Local Storage</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Data Persistence:</span>
                  <Badge variant="outline">Browser Only</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Auto-Save:</span>
                  <Badge variant="outline">Enabled</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Analytics:</span>
                  <Badge variant="outline" className="text-green-600">
                    Enabled
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Version:</span>
                  <Badge variant="outline">1.0.0</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Last Updated:</span>
                  <Badge variant="outline">Today</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant="outline" className="text-green-600">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Performance:</span>
                  <Badge variant="outline" className="text-blue-600">
                    Optimized
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Performance Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Performance Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Auto-refresh Events</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically refresh event list when changes are made
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Show Event Previews</Label>
                  <p className="text-sm text-muted-foreground">
                    Display event content previews in the management interface
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Enable Analytics</Label>
                  <p className="text-sm text-muted-foreground">Track event usage and performance metrics</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Performance Monitoring</Label>
                  <p className="text-sm text-muted-foreground">Monitor component render times and memory usage</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
