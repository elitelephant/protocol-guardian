const sampleEvents = [
  {
    title: "Major Exchange Hack Exposes Security Vulnerabilities",
    description:
      "A sophisticated cyberattack on CryptoGlobal Exchange compromises 2.3 million user accounts and $500M in digital assets.",
    content:
      "In the early hours of Tuesday morning, CryptoGlobal Exchange, one of the world's largest cryptocurrency trading platforms, fell victim to a coordinated cyberattack that has sent shockwaves through the digital asset ecosystem. The breach, which security experts are calling one of the most sophisticated attacks in crypto history, resulted in the compromise of 2.3 million user accounts and the theft of approximately $500 million worth of various cryptocurrencies.\n\nThe attack vector appears to have exploited a previously unknown vulnerability in the exchange's multi-signature wallet system, allowing the attackers to bypass multiple layers of security. Initial forensic analysis suggests the breach may have been orchestrated by the same group responsible for the BlackShadow attacks of 2033.\n\nRegulatory bodies worldwide are now calling for immediate implementation of enhanced security standards for all cryptocurrency exchanges. The incident has reignited debates about the need for stricter oversight of digital asset platforms and the adequacy of current cybersecurity frameworks in the rapidly evolving crypto landscape.",
    category: "security-incident",
    tags: ["exchange", "bitcoin", "ethereum", "privacy"],
    priority: "critical",
    status: "published",
    author: "Crisis Response Team",
    triggerConditions: {
      minMonth: 1,
      marketStabilityRange: [0, 70],
    },
    consequences: {
      marketStability: -15,
      publicTrust: -20,
      innovation: -5,
    },
  },
  {
    title: "European Union Announces Comprehensive CBDC Framework",
    description:
      "The EU unveils its digital euro implementation plan, setting new standards for central bank digital currencies globally.",
    content:
      "The European Central Bank (ECB) today announced the completion of its comprehensive framework for the digital euro, marking a significant milestone in the global adoption of Central Bank Digital Currencies (CBDCs). The announcement comes after three years of extensive research, pilot programs, and stakeholder consultations across all 27 EU member states.\n\nThe digital euro framework introduces groundbreaking privacy protections while maintaining compliance with anti-money laundering regulations. Key features include offline transaction capabilities, programmable money functions for government benefits, and interoperability with existing payment systems.\n\nECB President Christine Lagarde emphasized that the digital euro will complement, not replace, physical cash and existing digital payment methods. The phased rollout is expected to begin in Q3 2035, with full implementation across the eurozone by 2037.\n\nThis development is likely to accelerate CBDC adoption globally, with the Federal Reserve and Bank of Japan already announcing expedited timelines for their own digital currency projects.",
    category: "regulatory-change",
    tags: ["cbdc", "ethereum", "defi"],
    priority: "high",
    status: "published",
    author: "Policy Analysis Team",
    triggerConditions: {
      minMonth: 3,
      publicTrustRange: [40, 100],
    },
    consequences: {
      marketStability: 10,
      publicTrust: 15,
      innovation: 8,
      globalInfluence: 12,
    },
  },
  {
    title: "Quantum Computing Breakthrough Threatens Current Encryption",
    description:
      "Scientists achieve quantum supremacy milestone that could compromise existing cryptocurrency security protocols within the next decade.",
    content:
      "A consortium of researchers from MIT, IBM, and the University of Tokyo announced a major breakthrough in quantum computing that brings the threat to current cryptographic systems significantly closer to reality. The team successfully demonstrated a 1000-qubit quantum computer capable of solving certain mathematical problems exponentially faster than classical computers.\n\nWhile the immediate threat to cryptocurrency networks remains years away, the breakthrough has prompted urgent discussions within the crypto community about post-quantum cryptography adoption. Bitcoin and Ethereum developers are already accelerating research into quantum-resistant algorithms.\n\nThe announcement has created a mixed reaction in financial markets, with some viewing it as a long-term existential threat to current blockchain technology, while others see it as an opportunity for the crypto industry to evolve and strengthen its security foundations.\n\nRegulatory bodies are now considering whether to mandate quantum-resistance standards for all new cryptocurrency projects, potentially creating a two-tier system of 'quantum-safe' and 'legacy' digital assets.",
    category: "technology-breakthrough",
    tags: ["bitcoin", "ethereum", "privacy", "scaling"],
    priority: "high",
    status: "published",
    author: "Technology Research Division",
    triggerConditions: {
      minMonth: 6,
      innovationRange: [60, 100],
    },
    consequences: {
      marketStability: -8,
      publicTrust: -5,
      innovation: 20,
      globalInfluence: 5,
    },
  },
  {
    title: "Global Stablecoin Regulation Treaty Signed",
    description: "Major economies unite to establish international standards for stablecoin issuance and operation.",
    content:
      "In a historic move, representatives from the G20 nations signed the Global Stablecoin Regulation Treaty in Geneva, establishing the first international framework for the oversight of stablecoin operations. The treaty, which has been in negotiation for over two years, addresses key concerns about systemic risk, consumer protection, and monetary sovereignty.\n\nThe framework introduces mandatory reserve requirements, regular auditing standards, and cross-border cooperation mechanisms for stablecoin issuers. Companies like Tether, Circle, and emerging CBDC-backed stablecoins will need to comply with the new standards by January 2036.\n\nKey provisions include:\n- 100% reserve backing with approved assets\n- Monthly third-party audits\n- Real-time transaction monitoring for AML compliance\n- Emergency intervention protocols for systemic risks\n\nThe treaty represents a significant step toward legitimizing the stablecoin ecosystem while addressing regulatory concerns that have hindered mainstream adoption. Market analysts predict this could unlock institutional investment worth hundreds of billions of dollars.",
    category: "regulatory-change",
    tags: ["stablecoin", "defi", "cbdc"],
    priority: "high",
    status: "published",
    author: "International Relations Team",
    triggerConditions: {
      minMonth: 4,
      publicTrustRange: [50, 100],
      globalInfluence: 60,
    },
    consequences: {
      marketStability: 18,
      publicTrust: 22,
      innovation: 5,
      globalInfluence: 15,
    },
  },
  {
    title: "DeFi Protocol Suffers $200M Flash Loan Attack",
    description:
      "Sophisticated exploit drains major decentralized finance protocol, highlighting smart contract vulnerabilities.",
    content:
      "YieldMax Protocol, one of the largest decentralized finance (DeFi) platforms with over $2 billion in total value locked, suffered a devastating flash loan attack that drained approximately $200 million in user funds. The exploit, executed in a single transaction, took advantage of a complex interaction between the protocol's lending pools and price oracle system.\n\nThe attacker used a sophisticated multi-step process:\n1. Borrowed $50M through flash loans from multiple protocols\n2. Manipulated the price oracle by creating artificial trading volume\n3. Used the manipulated prices to over-collateralize positions\n4. Drained the protocol's reserves before repaying the flash loans\n\nThis incident marks the largest DeFi exploit of 2035 and has reignited debates about the security of automated market makers and decentralized lending protocols. The attack was particularly concerning because YieldMax had undergone multiple security audits from reputable firms.\n\nThe DeFi community is now calling for enhanced security standards, including mandatory bug bounty programs, formal verification of smart contracts, and improved oracle security measures.",
    category: "security-incident",
    tags: ["defi", "ethereum", "stablecoin"],
    priority: "high",
    status: "published",
    author: "DeFi Security Team",
    triggerConditions: {
      minMonth: 2,
      innovationRange: [70, 100],
    },
    consequences: {
      marketStability: -12,
      publicTrust: -15,
      innovation: -8,
    },
  },
  {
    title: "Major Bank Announces Bitcoin Treasury Strategy",
    description:
      "JPMorgan Chase becomes the first major US bank to add Bitcoin to its corporate treasury, signaling institutional adoption milestone.",
    content:
      "In a groundbreaking move that signals a fundamental shift in institutional cryptocurrency adoption, JPMorgan Chase announced today that it will allocate 5% of its corporate treasury reserves to Bitcoin. The decision, approved by the bank's board of directors, represents approximately $15 billion in Bitcoin purchases to be executed over the next 12 months.\n\nCEO Jamie Dimon, who was previously skeptical of cryptocurrencies, cited Bitcoin's maturation as a store of value and hedge against inflation as key factors in the decision. The announcement comes as the bank also revealed plans to offer Bitcoin custody services to institutional clients and launch a cryptocurrency trading desk.\n\n'Bitcoin has evolved from a speculative asset to a legitimate treasury reserve asset,' Dimon stated during the announcement. 'Our analysis shows that a modest allocation to Bitcoin can improve our portfolio's risk-adjusted returns while providing protection against currency debasement.'\n\nThe move is expected to trigger similar announcements from other major financial institutions, potentially accelerating the institutional adoption of Bitcoin as a treasury asset. Market analysts predict this could drive significant price appreciation and reduce Bitcoin's volatility over time.",
    category: "institutional-adoption",
    tags: ["bitcoin", "institutional", "treasury"],
    priority: "high",
    status: "published",
    author: "Market Analysis Team",
    triggerConditions: {
      minMonth: 8,
      marketStabilityRange: [60, 100],
      publicTrustRange: [55, 100],
    },
    consequences: {
      marketStability: 15,
      publicTrust: 18,
      innovation: 10,
      globalInfluence: 12,
    },
  },
  {
    title: "Ethereum 3.0 Upgrade Introduces Revolutionary Scaling",
    description:
      "The latest Ethereum upgrade delivers 100x throughput improvement while maintaining decentralization and security.",
    content:
      "The Ethereum network successfully completed its most ambitious upgrade to date with the activation of Ethereum 3.0, introducing revolutionary scaling solutions that increase transaction throughput by over 100x while maintaining the network's commitment to decentralization and security.\n\nThe upgrade, which took over three years to develop and test, implements several groundbreaking technologies:\n\n- Sharded execution environments with cross-shard communication\n- Zero-knowledge proof aggregation for transaction batching\n- Improved consensus mechanism with faster finality\n- Native account abstraction for enhanced user experience\n\nEarly metrics show the network can now process over 100,000 transactions per second with average fees below $0.01, making it competitive with traditional payment systems while maintaining its decentralized properties.\n\nVitalik Buterin, Ethereum's co-founder, described the upgrade as 'the culmination of our vision for a truly scalable world computer.' The improvement is expected to unlock new use cases for decentralized applications and accelerate the adoption of blockchain technology across industries.\n\nDeFi protocols are already announcing plans to leverage the increased capacity, with several major platforms preparing to launch new features that were previously impossible due to scalability constraints.",
    category: "technology-breakthrough",
    tags: ["ethereum", "scaling", "defi"],
    priority: "high",
    status: "published",
    author: "Blockchain Technology Team",
    triggerConditions: {
      minMonth: 10,
      innovationRange: [80, 100],
    },
    consequences: {
      marketStability: 12,
      publicTrust: 8,
      innovation: 25,
      globalInfluence: 10,
    },
  },
  {
    title: "China Launches Digital Yuan Cross-Border Payment System",
    description: "China's CBDC infrastructure goes global with partnerships across Belt and Road Initiative countries.",
    content:
      "The People's Bank of China (PBOC) officially launched its cross-border digital yuan payment system, marking a significant milestone in the internationalization of China's central bank digital currency (CBDC). The system, called the Digital Currency Cross-border Payment Network (DCCPN), initially connects 15 countries along the Belt and Road Initiative.\n\nThe DCCPN enables instant, low-cost international payments using the digital yuan, bypassing traditional correspondent banking networks and reducing settlement times from days to seconds. Participating countries include Russia, Iran, Pakistan, and several African nations, representing over 2 billion people.\n\nKey features of the system include:\n- Real-time gross settlement between central banks\n- Programmable money for trade finance automation\n- Enhanced transparency and reduced counterparty risk\n- Integration with existing domestic payment systems\n\nThe launch represents a direct challenge to the US dollar's dominance in international trade and could accelerate the adoption of CBDCs globally. Western financial institutions are closely monitoring the system's adoption rates and potential impact on existing payment corridors.\n\nThe move has prompted discussions about the need for interoperability standards between different CBDC systems and the potential for a fragmented global digital currency landscape.",
    category: "geopolitical-event",
    tags: ["cbdc", "china", "cross-border"],
    priority: "high",
    status: "published",
    author: "Geopolitical Analysis Team",
    triggerConditions: {
      minMonth: 5,
      globalInfluence: 70,
    },
    consequences: {
      marketStability: 5,
      publicTrust: 8,
      innovation: 12,
      globalInfluence: -8,
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
      const category = categories.find((c) => c.id === event.category)
      const eventTags = tags.filter((t) => event.tags.includes(t.id))

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
    const existingTitles = existingEvents.map((e) => e.title)
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
      error: error.message,
    }
  }
}

// Execute the seeding
const result = seedSampleEvents()
console.log("[v0] Sample events seeding result:", result)
