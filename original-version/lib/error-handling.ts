export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: string
  userId?: string
  context?: Record<string, any>
}

export class CustomError extends Error {
  public code: string
  public details?: any
  public context?: Record<string, any>

  constructor(code: string, message: string, details?: any, context?: Record<string, any>) {
    super(message)
    this.name = "CustomError"
    this.code = code
    this.details = details
    this.context = context
  }
}

export const ERROR_CODES = {
  // Storage errors
  STORAGE_READ_ERROR: "STORAGE_READ_ERROR",
  STORAGE_WRITE_ERROR: "STORAGE_WRITE_ERROR",
  STORAGE_QUOTA_EXCEEDED: "STORAGE_QUOTA_EXCEEDED",

  // Validation errors
  VALIDATION_ERROR: "VALIDATION_ERROR",
  REQUIRED_FIELD_MISSING: "REQUIRED_FIELD_MISSING",
  INVALID_FORMAT: "INVALID_FORMAT",

  // Data errors
  DATA_NOT_FOUND: "DATA_NOT_FOUND",
  DATA_CORRUPTION: "DATA_CORRUPTION",
  DUPLICATE_ENTRY: "DUPLICATE_ENTRY",

  // Network errors
  NETWORK_ERROR: "NETWORK_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",

  // Permission errors
  PERMISSION_DENIED: "PERMISSION_DENIED",
  UNAUTHORIZED: "UNAUTHORIZED",

  // Generic errors
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  OPERATION_FAILED: "OPERATION_FAILED",
} as const

export function createError(
  code: keyof typeof ERROR_CODES,
  message: string,
  details?: any,
  context?: Record<string, any>,
): CustomError {
  return new CustomError(ERROR_CODES[code], message, details, context)
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof CustomError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === "string") {
    return error
  }

  return "An unexpected error occurred"
}

export function logError(error: unknown, context?: Record<string, any>) {
  const errorInfo: AppError = {
    code: error instanceof CustomError ? error.code : ERROR_CODES.UNKNOWN_ERROR,
    message: getErrorMessage(error),
    details: error instanceof CustomError ? error.details : error,
    timestamp: new Date().toISOString(),
    context: {
      ...context,
      ...(error instanceof CustomError ? error.context : {}),
    },
  }

  console.error("[v0] Error logged:", errorInfo)

  // Send to analytics if available
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "exception", {
      description: errorInfo.message,
      fatal: false,
      custom_map: {
        error_code: errorInfo.code,
        error_context: JSON.stringify(errorInfo.context),
      },
    })
  }

  return errorInfo
}

export function handleAsyncError<T>(
  operation: () => Promise<T>,
  errorCode: keyof typeof ERROR_CODES,
  errorMessage: string,
  context?: Record<string, any>,
): Promise<T> {
  return operation().catch((error) => {
    const customError = createError(errorCode, errorMessage, error, context)
    logError(customError)
    throw customError
  })
}

export function withRetry<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0

    const attempt = async () => {
      try {
        const result = await operation()
        resolve(result)
      } catch (error) {
        attempts++

        if (attempts >= maxRetries) {
          reject(error)
          return
        }

        setTimeout(attempt, delay * attempts)
      }
    }

    attempt()
  })
}
