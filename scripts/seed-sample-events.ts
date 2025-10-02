const sampleEvents = [
  {
    title: "Major Mining Pool Consolidation",
    description:
      "Large pools merge, raising 51% attack fears. If Network Health drops below 20, triggers early termination due to network instability.",
    content:
      "In a surprising move that has sent shockwaves through the Bitcoin mining community, three of the world's largest mining pools have announced their merger into a single entity controlling over 65% of the global hash rate. The newly formed MegaPool claims the consolidation is necessary for 'operational efficiency and network stability,' but critics argue it represents the most significant centralization threat to Bitcoin since its inception.\n\nThe merger comes at a time when environmental concerns about Bitcoin mining have already pushed many smaller operations out of business. MegaPool's leadership has promised to invest heavily in renewable energy sources, but skeptics question whether this consolidation will ultimately lead to the kind of 51% attacks that could undermine Bitcoin's immutability.\n\nNetwork analysts are closely monitoring hash rate distribution, with some predicting that if MegaPool's dominance continues unchecked, it could force a contentious protocol upgrade to address mining centralization concerns.",
    category: "security-incident",
    tags: ["bitcoin", "mining", "centralization"],
    priority: "critical",
    status: "published",
    author: "Network Security Team",
    triggerConditions: {
      minMonth: 1,
      networkHealthRange: [0, 70],
    },
    consequences: {
      networkHealth: -15,
      publicConfidence: -20,
      techAdvancement: -5,
    },
  },
  {
    title: "Bitcoin Whitepaper Anniversary Celebration",
    description: "Celebrations highlight Bitcoin's origins and cypherpunk movement.",
    content:
      "The Bitcoin community worldwide is celebrating the 30th anniversary of Satoshi Nakamoto's whitepaper publication, marking a milestone that has transformed from a radical idea into the foundation of a global financial system. Cities around the world are hosting events, conferences, and educational programs to honor the cypherpunk movement that birthed cryptocurrency.\n\nThe anniversary comes at a pivotal moment as Bitcoin faces increasing scrutiny from regulators and environmental groups. Many in the community are reflecting on Satoshi's original vision of 'a system for electronic transactions without relying on trust,' questioning whether the current trajectory aligns with those principles.\n\nNotable events include the 'Cypherpunk Revival Conference' in Prague, birthplace of much of the original cypherpunk movement, and the 'Bitcoin Garden' installation in San Francisco featuring living representations of blockchain data structures. The celebrations have sparked renewed discussions about Bitcoin's role in promoting financial freedom and challenging traditional power structures.",
    category: "cultural-event",
    tags: ["bitcoin", "history", "community"],
    priority: "high",
    status: "published",
    author: "Community Relations Team",
    triggerConditions: {
      minMonth: 3,
      publicConfidenceRange: [40, 100],
    },
    consequences: {
      publicConfidence: 15,
      networkHealth: 5,
      techAdvancement: 8,
    },
  },
  {
    title: "Stacks Smart Contract Launch",
    description: "Stacks enables smart contracts on Bitcoin, opening DeFi possibilities.",
    content:
      "The Stacks ecosystem has reached a major milestone with the successful launch of its smart contract functionality on the Bitcoin network. This breakthrough allows developers to build decentralized applications and financial protocols directly on Bitcoin for the first time, without requiring users to leave the most secure blockchain network.\n\nThe launch includes the mainnet deployment of the Clarity programming language, designed specifically for smart contracts with a focus on security and predictability. Early applications include decentralized exchanges, lending protocols, and non-fungible token marketplaces that settle directly on Bitcoin.\n\nIndustry observers note that this development could significantly expand Bitcoin's utility beyond simple value transfer, potentially attracting institutional capital and developers from other blockchain ecosystems. However, some traditional Bitcoin maximalists have expressed concern that this 'layering' approach might compromise Bitcoin's simplicity and security.",
    category: "technology-breakthrough",
    tags: ["stacks", "bitcoin", "smart-contracts"],
    priority: "high",
    status: "published",
    author: "Technology Research Division",
    triggerConditions: {
      minMonth: 6,
      techAdvancementRange: [70, 100],
    },
    consequences: {
      techAdvancement: 20,
      networkHealth: 10,
      publicConfidence: 12,
    },
  },
  {
    title: "Institutional Mining Investment Surge",
    description: "Major corporations invest in mining infrastructure.",
    content:
      "A wave of institutional investment in Bitcoin mining infrastructure has reached unprecedented levels, with major corporations announcing over $50 billion in mining-related commitments. Tech giants, energy companies, and financial institutions are establishing mining operations in regions with abundant renewable energy sources.\n\nThe investments are driven by Bitcoin's maturation as a treasury reserve asset and the growing recognition of mining's role in securing the network. Companies are not only building their own mining facilities but also investing in grid stabilization technology and renewable energy projects that benefit both their operations and local communities.\n\nThis institutional involvement has sparked debates about the future of mining decentralization. While some welcome the capital influx and technological improvements, others worry that corporate dominance could lead to centralized control of Bitcoin's consensus mechanism. Mining pool operators are already reporting increased pressure to accommodate large-scale industrial miners.",
    category: "institutional-adoption",
    tags: ["bitcoin", "mining", "institutional"],
    priority: "high",
    status: "published",
    author: "Market Analysis Team",
    triggerConditions: {
      minMonth: 8,
      publicConfidenceRange: [50, 100],
    },
    consequences: {
      networkHealth: 15,
      publicConfidence: 18,
      techAdvancement: 10,
    },
  },
  {
    title: "Bitcoin Scalability Concerns Escalate",
    description: "Community debates Bitcoin's ability to handle mass adoption through Layer 2 solutions.",
    content:
      "As Bitcoin adoption grows among merchants and institutions, scalability concerns have reached a critical point. Transaction fees have spiked to record highs during peak usage periods, and confirmation times have become unpredictable. The debate over Bitcoin's ability to serve as a global payment system has intensified.\n\nLayer 2 solutions like the Lightning Network and Stacks have seen rapid development, but adoption remains limited. Critics argue that Bitcoin's base layer limitations make it unsuitable for high-frequency transactions, while proponents maintain that Layer 2 solutions provide the necessary scalability without compromising security.\n\nThe situation has led to renewed discussions about protocol upgrades, with some developers pushing for increased block sizes while others advocate for enhanced Layer 2 infrastructure. If unresolved, these scalability issues could hinder Bitcoin's path to mass adoption and drive users toward alternative cryptocurrencies with lower fees and faster transactions.",
    category: "scalability-debate",
    tags: ["bitcoin", "scalability", "layer2"],
    priority: "high",
    status: "published",
    author: "Network Analysis Team",
    triggerConditions: {
      minMonth: 10,
      networkHealthRange: [40, 80],
    },
    consequences: {
      networkHealth: -12,
      publicConfidence: -8,
      techAdvancement: 15,
    },
  },
  {
    title: "Corporate Bitcoin Treasury Adoption Accelerates",
    description: "Companies like Tesla and Square add Bitcoin to balance sheets.",
    content:
      "The trend of corporate Bitcoin treasury adoption has accelerated dramatically, with dozens of major companies announcing Bitcoin purchases totaling over $100 billion in the past quarter. From MicroStrategy's continued accumulation to new adopters like Square, Tesla, and even traditional banks, Bitcoin has become a standard component of corporate treasury management.\n\nCompanies cite Bitcoin's inflation-hedging properties, institutional-grade custody solutions, and the asset's increasing liquidity as key factors in their decisions. The announcements have contributed to Bitcoin's market capitalization reaching new all-time highs and attracted significant attention from traditional financial analysts.\n\nHowever, this corporate enthusiasm has raised concerns about Bitcoin's volatility impact on corporate balance sheets and whether this trend represents genuine adoption or speculative positioning. Regulators are beginning to scrutinize how companies account for Bitcoin holdings and the implications for financial reporting standards.",
    category: "institutional-adoption",
    tags: ["bitcoin", "corporate", "treasury"],
    priority: "high",
    status: "published",
    author: "Financial Analysis Team",
    triggerConditions: {
      minMonth: 12,
      networkHealthRange: [60, 100],
      publicConfidenceRange: [55, 100],
    },
    consequences: {
      publicConfidence: 20,
      networkHealth: 15,
      techAdvancement: 8,
    },
  },
  {
    title: "Stacks DeFi Protocol Growth Explosion",
    description: "Stacks-based DeFi sees rapid user adoption.",
    content:
      "The Stacks ecosystem has experienced explosive growth in decentralized finance applications, with total value locked surpassing $50 billion in just six months. Smart contracts built on Bitcoin through Stacks have enabled a new generation of DeFi protocols offering lending, borrowing, and yield farming directly on the most secure blockchain.\n\nThe growth has been fueled by Bitcoin's institutional adoption and the desire for DeFi functionality without the security trade-offs of other networks. Major DeFi primitives like automated market makers, stablecoin protocols, and decentralized exchanges have all launched on Stacks, attracting users and developers from Ethereum and other ecosystems.\n\nThis success has validated the Layer 2 approach to Bitcoin scaling, demonstrating that complex financial applications can be built without compromising Bitcoin's base layer security. However, it has also raised questions about regulatory oversight for these Bitcoin-based financial protocols and their integration with traditional financial systems.",
    category: "defi-growth",
    tags: ["stacks", "defi", "bitcoin"],
    priority: "high",
    status: "published",
    author: "DeFi Research Team",
    triggerConditions: {
      minMonth: 15,
      techAdvancementRange: [55, 100],
    },
    consequences: {
      techAdvancement: 25,
      networkHealth: 12,
      publicConfidence: 15,
    },
  },
  {
    title: "Bitcoin Layer 2 Interoperability Advances",
    description: "Multiple L2s including Stacks compete for adoption.",
    content:
      "The Bitcoin Layer 2 landscape has become increasingly competitive and interoperable, with Stacks, Lightning Network, and emerging solutions like RGB and Liquid all vying for market share. Cross-protocol bridges and interoperability standards are emerging, allowing users to move assets seamlessly between different Layer 2 solutions.\n\nThis competition has accelerated innovation in Bitcoin scaling technology, with each protocol offering unique advantages. Stacks provides smart contract functionality, Lightning enables instant micropayments, RGB offers enhanced privacy features, and Liquid provides faster settlement for institutional trading.\n\nThe interoperability developments suggest a maturing ecosystem where different solutions complement rather than compete with each other. However, the fragmentation also raises concerns about user experience and the complexity of managing multiple Layer 2 solutions. Industry leaders are calling for standardization efforts to ensure seamless user experience across the Bitcoin Layer 2 landscape.",
    category: "interoperability",
    tags: ["bitcoin", "layer2", "interoperability"],
    priority: "high",
    status: "published",
    author: "Protocol Analysis Team",
    triggerConditions: {
      minMonth: 18,
      techAdvancementRange: [60, 100],
    },
    consequences: {
      techAdvancement: 20,
      networkHealth: 10,
      publicConfidence: 8,
    },
  },
  {
    title: "Quantum Threat to Bitcoin Emerges",
    description: "Research shows quantum computers could threaten ECDSA signatures.",
    content:
      "A breakthrough in quantum computing research has brought the threat to Bitcoin's cryptographic security significantly closer to reality. Scientists have demonstrated that current quantum computers could potentially derive private keys from public keys using Shor's algorithm, threatening the ECDSA signatures that secure Bitcoin transactions.\n\nWhile practical quantum attacks on Bitcoin remain years away, the research has prompted urgent discussions within the Bitcoin community about post-quantum cryptography adoption. Developers are accelerating work on quantum-resistant signature schemes that could replace ECDSA in future protocol upgrades.\n\nThe quantum threat has created a mixed reaction in the Bitcoin ecosystem. Some view it as an opportunity to strengthen Bitcoin's cryptography, while others worry about the disruption and uncertainty surrounding a potential protocol upgrade. If Network Health drops below 30 due to quantum concerns, it could trigger early termination due to perceived existential security threats.",
    category: "security-threat",
    tags: ["bitcoin", "quantum", "cryptography"],
    priority: "critical",
    status: "published",
    author: "Cryptography Research Team",
    triggerConditions: {
      minMonth: 20,
      networkHealthRange: [80, 100],
    },
    consequences: {
      networkHealth: -18,
      publicConfidence: -12,
      techAdvancement: 15,
    },
  },
]

// Function to seed events into localStorage
function seedSampleEvents() {
  try {
    // Get existing events
    const existingEvents = JSON.parse(localStorage.getItem("cre-game-events") || "[]")

    // Get categories and tags from localStorage
    const categories = JSON.parse(localStorage.getItem("cre-game-categories") || "[]")
    const tags = JSON.parse(localStorage.getItem("cre-game-tags") || "[]")

    // Convert sample events to full event objects
    const fullEvents = sampleEvents.map((event, index) => {
      const category = categories.find((c: any) => c.id === event.category)
      const eventTags = tags.filter((t: any) => event.tags.includes(t.id))

      return {
        id: `sample-event-${Date.now()}-${index}`,
        title: event.title,
        description: event.description,
        content: event.content,
        category: category || categories[0], // Fallback to first category
        tags: eventTags,
        priority: event.priority,
        status: event.status,
        author: event.author,
        triggerConditions: event.triggerConditions,
        consequences: event.consequences,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
        updatedAt: new Date().toISOString(),
        publishedAt: event.status === "published" ? new Date().toISOString() : undefined,
      }
    })

    // Combine with existing events (avoid duplicates by title)
    const existingTitles = existingEvents.map((e: any) => e.title)
    const newEvents = fullEvents.filter((e) => !existingTitles.includes(e.title))

    const allEvents = [...existingEvents, ...newEvents]

    // Save back to localStorage
    localStorage.setItem("cre-game-events", JSON.stringify(allEvents))

    console.log(`[v0] Seeded ${newEvents.length} sample events. Total events: ${allEvents.length}`)

    return {
      success: true,
      seeded: newEvents.length,
      total: allEvents.length,
    }
  } catch (error) {
    console.error("[v0] Error seeding sample events:", error)
    return {
      success: false,
      error: (error as Error).message,
    }
  }
}

// Execute the seeding
const result = seedSampleEvents()
console.log("[v0] Sample events seeding result:", result)

export { seedSampleEvents }
