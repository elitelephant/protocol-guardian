"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Plus, Edit, Trash2, Tag } from "lucide-react"
import type { EventTag } from "@/lib/event-types"

interface TagsManagerProps {
  tags: EventTag[]
  events: any[]
  createTag: (tagData: Omit<EventTag, "id">) => EventTag
  updateTag: (id: string, updates: Partial<EventTag>) => void
  deleteTag: (id: string) => void
}

const TAG_COLORS = [
  "#f7931a", // bitcoin orange
  "#627eea", // ethereum blue
  "#ff6b6b", // red
  "#4ecdc4", // teal
  "#45b7d1", // blue
  "#96ceb4", // mint
  "#feca57", // yellow
  "#ff9ff3", // pink
  "#54a0ff", // light blue
  "#5f27cd", // purple
  "#00d2d3", // cyan
  "#ff6348", // orange-red
]

export function TagsManager({ tags, events, createTag, updateTag, deleteTag }: TagsManagerProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<EventTag | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    color: "#3b82f6",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      color: "#3b82f6",
    })
  }

  const handleCreateTag = () => {
    if (!formData.name.trim()) return

    createTag({
      name: formData.name,
      color: formData.color,
    })

    resetForm()
    setIsCreateDialogOpen(false)
  }

  const handleEditTag = (tag: EventTag) => {
    setEditingTag(tag)
    setFormData({
      name: tag.name,
      color: tag.color,
    })
    setIsCreateDialogOpen(true)
  }

  const handleUpdateTag = () => {
    if (!editingTag || !formData.name.trim()) return

    updateTag(editingTag.id, {
      name: formData.name,
      color: formData.color,
    })

    resetForm()
    setEditingTag(null)
    setIsCreateDialogOpen(false)
  }

  const handleDeleteTag = (tagId: string) => {
    const eventsUsingTag = events.filter((event) => event.tags.some((tag: any) => tag.id === tagId))
    if (eventsUsingTag.length > 0) {
      alert(`Cannot delete tag. ${eventsUsingTag.length} events are using this tag.`)
      return
    }
    deleteTag(tagId)
  }

  const getEventCount = (tagId: string) => {
    return events.filter((event) => event.tags.some((tag: any) => tag.id === tagId)).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tags Management</h2>
          <p className="text-muted-foreground">Create and manage event tags for better organization</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTag ? "Edit Tag" : "Create New Tag"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tag Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter tag name"
                />
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  {TAG_COLORS.map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, color })}
                      className="h-10 p-0"
                      style={{
                        backgroundColor: formData.color === color ? color : "transparent",
                        borderColor: color,
                        borderWidth: formData.color === color ? "2px" : "1px",
                      }}
                    >
                      <div className="w-full h-full rounded" style={{ backgroundColor: color }} />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preview</Label>
                <div>
                  <Badge style={{ backgroundColor: formData.color, color: "white" }}>
                    {formData.name || "Tag Name"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={editingTag ? handleUpdateTag : handleCreateTag}>
                  {editingTag ? "Update Tag" : "Create Tag"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tags Grid */}
      <TooltipProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map((tag) => {
            const eventCount = getEventCount(tag.id)

            return (
              <Card key={tag.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" style={{ color: tag.color }} />
                    <Badge style={{ backgroundColor: tag.color, color: "white" }}>{tag.name}</Badge>
                  </div>

                  <div className="flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEditTag(tag)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit tag</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTag(tag.id)}
                          disabled={eventCount > 0}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{eventCount > 0 ? `Cannot delete - ${eventCount} events using this tag` : "Delete tag"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Used in {eventCount} event{eventCount !== 1 ? "s" : ""}
                </p>
              </Card>
            )
          })}
        </div>
      </TooltipProvider>

      {tags.length === 0 && (
        <Card className="p-8 text-center">
          <div className="space-y-3">
            <Tag className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">No tags found</h3>
              <p className="text-muted-foreground">Create your first tag to label and organize events</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
