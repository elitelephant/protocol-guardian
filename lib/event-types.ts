export interface EventTag {
  id: string
  name: string
  color: string
}

export interface EventCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface GameEvent {
  id: string
  title: string
  description: string
  content: string
  category: EventCategory
  tags: EventTag[]
  priority: "low" | "medium" | "high" | "critical"
  status: "draft" | "published" | "archived"
  triggerConditions?: {
    minMonth?: number
    maxMonth?: number
    requiredDecisions?: string[]
    networkHealthRange?: [number, number]
    publicConfidenceRange?: [number, number]
    techAdvancementRange?: [number, number]
  }
  consequences?: {
    networkHealth?: number
    publicConfidence?: number
    techAdvancement?: number
  }
  createdAt: string
  updatedAt: string
  publishedAt?: string
  author: string
}

export interface EventFilter {
  categories?: string[]
  tags?: string[]
  priority?: string[]
  status?: string[]
  search?: string
  dateRange?: {
    start: string
    end: string
  }
}

export const DEFAULT_CATEGORIES: EventCategory[] = [
  {
    id: "market-crisis",
    name: "Market Crisis",
    description: "Major market disruptions and financial instability events",
    icon: "TrendingDown",
    color: "#ef4444",
  },
  {
    id: "regulatory-change",
    name: "Regulatory Change",
    description: "New regulations, policy updates, and compliance requirements",
    icon: "Scale",
    color: "#3b82f6",
  },
  {
    id: "technology-breakthrough",
    name: "Technology Breakthrough",
    description: "Innovation advances and technological developments",
    icon: "Zap",
    color: "#10b981",
  },
  {
    id: "geopolitical-event",
    name: "Geopolitical Event",
    description: "International relations and cross-border regulatory impacts",
    icon: "Globe",
    color: "#f59e0b",
  },
  {
    id: "security-incident",
    name: "Security Incident",
    description: "Cybersecurity breaches, hacks, and security vulnerabilities",
    icon: "Shield",
    color: "#dc2626",
  },
  {
    id: "institutional-adoption",
    name: "Institutional Adoption",
    description: "Major institutions entering or exiting the crypto space",
    icon: "Building",
    color: "#7c3aed",
  },
]

export const DEFAULT_TAGS: EventTag[] = [
  { id: "bitcoin", name: "Bitcoin", color: "#f7931a" },
  { id: "ethereum", name: "Ethereum", color: "#627eea" },
  { id: "defi", name: "DeFi", color: "#ff6b6b" },
  { id: "cbdc", name: "CBDC", color: "#4ecdc4" },
  { id: "stablecoin", name: "Stablecoin", color: "#45b7d1" },
  { id: "nft", name: "NFT", color: "#96ceb4" },
  { id: "mining", name: "Mining", color: "#feca57" },
  { id: "exchange", name: "Exchange", color: "#ff9ff3" },
  { id: "wallet", name: "Wallet", color: "#54a0ff" },
  { id: "privacy", name: "Privacy", color: "#5f27cd" },
  { id: "scaling", name: "Scaling", color: "#00d2d3" },
  { id: "interoperability", name: "Interoperability", color: "#ff6348" },
]
