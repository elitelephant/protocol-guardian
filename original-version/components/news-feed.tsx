"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Newspaper, AlertTriangle, TrendingUp, Globe, Clock, ExternalLink, Filter } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  content: string
  date: string
  category: "inauguration" | "crisis" | "policy" | "global" | "market"
  priority: "high" | "medium" | "low"
  source: string
}

interface NewsFeedProps {
  gameState: any
}

export function NewsFeed({ gameState }: NewsFeedProps) {
  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "New FiDeFi President Sworn Into Office",
      content:
        "Historic inauguration ceremony marks the beginning of a new era in global cryptocurrency regulation following the devastating BlackShadow crisis.",
      date: "January 15, 2035",
      category: "inauguration",
      priority: "high",
      source: "Global Financial Times",
    },
    {
      id: "2",
      title: "BlackShadow Attack: Two Years Later",
      content:
        "Analysis of the 2033 BlackShadow cyberattack reveals lasting impacts on global crypto markets. Recovery efforts continue as new leadership takes charge of regulatory frameworks.",
      date: "January 15, 2035",
      category: "crisis",
      priority: "high",
      source: "Crypto Security Weekly",
    },
    {
      id: "3",
      title: "Market Confidence Awaits Policy Direction",
      content:
        "Global crypto markets remain in a holding pattern as investors and institutions await the new administration's first major policy announcements.",
      date: "January 14, 2035",
      category: "market",
      priority: "medium",
      source: "Market Watch International",
    },
  ]

  const getCategoryConfig = (category: NewsItem["category"]) => {
    switch (category) {
      case "crisis":
        return { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" }
      case "market":
        return { icon: TrendingUp, color: "text-chart-3", bg: "bg-chart-3/10" }
      case "global":
        return { icon: Globe, color: "text-chart-2", bg: "bg-chart-2/10" }
      case "inauguration":
        return { icon: Newspaper, color: "text-primary", bg: "bg-primary/10" }
      default:
        return { icon: Newspaper, color: "text-muted-foreground", bg: "bg-muted/10" }
    }
  }

  const getPriorityBadge = (priority: NewsItem["priority"]) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            Breaking
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="text-xs">
            Important
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-xs">
            Update
          </Badge>
        )
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="p-6 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Newspaper className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Global News Feed</h2>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter news by category</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Badge variant="outline" className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Real-time updates from global financial and regulatory sources</p>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {newsItems.map((item, index) => {
            const categoryConfig = getCategoryConfig(item.category)
            const CategoryIcon = categoryConfig.icon

            return (
              <div key={item.id}>
                <article className="group space-y-3 p-4 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`p-1.5 rounded ${categoryConfig.bg}`}>
                        <CategoryIcon className={`h-3 w-3 ${categoryConfig.color}`} />
                      </div>
                      {getPriorityBadge(item.priority)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                      <Clock className="h-3 w-3" />
                      {item.date}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-base leading-tight text-balance group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{item.content}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground font-medium">{item.source}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="sr-only">Read full article</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Read full article</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </article>

                {index < newsItems.length - 1 && <Separator className="my-2" />}
              </div>
            )
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: 2 minutes ago</span>
          <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
            View Archive
          </Button>
        </div>
      </div>
    </Card>
  )
}
