"use client"

import { useState, useCallback } from "react"

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

interface ValidationRules {
  [key: string]: ValidationRule
}

interface ValidationErrors {
  [key: string]: string | null
}

export function useFormValidation<T extends Record<string, any>>(initialData: T, rules: ValidationRules) {
  const [data, setData] = useState<T>(initialData)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isValidating, setIsValidating] = useState(false)

  const validateField = useCallback(
    (name: string, value: any): string | null => {
      const rule = rules[name]
      if (!rule) return null

      // Required validation
      if (rule.required && (!value || (typeof value === "string" && value.trim() === ""))) {
        return `${name} is required`
      }

      // Skip other validations if field is empty and not required
      if (!value && !rule.required) return null

      // String validations
      if (typeof value === "string") {
        if (rule.minLength && value.length < rule.minLength) {
          return `${name} must be at least ${rule.minLength} characters`
        }

        if (rule.maxLength && value.length > rule.maxLength) {
          return `${name} must not exceed ${rule.maxLength} characters`
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          return `${name} format is invalid`
        }
      }

      // Custom validation
      if (rule.custom) {
        return rule.custom(value)
      }

      return null
    },
    [rules],
  )

  const validateAll = useCallback((): boolean => {
    setIsValidating(true)
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(rules).forEach((fieldName) => {
      const error = validateField(fieldName, data[fieldName])
      newErrors[fieldName] = error
      if (error) isValid = false
    })

    setErrors(newErrors)
    setIsValidating(false)
    return isValid
  }, [data, rules, validateField])

  const updateField = useCallback(
    (name: keyof T, value: any) => {
      setData((prev) => ({ ...prev, [name]: value }))

      // Clear error when user starts typing
      if (errors[name as string]) {
        setErrors((prev) => ({ ...prev, [name as string]: null }))
      }
    },
    [errors],
  )

  const validateAndUpdateField = useCallback(
    (name: keyof T, value: any) => {
      updateField(name, value)

      // Validate field on blur
      const error = validateField(name as string, value)
      setErrors((prev) => ({ ...prev, [name as string]: error }))
    },
    [updateField, validateField],
  )

  const reset = useCallback(() => {
    setData(initialData)
    setErrors({})
    setIsValidating(false)
  }, [initialData])

  const hasErrors = Object.values(errors).some((error) => error !== null)

  return {
    data,
    errors,
    isValidating,
    hasErrors,
    updateField,
    validateAndUpdateField,
    validateAll,
    reset,
    setData,
    setErrors,
  }
}
