"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useVirtualList } from "@/hooks/use-virtual-list"
import { usePerformanceMonitor } from "@/hooks/use-performance-monitor"
import type { GameEvent } from "@/lib/event-types"
import { Edit, Trash2, Archive, Upload } from "lucide-react"

interface OptimizedEventsListProps {
  events: GameEvent[]
  onEdit: (event: GameEvent) => void
  onDelete: (id: string) => void
  onPublish: (id: string) => void
  onArchive: (id: string) => void
}

const ITEM_HEIGHT = 120
const CONTAINER_HEIGHT = 600

// Memoized event item component
const EventItem = React.memo(
  ({
    event,
    onEdit,
    onDelete,
    onPublish,
    onArchive,
  }: {
    event: GameEvent
    onEdit: (event: GameEvent) => void
    onDelete: (id: string) => void
    onPublish: (id: string) => void
    onArchive: (id: string) => void
  }) => {
    usePerformanceMonitor("EventItem", { eventId: event.id })

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "critical":
          return "bg-red-500"
        case "high":
          return "bg-orange-500"
        case "medium":
          return "bg-yellow-500"
        case "low":
          return "bg-green-500"
        default:
          return "bg-gray-500"
      }
    }

    return (
      <Card className="p-4 hover:shadow-md transition-shadow" style={{ height: ITEM_HEIGHT }}>
        <div className="flex items-start justify-between h-full">
          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-3">
              <div className={`w-1 h-16 rounded-full ${getPriorityColor(event.priority)}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm truncate">{event.title}</h3>
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: event.category.color + "20",
                      color: event.category.color,
                    }}
                    className="text-xs"
                  >
                    {event.category.name}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>By {event.author}</span>
                  <span>•</span>
                  <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 ml-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(event)}>
              <Edit className="h-3 w-3" />
            </Button>

            {event.status === "draft" && (
              <Button variant="ghost" size="sm" onClick={() => onPublish(event.id)}>
                <Upload className="h-3 w-3" />
              </Button>
            )}

            {event.status === "published" && (
              <Button variant="ghost" size="sm" onClick={() => onArchive(event.id)}>
                <Archive className="h-3 w-3" />
              </Button>
            )}

            <Button variant="ghost" size="sm" onClick={() => onDelete(event.id)}>
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          </div>
        </div>
      </Card>
    )
  },
)

EventItem.displayName = "EventItem"

export function OptimizedEventsList({ events, onEdit, onDelete, onPublish, onArchive }: OptimizedEventsListProps) {
  usePerformanceMonitor("OptimizedEventsList", { eventCount: events.length })

  const { visibleItems, totalHeight, offsetY, handleScroll } = useVirtualList(events, {
    itemHeight: ITEM_HEIGHT,
    containerHeight: CONTAINER_HEIGHT,
    overscan: 3,
  })

  if (events.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">No events found</h3>
            <p className="text-muted-foreground">Create your first event to get started</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="overflow-auto border rounded-lg" style={{ height: CONTAINER_HEIGHT }} onScroll={handleScroll}>
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <div className="space-y-2 p-2">
            {visibleItems.map(({ item: event, index }) => (
              <EventItem
                key={event.id}
                event={event}
                onEdit={onEdit}
                onDelete={onDelete}
                onPublish={onPublish}
                onArchive={onArchive}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
