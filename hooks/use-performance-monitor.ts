"use client"

import { useEffect, useRef, useCallback } from "react"

interface PerformanceMetrics {
  renderTime: number
  componentName: string
  timestamp: number
  props?: any
}

export function usePerformanceMonitor(componentName: string, props?: any) {
  const renderStartTime = useRef<number>(0)
  const metricsRef = useRef<PerformanceMetrics[]>([])

  useEffect(() => {
    renderStartTime.current = performance.now()
  })

  useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current

    const metrics: PerformanceMetrics = {
      renderTime,
      componentName,
      timestamp: Date.now(),
      props: process.env.NODE_ENV === "development" ? props : undefined,
    }

    metricsRef.current.push(metrics)

    // Keep only last 100 metrics to prevent memory leaks
    if (metricsRef.current.length > 100) {
      metricsRef.current = metricsRef.current.slice(-100)
    }

    // Log slow renders in development
    if (process.env.NODE_ENV === "development" && renderTime > 16) {
      console.warn(`[v0] Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`)
    }

    // Send to analytics if available
    if (typeof window !== "undefined" && (window as any).gtag && renderTime > 100) {
      ;(window as any).gtag("event", "performance", {
        event_category: "render_time",
        event_label: componentName,
        value: Math.round(renderTime),
      })
    }
  })

  const getMetrics = useCallback(() => {
    return metricsRef.current
  }, [])

  const getAverageRenderTime = useCallback(() => {
    const metrics = metricsRef.current
    if (metrics.length === 0) return 0

    const total = metrics.reduce((sum, metric) => sum + metric.renderTime, 0)
    return total / metrics.length
  }, [])

  return {
    getMetrics,
    getAverageRenderTime,
  }
}

export function useMemoryMonitor() {
  const checkMemoryUsage = useCallback(() => {
    if ("memory" in performance) {
      const memory = (performance as any).memory
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
      }
    }
    return null
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const memoryInfo = checkMemoryUsage()
      if (memoryInfo && memoryInfo.usagePercentage > 80) {
        console.warn("[v0] High memory usage detected:", memoryInfo)

        // Send to analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "performance", {
            event_category: "memory_usage",
            event_label: "high_usage",
            value: Math.round(memoryInfo.usagePercentage),
          })
        }
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [checkMemoryUsage])

  return { checkMemoryUsage }
}
