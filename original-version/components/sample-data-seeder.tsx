"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEventManagement } from "@/hooks/use-event-management"
import { Database, Download, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"

export function SampleDataSeeder() {
  const [isSeeding, setIsSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState<any>(null)
  const { events, categories, tags } = useEventManagement()

  const handleSeedSampleData = async () => {
    setIsSeeding(true)
    setSeedResult(null)

    try {
      // Import and execute the seeding script
      const { seedSampleEvents } = await import("../scripts/seed-sample-events.js")
      const result = await seedSampleEvents()
      setSeedResult(result)

      // Refresh the page to show new data
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      setSeedResult({
        success: false,
        error: error.message,
      })
    } finally {
      setIsSeeding(false)
    }
  }

  const sampleEventCategories = [
    "Network Security Events",
    "Protocol Development",
    "Technology Breakthroughs",
    "Market Adoption Events",
    "Security Incidents",
    "Institutional Adoption",
  ]

  const sampleEventTypes = [
    "Mining pool centralization alerts",
    "Protocol upgrade announcements",
    "DeFi protocol deployments on Stacks",
    "Layer 2 scaling breakthroughs",
    "Institutional Bitcoin adoption",
    "Smart contract security audits",
    "Cross-chain interoperability developments",
    "Community governance proposals",
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Database className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Sample Event Data</h3>
          <p className="text-sm text-muted-foreground">
            Populate your system with realistic cryptocurrency regulation events
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">{events.length}</div>
            <div className="text-xs text-muted-foreground">Current Events</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-chart-2">{categories.length}</div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-chart-3">{tags.length}</div>
            <div className="text-xs text-muted-foreground">Tags</div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-2">Sample Data Includes:</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Event Categories:</p>
              <div className="flex flex-wrap gap-1">
                {sampleEventCategories.map((category, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Event Types:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {sampleEventTypes.map((type, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {seedResult && (
          <div
            className={`p-3 rounded-lg border ${seedResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              {seedResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <span className={`font-medium ${seedResult.success ? "text-green-800" : "text-red-800"}`}>
                {seedResult.success ? "Sample Data Seeded Successfully!" : "Seeding Failed"}
              </span>
            </div>
            {seedResult.success ? (
              <p className="text-sm text-green-700">
                Added {seedResult.seeded} new events. Total events: {seedResult.total}
                <br />
                <span className="text-xs">Page will refresh automatically to show new data...</span>
              </p>
            ) : (
              <p className="text-sm text-red-700">Error: {seedResult.error}</p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={handleSeedSampleData} disabled={isSeeding} className="flex items-center gap-2">
            {isSeeding ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {isSeeding ? "Seeding Data..." : "Seed Sample Events"}
          </Button>

          <Button variant="outline" asChild>
            <a href="/admin" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Manage Events
            </a>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <strong>Note:</strong> Sample events include realistic scenarios based on current cryptocurrency and
          regulatory trends. Events will be triggered based on game state conditions and can be customized through the
          admin interface.
        </div>
      </div>
    </Card>
  )
}
