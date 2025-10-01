export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp: number
  sessionId: string
  userId?: string
}

export interface UserSession {
  sessionId: string
  startTime: number
  endTime?: number
  pageViews: number
  events: AnalyticsEvent[]
  userAgent: string
  referrer: string
}

export interface GameAnalytics {
  gameStarted: number
  gameCompleted: number
  decisionsTotal: number
  crisisesTriggered: number
  lessonsCompleted: number
  averageSessionDuration: number
  popularDecisions: Record<string, number>
  errorRate: number
  performanceMetrics: {
    averageLoadTime: number
    slowRenders: number
    memoryUsage: number[]
  }
}

class AnalyticsManager {
  private events: AnalyticsEvent[] = []
  private currentSession: UserSession | null = null
  private sessionId = ""
  private isEnabled = true

  constructor() {
    this.initializeSession()
    this.setupEventListeners()
  }

  private initializeSession() {
    this.sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    this.currentSession = {
      sessionId: this.sessionId,
      startTime: Date.now(),
      pageViews: 1,
      events: [],
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
      referrer: typeof window !== "undefined" ? document.referrer : "",
    }

    // Track session start
    this.track("session_start", {
      userAgent: this.currentSession.userAgent,
      referrer: this.currentSession.referrer,
      timestamp: this.currentSession.startTime,
    })
  }

  private setupEventListeners() {
    if (typeof window === "undefined") return

    // Track page visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.track("page_hidden")
      } else {
        this.track("page_visible")
      }
    })

    // Track session end on page unload
    window.addEventListener("beforeunload", () => {
      this.endSession()
    })

    // Track errors
    window.addEventListener("error", (event) => {
      this.track("javascript_error", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      })
    })

    // Track unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.track("unhandled_promise_rejection", {
        reason: event.reason?.toString(),
        stack: event.reason?.stack,
      })
    })
  }

  public track(eventName: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return

    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        url: typeof window !== "undefined" ? window.location.href : "",
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
      sessionId: this.sessionId,
    }

    this.events.push(event)

    if (this.currentSession) {
      this.currentSession.events.push(event)
    }

    // Send to external analytics if available
    this.sendToExternalAnalytics(event)

    // Store in localStorage for persistence
    this.persistEvents()

    console.log("[v0] Analytics event tracked:", eventName, properties)
  }

  private sendToExternalAnalytics(event: AnalyticsEvent) {
    // Send to Google Analytics if available
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", event.name, {
        custom_map: event.properties,
        event_category: "game_interaction",
        event_label: event.properties?.label || event.name,
        value: event.properties?.value || 1,
      })
    }

    // Send to Vercel Analytics if available
    if (typeof window !== "undefined" && (window as any).va) {
      ;(window as any).va("track", event.name, event.properties)
    }
  }

  private persistEvents() {
    try {
      const recentEvents = this.events.slice(-100) // Keep only last 100 events
      localStorage.setItem("cre-analytics-events", JSON.stringify(recentEvents))

      if (this.currentSession) {
        localStorage.setItem("cre-analytics-session", JSON.stringify(this.currentSession))
      }
    } catch (error) {
      console.warn("[v0] Failed to persist analytics events:", error)
    }
  }

  public endSession() {
    if (this.currentSession) {
      this.currentSession.endTime = Date.now()
      this.track("session_end", {
        duration: this.currentSession.endTime - this.currentSession.startTime,
        pageViews: this.currentSession.pageViews,
        eventCount: this.currentSession.events.length,
      })
    }
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  public getSession(): UserSession | null {
    return this.currentSession
  }

  public getGameAnalytics(): GameAnalytics {
    const gameEvents = this.events.filter((e) => e.name.startsWith("game_"))

    return {
      gameStarted: this.events.filter((e) => e.name === "game_started").length,
      gameCompleted: this.events.filter((e) => e.name === "game_completed").length,
      decisionsTotal: this.events.filter((e) => e.name === "decision_made").length,
      crisisesTriggered: this.events.filter((e) => e.name === "crisis_triggered").length,
      lessonsCompleted: this.events.filter((e) => e.name === "lesson_completed").length,
      averageSessionDuration: this.calculateAverageSessionDuration(),
      popularDecisions: this.getPopularDecisions(),
      errorRate: this.calculateErrorRate(),
      performanceMetrics: this.getPerformanceMetrics(),
    }
  }

  private calculateAverageSessionDuration(): number {
    const sessionEvents = this.events.filter((e) => e.name === "session_end")
    if (sessionEvents.length === 0) return 0

    const totalDuration = sessionEvents.reduce((sum, event) => {
      return sum + (event.properties?.duration || 0)
    }, 0)

    return totalDuration / sessionEvents.length
  }

  private getPopularDecisions(): Record<string, number> {
    const decisionEvents = this.events.filter((e) => e.name === "decision_made")
    const decisions: Record<string, number> = {}

    decisionEvents.forEach((event) => {
      const decisionId = event.properties?.decisionId
      if (decisionId) {
        decisions[decisionId] = (decisions[decisionId] || 0) + 1
      }
    })

    return decisions
  }

  private calculateErrorRate(): number {
    const totalEvents = this.events.length
    const errorEvents = this.events.filter((e) => e.name.includes("error") || e.name.includes("exception")).length

    return totalEvents > 0 ? (errorEvents / totalEvents) * 100 : 0
  }

  private getPerformanceMetrics() {
    const performanceEvents = this.events.filter((e) => e.name === "performance")

    return {
      averageLoadTime: this.calculateAverageLoadTime(),
      slowRenders: performanceEvents.filter((e) => e.properties?.renderTime && e.properties.renderTime > 16).length,
      memoryUsage: performanceEvents.map((e) => e.properties?.memoryUsage).filter(Boolean),
    }
  }

  private calculateAverageLoadTime(): number {
    const loadEvents = this.events.filter((e) => e.name === "page_load")
    if (loadEvents.length === 0) return 0

    const totalLoadTime = loadEvents.reduce((sum, event) => {
      return sum + (event.properties?.loadTime || 0)
    }, 0)

    return totalLoadTime / loadEvents.length
  }

  public clearEvents() {
    this.events = []
    if (typeof window !== "undefined") {
      localStorage.removeItem("cre-analytics-events")
      localStorage.removeItem("cre-analytics-session")
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  public isAnalyticsEnabled(): boolean {
    return this.isEnabled
  }
}

// Global analytics instance
export const analytics = new AnalyticsManager()

// Convenience functions for common events
export const trackGameEvent = (eventName: string, properties?: Record<string, any>) => {
  analytics.track(`game_${eventName}`, properties)
}

export const trackUserAction = (action: string, properties?: Record<string, any>) => {
  analytics.track(`user_${action}`, properties)
}

export const trackPerformance = (componentName: string, renderTime: number, memoryUsage?: number) => {
  analytics.track("performance", {
    componentName,
    renderTime,
    memoryUsage,
    timestamp: Date.now(),
  })
}

export const trackError = (error: Error, context?: Record<string, any>) => {
  analytics.track("error", {
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...context,
  })
}
