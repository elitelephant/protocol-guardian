import type { Decision } from "./game-state"

export const sampleDecisions: Decision[] = [
  {
    id: "bitcoin-mining-regulation",
    title: "Bitcoin Mining Regulation Framework",
    description:
      "Mining operations are expanding globally, raising questions about environmental impact and energy policy. Regulators must balance sustainability with network security.",
    options: [
      {
        id: "carbon-tax",
        text: "Implement carbon tax on mining operations",
        consequences: [
          { type: "publicConfidence", change: 15, description: "Addresses climate concerns" },
          { type: "techAdvancement", change: -10, description: "Increases operational costs" },
          { type: "networkHealth", change: -5, description: "Some miners exit" },
        ],
        educationalNote: "Carbon taxes incentivize greener practices but may reduce mining decentralization.",
      },
      {
        id: "renewable-incentives",
        text: "Promote renewable energy adoption incentives",
        consequences: [
          { type: "techAdvancement", change: 15, description: "Accelerates green mining tech" },
          { type: "networkHealth", change: 10, description: "Maintains security" },
          { type: "publicConfidence", change: 10, description: "Appeals to sustainability advocates" },
        ],
        educationalNote: "Renewable incentives can drive innovation in sustainable mining technologies.",
      },
      {
        id: "regulatory-neutrality",
        text: "Maintain regulatory neutrality on mining",
        consequences: [
          { type: "techAdvancement", change: 20, description: "Unrestricted innovation" },
          { type: "networkHealth", change: 5, description: "Market-driven efficiency" },
          { type: "publicConfidence", change: -5, description: "Ignores environmental concerns" },
        ],
        educationalNote: "Neutral regulation allows market forces to determine mining practices and locations.",
      },
    ],
    educationalContent:
      "Bitcoin mining consumes significant energy but also drives innovation in renewable energy adoption and grid stabilization technologies.",
    timestamp: new Date(),
  },
  {
    id: "stacks-protocol-governance",
    title: "Stacks Protocol Governance",
    description:
      "As Stacks grows, questions arise about governance of the protocol and treasury. Should governance remain decentralized or incorporate regulatory oversight?",
    options: [
      {
        id: "regulatory-oversight",
        text: "Establish regulatory oversight of Stacks governance",
        consequences: [
          { type: "publicConfidence", change: 20, description: "Provides accountability" },
          { type: "techAdvancement", change: -15, description: "Slows autonomous development" },
          { type: "networkHealth", change: 5, description: "Adds stability" },
        ],
        educationalNote: "Regulatory oversight can increase legitimacy but may reduce decentralization.",
      },
      {
        id: "community-governance",
        text: "Support community-driven governance",
        consequences: [
          { type: "techAdvancement", change: 20, description: "Encourages participation" },
          { type: "publicConfidence", change: 10, description: "Builds community trust" },
          { type: "networkHealth", change: 10, description: "Decentralized resilience" },
        ],
        educationalNote: "Community governance maintains decentralization but requires active participation.",
      },
      {
        id: "hybrid-governance",
        text: "Create hybrid governance model",
        consequences: [
          { type: "networkHealth", change: 15, description: "Balanced stability and innovation" },
          { type: "techAdvancement", change: 10, description: "Allows structured development" },
          { type: "publicConfidence", change: 15, description: "Appeals to both sides" },
        ],
        educationalNote: "Hybrid models attempt to combine regulatory accountability with community control.",
      },
    ],
    educationalContent:
      "Stacks uses a unique governance model combining on-chain voting with a treasury system funded by Bitcoin mining rewards, creating a self-sustaining ecosystem.",
    timestamp: new Date(),
  },
]
