"use client"

import type React from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function GameHeaderSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </Card>
  )
}

export function IndicatorsPanelSkeleton() {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function DecisionQueueSkeleton() {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Badge variant="outline">
            <Skeleton className="h-3 w-8" />
          </Badge>
        </div>

        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="p-3">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-2 mt-3">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function CrisisAlertSkeleton() {
  return (
    <Card className="p-4 border-destructive bg-destructive/5">
      <div className="flex items-start gap-3">
        <Skeleton className="h-5 w-5 rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-2 mt-3">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>
    </Card>
  )
}

interface LoadingStateProps {
  isLoading: boolean
  skeleton: React.ComponentType
  children: React.ReactNode
  delay?: number
}

export function LoadingState({ isLoading, skeleton: Skeleton, children, delay = 0 }: LoadingStateProps) {
  if (isLoading) {
    if (delay > 0) {
      // Show skeleton after delay to prevent flash
      return (
        <div style={{ minHeight: "200px" }}>
          <Skeleton />
        </div>
      )
    }
    return <Skeleton />
  }

  return <>{children}</>
}
