export interface EducationalLesson {
  id: string
  title: string
  category: "blockchain" | "regulation" | "economics" | "security" | "governance"
  difficulty: "beginner" | "intermediate" | "advanced"
  content: string
  keyPoints: string[]
  realWorldExample?: string
  relatedDecisions?: string[]
  estimatedReadTime: number // in minutes
}

export const educationalLessons: EducationalLesson[] = [
  {
    id: "bitcoin-basics",
    title: "Bitcoin Fundamentals",
    category: "blockchain",
    difficulty: "beginner",
    content: `Bitcoin is a decentralized digital currency that operates on a peer-to-peer network without requiring trust in any central authority. Created in 2008 by Satoshi Nakamoto, Bitcoin introduced the world to blockchain technology and Proof-of-Work consensus.

The Bitcoin network maintains a public ledger of all transactions, secured through cryptographic hashing and maintained by network participants called miners. Each block contains a set of transactions and is linked to the previous block, creating an immutable chain of records.

As the Guardian of the Bitcoin Protocol, understanding Bitcoin's core principles - decentralization, censorship resistance, and scarcity - is essential for making decisions that preserve its fundamental value proposition.`,
    keyPoints: [
      "Decentralized peer-to-peer electronic cash system",
      "Proof-of-Work secures the network through mining",
      "Fixed supply of 21 million coins creates digital scarcity",
      "No central authority can alter transactions or create inflation",
      "Public ledger ensures transparency and immutability",
    ],
    realWorldExample:
      "Bitcoin has processed over 700 million transactions since its creation, with a market capitalization exceeding $1 trillion.",
    relatedDecisions: ["bitcoin-mining-regulation"],
    estimatedReadTime: 3,
  },
  {
    id: "mining-mechanics",
    title: "Bitcoin Mining and Security",
    category: "blockchain",
    difficulty: "intermediate",
    content: `Bitcoin mining serves dual purposes: securing the network and distributing new bitcoins. Miners compete to solve complex mathematical puzzles, with the winner earning the right to add the next block to the blockchain and receive newly created bitcoins plus transaction fees.

The mining difficulty adjusts every 2016 blocks (approximately every two weeks) to maintain a consistent 10-minute average block time. This ensures the network remains secure even as mining power fluctuates.

Mining centralization poses risks to Bitcoin's decentralization. Large mining pools can theoretically collude to attack the network, though economic incentives generally prevent such attacks. Environmental concerns about mining's energy consumption have led to debates about sustainability and alternative consensus mechanisms.`,
    keyPoints: [
      "Proof-of-Work provides Sybil resistance and network security",
      "Mining difficulty adjusts to maintain consistent block times",
      "Economic incentives align miners with network security",
      "Centralization risks threaten decentralization principles",
      "Energy consumption raises environmental and sustainability concerns",
    ],
    realWorldExample:
      "The Bitcoin network currently consumes about 150 terawatt-hours annually, comparable to the energy use of countries like Argentina.",
    relatedDecisions: ["bitcoin-mining-regulation"],
    estimatedReadTime: 4,
  },
  {
    id: "layer2-scaling",
    title: "Layer 2 Scaling Solutions",
    category: "blockchain",
    difficulty: "intermediate",
    content: `Layer 2 solutions build on top of Bitcoin's base layer to enable faster, cheaper transactions without compromising the security of the underlying blockchain. These solutions process transactions off-chain and periodically settle to the main Bitcoin network.

The Lightning Network enables instant, low-cost micropayments through payment channels. State channels allow participants to conduct unlimited transactions privately before settling the final state on-chain.

Stacks brings smart contract functionality to Bitcoin through a unique consensus mechanism that settles on Bitcoin. This enables decentralized applications, DeFi protocols, and NFTs while leveraging Bitcoin's superior security and decentralization.

Layer 2 solutions are crucial for Bitcoin's mass adoption, enabling use cases that would be prohibitively expensive on the base layer alone.`,
    keyPoints: [
      "Layer 2 enables scaling without compromising base layer security",
      "Lightning Network provides instant micropayments",
      "Stacks brings smart contracts to Bitcoin",
      "Off-chain processing reduces congestion and fees",
      "Multiple Layer 2 solutions offer different trade-offs",
    ],
    realWorldExample:
      "The Lightning Network processes millions of transactions daily with fees measured in satoshis rather than dollars.",
    relatedDecisions: ["stacks-protocol-governance"],
    estimatedReadTime: 5,
  },
  {
    id: "protocol-upgrades",
    title: "Bitcoin Protocol Governance",
    category: "governance",
    difficulty: "advanced",
    content: `Bitcoin's protocol upgrades occur through a consensus-driven process that requires widespread agreement among network participants. Unlike traditional software, Bitcoin upgrades must maintain backward compatibility and cannot force changes on unwilling participants.

The Bitcoin Improvement Proposal (BIP) process allows anyone to propose changes to the protocol. Successful BIPs require implementation by multiple independent development teams and activation through miner signaling or user activation.

Controversial upgrades like the 2017 SegWit2x attempt demonstrated the challenges of achieving consensus in a decentralized system. Hard forks can split the network, creating two separate cryptocurrencies with different rules.

As Guardian, you must navigate these governance challenges while preserving Bitcoin's core principles and ensuring the network evolves to meet growing demands.`,
    keyPoints: [
      "Consensus-driven upgrade process requires widespread agreement",
      "BIP process formalizes protocol improvement proposals",
      "Backward compatibility crucial for smooth upgrades",
      "Hard forks can split the network permanently",
      "Governance balances innovation with network unity",
    ],
    realWorldExample:
      "Taproot, activated in 2021, improved Bitcoin's privacy and smart contract capabilities through Schnorr signatures and MAST.",
    relatedDecisions: ["bitcoin-protocol-upgrade"],
    estimatedReadTime: 6,
  },
  {
    id: "stacks-ecosystem",
    title: "Stacks Smart Contracts",
    category: "blockchain",
    difficulty: "intermediate",
    content: `Stacks is a Layer 1 blockchain that extends Bitcoin with smart contract functionality through the Clarity programming language. Unlike other smart contract platforms, Stacks settles all transactions and smart contract executions on Bitcoin, inheriting its superior security and decentralization.

The Proof-of-Transfer (PoX) consensus mechanism burns Stacks tokens to mine Bitcoin, creating a symbiotic relationship between the two networks. This ensures Stacks contributes to Bitcoin's security while enabling programmable money on the most secure blockchain.

Clarity's design emphasizes predictability and security, with features like post-conditions that prevent unintended token transfers and readable smart contracts that users can understand before interacting.

Stacks enables DeFi, NFTs, and decentralized applications on Bitcoin, opening new use cases while maintaining the censorship resistance and sovereignty of the underlying network.`,
    keyPoints: [
      "Extends Bitcoin with smart contract capabilities",
      "Proof-of-Transfer burns STX to mine BTC",
      "Clarity language emphasizes security and predictability",
      "Settles all activity on Bitcoin for maximum security",
      "Enables DeFi and dApps on the most decentralized network",
    ],
    realWorldExample:
      "Stacks has facilitated over $2 billion in DeFi activity, including lending protocols and decentralized exchanges built on Bitcoin.",
    relatedDecisions: ["stacks-protocol-governance"],
    estimatedReadTime: 5,
  },
  {
    id: "bitcoin-etf-mechanics",
    title: "Bitcoin ETF Regulation",
    category: "regulation",
    difficulty: "intermediate",
    content: `Exchange-Traded Funds (ETFs) allow investors to gain exposure to Bitcoin without holding it directly, providing a regulated investment vehicle for traditional financial markets. Bitcoin ETFs track the price of Bitcoin through various mechanisms, including direct custody or futures contracts.

Regulatory approval of Bitcoin ETFs represents a major milestone in cryptocurrency's institutional adoption. ETFs provide liquidity, price discovery, and risk management tools for traditional investors while potentially increasing Bitcoin's price stability through broader participation.

However, ETFs also introduce concerns about institutional capture and market manipulation. Some purists worry that ETFs could centralize Bitcoin ownership and reduce its decentralization benefits.

The approval process involves demonstrating robust custody arrangements, fair valuation mechanisms, and compliance with securities regulations.`,
    keyPoints: [
      "ETFs provide regulated Bitcoin exposure for traditional investors",
      "Multiple structural approaches (spot, futures, etc.)",
      "Institutional adoption milestone for cryptocurrency",
      "Regulatory scrutiny ensures investor protection",
      "Debates about impact on Bitcoin's decentralization",
    ],
    realWorldExample:
      "The first Bitcoin ETF, launched in 2024, attracted over $10 billion in assets within its first year of operation.",
    relatedDecisions: ["bitcoin-etf-regulatory"],
    estimatedReadTime: 4,
  },
]

export function getLessonsByCategory(category: EducationalLesson["category"]): EducationalLesson[] {
  return educationalLessons.filter((lesson) => lesson.category === category)
}

export function getLessonById(id: string): EducationalLesson | undefined {
  return educationalLessons.find((lesson) => lesson.id === id)
}

export function getRelatedLessons(decisionId: string): EducationalLesson[] {
  return educationalLessons.filter((lesson) => lesson.relatedDecisions?.includes(decisionId))
}
