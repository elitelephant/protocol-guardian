// Game decisions data module
export const decisions = [
    {
        title: "Network Scaling Proposal",
        description: "A community proposal suggests implementing a new scaling solution that could improve transaction throughput by 300%. However, it requires a significant protocol upgrade and some compatibility concerns have been raised.",
        approve: { security: -3, decentralization: 4, adoption: 7 },
        reject: { security: 2, decentralization: -2, adoption: -4 }
    },
    {
        title: "Developer Funding Initiative", 
        description: "The development fund has received a request for 500,000 STX to support ecosystem tooling. The proposal has strong community backing but would reduce the treasury by 15%.",
        approve: { security: 3, decentralization: 2, adoption: 6 },
        reject: { security: -2, decentralization: 1, adoption: -8 }
    },
    {
        title: "Mining Pool Diversification",
        description: "Three major mining pools control 65% of the network. A proposal suggests implementing incentives to encourage smaller pools, but may temporarily reduce overall network security.",
        approve: { security: -4, decentralization: 8, adoption: 1 },
        reject: { security: 3, decentralization: -6, adoption: -1 }
    },
    {
        title: "Smart Contract Security Audit",
        description: "A critical smart contract vulnerability has been discovered. The proposed fix requires an emergency upgrade that could disrupt transactions for 24 hours but would prevent potential exploits.",
        approve: { security: 8, decentralization: -1, adoption: -3 },
        reject: { security: -8, decentralization: 2, adoption: 4 }
    },
    {
        title: "Cross-Chain Integration",
        description: "A proposal to integrate with three major blockchain networks could increase interoperability and attract new users, but introduces additional complexity and potential attack vectors.",
        approve: { security: -2, decentralization: -1, adoption: 8 },
        reject: { security: 4, decentralization: 3, adoption: -5 }
    },
    {
        title: "Governance Token Distribution",
        description: "The community proposes distributing governance tokens to all active users. This would increase participation but may dilute existing stakeholder influence and complicate decision-making.",
        approve: { security: 1, decentralization: 6, adoption: 4 },
        reject: { security: -1, decentralization: -4, adoption: -2 }
    },
    {
        title: "Privacy Enhancement Protocol",
        description: "A new privacy feature could make transactions more confidential, attracting privacy-focused users. However, regulators have expressed concerns about compliance implications.",
        approve: { security: 2, decentralization: 3, adoption: -6 },
        reject: { security: -1, decentralization: -2, adoption: 5 }
    },
    {
        title: "Emergency Response Framework",
        description: "A proposal to establish rapid response procedures for critical issues. This would improve security response times but requires giving special powers to a small emergency committee.",
        approve: { security: 7, decentralization: -5, adoption: 2 },
        reject: { security: -3, decentralization: 4, adoption: -1 }
    }
];

export const endings = {
    secure_conservative: {
        title: "The Secure Guardian",
        subtitle: "Stability Above All",
        description: "You prioritized security and stability over rapid growth. The protocol remains robust and trusted, though some opportunities for expansion were missed. The community appreciates your careful stewardship."
    },
    balanced_leader: {
        title: "The Balanced Leader", 
        subtitle: "Harmony in Governance",
        description: "You achieved a remarkable balance across all areas. The protocol grew sustainably while maintaining security and decentralization. Your measured approach earned widespread community respect."
    },
    growth_advocate: {
        title: "The Growth Advocate",
        subtitle: "Expansion and Innovation", 
        description: "You championed adoption and growth, sometimes at the cost of other concerns. The protocol expanded rapidly and attracted many new users, though some worry about long-term sustainability."
    },
    decentralization_champion: {
        title: "The Decentralization Champion",
        subtitle: "Power to the People",
        description: "You consistently chose to distribute power and maintain decentralization. The protocol remains truly community-governed, though growth was sometimes slower than alternatives."
    }
};