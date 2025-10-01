"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { getErrorMessage } from "@/lib/error-handling"

interface FormErrorDisplayProps {
  error: Error | string | null
  fieldName?: string
  className?: string
}

export function FormErrorDisplay({ error, fieldName, className }: FormErrorDisplayProps) {
  if (!error) return null

  const message = typeof error === "string" ? error : getErrorMessage(error)
  const displayMessage = fieldName ? `${fieldName}: ${message}` : message

  return (
    <Alert variant="destructive" className={className} role="alert">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>{displayMessage}</AlertDescription>
    </Alert>
  )
}

interface FieldErrorProps {
  error: string | null
  className?: string
}

export function FieldError({ error, className = "" }: FieldErrorProps) {
  if (!error) return null

  return (
    <p className={`text-sm text-destructive mt-1 ${className}`} role="alert" aria-live="polite">
      {error}
    </p>
  )
}
