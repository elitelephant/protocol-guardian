// Protocol Guardian Game Engine
class ProtocolGuardianGame {
    constructor() {
        this.gameState = {
            currentDecision: 0,
            networkHealth: 50,
            publicConfidence: 60,
            techAdvancement: 45,
            decisions: [],
            isComplete: false
        };
        
        this.decisions = [
            {
                id: "mining-environmental-standards",
                title: "Mining Environmental Standards",
                proposal: "Implement mandatory environmental impact assessments and carbon offsets for mining operations above 10 MW capacity.",
                consequences: {
                    approve: { networkHealth: -3, publicConfidence: 8, techAdvancement: 5 },
                    reject: { networkHealth: 5, publicConfidence: -3, techAdvancement: 8 }
                }
            },
            {
                id: "protocol-regulatory-framework",
                title: "Protocol Regulatory Framework",
                proposal: "Create formal oversight for protocol governance including treasury transparency and voting audits.",
                consequences: {
                    approve: { networkHealth: 3, publicConfidence: 8, techAdvancement: -5 },
                    reject: { networkHealth: 5, publicConfidence: -3, techAdvancement: 8 }
                }
            },
            {
                id: "mining-pool-limits",
                title: "Mining Pool Size Limits",
                proposal: "Implement voluntary 15% hashrate limit per mining pool to prevent centralization.",
                consequences: {
                    approve: { networkHealth: 8, publicConfidence: 5, techAdvancement: -3 },
                    reject: { networkHealth: -5, publicConfidence: -5, techAdvancement: 6 }
                }
            },
            {
                id: "defi-ecosystem-expansion",
                title: "DeFi Ecosystem Expansion",
                proposal: "Launch $100M developer fund for DeFi protocols built on Layer 2 solutions.",
                consequences: {
                    approve: { networkHealth: -3, publicConfidence: 5, techAdvancement: 8 },
                    reject: { networkHealth: 8, publicConfidence: -3, techAdvancement: -5 }
                }
            },
            {
                id: "layer2-scaling-priority",
                title: "Layer 2 Scaling Priority",
                proposal: "Focus development resources on Layer 2 solutions rather than base layer changes.",
                consequences: {
                    approve: { networkHealth: -3, publicConfidence: 3, techAdvancement: 8 },
                    reject: { networkHealth: 8, publicConfidence: -3, techAdvancement: -5 }
                }
            },
            {
                id: "corporate-treasury-guidelines",
                title: "Corporate Treasury Guidelines",
                proposal: "Establish regulatory guidelines and tax frameworks for corporate adoption.",
                consequences: {
                    approve: { networkHealth: 3, publicConfidence: 8, techAdvancement: -3 },
                    reject: { networkHealth: -3, publicConfidence: -5, techAdvancement: 8 }
                }
            },
            {
                id: "interoperability-standards",
                title: "Interoperability Standards",
                proposal: "Create unified standards for asset transfers between different Layer 2 solutions.",
                consequences: {
                    approve: { networkHealth: 3, publicConfidence: 5, techAdvancement: 6 },
                    reject: { networkHealth: -3, publicConfidence: -3, techAdvancement: 5 }
                }
            },
            {
                id: "quantum-resistant-upgrade",
                title: "Quantum-Resistant Upgrade",
                proposal: "Begin transition to quantum-resistant signature schemes for the protocol.",
                consequences: {
                    approve: { networkHealth: 8, publicConfidence: 3, techAdvancement: 8 },
                    reject: { networkHealth: -8, publicConfidence: -5, techAdvancement: -5 }
                }
            }
        ];
        
        this.init();
    }
    
    init() {
        this.render();
    }
    
    getCurrentDecision() {
        return this.decisions[this.gameState.currentDecision];
    }
    
    makeDecision(choice) {
        // Handle special case for starting the game
        if (choice === 'start') {
            this.render();
            return;
        }
        
        const decision = this.getCurrentDecision();
        const consequences = decision.consequences[choice];
        
        // Apply consequences
        this.gameState.networkHealth += consequences.networkHealth;
        this.gameState.publicConfidence += consequences.publicConfidence;
        this.gameState.techAdvancement += consequences.techAdvancement;
        
        // Clamp values between 0 and 100
        this.gameState.networkHealth = Math.max(0, Math.min(100, this.gameState.networkHealth));
        this.gameState.publicConfidence = Math.max(0, Math.min(100, this.gameState.publicConfidence));
        this.gameState.techAdvancement = Math.max(0, Math.min(100, this.gameState.techAdvancement));
        
        // Record decision
        this.gameState.decisions.push({
            id: decision.id,
            title: decision.title,
            choice: choice
        });
        
        // Advance game
        this.gameState.currentDecision++;
        
        if (this.gameState.currentDecision >= this.decisions.length) {
            this.gameState.isComplete = true;
        }
        
        this.render();
    }
    
    calculateEnding() {
        const { networkHealth, publicConfidence, techAdvancement } = this.gameState;
        
        if (networkHealth >= 80 && techAdvancement < 70) {
            return {
                title: "SOVEREIGN GUARDIAN",
                subtitle: "Security-First Approach",
                description: "You prioritized the protocol's base layer security and decentralization above all else."
            };
        } else if (techAdvancement >= 80 && networkHealth < 75) {
            return {
                title: "PROGRESSIVE CATALYST",
                subtitle: "Innovation Leader", 
                description: "You championed Layer 2 solutions as the path to global adoption and ecosystem growth."
            };
        } else if (networkHealth >= 70 && publicConfidence >= 70 && techAdvancement >= 65) {
            return {
                title: "BALANCED STEWARD",
                subtitle: "Measured Protocol Governance",
                description: "You successfully navigated the protocol's evolution through balanced governance."
            };
        } else {
            return {
                title: "FRAGMENTED NETWORK",
                subtitle: "Challenging Governance Period",
                description: "Your decisions led to challenges in balancing competing interests."
            };
        }
    }
    
    restart() {
        this.gameState = {
            currentDecision: 0,
            networkHealth: 50,
            publicConfidence: 60,
            techAdvancement: 45,
            decisions: [],
            isComplete: false
        };
        this.render();
    }
    
    render() {
        const container = document.getElementById('game-container');
        
        if (this.gameState.isComplete) {
            container.innerHTML = this.renderFinalSummary();
        } else if (this.gameState.decisions.length === 0) {
            container.innerHTML = this.renderWelcomeScreen();
        } else {
            container.innerHTML = this.renderDecisionScreen();
        }
    }
    
    renderWelcomeScreen() {
        return `
            <div class="welcome-screen">
                <h1>Protocol Guardian</h1>
                <p>Welcome, Guardian. You oversee a decentralized protocol ecosystem where your decisions shape the future of digital infrastructure.</p>
                
                <div class="metrics-intro">
                    <div class="metric-intro">
                        <h3>Network Health</h3>
                        <p>Protocol security and decentralization</p>
                    </div>
                    <div class="metric-intro">
                        <h3>Public Confidence</h3>
                        <p>Community trust and adoption</p>
                    </div>
                    <div class="metric-intro">
                        <h3>Tech Advancement</h3>
                        <p>Innovation and development progress</p>
                    </div>
                </div>
                
                <button onclick="game.makeDecision('start')" class="start-button">Begin Your Mission</button>
            </div>
        `;
    }
    
    renderDecisionScreen() {
        const decision = this.getCurrentDecision();
        const progress = this.gameState.currentDecision + 1;
        
        return `
            <div class="decision-screen">
                <div class="progress-bar">
                    <span>Decision ${progress} of ${this.decisions.length}</span>
                    <div class="progress-fill" style="width: ${(progress / this.decisions.length) * 100}%"></div>
                </div>
                
                <div class="metrics-display">
                    <div class="metric">
                        <span class="metric-label">Network Health</span>
                        <span class="metric-value">${this.gameState.networkHealth}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Public Confidence</span>
                        <span class="metric-value">${this.gameState.publicConfidence}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Tech Advancement</span>
                        <span class="metric-value">${this.gameState.techAdvancement}%</span>
                    </div>
                </div>
                
                <div class="decision-document">
                    <h2>${decision.title}</h2>
                    <p>${decision.proposal}</p>
                </div>
                
                <div class="decision-buttons">
                    <button onclick="game.makeDecision('reject')" class="reject-btn">REJECT</button>
                    <button onclick="game.makeDecision('approve')" class="approve-btn">APPROVE</button>
                </div>
            </div>
        `;
    }
    
    renderFinalSummary() {
        const ending = this.calculateEnding();
        
        return `
            <div class="final-summary">
                <h1>Protocol Guardian Final Report</h1>
                
                <div class="ending-section">
                    <h2>${ending.title}</h2>
                    <h3>${ending.subtitle}</h3>
                    <p>${ending.description}</p>
                </div>
                
                <div class="final-metrics">
                    <div class="metric-card">
                        <span class="metric-value">${this.gameState.networkHealth}%</span>
                        <span class="metric-label">Network Health</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">${this.gameState.publicConfidence}%</span>
                        <span class="metric-label">Public Confidence</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">${this.gameState.techAdvancement}%</span>
                        <span class="metric-label">Tech Advancement</span>
                    </div>
                </div>
                
                <div class="decisions-history">
                    <h3>Your Governance Decisions</h3>
                    ${this.gameState.decisions.map(decision => 
                        `<div class="decision-item">
                            <span class="decision-status">${decision.choice.toUpperCase()}</span>
                            <span class="decision-title">${decision.title}</span>
                        </div>`
                    ).join('')}
                </div>
                
                <button onclick="game.restart()" class="restart-btn">Start New Term</button>
            </div>
        `;
    }
}

// Initialize game when page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new ProtocolGuardianGame();
});