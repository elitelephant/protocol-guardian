import type { Decision } from "./game-state"

export const sampleDecisions: Decision[] = [
  {
    id: "stablecoin-regulation",
    title: "Stablecoin Reserve Requirements",
    description:
      "Major stablecoins are experiencing volatility due to unclear reserve backing. The market is demanding regulatory clarity on reserve requirements and auditing standards.",
    options: [
      {
        id: "strict-reserves",
        text: "Mandate 100% fiat currency reserves with monthly audits",
        consequences: [
          { type: "marketStability", change: 15, description: "Market confidence increases with strict backing" },
          { type: "techAdvancement", change: -5, description: "Innovation slightly constrained by requirements" },
          {
            type: "blocRelationship",
            target: "westernAlliance",
            change: 10,
            description: "Western Alliance supports consumer protection",
          },
        ],
        educationalNote:
          "Full reserve backing ensures 1:1 redemption but may limit yield-generating activities for stablecoin issuers.",
      },
      {
        id: "flexible-reserves",
        text: "Allow diversified reserves including government bonds and commercial paper",
        consequences: [
          { type: "marketStability", change: 5, description: "Moderate market confidence boost" },
          { type: "techAdvancement", change: 5, description: "Balanced approach supports innovation" },
          { type: "publicConfidence", change: -5, description: "Some public concern about risk" },
        ],
        educationalNote:
          "Diversified reserves can generate yield but introduce counterparty risk during market stress.",
      },
      {
        id: "minimal-regulation",
        text: "Implement light-touch regulation with self-reporting requirements",
        consequences: [
          { type: "techAdvancement", change: 15, description: "Innovation flourishes with minimal constraints" },
          { type: "marketStability", change: -10, description: "Market uncertainty about backing quality" },
          { type: "publicConfidence", change: -15, description: "Public worried about consumer protection" },
        ],
        educationalNote:
          "Self-regulation relies on market discipline but may not prevent systemic risks during crises.",
      },
    ],
    educationalContent:
      "Stablecoins are cryptocurrencies designed to maintain stable value relative to a reference asset, typically the US dollar. They serve as crucial infrastructure for DeFi protocols and cross-border payments, but their stability depends on proper reserve management and regulatory oversight.",
    timestamp: new Date(),
  },
  {
    id: "defi-protocol-licensing",
    title: "DeFi Protocol Licensing Framework",
    description:
      "Decentralized Finance protocols are operating without clear regulatory status. Some offer traditional financial services but claim to be fully decentralized and beyond regulatory reach.",
    options: [
      {
        id: "mandatory-licensing",
        text: "Require all DeFi protocols to obtain traditional financial licenses",
        consequences: [
          { type: "publicConfidence", change: 20, description: "Strong consumer protection measures" },
          { type: "techAdvancement", change: -20, description: "Innovation significantly hindered" },
          {
            type: "blocRelationship",
            target: "easternBloc",
            change: 15,
            description: "Eastern Bloc approves of strict control",
          },
        ],
        educationalNote:
          "Traditional licensing ensures compliance but may be incompatible with truly decentralized protocols.",
      },
      {
        id: "risk-based-approach",
        text: "Implement risk-based regulation focusing on protocol governance and user protection",
        consequences: [
          { type: "marketStability", change: 10, description: "Balanced approach provides clarity" },
          { type: "techAdvancement", change: 5, description: "Innovation continues with guardrails" },
          { type: "publicConfidence", change: 5, description: "Moderate consumer protection" },
        ],
        educationalNote:
          "Risk-based regulation adapts traditional principles to new technology while preserving innovation potential.",
      },
      {
        id: "hands-off-approach",
        text: "Maintain current regulatory uncertainty, allowing market-driven solutions",
        consequences: [
          { type: "techAdvancement", change: 25, description: "Unrestricted innovation and experimentation" },
          { type: "marketStability", change: -15, description: "Continued regulatory uncertainty" },
          {
            type: "blocRelationship",
            target: "globalSouth",
            change: 10,
            description: "Global South appreciates innovation-friendly stance",
          },
        ],
        educationalNote:
          "Market-driven solutions may emerge but could leave consumers vulnerable to fraud and systemic risks.",
      },
    ],
    educationalContent:
      "DeFi protocols use smart contracts to recreate traditional financial services like lending, trading, and insurance without traditional intermediaries. The challenge is determining how to regulate code-based systems that may have no central authority.",
    timestamp: new Date(),
  },
]
