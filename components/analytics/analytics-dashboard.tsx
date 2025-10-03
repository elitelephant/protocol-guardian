"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { analytics, type GameAnalytics, type AnalyticsEvent } from "@/lib/analytics"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Activity, Users, TrendingUp, AlertTriangle, Clock, RefreshCw } from "lucide-react"

export function AnalyticsDashboard() {
  const [gameAnalytics, setGameAnalytics] = useState<GameAnalytics | null>(null)
  const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = () => {
    setIsLoading(true)
    try {
      const analytics_data = analytics.getGameAnalytics()
      const events = analytics.getEvents().slice(-50) // Last 50 events

      setGameAnalytics(analytics_data)
      setRecentEvents(events)
    } catch (error) {
      console.error("[v0] Failed to load analytics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearAnalytics = () => {
    if (confirm("Are you sure you want to clear all analytics data?")) {
      analytics.clearEvents()
      loadAnalytics()
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <Button variant="outline" disabled>
            <RefreshCw className="h-4 w-4 mr-2" />
            Loading...
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!gameAnalytics) {
    return (
      <Card className="p-8 text-center">
        <div className="space-y-3">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">No Analytics Data</h3>
            <p className="text-muted-foreground">Start using the application to see analytics data</p>
          </div>
        </div>
      </Card>
    )
  }

  const decisionData = Object.entries(gameAnalytics.popularDecisions).map(([decision, count]) => ({
    decision: decision.substring(0, 20) + (decision.length > 20 ? "..." : ""),
    count,
  }))

  const performanceData = [
    { name: "Load Time", value: gameAnalytics.performanceMetrics.averageLoadTime },
    { name: "Slow Renders", value: gameAnalytics.performanceMetrics.slowRenders },
    { name: "Error Rate", value: gameAnalytics.errorRate },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Game performance and user behavior insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadAnalytics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleClearAnalytics}>
            Clear Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Games Started</p>
              <p className="text-2xl font-bold">{gameAnalytics.gameStarted}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {gameAnalytics.gameCompleted} completed
            </Badge>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Decisions</p>
              <p className="text-2xl font-bold">{gameAnalytics.decisionsTotal}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {gameAnalytics.crisisesTriggered} crises handled
            </Badge>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Session</p>
              <p className="text-2xl font-bold">{Math.round(gameAnalytics.averageSessionDuration / 1000 / 60)}m</p>
            </div>
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {gameAnalytics.lessonsCompleted} lessons completed
            </Badge>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Error Rate</p>
              <p className="text-2xl font-bold">{gameAnalytics.errorRate.toFixed(1)}%</p>
            </div>
            <AlertTriangle className={`h-8 w-8 ${gameAnalytics.errorRate > 5 ? "text-destructive" : "text-primary"}`} />
          </div>
          <div className="mt-2">
            <Progress value={Math.min(gameAnalytics.errorRate, 10)} className="h-2" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="decisions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="decisions">Popular Decisions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="events">Recent Events</TabsTrigger>
        </TabsList>

        <TabsContent value="decisions" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Most Popular Decisions</h3>
            {decisionData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={decisionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="decision" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No decision data available yet</div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Load Time</span>
                  <Badge
                    variant={gameAnalytics.performanceMetrics.averageLoadTime > 3000 ? "destructive" : "secondary"}
                  >
                    {gameAnalytics.performanceMetrics.averageLoadTime.toFixed(0)}ms
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Slow Renders</span>
                  <Badge variant={gameAnalytics.performanceMetrics.slowRenders > 10 ? "destructive" : "secondary"}>
                    {gameAnalytics.performanceMetrics.slowRenders}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Memory Samples</span>
                  <Badge variant="secondary">{gameAnalytics.performanceMetrics.memoryUsage.length}</Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {recentEvents.length > 0 ? (
                recentEvents.reverse().map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">{event.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    {event.properties && Object.keys(event.properties).length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {Object.keys(event.properties).length} props
                      </Badge>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">No recent events</div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
