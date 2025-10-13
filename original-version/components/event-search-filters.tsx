"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, X, CalendarIcon, Tag, FolderOpen, Loader2 } from "lucide-react"
import type { EventFilter, EventCategory, EventTag } from "@/lib/event-types"

interface EventSearchFiltersProps {
  filter: EventFilter
  onFilterChange: (filter: EventFilter) => void
  categories: EventCategory[]
  tags: EventTag[]
  onClearFilters: () => void
  resultCount?: number
}

const formatDate = (date: Date, format: "short" | "long" = "short") => {
  if (format === "long") {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function EventSearchFilters({
  filter,
  onFilterChange,
  categories,
  tags,
  onClearFilters,
  resultCount,
}: EventSearchFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
    from: filter.dateRange ? new Date(filter.dateRange.start) : undefined,
    to: filter.dateRange ? new Date(filter.dateRange.end) : undefined,
  })

  const handleSearchChange = async (value: string) => {
    setIsSearching(true)
    setTimeout(() => {
      onFilterChange({ ...filter, search: value })
      setIsSearching(false)
    }, 300)
  }

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    const currentCategories = filter.categories || []
    const newCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories.filter((id) => id !== categoryId)

    onFilterChange({
      ...filter,
      categories: newCategories.length > 0 ? newCategories : undefined,
    })
  }

  const handleTagToggle = (tagId: string, checked: boolean) => {
    const currentTags = filter.tags || []
    const newTags = checked ? [...currentTags, tagId] : currentTags.filter((id) => id !== tagId)

    onFilterChange({
      ...filter,
      tags: newTags.length > 0 ? newTags : undefined,
    })
  }

  const handlePriorityToggle = (priority: string, checked: boolean) => {
    const currentPriorities = filter.priority || []
    const newPriorities = checked ? [...currentPriorities, priority] : currentPriorities.filter((p) => p !== priority)

    onFilterChange({
      ...filter,
      priority: newPriorities.length > 0 ? newPriorities : undefined,
    })
  }

  const handleStatusToggle = (status: string, checked: boolean) => {
    const currentStatuses = filter.status || []
    const newStatuses = checked ? [...currentStatuses, status] : currentStatuses.filter((s) => s !== status)

    onFilterChange({
      ...filter,
      status: newStatuses.length > 0 ? newStatuses : undefined,
    })
  }

  const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
    setDateRange(range)
    if (range.from && range.to) {
      onFilterChange({
        ...filter,
        dateRange: {
          start: range.from.toISOString(),
          end: range.to.toISOString(),
        },
      })
    } else {
      onFilterChange({
        ...filter,
        dateRange: undefined,
      })
    }
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

  const activeFilterCount = getActiveFilterCount()

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          {isSearching ? (
            <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
          <Input
            placeholder="Search events by title, description, or content..."
            value={filter.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
            disabled={isSearching}
          />
        </div>

        <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent hover:bg-orange-500/10 hover:border-orange-500/50 transition-all duration-200 hover:scale-105"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-orange-500 text-white"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Filter Events</h4>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onClearFilters()
                      setDateRange({ from: undefined, to: undefined })
                    }}
                    className="h-auto p-1 text-xs hover:bg-red-500/10 hover:text-red-600 transition-all duration-200"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <Separator />

              {/* Categories */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-medium">Categories</Label>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2 hover:bg-accent/50 p-1 rounded transition-colors"
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={filter.categories?.includes(category.id) || false}
                        onCheckedChange={(checked) => handleCategoryToggle(category.id, checked as boolean)}
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Tags */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-medium">Tags</Label>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {tags.slice(0, 10).map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center space-x-2 hover:bg-accent/50 p-1 rounded transition-colors"
                    >
                      <Checkbox
                        id={`tag-${tag.id}`}
                        checked={filter.tags?.includes(tag.id) || false}
                        onCheckedChange={(checked) => handleTagToggle(tag.id, checked as boolean)}
                      />
                      <Label htmlFor={`tag-${tag.id}`} className="text-sm cursor-pointer">
                        <Badge
                          style={{ backgroundColor: tag.color, color: "white" }}
                          className="text-xs hover:opacity-80 transition-opacity"
                        >
                          {tag.name}
                        </Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Priority */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Priority</Label>
                <div className="space-y-2">
                  {["critical", "high", "medium", "low"].map((priority) => (
                    <div
                      key={priority}
                      className="flex items-center space-x-2 hover:bg-accent/50 p-1 rounded transition-colors"
                    >
                      <Checkbox
                        id={`priority-${priority}`}
                        checked={filter.priority?.includes(priority) || false}
                        onCheckedChange={(checked) => handlePriorityToggle(priority, checked as boolean)}
                      />
                      <Label htmlFor={`priority-${priority}`} className="text-sm capitalize cursor-pointer">
                        {priority}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Status */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Status</Label>
                <div className="space-y-2">
                  {["published", "draft", "archived"].map((status) => (
                    <div
                      key={status}
                      className="flex items-center space-x-2 hover:bg-accent/50 p-1 rounded transition-colors"
                    >
                      <Checkbox
                        id={`status-${status}`}
                        checked={filter.status?.includes(status) || false}
                        onCheckedChange={(checked) => handleStatusToggle(status, checked as boolean)}
                      />
                      <Label htmlFor={`status-${status}`} className="text-sm capitalize cursor-pointer">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Date Range */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-medium">Date Range</Label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent hover:bg-accent/50 transition-all duration-200"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {formatDate(dateRange.from, "long")} - {formatDate(dateRange.to, "long")}
                          </>
                        ) : (
                          formatDate(dateRange.from, "long")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range) => handleDateRangeChange(range || {})}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                {dateRange.from && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDateRangeChange({ from: undefined, to: undefined })}
                    className="w-full hover:bg-red-500/10 hover:text-red-600 transition-all duration-200"
                  >
                    Clear Date Range
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="px-2 hover:bg-red-500/10 hover:text-red-600 transition-all duration-200 hover:scale-105"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filter.search && (
            <Badge variant="secondary" className="flex items-center gap-1 hover:bg-accent transition-colors">
              Search: "{filter.search}"
              <Button
                variant="ghost"
                size="sm"
                className="h-auto w-auto p-0 ml-1 hover:bg-red-500/20 hover:text-red-600 transition-all duration-200"
                onClick={() => handleSearchChange("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {filter.categories?.map((categoryId) => {
            const category = categories.find((c) => c.id === categoryId)
            return (
              category && (
                <Badge
                  key={categoryId}
                  variant="secondary"
                  className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: category.color + "20", color: category.color }}
                >
                  {category.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto w-auto p-0 ml-1 hover:bg-red-500/20 transition-all duration-200"
                    onClick={() => handleCategoryToggle(categoryId, false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            )
          })}

          {filter.tags?.map((tagId) => {
            const tag = tags.find((t) => t.id === tagId)
            return (
              tag && (
                <Badge
                  key={tagId}
                  className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: tag.color, color: "white" }}
                >
                  {tag.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto w-auto p-0 ml-1 text-white hover:text-white hover:bg-white/20 transition-all duration-200"
                    onClick={() => handleTagToggle(tagId, false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            )
          })}

          {filter.priority?.map((priority) => (
            <Badge
              key={priority}
              variant="secondary"
              className="flex items-center gap-1 hover:bg-accent transition-colors"
            >
              Priority: {priority}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto w-auto p-0 ml-1 hover:bg-red-500/20 hover:text-red-600 transition-all duration-200"
                onClick={() => handlePriorityToggle(priority, false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {filter.status?.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="flex items-center gap-1 hover:bg-accent transition-colors"
            >
              Status: {status}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto w-auto p-0 ml-1 hover:bg-red-500/20 hover:text-red-600 transition-all duration-200"
                onClick={() => handleStatusToggle(status, false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {filter.dateRange && (
            <Badge variant="secondary" className="flex items-center gap-1 hover:bg-accent transition-colors">
              {formatDate(new Date(filter.dateRange.start))} - {formatDate(new Date(filter.dateRange.end))}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto w-auto p-0 ml-1 hover:bg-red-500/20 hover:text-red-600 transition-all duration-200"
                onClick={() => {
                  onFilterChange({ ...filter, dateRange: undefined })
                  setDateRange({ from: undefined, to: undefined })
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      {resultCount !== undefined && (
        <div className="text-sm text-muted-foreground">
          {resultCount === 0 ? "No events found" : `${resultCount} event${resultCount !== 1 ? "s" : ""} found`}
          {activeFilterCount > 0 && " with current filters"}
        </div>
      )}
    </div>
  )
}
