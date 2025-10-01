"use client"

import { useState, useEffect } from "react"
import { useEventManagement } from "@/hooks/use-event-management"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { EventSearchFilters } from "@/components/event-search-filters"
import {
  Calendar,
  AlertTriangle,
  TrendingUp,
  Globe,
  Clock,
  ExternalLink,
  Filter,
  Settings,
  Zap,
  Shield,
  Building,
  Scale,
  TrendingDown,
} from "lucide-react"
import type { GameEvent, EventFilter } from "@/lib/event-types"

interface DynamicEventsFeedProps {
  gameState: any
}

export function DynamicEventsFeed({ gameState }: DynamicEventsFeedProps) {
  const { events, categories, tags, getTriggeredEvents, filterEvents, isLoading } = useEventManagement()
  const [selectedEvent, setSelectedEvent] = useState<GameEvent | null>(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [displayedEvents, setDisplayedEvents] = useState<GameEvent[]>([])
  const [filter, setFilter] = useState<EventFilter>({})
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Get events that should be displayed based on current game state
  useEffect(() => {
    if (!isLoading && gameState) {
      const triggeredEvents = getTriggeredEvents(gameState)
      // Apply additional filters if any are set
      const filteredTriggeredEvents =
        Object.keys(filter).length > 0
          ? filterEvents(filter).filter((event) => triggeredEvents.some((te) => te.id === event.id))
          : triggeredEvents

      // Show most recent events first, limit to 10 for performance
      const sortedEvents = filteredTriggeredEvents
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10)
      setDisplayedEvents(sortedEvents)
    }
  }, [gameState, events, getTriggeredEvents, filterEvents, filter, isLoading])

  const getCategoryIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      TrendingDown,
      Scale,
      Zap,
      Globe,
      Shield,
      Building,
      AlertTriangle,
      Calendar,
      Settings,
      TrendingUp,
    }
    return iconMap[iconName] || Calendar
  }

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "critical":
        return {
          badge: (
            <Badge variant="destructive" className="text-xs">
              Critical
            </Badge>
          ),
          color: "text-red-600",
        }
      case "high":
        return {
          badge: (
            <Badge variant="destructive" className="text-xs">
              High
            </Badge>
          ),
          color: "text-orange-600",
        }
      case "medium":
        return {
          badge: (
            <Badge variant="secondary" className="text-xs">
              Medium
            </Badge>
          ),
          color: "text-yellow-600",
        }
      case "low":
        return {
          badge: (
            <Badge variant="outline" className="text-xs">
              Low
            </Badge>
          ),
          color: "text-green-600",
        }
      default:
        return {
          badge: (
            <Badge variant="outline" className="text-xs">
              Info
            </Badge>
          ),
          color: "text-gray-600",
        }
    }
  }

  const handleEventClick = (event: GameEvent) => {
    setSelectedEvent(event)
    setIsEventModalOpen(true)
  }

  const handleClearFilters = () => {
    setFilter({})
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filter.search?.trim()) count++
    if (filter.categories?.length) count++
    if (filter.tags?.length) count++
    if (filter.priority?.length) count++
    if (filter.status?.length) count++
    if (filter.dateRange) count++
    return count
  }

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <div className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <h2 className="text-lg font-semibold">Dynamic Events</h2>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Calendar className="h-8 w-8 text-muted-foreground mx-auto animate-pulse" />
            <p className="text-sm text-muted-foreground">Loading events...</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <TooltipProvider>
      <Card className="h-full flex flex-col">
        <div className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Dynamic Events</h2>
            </div>
            <div className="flex items-center gap-2">
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    {getActiveFilterCount() > 0 && (
                      <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                        {getActiveFilterCount()}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4">
                    <EventSearchFilters
                      filter={filter}
                      onFilterChange={setFilter}
                      categories={categories}
                      tags={tags}
                      onClearFilters={handleClearFilters}
                      resultCount={displayedEvents.length}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Badge variant="outline" className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live
              </Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Events triggered by current game conditions • {displayedEvents.length} active
          </p>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {displayedEvents.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold">No Active Events</h3>
                  <p className="text-muted-foreground text-sm">
                    {getActiveFilterCount() > 0
                      ? "No events match your current filters"
                      : "Events will appear here based on your decisions and game progress"}
                  </p>
                </div>
              </div>
            ) : (
              displayedEvents.map((event, index) => {
                const CategoryIcon = getCategoryIcon(event.category.icon)
                const priorityConfig = getPriorityConfig(event.priority)

                return (
                  <div key={event.id}>
                    <article
                      className="group space-y-3 p-4 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="p-1.5 rounded" style={{ backgroundColor: event.category.color + "20" }}>
                            <CategoryIcon className="h-3 w-3" style={{ color: event.category.color }} />
                          </div>
                          {priorityConfig.badge}
                          <Badge
                            variant="outline"
                            style={{
                              backgroundColor: event.category.color + "10",
                              color: event.category.color,
                              borderColor: event.category.color + "30",
                            }}
                            className="text-xs"
                          >
                            {event.category.name}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                          <Clock className="h-3 w-3" />
                          {formatDate(event.createdAt)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-base leading-tight text-balance group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed text-pretty line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      {event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {event.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag.id}
                              variant="outline"
                              className="text-xs"
                              style={{
                                backgroundColor: tag.color + "10",
                                color: tag.color,
                                borderColor: tag.color + "30",
                              }}
                            >
                              {tag.name}
                            </Badge>
                          ))}
                          {event.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{event.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-muted-foreground font-medium">By {event.author}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span className="sr-only">View event details</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View event details</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </article>

                    {index < displayedEvents.length - 1 && <Separator className="my-2" />}
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {displayedEvents.length > 0
                ? `Showing ${displayedEvents.length} of ${events.filter((e) => e.status === "published").length} events`
                : "No events match current conditions"}
            </span>
            <Button variant="ghost" size="sm" className="text-xs h-auto p-1" asChild>
              <a href="/admin">Manage Events</a>
            </Button>
          </div>
        </div>

        {/* Event Detail Modal */}
        <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: selectedEvent.category.color + "20" }}>
                      {(() => {
                        const CategoryIcon = getCategoryIcon(selectedEvent.category.icon)
                        return <CategoryIcon className="h-5 w-5" style={{ color: selectedEvent.category.color }} />
                      })()}
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-xl text-balance">{selectedEvent.title}</DialogTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getPriorityConfig(selectedEvent.priority).badge}
                        <Badge
                          variant="outline"
                          style={{
                            backgroundColor: selectedEvent.category.color + "10",
                            color: selectedEvent.category.color,
                            borderColor: selectedEvent.category.color + "30",
                          }}
                        >
                          {selectedEvent.category.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedEvent.description}</p>
                  </div>

                  {selectedEvent.content && (
                    <div>
                      <h4 className="font-semibold mb-2">Full Details</h4>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-muted-foreground leading-relaxed">{selectedEvent.content}</p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.tags.map((tag) => (
                          <Badge key={tag.id} style={{ backgroundColor: tag.color, color: "white" }}>
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEvent.consequences && (
                    <div>
                      <h4 className="font-semibold mb-2">Potential Impact</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedEvent.consequences.marketStability && (
                          <div className="flex justify-between text-sm">
                            <span>Market Stability:</span>
                            <span
                              className={
                                selectedEvent.consequences.marketStability > 0 ? "text-green-600" : "text-red-600"
                              }
                            >
                              {selectedEvent.consequences.marketStability > 0 ? "+" : ""}
                              {selectedEvent.consequences.marketStability}%
                            </span>
                          </div>
                        )}
                        {selectedEvent.consequences.publicTrust && (
                          <div className="flex justify-between text-sm">
                            <span>Public Trust:</span>
                            <span
                              className={selectedEvent.consequences.publicTrust > 0 ? "text-green-600" : "text-red-600"}
                            >
                              {selectedEvent.consequences.publicTrust > 0 ? "+" : ""}
                              {selectedEvent.consequences.publicTrust}%
                            </span>
                          </div>
                        )}
                        {selectedEvent.consequences.innovation && (
                          <div className="flex justify-between text-sm">
                            <span>Innovation:</span>
                            <span
                              className={selectedEvent.consequences.innovation > 0 ? "text-green-600" : "text-red-600"}
                            >
                              {selectedEvent.consequences.innovation > 0 ? "+" : ""}
                              {selectedEvent.consequences.innovation}%
                            </span>
                          </div>
                        )}
                        {selectedEvent.consequences.globalInfluence && (
                          <div className="flex justify-between text-sm">
                            <span>Global Influence:</span>
                            <span
                              className={
                                selectedEvent.consequences.globalInfluence > 0 ? "text-green-600" : "text-red-600"
                              }
                            >
                              {selectedEvent.consequences.globalInfluence > 0 ? "+" : ""}
                              {selectedEvent.consequences.globalInfluence}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Created by {selectedEvent.author}</span>
                    <span>{formatDate(selectedEvent.createdAt)}</span>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Card>
    </TooltipProvider>
  )
}
