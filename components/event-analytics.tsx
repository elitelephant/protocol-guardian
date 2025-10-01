"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Calendar, Tag, Users, Activity } from "lucide-react"
import type { GameEvent, EventCategory, EventTag } from "@/lib/event-types"

interface EventAnalyticsProps {
  events: GameEvent[]
  categories: EventCategory[]
  tags: EventTag[]
}

export function EventAnalytics({ events, categories, tags }: EventAnalyticsProps) {
  // Calculate analytics data
  const totalEvents = events.length
  const publishedEvents = events.filter((e) => e.status === "published").length
  const draftEvents = events.filter((e) => e.status === "draft").length
  const archivedEvents = events.filter((e) => e.status === "archived").length

  const priorityStats = {
    critical: events.filter((e) => e.priority === "critical").length,
    high: events.filter((e) => e.priority === "high").length,
    medium: events.filter((e) => e.priority === "medium").length,
    low: events.filter((e) => e.priority === "low").length,
  }

  const categoryStats = categories.map((category) => ({
    ...category,
    count: events.filter((e) => e.category.id === category.id).length,
  }))

  const tagStats = tags
    .map((tag) => ({
      ...tag,
      count: events.filter((e) => e.tags.some((t) => t.id === tag.id)).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 tags

  const recentActivity = events
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "text-green-600"
      case "draft":
        return "text-yellow-600"
      case "archived":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-600"
      case "high":
        return "text-orange-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Event Analytics</h2>
        <p className="text-muted-foreground">Insights and statistics about your event management</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Events</p>
              <p className="text-2xl font-bold">{totalEvents}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-2xl font-bold text-green-600">{publishedEvents}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Activity className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Draft</p>
              <p className="text-2xl font-bold text-yellow-600">{draftEvents}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Archived</p>
              <p className="text-2xl font-bold text-gray-600">{archivedEvents}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Priority Distribution</h3>
          </div>

          <div className="space-y-4">
            {Object.entries(priorityStats).map(([priority, count]) => (
              <div key={priority} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`capitalize font-medium ${getPriorityColor(priority)}`}>{priority}</span>
                  <span className="text-sm text-muted-foreground">
                    {count} ({totalEvents > 0 ? Math.round((count / totalEvents) * 100) : 0}%)
                  </span>
                </div>
                <Progress value={totalEvents > 0 ? (count / totalEvents) * 100 : 0} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Category Distribution</h3>
          </div>

          <div className="space-y-3">
            {categoryStats.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <Badge variant="outline">{category.count}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Tags */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Most Used Tags</h3>
          </div>

          <div className="space-y-3">
            {tagStats.slice(0, 8).map((tag) => (
              <div key={tag.id} className="flex items-center justify-between">
                <Badge style={{ backgroundColor: tag.color, color: "white" }}>{tag.name}</Badge>
                <span className="text-sm text-muted-foreground">{tag.count} events</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>

          <div className="space-y-3">
            {recentActivity.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: event.category.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{event.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
