"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Settings, Calendar, Tags, FolderOpen, BarChart3, Shield, ChevronLeft, ChevronRight } from "lucide-react"

interface AdminNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
  eventCounts: {
    total: number
    published: number
    draft: number
    archived: number
  }
}

const NAV_SECTIONS = [
  {
    id: "events",
    name: "Crises",
    icon: Calendar,
    description: "Manage Bitcoin protocol crises and scenarios",
  },
  {
    id: "categories",
    name: "Eras",
    icon: FolderOpen,
    description: "Organize crises by evolutionary eras",
  },
  {
    id: "tags",
    name: "Impacts",
    icon: Tags,
    description: "Manage crisis impact tags and labels",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    description: "View protocol metrics and performance",
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    description: "Configure system settings",
  },
]

export function AdminNav({ activeSection, onSectionChange, eventCounts }: AdminNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <TooltipProvider>
      <div className={`bg-card border-r border-border transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm">Crisis Management</h2>
                  <p className="text-xs text-muted-foreground">Guardian's Dashboard</p>
                </div>
              </div>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
                  {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {NAV_SECTIONS.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id

            return (
              <Tooltip key={section.id} delayDuration={isCollapsed ? 0 : 1000}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 h-10 ${isCollapsed ? "px-2" : "px-3"}`}
                    onClick={() => onSectionChange(section.id)}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{section.name}</span>
                        {section.id === "events" && (
                          <Badge variant="outline" className="text-xs">
                            {eventCounts.total}
                          </Badge>
                        )}
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className={isCollapsed ? "" : "hidden"}>
                  <div>
                    <p className="font-medium">{section.name}</p>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                    {section.id === "events" && (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Total:</span>
                          <span>{eventCounts.total}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Published:</span>
                          <span>{eventCounts.published}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Draft:</span>
                          <span>{eventCounts.draft}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>

        {!isCollapsed && (
          <div className="p-4 border-t border-border mt-auto">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Crisis Statistics</div>

              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">{eventCounts.published}</div>
                  <div className="text-xs text-muted-foreground">Published</div>
                </div>

                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-chart-2">{eventCounts.draft}</div>
                  <div className="text-xs text-muted-foreground">Draft</div>
                </div>
              </div>

              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold">{eventCounts.total}</div>
                <div className="text-xs text-muted-foreground">Total Crises</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
