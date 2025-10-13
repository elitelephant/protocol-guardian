"use client"

import { lazy, Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

// Lazy load heavy components
export const LazyEventsManager = lazy(() =>
  import("@/components/events-manager").then((module) => ({ default: module.EventsManager })),
)

export const LazyDynamicEventsFeed = lazy(() =>
  import("@/components/dynamic-events-feed").then((module) => ({ default: module.DynamicEventsFeed })),
)

export const LazyEducationalSidebar = lazy(() =>
  import("@/components/educational-sidebar").then((module) => ({ default: module.EducationalSidebar })),
)

export const LazyAdvisorsPanel = lazy(() =>
  import("@/components/advisors-panel").then((module) => ({ default: module.AdvisorsPanel })),
)

// Loading skeletons for different component types
export function EventsManagerSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-48" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function EventsFeedSkeleton() {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-2 w-2 rounded-full mt-2" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function SidebarSkeleton() {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

// Wrapper components with suspense
export function LazyEventsManagerWithSuspense(props: any) {
  return (
    <Suspense fallback={<EventsManagerSkeleton />}>
      <LazyEventsManager {...props} />
    </Suspense>
  )
}

export function LazyDynamicEventsFeedWithSuspense(props: any) {
  return (
    <Suspense fallback={<EventsFeedSkeleton />}>
      <LazyDynamicEventsFeed {...props} />
    </Suspense>
  )
}

export function LazyEducationalSidebarWithSuspense(props: any) {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <LazyEducationalSidebar {...props} />
    </Suspense>
  )
}

export function LazyAdvisorsPanelWithSuspense(props: any) {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <LazyAdvisorsPanel {...props} />
    </Suspense>
  )
}
