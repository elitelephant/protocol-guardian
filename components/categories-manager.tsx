"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react"
import type { EventCategory } from "@/lib/event-types"

interface CategoriesManagerProps {
  categories: EventCategory[]
  events: any[]
  createCategory: (categoryData: Omit<EventCategory, "id">) => EventCategory
  updateCategory: (id: string, updates: Partial<EventCategory>) => void
  deleteCategory: (id: string) => void
}

const ICON_OPTIONS = [
  "TrendingDown",
  "Scale",
  "Zap",
  "Globe",
  "Shield",
  "Building",
  "AlertTriangle",
  "Users",
  "Briefcase",
  "Settings",
]

const COLOR_OPTIONS = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#6b7280", // gray
  "#1f2937", // dark gray
]

export function CategoriesManager({
  categories,
  events,
  createCategory,
  updateCategory,
  deleteCategory,
}: CategoriesManagerProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<EventCategory | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "FolderOpen",
    color: "#3b82f6",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "FolderOpen",
      color: "#3b82f6",
    })
  }

  const handleCreateCategory = () => {
    if (!formData.name.trim()) return

    createCategory({
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      color: formData.color,
    })

    resetForm()
    setIsCreateDialogOpen(false)
  }

  const handleEditCategory = (category: EventCategory) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
    })
    setIsCreateDialogOpen(true)
  }

  const handleUpdateCategory = () => {
    if (!editingCategory || !formData.name.trim()) return

    updateCategory(editingCategory.id, {
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      color: formData.color,
    })

    resetForm()
    setEditingCategory(null)
    setIsCreateDialogOpen(false)
  }

  const handleDeleteCategory = (categoryId: string) => {
    const eventsUsingCategory = events.filter((event) => event.category.id === categoryId)
    if (eventsUsingCategory.length > 0) {
      alert(`Cannot delete category. ${eventsUsingCategory.length} events are using this category.`)
      return
    }
    deleteCategory(categoryId)
  }

  const getEventCount = (categoryId: string) => {
    return events.filter((event) => event.category.id === categoryId).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Categories Management</h2>
          <p className="text-muted-foreground">Organize events by category type</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Create New Category"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this category"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-5 gap-2">
                  {ICON_OPTIONS.map((icon) => (
                    <Button
                      key={icon}
                      variant={formData.icon === icon ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, icon })}
                      className="h-10"
                    >
                      {icon}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, color })}
                      className="h-10 p-0"
                      style={{
                        backgroundColor: formData.color === color ? color : "transparent",
                        borderColor: color,
                      }}
                    >
                      <div className="w-full h-full rounded" style={{ backgroundColor: color }} />
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}>
                  {editingCategory ? "Update Category" : "Create Category"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const eventCount = getEventCount(category.id)

          return (
            <Card key={category.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: category.color + "20" }}>
                    <FolderOpen className="h-5 w-5" style={{ color: category.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {eventCount} event{eventCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <TooltipProvider>
                  <div className="flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit category</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          disabled={eventCount > 0}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {eventCount > 0
                            ? `Cannot delete - ${eventCount} events using this category`
                            : "Delete category"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>

              <p className="text-sm text-muted-foreground">{category.description}</p>
            </Card>
          )
        })}
      </div>

      {categories.length === 0 && (
        <Card className="p-8 text-center">
          <div className="space-y-3">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">No categories found</h3>
              <p className="text-muted-foreground">Create your first category to organize events</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
