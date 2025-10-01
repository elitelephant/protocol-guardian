export function getContrastRatio(color1: string, color2: string): number {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  // Calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 0

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

export function meetsWCAGStandard(
  contrastRatio: number,
  level: "AA" | "AAA" = "AA",
  size: "normal" | "large" = "normal",
): boolean {
  if (level === "AAA") {
    return size === "large" ? contrastRatio >= 4.5 : contrastRatio >= 7
  }
  return size === "large" ? contrastRatio >= 3 : contrastRatio >= 4.5
}

export function validateColorContrast(
  foreground: string,
  background: string,
): {
  ratio: number
  meetsAA: boolean
  meetsAAA: boolean
  meetsAALarge: boolean
  meetsAAALarge: boolean
} {
  const ratio = getContrastRatio(foreground, background)

  return {
    ratio,
    meetsAA: meetsWCAGStandard(ratio, "AA", "normal"),
    meetsAAA: meetsWCAGStandard(ratio, "AAA", "normal"),
    meetsAALarge: meetsWCAGStandard(ratio, "AA", "large"),
    meetsAAALarge: meetsWCAGStandard(ratio, "AAA", "large"),
  }
}

export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  ) as NodeListOf<HTMLElement>

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }

  element.addEventListener("keydown", handleKeyDown)

  return () => {
    element.removeEventListener("keydown", handleKeyDown)
  }
}
