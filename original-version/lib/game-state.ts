export interface GameState {
  // Core game data
  currentYear: number
  currentMonth: number
  termProgress: number // 0-100 percentage through 5-year term

  // Three dynamic indicators (0-100)
  networkHealth: number
  publicConfidence: number
  techAdvancement: number

  // Player decisions and consequences
  decisions: Decision[]
  currentCrisis?: Crisis

  // Unresolved crises tracking for metric degradation
  unresolvedCrises: { crisisId: string; erasUnresolved: number }[]

  // Educational progress
  completedLessons: string[]

  // Game progression
  gamePhase: "intro" | "era1" | "era2" | "era3" | "era4" | "era5" | "ending"
  currentDecision: number // Current decision index within the era (0-based)
  totalDecisionsInEra: number // Total decisions planned for current era
  endingType?: "sovereign" | "progressive" | "pragmatic" | "disruptive"
}

export interface Decision {
  id: string
  title: string
  description: string
  options: DecisionOption[]
  consequences?: Consequence[]
  educationalContent?: string
  timestamp: Date
}

export interface DecisionOption {
  id: string
  text: string
  consequences: Consequence[]
  educationalNote?: string
}

export interface Consequence {
  type: "networkHealth" | "publicConfidence" | "techAdvancement"
  change: number
  description: string
}

export interface Crisis {
  id: string
  title: string
  description: string
  era: number // 1-5 corresponding to eras
  urgency: "low" | "medium" | "high" | "critical"
  decisions: Decision[]
  timeLimit?: number // days to respond (optional, as per new mechanics)
  unresolvedPenalty?: {
    type: "networkHealth" | "publicConfidence" | "techAdvancement"
    change: number // negative value for penalty
  }
}

// Initial game state
export const initialGameState: GameState = {
  currentYear: 2035,
  currentMonth: 1,
  termProgress: 0,
  networkHealth: 50,
  publicConfidence: 60,
  techAdvancement: 45,
  decisions: [],
  unresolvedCrises: [],
  completedLessons: [],
  gamePhase: "intro",
  currentDecision: 0,
  totalDecisionsInEra: 1, // Intro has 1 decision (policy direction)
}

// Sample crisis data - to be replaced with Bitcoin/Stacks crises
export const sampleCrises: Crisis[] = []
