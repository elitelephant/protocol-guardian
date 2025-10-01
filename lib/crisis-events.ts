import type { Crisis } from "./game-state"

export const crisisEvents: Crisis[] = [
  {
    id: "privacy-coin-ban",
    title: "Privacy Coin Regulation Crisis",
    description:
      "Several privacy-focused cryptocurrencies are being used for illicit activities. The Western Alliance demands immediate action, while privacy advocates argue for digital rights. Intelligence agencies report a 300% increase in ransomware payments using privacy coins.",
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
            text: "Ban all privacy coins globally with immediate effect",
            consequences: [
              { type: "marketStability", change: -15, description: "Market reacts negatively to heavy regulation" },
              { type: "publicConfidence", change: 10, description: "Public supports anti-crime measures" },
              {
                type: "blocRelationship",
                target: "westernAlliance",
                change: 20,
                description: "Western Alliance strongly approves",
              },
              {
                type: "blocRelationship",
                target: "globalSouth",
                change: -10,
                description: "Global South concerned about financial freedom",
              },
            ],
            educationalNote:
              "Complete bans may drive privacy coin usage underground and could impact legitimate privacy needs.",
          },
          {
            id: "regulate-privacy-coins",
            text: "Implement strict KYC requirements and optional transparency features",
            consequences: [
              { type: "marketStability", change: -5, description: "Moderate market concern about compliance costs" },
              { type: "techAdvancement", change: -10, description: "Innovation slightly hindered by requirements" },
              { type: "publicConfidence", change: 5, description: "Balanced approach appreciated by most" },
              {
                type: "blocRelationship",
                target: "westernAlliance",
                change: 5,
                description: "Western Alliance cautiously supportive",
              },
            ],
            educationalNote:
              "Regulatory compliance features can maintain privacy for legitimate users while enabling law enforcement access.",
          },
          {
            id: "protect-privacy-coins",
            text: "Defend privacy coins as fundamental digital rights with enhanced education",
            consequences: [
              { type: "techAdvancement", change: 15, description: "Privacy innovation flourishes globally" },
              { type: "publicConfidence", change: -15, description: "Public very concerned about criminal activity" },
              {
                type: "blocRelationship",
                target: "westernAlliance",
                change: -25,
                description: "Western Alliance strongly disapproves",
              },
              {
                type: "blocRelationship",
                target: "globalSouth",
                change: 15,
                description: "Global South appreciates privacy protection",
              },
            ],
            educationalNote:
              "Strong privacy protections support human rights but may complicate law enforcement efforts.",
          },
        ],
        educationalContent:
          "Privacy coins use advanced cryptographic techniques like zero-knowledge proofs, ring signatures, and stealth addresses to hide transaction details while maintaining blockchain integrity. The regulatory challenge is balancing legitimate privacy needs with law enforcement requirements.",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "defi-flash-crash",
    title: "DeFi Flash Crash Crisis",
    description:
      "A coordinated attack on multiple DeFi protocols has caused $50 billion in losses within 24 hours. Flash loans were used to manipulate oracle prices, triggering massive liquidations. Traditional markets are beginning to show contagion effects.",
    year: 2036,
    urgency: "critical",
    timeLimit: 3,
    decisions: [
      {
        id: "defi-crash-response",
        title: "DeFi Flash Crash Emergency Response",
        description: "How should FiDeFi respond to the systemic DeFi crisis?",
        options: [
          {
            id: "emergency-shutdown",
            text: "Implement emergency shutdown of all major DeFi protocols",
            consequences: [
              { type: "marketStability", change: 20, description: "Immediate market stabilization" },
              { type: "techAdvancement", change: -30, description: "Innovation severely damaged" },
              { type: "publicConfidence", change: -10, description: "Public questions DeFi viability" },
              {
                type: "blocRelationship",
                target: "easternBloc",
                change: 15,
                description: "Eastern Bloc supports strong intervention",
              },
            ],
            educationalNote:
              "Emergency shutdowns can prevent further losses but may undermine the decentralized nature of DeFi.",
          },
          {
            id: "circuit-breakers",
            text: "Mandate circuit breakers and improved oracle systems",
            consequences: [
              { type: "marketStability", change: 10, description: "Gradual market recovery with safeguards" },
              { type: "techAdvancement", change: 5, description: "Innovation continues with better infrastructure" },
              { type: "publicConfidence", change: 15, description: "Public appreciates measured response" },
            ],
            educationalNote:
              "Circuit breakers can prevent cascading failures while preserving the benefits of decentralized finance.",
          },
          {
            id: "market-solution",
            text: "Allow market forces to resolve the crisis naturally",
            consequences: [
              { type: "marketStability", change: -25, description: "Continued market volatility and uncertainty" },
              { type: "techAdvancement", change: 10, description: "Market-driven solutions emerge" },
              { type: "publicConfidence", change: -20, description: "Public loses faith in regulatory protection" },
              {
                type: "blocRelationship",
                target: "globalSouth",
                change: 5,
                description: "Global South appreciates non-intervention",
              },
            ],
            educationalNote:
              "Market-driven solutions may be more resilient long-term but could cause significant short-term damage.",
          },
        ],
        educationalContent:
          "Flash loans allow borrowing large amounts without collateral within a single transaction. While enabling innovative arbitrage and liquidation mechanisms, they can also be used for market manipulation and oracle attacks that destabilize entire protocols.",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "cbdc-competition",
    title: "CBDC Competitive Crisis",
    description:
      "China's digital yuan has gained 40% global market share in international trade settlements, threatening the dominance of traditional reserve currencies. The Western Alliance is demanding coordinated CBDC development to maintain monetary sovereignty.",
    year: 2037,
    urgency: "medium",
    timeLimit: 14,
    decisions: [
      {
        id: "cbdc-strategy",
        title: "Global CBDC Coordination Strategy",
        description: "How should FiDeFi coordinate the global CBDC landscape?",
        options: [
          {
            id: "unified-cbdc",
            text: "Promote a unified global CBDC standard with interoperability protocols",
            consequences: [
              { type: "marketStability", change: 15, description: "Reduced currency competition volatility" },
              { type: "techAdvancement", change: 20, description: "Accelerated CBDC innovation" },
              {
                type: "blocRelationship",
                target: "westernAlliance",
                change: 10,
                description: "Western Alliance supports coordination",
              },
              {
                type: "blocRelationship",
                target: "easternBloc",
                change: -15,
                description: "Eastern Bloc resists losing competitive advantage",
              },
            ],
            educationalNote:
              "Unified standards could reduce fragmentation but may be difficult to achieve given geopolitical tensions.",
          },
          {
            id: "competitive-cbdcs",
            text: "Allow competitive CBDC development with minimal coordination",
            consequences: [
              { type: "marketStability", change: -10, description: "Increased currency competition and volatility" },
              { type: "techAdvancement", change: 25, description: "Rapid innovation through competition" },
              {
                type: "blocRelationship",
                target: "easternBloc",
                change: 10,
                description: "Eastern Bloc appreciates competitive approach",
              },
              {
                type: "blocRelationship",
                target: "westernAlliance",
                change: -5,
                description: "Western Alliance concerned about coordination",
              },
            ],
            educationalNote:
              "Competition can drive innovation but may lead to fragmentation and reduced interoperability.",
          },
          {
            id: "cbdc-moratorium",
            text: "Implement temporary moratorium on new CBDC launches",
            consequences: [
              { type: "marketStability", change: 5, description: "Reduced short-term uncertainty" },
              { type: "techAdvancement", change: -15, description: "Innovation slowed by regulatory pause" },
              { type: "publicConfidence", change: -5, description: "Public questions regulatory decisiveness" },
              {
                type: "blocRelationship",
                target: "globalSouth",
                change: -10,
                description: "Global South frustrated by development delays",
              },
            ],
            educationalNote:
              "Moratoriums can provide time for coordination but may allow first-movers to consolidate advantages.",
          },
        ],
        educationalContent:
          "CBDCs represent government-issued digital currencies that could reshape international monetary systems. Unlike cryptocurrencies, CBDCs are centrally controlled and can incorporate policy tools like programmable money and direct monetary policy transmission.",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "quantum-threat",
    title: "Quantum Computing Threat",
    description:
      "A breakthrough in quantum computing has made current cryptographic standards vulnerable. Several major cryptocurrencies could be compromised within 18 months. The entire blockchain ecosystem needs urgent cryptographic upgrades.",
    year: 2038,
    urgency: "critical",
    timeLimit: 5,
    decisions: [
      {
        id: "quantum-response",
        title: "Quantum Cryptography Emergency Response",
        description: "How should FiDeFi address the quantum computing threat?",
        options: [
          {
            id: "mandatory-upgrade",
            text: "Mandate immediate quantum-resistant cryptography upgrades",
            consequences: [
              { type: "marketStability", change: -20, description: "Market disruption from forced upgrades" },
              { type: "techAdvancement", change: 30, description: "Accelerated quantum-resistant innovation" },
              { type: "publicConfidence", change: 10, description: "Public appreciates proactive security measures" },
            ],
            educationalNote:
              "Mandatory upgrades ensure security but may cause significant disruption to existing systems.",
          },
          {
            id: "gradual-transition",
            text: "Implement gradual transition plan with incentives for early adoption",
            consequences: [
              { type: "marketStability", change: 5, description: "Smoother market transition" },
              { type: "techAdvancement", change: 15, description: "Steady progress toward quantum resistance" },
              { type: "publicConfidence", change: -5, description: "Some public concern about timeline" },
            ],
            educationalNote:
              "Gradual transitions reduce disruption but may leave some systems vulnerable during the transition period.",
          },
          {
            id: "research-focus",
            text: "Focus on quantum computing research rather than immediate upgrades",
            consequences: [
              { type: "marketStability", change: -5, description: "Continued uncertainty about quantum timeline" },
              { type: "techAdvancement", change: 20, description: "Advanced quantum research capabilities" },
              { type: "publicConfidence", change: -15, description: "Public worried about inadequate protection" },
            ],
            educationalNote:
              "Research-focused approaches may yield better long-term solutions but leave current systems at risk.",
          },
        ],
        educationalContent:
          "Quantum computers could break current cryptographic algorithms that secure blockchain networks. Post-quantum cryptography uses mathematical problems believed to be resistant to both classical and quantum computers, but requires significant changes to existing systems.",
        timestamp: new Date(),
      },
    ],
  },
]

export function getCrisisByYear(year: number): Crisis[] {
  return crisisEvents.filter((crisis) => crisis.year === year)
}

export function getCrisisById(id: string): Crisis | undefined {
  return crisisEvents.find((crisis) => crisis.id === id)
}

export function getRandomCrisis(): Crisis {
  return crisisEvents[Math.floor(Math.random() * crisisEvents.length)]
}
