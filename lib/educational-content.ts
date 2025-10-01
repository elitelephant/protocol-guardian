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
    id: "blockchain-basics",
    title: "Blockchain Fundamentals",
    category: "blockchain",
    difficulty: "beginner",
    content: `A blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data.

The key innovation of blockchain is that it allows multiple parties to maintain a shared database without requiring a trusted central authority. This is achieved through consensus mechanisms that ensure all participants agree on the current state of the ledger.

In the context of cryptocurrency regulation, understanding blockchain's immutable and transparent nature is crucial for developing effective policies that balance innovation with consumer protection.`,
    keyPoints: [
      "Distributed ledger maintained by network participants",
      "Cryptographic hashing ensures data integrity",
      "No central authority required for validation",
      "Transactions are transparent and immutable",
      "Consensus mechanisms prevent double-spending",
    ],
    realWorldExample:
      "Bitcoin's blockchain processes over 300,000 transactions daily, with each transaction permanently recorded and verifiable by anyone.",
    relatedDecisions: ["stablecoin-regulation"],
    estimatedReadTime: 3,
  },
  {
    id: "regulatory-frameworks",
    title: "Global Regulatory Approaches",
    category: "regulation",
    difficulty: "intermediate",
    content: `Different jurisdictions have adopted varying approaches to cryptocurrency regulation, reflecting their unique economic priorities and risk tolerances.

The United States employs a multi-agency approach with the SEC focusing on securities, the CFTC on commodities, and FinCEN on anti-money laundering. The European Union's MiCA (Markets in Crypto-Assets) regulation provides comprehensive coverage across member states.

China has banned cryptocurrency trading and mining while developing its own Central Bank Digital Currency (CBDC). In contrast, countries like El Salvador have embraced Bitcoin as legal tender.

Understanding these different approaches is essential for FiDeFi's mission to create globally coordinated regulatory standards.`,
    keyPoints: [
      "Multi-agency oversight in complex jurisdictions",
      "Comprehensive frameworks like EU's MiCA",
      "Prohibition vs. embrace spectrum of approaches",
      "CBDC development as regulatory response",
      "Need for international coordination",
    ],
    realWorldExample:
      "The EU's MiCA regulation, effective 2024, covers crypto-asset issuance, trading, and custody services across all 27 member states.",
    relatedDecisions: ["defi-protocol-licensing"],
    estimatedReadTime: 5,
  },
  {
    id: "defi-mechanics",
    title: "Decentralized Finance (DeFi) Protocols",
    category: "blockchain",
    difficulty: "advanced",
    content: `DeFi protocols use smart contracts to recreate traditional financial services without intermediaries. These automated programs execute predetermined rules, enabling lending, borrowing, trading, and insurance services.

Key DeFi innovations include Automated Market Makers (AMMs) for decentralized trading, yield farming for liquidity provision incentives, and flash loans for instant, uncollateralized borrowing within a single transaction.

The regulatory challenge lies in DeFi's permissionless nature - anyone can interact with these protocols without identity verification, and many operate without identifiable operators or legal entities.

Total Value Locked (TVL) in DeFi protocols exceeded $100 billion at peak, demonstrating significant economic impact that requires thoughtful regulatory consideration.`,
    keyPoints: [
      "Smart contracts automate financial services",
      "No traditional intermediaries required",
      "Permissionless access without KYC/AML",
      "Novel mechanisms like flash loans",
      "Significant economic value at stake",
    ],
    realWorldExample:
      "Uniswap, a decentralized exchange, processes billions in trading volume monthly without a central operator.",
    relatedDecisions: ["defi-protocol-licensing"],
    estimatedReadTime: 6,
  },
  {
    id: "stablecoin-mechanisms",
    title: "Stablecoin Design and Risks",
    category: "economics",
    difficulty: "intermediate",
    content: `Stablecoins attempt to maintain stable value through various mechanisms. Fiat-collateralized stablecoins like USDC back each token with traditional currency reserves. Crypto-collateralized stablecoins like DAI use over-collateralization with volatile assets.

Algorithmic stablecoins attempt to maintain stability through market mechanisms and token supply adjustments, though several high-profile failures have demonstrated the risks of this approach.

The regulatory focus on stablecoins stems from their systemic importance - they serve as the primary medium of exchange in DeFi and facilitate most crypto trading. A stablecoin failure could trigger broader market instability.

Reserve composition, audit requirements, and redemption guarantees are key regulatory considerations for maintaining stablecoin stability and user protection.`,
    keyPoints: [
      "Multiple stabilization mechanisms exist",
      "Fiat backing provides strongest stability",
      "Algorithmic approaches carry higher risk",
      "Systemic importance to crypto markets",
      "Reserve transparency crucial for confidence",
    ],
    realWorldExample:
      "USDT's market cap exceeds $80 billion, making it larger than many national currencies and highlighting the systemic importance of stablecoins.",
    relatedDecisions: ["stablecoin-regulation"],
    estimatedReadTime: 4,
  },
  {
    id: "privacy-technologies",
    title: "Privacy-Preserving Technologies",
    category: "security",
    difficulty: "advanced",
    content: `Privacy coins and technologies aim to provide financial privacy through various cryptographic techniques. Zero-knowledge proofs allow verification of information without revealing the information itself.

Monero uses ring signatures and stealth addresses to obscure transaction participants and amounts. Zcash employs zk-SNARKs to enable fully private transactions while maintaining blockchain integrity.

The regulatory tension arises from legitimate privacy needs versus law enforcement requirements. Privacy technologies can protect dissidents and journalists but may also facilitate illicit activities.

Regulatory approaches range from outright bans to requirements for optional transparency features that allow compliance with legal obligations while preserving privacy for legitimate users.`,
    keyPoints: [
      "Zero-knowledge proofs enable private verification",
      "Multiple technical approaches to privacy",
      "Legitimate privacy needs vs. law enforcement",
      "Regulatory spectrum from bans to compliance features",
      "Technical complexity challenges regulation",
    ],
    realWorldExample:
      "Several major exchanges have delisted privacy coins due to regulatory pressure, limiting their accessibility and adoption.",
    relatedDecisions: ["privacy-coin-ban"],
    estimatedReadTime: 5,
  },
  {
    id: "cbdc-implications",
    title: "Central Bank Digital Currencies",
    category: "governance",
    difficulty: "intermediate",
    content: `CBDCs represent government-issued digital currencies that combine the efficiency of digital payments with the stability and backing of traditional fiat currency. Unlike cryptocurrencies, CBDCs are centrally controlled and can incorporate policy tools like programmable money and direct monetary policy transmission.

CBDCs could provide financial inclusion benefits by enabling direct government payments and reducing reliance on traditional banking infrastructure. However, they also raise concerns about privacy, surveillance, and the potential displacement of commercial banks.

The design choices for CBDCs - including privacy levels, offline capability, and programmability - have significant implications for monetary policy, financial stability, and civil liberties.

Over 100 countries are exploring CBDCs, with China's digital yuan leading in development and pilot programs, creating competitive pressure for other nations to develop their own digital currencies.`,
    keyPoints: [
      "Government-issued digital currency with central control",
      "Potential for direct monetary policy transmission",
      "Financial inclusion and efficiency benefits",
      "Privacy and surveillance concerns",
      "Global competitive dynamics driving adoption",
    ],
    realWorldExample:
      "China's digital yuan has processed over $14 billion in transactions during pilot programs across multiple cities.",
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
