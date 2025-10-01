export interface GameState {
  // Core game data
  currentYear: number
  currentMonth: number
  termProgress: number // 0-100 percentage through 5-year term

  // Three dynamic indicators (0-100)
  marketStability: number
  publicConfidence: number
  techAdvancement: number

  // Geopolitical bloc relationships (-100 to 100)
  blocRelationships: {
    westernAlliance: number
    easternBloc: number
    globalSouth: number
  }

  // Player decisions and consequences
  decisions: Decision[]
  currentCrisis?: Crisis

  // Educational progress
  completedLessons: string[]

  // Game progression
  gamePhase: "intro" | "year1" | "year2" | "year3" | "year4" | "year5" | "ending"
  endingType?: "authoritarian" | "libertarian" | "balanced" | "chaos"
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
  type: "marketStability" | "publicConfidence" | "techAdvancement" | "blocRelationship"
  target?: "westernAlliance" | "easternBloc" | "globalSouth"
  change: number
  description: string
}

export interface Crisis {
  id: string
  title: string
  description: string
  year: number
  urgency: "low" | "medium" | "high" | "critical"
  decisions: Decision[]
  timeLimit?: number // days to respond
}

// Initial game state
export const initialGameState: GameState = {
  currentYear: 2035,
  currentMonth: 1,
  termProgress: 0,
  marketStability: 50,
  publicConfidence: 60,
  techAdvancement: 45,
  blocRelationships: {
    westernAlliance: 0,
    easternBloc: 0,
    globalSouth: 0,
  },
  decisions: [],
  completedLessons: [],
  gamePhase: "intro",
}

// Sample crisis data
export const sampleCrises: Crisis[] = [
  {
    id: "privacy-coin-ban",
    title: "Privacy Coin Regulation Crisis",
    description:
      "Several privacy-focused cryptocurrencies are being used for illicit activities. The Western Alliance demands immediate action, while privacy advocates argue for digital rights.",
    year: 2035,
    urgency: "high",
    timeLimit: 7,
    decisions: [
      {
        id: "privacy-decision-1",
        title: "Privacy Coin Response",
        description: "How should FiDeFi respond to the privacy coin crisis?",
        options: [
          {
            id: "ban-privacy-coins",
            text: "Ban all privacy coins globally",
            consequences: [
              { type: "marketStability", change: -15, description: "Market reacts negatively to heavy regulation" },
              { type: "publicConfidence", change: 10, description: "Public supports anti-crime measures" },
              {
                type: "blocRelationship",
                target: "westernAlliance",
                change: 20,
                description: "Western Alliance approves",
              },
            ],
          },
          {
            id: "regulate-privacy-coins",
            text: "Implement strict KYC requirements for privacy coins",
            consequences: [
              { type: "marketStability", change: -5, description: "Moderate market concern" },
              { type: "techAdvancement", change: -10, description: "Innovation slightly hindered" },
              { type: "publicConfidence", change: 5, description: "Balanced approach appreciated" },
            ],
          },
          {
            id: "protect-privacy-coins",
            text: "Defend privacy coins as fundamental digital rights",
            consequences: [
              { type: "techAdvancement", change: 15, description: "Innovation flourishes" },
              { type: "publicConfidence", change: -10, description: "Public concerned about crime" },
              {
                type: "blocRelationship",
                target: "westernAlliance",
                change: -15,
                description: "Western Alliance disapproves",
              },
            ],
          },
        ],
        educationalContent:
          "Privacy coins use advanced cryptographic techniques like zero-knowledge proofs to hide transaction details while maintaining blockchain integrity.",
        timestamp: new Date(),
      },
    ],
  },
]
