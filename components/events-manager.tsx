"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { EventSearchFilters } from "@/components/event-search-filters"
import { Plus, Edit, Trash2, Archive, Upload, Calendar, CheckCircle, Clock } from "lucide-react"
import type { GameEvent, EventCategory, EventTag, EventFilter } from "@/lib/event-types"

interface EventsManagerProps {
  events: GameEvent[]
  categories: EventCategory[]
  tags: EventTag[]
  createEvent: (eventData: Omit<GameEvent, "id" | "createdAt" | "updatedAt">) => GameEvent
  updateEvent: (id: string, updates: Partial<GameEvent>) => void
  deleteEvent: (id: string) => void
  publishEvent: (id: string) => void
  archiveEvent: (id: string) => void
  filterEvents: (filter: EventFilter) => GameEvent[]
}

export function EventsManager({
  events,
  categories,
  tags,
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
  archiveEvent,
  filterEvents,
}: EventsManagerProps) {
  const [filter, setFilter] = useState<EventFilter>({})
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<GameEvent | null>(null)

  // Form state for creating/editing events
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    selectedTags: [] as string[],
    priority: "medium" as const,
    status: "draft" as const,
    author: "Admin",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      category: "",
      selectedTags: [],
      priority: "medium",
      status: "draft",
      author: "Admin",
    })
  }

  const handleCreateEvent = () => {
    if (!formData.title || !formData.category) return

    const selectedCategory = categories.find((c) => c.id === formData.category)
    const selectedEventTags = tags.filter((t) => formData.selectedTags.includes(t.id))

    if (!selectedCategory) return

    createEvent({
      title: formData.title,
      description: formData.description,
      content: formData.content,
      category: selectedCategory,
      tags: selectedEventTags,
      priority: formData.priority,
      status: formData.status,
      author: formData.author,
    })

    resetForm()
    setIsCreateDialogOpen(false)
  }

  const handleEditEvent = (event: GameEvent) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      content: event.content,
      category: event.category.id,
      selectedTags: event.tags.map((t) => t.id),
      priority: event.priority,
      status: event.status,
      author: event.author,
    })
    setIsCreateDialogOpen(true)
  }

  const handleUpdateEvent = () => {
    if (!editingEvent || !formData.title || !formData.category) return

    const selectedCategory = categories.find((c) => c.id === formData.category)
    const selectedEventTags = tags.filter((t) => formData.selectedTags.includes(t.id))

    if (!selectedCategory) return

    updateEvent(editingEvent.id, {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      category: selectedCategory,
      tags: selectedEventTags,
      priority: formData.priority,
      status: formData.status,
      author: formData.author,
    })

    resetForm()
    setEditingEvent(null)
    setIsCreateDialogOpen(false)
  }

  const handleClearFilters = () => {
    setFilter({})
  }

  const filteredEvents = filterEvents(filter)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "draft":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "archived":
        return <Archive className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

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
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Events Management</h2>
          <p className="text-muted-foreground">Create and manage game events and scenarios</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter event title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the event"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Event Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Detailed event content and narrative"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Event author"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Button
                      key={tag.id}
                      variant={formData.selectedTags.includes(tag.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const newTags = formData.selectedTags.includes(tag.id)
                          ? formData.selectedTags.filter((t) => t !== tag.id)
                          : [...formData.selectedTags, tag.id]
                        setFormData({ ...formData, selectedTags: newTags })
                      }}
                    >
                      {tag.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}>
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <EventSearchFilters
          filter={filter}
          onFilterChange={setFilter}
          categories={categories}
          tags={tags}
          onClearFilters={handleClearFilters}
          resultCount={filteredEvents.length}
        />
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="space-y-3">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">No events found</h3>
                <p className="text-muted-foreground">
                  {Object.keys(filter).some((key) => filter[key as keyof EventFilter])
                    ? "Try adjusting your filters or search terms"
                    : "Create your first event to get started"}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <TooltipProvider>
            {filteredEvents.map((event) => (
              <Card key={event.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-1 h-16 rounded-full ${getPriorityColor(event.priority)}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(event.status)}
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <Badge
                            variant="outline"
                            style={{ backgroundColor: event.category.color + "20", color: event.category.color }}
                          >
                            {event.category.name}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>By {event.author}</span>
                          <span>Created {new Date(event.createdAt).toLocaleDateString()}</span>
                          {event.publishedAt && (
                            <span>Published {new Date(event.publishedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 ml-4">
                        {event.tags.map((tag) => (
                          <Badge key={tag.id} variant="secondary" className="text-xs">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit event</p>
                      </TooltipContent>
                    </Tooltip>

                    {event.status === "draft" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => publishEvent(event.id)}>
                            <Upload className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Publish event</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {event.status === "published" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => archiveEvent(event.id)}>
                            <Archive className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Archive event</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => deleteEvent(event.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete event</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </Card>
            ))}
          </TooltipProvider>
        )}
      </div>
    </div>
  )
}
