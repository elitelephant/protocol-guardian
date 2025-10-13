"use client"

import { useState, useEffect, useCallback } from "react"
import type { GameEvent, EventCategory, EventTag, EventFilter } from "@/lib/event-types"
import { DEFAULT_CATEGORIES, DEFAULT_TAGS } from "@/lib/event-types"
import { createError, withRetry } from "@/lib/error-handling"
import { useErrorHandler } from "@/hooks/use-error-handler"

const STORAGE_KEYS = {
  EVENTS: "cre-game-events",
  CATEGORIES: "cre-game-categories",
  TAGS: "cre-game-tags",
}

export function useEventManagement() {
  const [events, setEvents] = useState<GameEvent[]>([])
  const [categories, setCategories] = useState<EventCategory[]>(DEFAULT_CATEGORIES)
  const [tags, setTags] = useState<EventTag[]>(DEFAULT_TAGS)
  const [isLoading, setIsLoading] = useState(true)

  const { handleError } = useErrorHandler()

  // Enhanced localStorage operations with error handling
  const safeLocalStorageGet = useCallback((key: string): any => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      if (error instanceof Error && error.name === "QuotaExceededError") {
        throw createError("STORAGE_QUOTA_EXCEEDED", "Storage quota exceeded", error, { key })
      }
      throw createError("STORAGE_READ_ERROR", `Failed to read from storage: ${key}`, error, { key })
    }
  }, [])

  const safeLocalStorageSet = useCallback((key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      if (error instanceof Error && error.name === "QuotaExceededError") {
        throw createError("STORAGE_QUOTA_EXCEEDED", "Storage quota exceeded. Please clear some data.", error, { key })
      }
      throw createError("STORAGE_WRITE_ERROR", `Failed to write to storage: ${key}`, error, { key })
    }
  }, [])

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        const savedEvents = await withRetry(() => Promise.resolve(safeLocalStorageGet(STORAGE_KEYS.EVENTS)))
        const savedCategories = await withRetry(() => Promise.resolve(safeLocalStorageGet(STORAGE_KEYS.CATEGORIES)))
        const savedTags = await withRetry(() => Promise.resolve(safeLocalStorageGet(STORAGE_KEYS.TAGS)))

        if (savedEvents) {
          setEvents(savedEvents)
        }

        if (savedCategories) {
          setCategories(savedCategories)
        } else {
          safeLocalStorageSet(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES)
        }

        if (savedTags) {
          setTags(savedTags)
        } else {
          safeLocalStorageSet(STORAGE_KEYS.TAGS, DEFAULT_TAGS)
        }
      } catch (error) {
        handleError(error, { operation: "loadData" })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [safeLocalStorageGet, safeLocalStorageSet, handleError])

  // Save events to localStorage with error handling
  const saveEvents = useCallback(
    (newEvents: GameEvent[]) => {
      try {
        safeLocalStorageSet(STORAGE_KEYS.EVENTS, newEvents)
        setEvents(newEvents)
      } catch (error) {
        handleError(error, { operation: "saveEvents", eventCount: newEvents.length })
        throw error
      }
    },
    [safeLocalStorageSet, handleError],
  )

  // Save categories to localStorage with error handling
  const saveCategories = useCallback(
    (newCategories: EventCategory[]) => {
      try {
        safeLocalStorageSet(STORAGE_KEYS.CATEGORIES, newCategories)
        setCategories(newCategories)
      } catch (error) {
        handleError(error, { operation: "saveCategories", categoryCount: newCategories.length })
        throw error
      }
    },
    [safeLocalStorageSet, handleError],
  )

  // Save tags to localStorage with error handling
  const saveTags = useCallback(
    (newTags: EventTag[]) => {
      try {
        safeLocalStorageSet(STORAGE_KEYS.TAGS, newTags)
        setTags(newTags)
      } catch (error) {
        handleError(error, { operation: "saveTags", tagCount: newTags.length })
        throw error
      }
    },
    [safeLocalStorageSet, handleError],
  )

  // Enhanced event CRUD operations with validation
  const createEvent = useCallback(
    (eventData: Omit<GameEvent, "id" | "createdAt" | "updatedAt">) => {
      try {
        // Validation
        if (!eventData.title?.trim()) {
          throw createError("REQUIRED_FIELD_MISSING", "Event title is required")
        }
        if (!eventData.category) {
          throw createError("REQUIRED_FIELD_MISSING", "Event category is required")
        }

        const newEvent: GameEvent = {
          ...eventData,
          id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        const updatedEvents = [...events, newEvent]
        saveEvents(updatedEvents)
        return newEvent
      } catch (error) {
        handleError(error, { operation: "createEvent", eventData })
        throw error
      }
    },
    [events, saveEvents, handleError],
  )

  const updateEvent = useCallback(
    (id: string, updates: Partial<GameEvent>) => {
      try {
        const updatedEvents = events.map((event) =>
          event.id === id ? { ...event, ...updates, updatedAt: new Date().toISOString() } : event,
        )
        saveEvents(updatedEvents)
      } catch (error) {
        handleError(error, { operation: "updateEvent", eventId: id, updates })
        throw error
      }
    },
    [events, saveEvents, handleError],
  )

  const deleteEvent = useCallback(
    (id: string) => {
      try {
        const updatedEvents = events.filter((event) => event.id !== id)
        saveEvents(updatedEvents)
      } catch (error) {
        handleError(error, { operation: "deleteEvent", eventId: id })
        throw error
      }
    },
    [events, saveEvents, handleError],
  )

  const publishEvent = useCallback(
    (id: string) => {
      try {
        const updatedEvents = events.map((event) =>
          event.id === id
            ? {
                ...event,
                status: "published" as const,
                publishedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : event,
        )
        saveEvents(updatedEvents)
      } catch (error) {
        handleError(error, { operation: "publishEvent", eventId: id })
        throw error
      }
    },
    [events, saveEvents, handleError],
  )

  const archiveEvent = useCallback(
    (id: string) => {
      try {
        const updatedEvents = events.map((event) =>
          event.id === id
            ? {
                ...event,
                status: "archived" as const,
                updatedAt: new Date().toISOString(),
              }
            : event,
        )
        saveEvents(updatedEvents)
      } catch (error) {
        handleError(error, { operation: "archiveEvent", eventId: id })
        throw error
      }
    },
    [events, saveEvents, handleError],
  )

  // Category CRUD operations with error handling
  const createCategory = useCallback(
    (categoryData: Omit<EventCategory, "id">) => {
      try {
        if (!categoryData.name?.trim()) {
          throw createError("REQUIRED_FIELD_MISSING", "Category name is required")
        }

        const newCategory: EventCategory = {
          ...categoryData,
          id: `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }

        const updatedCategories = [...categories, newCategory]
        saveCategories(updatedCategories)
        return newCategory
      } catch (error) {
        handleError(error, { operation: "createCategory", categoryData })
        throw error
      }
    },
    [categories, saveCategories, handleError],
  )

  const updateCategory = useCallback(
    (id: string, updates: Partial<EventCategory>) => {
      try {
        const updatedCategories = categories.map((category) =>
          category.id === id ? { ...category, ...updates } : category,
        )
        saveCategories(updatedCategories)
      } catch (error) {
        handleError(error, { operation: "updateCategory", categoryId: id, updates })
        throw error
      }
    },
    [categories, saveCategories, handleError],
  )

  const deleteCategory = useCallback(
    (id: string) => {
      try {
        const updatedCategories = categories.filter((category) => category.id !== id)
        saveCategories(updatedCategories)
      } catch (error) {
        handleError(error, { operation: "deleteCategory", categoryId: id })
        throw error
      }
    },
    [categories, saveCategories, handleError],
  )

  // Tag CRUD operations with error handling
  const createTag = useCallback(
    (tagData: Omit<EventTag, "id">) => {
      try {
        if (!tagData.name?.trim()) {
          throw createError("REQUIRED_FIELD_MISSING", "Tag name is required")
        }

        const newTag: EventTag = {
          ...tagData,
          id: `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }

        const updatedTags = [...tags, newTag]
        saveTags(updatedTags)
        return newTag
      } catch (error) {
        handleError(error, { operation: "createTag", tagData })
        throw error
      }
    },
    [tags, saveTags, handleError],
  )

  const updateTag = useCallback(
    (id: string, updates: Partial<EventTag>) => {
      try {
        const updatedTags = tags.map((tag) => (tag.id === id ? { ...tag, ...updates } : tag))
        saveTags(updatedTags)
      } catch (error) {
        handleError(error, { operation: "updateTag", tagId: id, updates })
        throw error
      }
    },
    [tags, saveTags, handleError],
  )

  const deleteTag = useCallback(
    (id: string) => {
      try {
        const updatedTags = tags.filter((tag) => tag.id !== id)
        saveTags(updatedTags)
      } catch (error) {
        handleError(error, { operation: "deleteTag", tagId: id })
        throw error
      }
    },
    [tags, saveTags, handleError],
  )

  // Utility functions with error handling
  const filterEvents = useCallback(
    (filter: EventFilter) => {
      try {
        return events.filter((event) => {
          // Category filter
          if (filter.categories && filter.categories.length > 0) {
            if (!filter.categories.includes(event.category.id)) return false
          }

          // Tag filter
          if (filter.tags && filter.tags.length > 0) {
            const eventTagIds = event.tags.map((tag) => tag.id)
            if (!filter.tags.some((tagId) => eventTagIds.includes(tagId))) return false
          }

          // Priority filter
          if (filter.priority && filter.priority.length > 0) {
            if (!filter.priority.includes(event.priority)) return false
          }

          // Status filter
          if (filter.status && filter.status.length > 0) {
            if (!filter.status.includes(event.status)) return false
          }

          // Search filter
          if (filter.search && filter.search.trim()) {
            const searchTerm = filter.search.toLowerCase()
            const searchableText = [
              event.title,
              event.description,
              event.content,
              event.category.name,
              ...event.tags.map((tag) => tag.name),
            ]
              .join(" ")
              .toLowerCase()

            if (!searchableText.includes(searchTerm)) return false
          }

          // Date range filter
          if (filter.dateRange) {
            const eventDate = new Date(event.createdAt)
            const startDate = new Date(filter.dateRange.start)
            const endDate = new Date(filter.dateRange.end)

            if (eventDate < startDate || eventDate > endDate) return false
          }

          return true
        })
      } catch (error) {
        handleError(error, { operation: "filterEvents", filter })
        return []
      }
    },
    [events, handleError],
  )

  const getTriggeredEvents = useCallback(
    (gameState: any) => {
      try {
        return events.filter((event) => {
          if (event.status !== "published") return false
          if (!event.triggerConditions) return true

          const conditions = event.triggerConditions

          // Check month range
          if (conditions.minMonth && gameState.currentMonth < conditions.minMonth) return false
          if (conditions.maxMonth && gameState.currentMonth > conditions.maxMonth) return false

          // Check market conditions
          if (conditions.networkHealthRange) {
            const [min, max] = conditions.networkHealthRange
            if (gameState.networkHealth < min || gameState.networkHealth > max) return false
          }

          if (conditions.publicConfidenceRange) {
            const [min, max] = conditions.publicConfidenceRange
            if (gameState.publicConfidence < min || gameState.publicConfidence > max) return false
          }

          if (conditions.techAdvancementRange) {
            const [min, max] = conditions.techAdvancementRange
            if (gameState.techAdvancement < min || gameState.techAdvancement > max) return false
          }

          // Check required decisions
          if (conditions.requiredDecisions && conditions.requiredDecisions.length > 0) {
            const completedDecisionIds = gameState.decisions?.map((d: any) => d.id) || []
            if (!conditions.requiredDecisions.every((id) => completedDecisionIds.includes(id))) {
              return false
            }
          }

          return true
        })
      } catch (error) {
        handleError(error, { operation: "getTriggeredEvents", gameState })
        return []
      }
    },
    [events, handleError],
  )

  return {
    // Data
    events,
    categories,
    tags,
    isLoading,

    // Event operations
    createEvent,
    updateEvent,
    deleteEvent,
    publishEvent,
    archiveEvent,

    // Category operations
    createCategory,
    updateCategory,
    deleteCategory,

    // Tag operations
    createTag,
    updateTag,
    deleteTag,

    // Utility functions
    filterEvents,
    getTriggeredEvents,
  }
}
