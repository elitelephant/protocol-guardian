"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { AlertTriangle } from "lucide-react"
import { getErrorMessage } from "@/lib/error-handling"

interface ErrorToastProps {
  error: Error | null
  onRetry?: () => void
  onDismiss?: () => void
  autoHide?: boolean
  duration?: number
}

export function ErrorToast({ error, onRetry, onDismiss, autoHide = true, duration = 5000 }: ErrorToastProps) {
  useEffect(() => {
    if (!error) return

    const errorMessage = getErrorMessage(error)

    toast.error(errorMessage, {
      duration: autoHide ? duration : Number.POSITIVE_INFINITY,
      action: onRetry
        ? {
            label: "Retry",
            onClick: onRetry,
          }
        : undefined,
      cancel: onDismiss
        ? {
            label: "Dismiss",
            onClick: onDismiss,
          }
        : undefined,
      icon: <AlertTriangle className="h-4 w-4" />,
      description:
        error instanceof Error && error.stack ? `Error Code: ${(error as any).code || "UNKNOWN"}` : undefined,
    })
  }, [error, onRetry, onDismiss, autoHide, duration])

  return null
}
