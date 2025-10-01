"use client"

import { useState, useCallback } from "react"
import { type CustomError, logError, getErrorMessage } from "@/lib/error-handling"
import { useScreenReaderAnnouncement } from "@/components/accessibility/screen-reader-announcer"

interface ErrorState {
  error: CustomError | Error | null
  isRetrying: boolean
  retryCount: number
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isRetrying: false,
    retryCount: 0,
  })

  const { announce } = useScreenReaderAnnouncement()

  const handleError = useCallback(
    (error: unknown, context?: Record<string, any>) => {
      const errorInfo = logError(error, context)

      const errorObj = error instanceof Error ? error : new Error(getErrorMessage(error))

      setErrorState((prev) => ({
        error: errorObj,
        isRetrying: false,
        retryCount: prev.retryCount,
      }))

      // Announce error to screen readers
      announce(`Error: ${getErrorMessage(error)}`, "assertive")

      return errorInfo
    },
    [announce],
  )

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isRetrying: false,
      retryCount: 0,
    })
  }, [])

  const retry = useCallback(
    async (operation: () => Promise<void> | void) => {
      setErrorState((prev) => ({
        ...prev,
        isRetrying: true,
        retryCount: prev.retryCount + 1,
      }))

      try {
        await operation()
        clearError()
        announce("Operation completed successfully", "polite")
      } catch (error) {
        handleError(error, { retryAttempt: errorState.retryCount + 1 })
      } finally {
        setErrorState((prev) => ({
          ...prev,
          isRetrying: false,
        }))
      }
    },
    [errorState.retryCount, handleError, clearError, announce],
  )

  return {
    error: errorState.error,
    isRetrying: errorState.isRetrying,
    retryCount: errorState.retryCount,
    handleError,
    clearError,
    retry,
  }
}
