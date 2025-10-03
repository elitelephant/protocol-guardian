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
  // Era 1 Sample Events
  {
    id: "major-mining-pool-consolidation",
    title: "Major Mining Pool Consolidation",
    description:
      "Large mining pools have merged, raising concerns about 51% attacks and centralization. This consolidation threatens the network's decentralization principles established by Satoshi Nakamoto.",
    options: [
      {
        id: "intervene-consolidation",
        text: "Intervene to break up the largest mining pools",
        consequences: [
          { type: "networkHealth", change: 10, description: "Restores decentralization" },
          { type: "techAdvancement", change: -5, description: "Disrupts mining operations" },
          { type: "publicConfidence", change: 15, description: "Addresses centralization fears" },
        ],
        educationalNote: "Mining pools allow individual miners to combine resources, but excessive concentration threatens network security.",
      },
      {
        id: "monitor-consolidation",
        text: "Monitor the situation without intervention",
        consequences: [
          { type: "techAdvancement", change: 5, description: "Allows natural market evolution" },
          { type: "networkHealth", change: -10, description: "Increases centralization risk" },
          { type: "publicConfidence", change: -10, description: "Raises security concerns" },
        ],
        educationalNote: "Market forces may eventually correct imbalances, but inaction carries significant risks.",
      },
      {
        id: "regulate-pool-size",
        text: "Implement voluntary pool size guidelines",
        consequences: [
          { type: "networkHealth", change: 5, description: "Encourages responsible practices" },
          { type: "techAdvancement", change: 5, description: "Promotes industry standards" },
          { type: "publicConfidence", change: 5, description: "Shows proactive governance" },
        ],
        educationalNote: "Voluntary guidelines can balance decentralization with operational efficiency.",
      },
    ],
    educationalContent:
      "Mining pools are essential for consistent block production but can become too powerful. The 51% attack threshold represents a critical security boundary that must be maintained.",
    timestamp: new Date(),
  },
  // Era 2 Sample Events
  {
    id: "stacks-smart-contract-launch",
    title: "Stacks Smart Contract Launch",
    description:
      "Stacks has successfully launched smart contract functionality on Bitcoin, enabling decentralized applications and opening new possibilities for Bitcoin's ecosystem.",
    options: [
      {
        id: "embrace-stacks-launch",
        text: "Embrace and promote Stacks ecosystem growth",
        consequences: [
          { type: "techAdvancement", change: 20, description: "Accelerates Layer 2 innovation" },
          { type: "publicConfidence", change: 10, description: "Shows forward momentum" },
          { type: "networkHealth", change: -5, description: "Adds complexity to ecosystem" },
        ],
        educationalNote: "Stacks brings smart contract functionality to Bitcoin without changing Bitcoin's base layer.",
      },
      {
        id: "cautious-stacks-approach",
        text: "Take a cautious approach to Stacks adoption",
        consequences: [
          { type: "networkHealth", change: 10, description: "Maintains focus on base layer" },
          { type: "techAdvancement", change: -10, description: "Slows Layer 2 development" },
          { type: "publicConfidence", change: -5, description: "Seen as resistant to progress" },
        ],
        educationalNote: "While innovative, Layer 2 solutions add complexity that must be carefully managed.",
      },
      {
        id: "collaborate-stacks",
        text: "Collaborate with Stacks for ecosystem integration",
        consequences: [
          { type: "techAdvancement", change: 15, description: "Enables coordinated development" },
          { type: "networkHealth", change: 5, description: "Maintains ecosystem stability" },
          { type: "publicConfidence", change: 15, description: "Demonstrates cooperative leadership" },
        ],
        educationalNote: "Collaboration between base layer and Layer 2 can create a more cohesive ecosystem.",
      },
    ],
    educationalContent:
      "Stacks enables smart contracts on Bitcoin through a unique consensus mechanism, allowing developers to build decentralized applications while leveraging Bitcoin's security.",
    timestamp: new Date(),
  },
  {
    id: "bitcoin-scalability-concerns",
    title: "Bitcoin Scalability Concerns",
    description:
      "Community debates about Bitcoin's ability to handle mass adoption intensify. Layer 2 solutions and base layer improvements are proposed as potential solutions.",
    options: [
      {
        id: "prioritize-layer2-scaling",
        text: "Prioritize Layer 2 scaling solutions",
        consequences: [
          { type: "techAdvancement", change: 20, description: "Accelerates Layer 2 development" },
          { type: "networkHealth", change: -10, description: "Adds ecosystem complexity" },
          { type: "publicConfidence", change: 5, description: "Addresses adoption concerns" },
        ],
        educationalNote: "Layer 2 solutions can dramatically increase Bitcoin's transaction capacity.",
      },
      {
        id: "focus-base-layer",
        text: "Focus on base layer optimizations",
        consequences: [
          { type: "networkHealth", change: 15, description: "Strengthens Bitcoin's foundation" },
          { type: "techAdvancement", change: -15, description: "Limits innovation scope" },
          { type: "publicConfidence", change: -10, description: "May hinder adoption" },
        ],
        educationalNote: "Base layer changes require extreme caution due to their irreversible nature.",
      },
      {
        id: "balanced-scaling-approach",
        text: "Pursue balanced scaling strategy",
        consequences: [
          { type: "techAdvancement", change: 10, description: "Supports multiple approaches" },
          { type: "networkHealth", change: 5, description: "Maintains stability" },
          { type: "publicConfidence", change: 10, description: "Appeals to different viewpoints" },
        ],
        educationalNote: "A balanced approach acknowledges that both Layer 2 and base layer improvements have roles to play.",
      },
    ],
    educationalContent:
      "Bitcoin's scalability debate centers on the balance between security, decentralization, and transaction capacity. Layer 2 solutions offer promising paths forward.",
    timestamp: new Date(),
  },
  // Era 3 Sample Events
  {
    id: "corporate-bitcoin-adoption",
    title: "Corporate Bitcoin Treasury Adoption",
    description:
      "Major corporations like Tesla and Square have added Bitcoin to their balance sheets, signaling growing institutional acceptance of Bitcoin as a treasury reserve asset.",
    options: [
      {
        id: "encourage-corporate-adoption",
        text: "Encourage corporate Bitcoin adoption",
        consequences: [
          { type: "publicConfidence", change: 20, description: "Demonstrates mainstream acceptance" },
          { type: "networkHealth", change: -10, description: "Increases institutional influence" },
          { type: "techAdvancement", change: -5, description: "Shifts focus from innovation" },
        ],
        educationalNote: "Corporate adoption brings legitimacy but also introduces traditional financial system dynamics.",
      },
      {
        id: "maintain-neutrality",
        text: "Maintain regulatory neutrality",
        consequences: [
          { type: "techAdvancement", change: 10, description: "Preserves innovation focus" },
          { type: "networkHealth", change: 5, description: "Balances various interests" },
          { type: "publicConfidence", change: 5, description: "Appeals to different stakeholders" },
        ],
        educationalNote: "Neutral regulatory approaches allow market forces to determine adoption patterns.",
      },
      {
        id: "create-institutional-framework",
        text: "Create institutional adoption framework",
        consequences: [
          { type: "publicConfidence", change: 15, description: "Provides clear guidance for institutions" },
          { type: "networkHealth", change: 10, description: "Manages institutional influence" },
          { type: "techAdvancement", change: 5, description: "Supports enterprise solutions" },
        ],
        educationalNote: "Structured frameworks can harness institutional capital while maintaining network integrity.",
      },
    ],
    educationalContent:
      "Corporate adoption of Bitcoin represents a significant milestone in cryptocurrency's journey toward mainstream financial acceptance.",
    timestamp: new Date(),
  },
  // Era 4 Sample Events
  {
    id: "bitcoin-layer2-interoperability",
    title: "Bitcoin Layer 2 Interoperability",
    description:
      "Multiple Layer 2 solutions including Stacks compete for adoption. Questions arise about interoperability between different Bitcoin Layer 2 protocols.",
    options: [
      {
        id: "promote-interoperability",
        text: "Promote interoperability standards",
        consequences: [
          { type: "techAdvancement", change: 15, description: "Enables cross-chain functionality" },
          { type: "networkHealth", change: 5, description: "Creates cohesive ecosystem" },
          { type: "publicConfidence", change: 10, description: "Builds unified vision" },
        ],
        educationalNote: "Interoperability allows assets and data to move seamlessly between Layer 2 solutions.",
      },
      {
        id: "allow-competition",
        text: "Allow market competition to determine winners",
        consequences: [
          { type: "techAdvancement", change: 20, description: "Drives innovation through competition" },
          { type: "networkHealth", change: -5, description: "May create fragmentation" },
          { type: "publicConfidence", change: -5, description: "Creates uncertainty" },
        ],
        educationalNote: "Competition can accelerate innovation but may lead to ecosystem fragmentation.",
      },
      {
        id: "facilitate-cooperation",
        text: "Facilitate cooperation between Layer 2 projects",
        consequences: [
          { type: "techAdvancement", change: 10, description: "Encourages collaborative innovation" },
          { type: "networkHealth", change: 10, description: "Builds ecosystem resilience" },
          { type: "publicConfidence", change: 15, description: "Demonstrates leadership" },
        ],
        educationalNote: "Cooperation between competing projects can create stronger, more interoperable solutions.",
      },
    ],
    educationalContent:
      "Layer 2 interoperability is crucial for Bitcoin's ecosystem to reach its full potential, allowing seamless movement of assets and data across different protocols.",
    timestamp: new Date(),
  },
  {
    id: "quantum-threat-bitcoin",
    title: "Quantum Threat to Bitcoin",
    description:
      "Research shows quantum computers could potentially threaten ECDSA signatures used in Bitcoin. The network must prepare for this future cryptographic challenge.",
    options: [
      {
        id: "accelerate-quantum-resistance",
        text: "Accelerate transition to quantum-resistant cryptography",
        consequences: [
          { type: "techAdvancement", change: 20, description: "Advances cryptographic research" },
          { type: "networkHealth", change: 10, description: "Future-proofs the network" },
          { type: "publicConfidence", change: 5, description: "Shows proactive leadership" },
        ],
        educationalNote: "Quantum-resistant algorithms are essential for Bitcoin's long-term security.",
      },
      {
        id: "monitor-quantum-threat",
        text: "Monitor quantum developments without immediate action",
        consequences: [
          { type: "techAdvancement", change: -10, description: "Delays necessary preparations" },
          { type: "networkHealth", change: -20, description: "Creates existential risk" },
          { type: "publicConfidence", change: -15, description: "Raises security concerns" },
        ],
        educationalNote: "While quantum computers are not imminent, proactive measures are essential for long-term security.",
      },
      {
        id: "research-quantum-solutions",
        text: "Fund research into quantum-resistant solutions",
        consequences: [
          { type: "techAdvancement", change: 15, description: "Accelerates research efforts" },
          { type: "networkHealth", change: 5, description: "Maintains current security" },
          { type: "publicConfidence", change: 10, description: "Demonstrates preparedness" },
        ],
        educationalNote: "Research funding can accelerate the development of quantum-resistant technologies.",
      },
    ],
    educationalContent:
      "Quantum computing poses an existential threat to current cryptographic standards. Bitcoin must evolve its cryptographic foundations to remain secure.",
    timestamp: new Date(),
  },
]
