import type { Crisis } from "./game-state"

export const crisisEvents: Crisis[] = [
  {
    id: "bitcoin-mining-centralization",
    title: "Bitcoin Mining Centralization Crisis",
    description:
      "Large mining pools have consolidated power, controlling over 60% of Bitcoin's hash rate. Concerns about 51% attacks and centralization threaten the network's decentralization principles. Environmental groups protest the energy consumption of Proof-of-Work mining.",
    era: 1,
    urgency: "high",
    decisions: [
      {
        id: "mining-centralization-decision",
        title: "Mining Centralization Response",
        description: "How should the Guardian respond to mining centralization concerns?",
        options: [
          {
            id: "mandate-decentralization",
            text: "Mandate mining pool decentralization with regulatory caps",
            consequences: [
              { type: "networkHealth", change: -10, description: "Disruption to mining operations" },
              { type: "techAdvancement", change: 5, description: "Encourages alternative consensus mechanisms" },
              { type: "publicConfidence", change: 10, description: "Addresses centralization concerns" },
            ],
            educationalNote: "Mining pools allow individual miners to combine resources, but excessive concentration can threaten network security.",
          },
          {
            id: "environmental-regulations",
            text: "Implement environmental regulations on mining operations",
            consequences: [
              { type: "networkHealth", change: -5, description: "Some miners relocate to unregulated areas" },
              { type: "techAdvancement", change: 10, description: "Accelerates research into Proof-of-Stake alternatives" },
              { type: "publicConfidence", change: 5, description: "Appeals to environmental advocates" },
            ],
            educationalNote: "Bitcoin mining secures the network but consumes significant energy, raising sustainability concerns.",
          },
          {
            id: "market-forces",
            text: "Allow market forces to regulate mining naturally",
            consequences: [
              { type: "techAdvancement", change: 15, description: "Innovation in mining efficiency" },
              { type: "networkHealth", change: -15, description: "Risk of centralization increases" },
              { type: "publicConfidence", change: -10, description: "Public worries about network security" },
            ],
            educationalNote: "Market-driven solutions may lead to more efficient mining but could compromise decentralization.",
          },
        ],
        educationalContent:
          "Bitcoin mining secures the network through Proof-of-Work, but concentration of mining power in large pools raises centralization concerns. The environmental impact of mining has led to debates about sustainability and alternative consensus mechanisms.",
        timestamp: new Date(),
      },
    ],
    unresolvedPenalty: { type: "networkHealth", change: -5 },
  },
  {
    id: "bitcoin-protocol-upgrade",
    title: "Bitcoin Protocol Upgrade Crisis",
    description:
      "A proposed Bitcoin protocol upgrade threatens to split the network. Supporters argue for scalability improvements, while traditionalists defend the original vision. The upgrade could lead to a contentious fork similar to Bitcoin Cash.",
    era: 2,
    urgency: "critical",
    decisions: [
      {
        id: "protocol-upgrade-decision",
        title: "Protocol Upgrade Response",
        description: "How should the Guardian handle the protocol upgrade debate?",
        options: [
          {
            id: "support-upgrade",
            text: "Support the upgrade and provide regulatory backing",
            consequences: [
              { type: "techAdvancement", change: 20, description: "Accelerates Bitcoin development" },
              { type: "networkHealth", change: -15, description: "Risk of chain split" },
              { type: "publicConfidence", change: -5, description: "Community division" },
            ],
            educationalNote: "Protocol upgrades can improve functionality but risk network splits if not universally adopted.",
          },
          {
            id: "oppose-upgrade",
            text: "Oppose the upgrade and enforce the original protocol",
            consequences: [
              { type: "networkHealth", change: 10, description: "Maintains network unity" },
              { type: "techAdvancement", change: -20, description: "Slows innovation" },
              { type: "publicConfidence", change: 15, description: "Preserves Bitcoin's original vision" },
            ],
            educationalNote: "Conserving the original protocol maintains stability but may hinder technological progress.",
          },
          {
            id: "facilitate-consensus",
            text: "Facilitate community consensus without direct intervention",
            consequences: [
              { type: "techAdvancement", change: 5, description: "Allows organic development" },
              { type: "networkHealth", change: 5, description: "Balanced approach" },
              { type: "publicConfidence", change: 10, description: "Respects community governance" },
            ],
            educationalNote: "Community-driven consensus building takes time but leads to more sustainable solutions.",
          },
        ],
        educationalContent:
          "Bitcoin's consensus mechanism requires agreement on protocol changes. Hard forks occur when the network splits due to irreconcilable differences, creating two separate cryptocurrencies.",
        timestamp: new Date(),
      },
    ],
    unresolvedPenalty: { type: "networkHealth", change: -5 },
  },
  {
    id: "bitcoin-etf-regulatory",
    title: "Bitcoin ETF Regulatory Crisis",
    description:
      "Multiple Bitcoin ETF applications are pending approval. Traditional financial institutions demand clear regulatory frameworks, while crypto purists worry about institutional capture of the network.",
    era: 3,
    urgency: "medium",
    decisions: [
      {
        id: "etf-approval-decision",
        title: "ETF Regulatory Response",
        description: "How should the Guardian approach Bitcoin ETF approvals?",
        options: [
          {
            id: "approve-etfs",
            text: "Approve ETFs with strict regulatory oversight",
            consequences: [
              { type: "publicConfidence", change: 20, description: "Increases mainstream adoption" },
              { type: "networkHealth", change: -10, description: "Potential for market manipulation" },
              { type: "techAdvancement", change: -5, description: "Focus shifts to traditional finance" },
            ],
            educationalNote: "ETFs provide institutional access but may introduce traditional financial system risks.",
          },
          {
            id: "reject-etfs",
            text: "Reject ETFs and maintain separation from traditional finance",
            consequences: [
              { type: "techAdvancement", change: 15, description: "Preserves Bitcoin's decentralized nature" },
              { type: "publicConfidence", change: -15, description: "Slows adoption" },
              { type: "networkHealth", change: 10, description: "Reduces institutional influence" },
            ],
            educationalNote: "Maintaining separation preserves decentralization but may limit mainstream adoption.",
          },
          {
            id: "hybrid-framework",
            text: "Create a hybrid regulatory framework",
            consequences: [
              { type: "networkHealth", change: 5, description: "Balanced institutional access" },
              { type: "techAdvancement", change: 5, description: "Allows innovation while maintaining oversight" },
              { type: "publicConfidence", change: 10, description: "Appeals to both sides" },
            ],
            educationalNote: "Hybrid approaches attempt to balance accessibility with decentralization principles.",
          },
        ],
        educationalContent:
          "Exchange-Traded Funds (ETFs) allow investors to gain exposure to Bitcoin without holding it directly. Regulatory approval of Bitcoin ETFs represents a major milestone in institutional adoption.",
        timestamp: new Date(),
      },
    ],
    unresolvedPenalty: { type: "publicConfidence", change: -5 },
  },
  {
    id: "stacks-security-crisis",
    title: "Stacks Smart Contract Security Crisis",
    description:
      "A vulnerability in Stacks smart contracts has been exploited, draining millions from DeFi protocols. The incident highlights the challenges of building complex applications on Bitcoin's Layer 2.",
    era: 4,
    urgency: "critical",
    decisions: [
      {
        id: "stacks-security-decision",
        title: "Stacks Security Response",
        description: "How should the Guardian address the Stacks security vulnerability?",
        options: [
          {
            id: "mandatory-audits",
            text: "Mandate comprehensive security audits for all Stacks protocols",
            consequences: [
              { type: "networkHealth", change: 15, description: "Improves overall ecosystem security" },
              { type: "techAdvancement", change: -10, description: "Slows development" },
              { type: "publicConfidence", change: 10, description: "Rebuilds trust" },
            ],
            educationalNote: "Mandatory audits improve security but may burden developers and slow innovation.",
          },
          {
            id: "bug-bounties",
            text: "Implement bug bounty programs and community-driven security",
            consequences: [
              { type: "techAdvancement", change: 15, description: "Encourages security research" },
              { type: "networkHealth", change: 5, description: "Community-focused approach" },
              { type: "publicConfidence", change: 5, description: "Builds ecosystem resilience" },
            ],
            educationalNote: "Bug bounties incentivize security research and can lead to faster vulnerability discovery.",
          },
          {
            id: "market-forces-security",
            text: "Allow market forces to address security issues",
            consequences: [
              { type: "techAdvancement", change: 20, description: "Rapid innovation and fixes" },
              { type: "networkHealth", change: -20, description: "Continued vulnerabilities" },
              { type: "publicConfidence", change: -15, description: "Erodes confidence in Stacks" },
            ],
            educationalNote: "Market-driven security can be effective but may leave users exposed during the learning process.",
          },
        ],
        educationalContent:
          "Stacks brings smart contract functionality to Bitcoin through Clarity language. While enabling DeFi and dApps, it introduces security challenges not present in Bitcoin's base layer.",
        timestamp: new Date(),
      },
    ],
    unresolvedPenalty: { type: "networkHealth", change: -5 },
  },
]

export function getCrisisByEra(era: number): Crisis[] {
  return crisisEvents.filter((crisis) => crisis.era === era)
}

export function getCrisisById(id: string): Crisis | undefined {
  return crisisEvents.find((crisis) => crisis.id === id)
}

export function getRandomCrisis(): Crisis {
  return crisisEvents[Math.floor(Math.random() * crisisEvents.length)]
}
