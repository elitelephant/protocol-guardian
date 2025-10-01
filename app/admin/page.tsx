"use client"

import { useState } from "react"
import { useEventManagement } from "@/hooks/use-event-management"
import { AdminNav } from "@/components/admin-nav"
import { EventsManager } from "@/components/events-manager"
import { CategoriesManager } from "@/components/categories-manager"
import { TagsManager } from "@/components/tags-manager"
import { EventAnalytics } from "@/components/event-analytics"
import { AdminSettings } from "@/components/admin-settings"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("events")
  const eventManagement = useEventManagement()

  const eventCounts = {
    total: eventManagement.events.length,
    published: eventManagement.events.filter((e) => e.status === "published").length,
    draft: eventManagement.events.filter((e) => e.status === "draft").length,
    archived: eventManagement.events.filter((e) => e.status === "archived").length,
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "events":
        return <EventsManager {...eventManagement} />
      case "categories":
        return <CategoriesManager {...eventManagement} />
      case "tags":
        return <TagsManager {...eventManagement} />
      case "analytics":
        return <EventAnalytics {...eventManagement} />
      case "settings":
        return <AdminSettings />
      default:
        return <EventsManager {...eventManagement} />
    }
  }

  if (eventManagement.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="p-4 bg-primary/10 rounded-lg inline-block">
            <Shield className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Loading Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground">Initializing event management system...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex">
        <AdminNav activeSection={activeSection} onSectionChange={setActiveSection} eventCounts={eventCounts} />

        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/">
                          <ArrowLeft className="h-4 w-4" />
                          <span className="sr-only">Back to Game</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Return to game interface</p>
                    </TooltipContent>
                  </Tooltip>

                  <div>
                    <h1 className="text-xl font-bold">Event Management Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                      Manage game events, categories, and system configuration
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    System Active
                  </Badge>
                  <Badge variant="secondary">{eventCounts.total} Events</Badge>
                  {eventCounts.total === 0 && (
                    <Badge variant="outline" className="text-yellow-600">
                      No Sample Data
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">{renderActiveSection()}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}
