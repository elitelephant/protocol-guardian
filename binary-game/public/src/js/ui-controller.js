// UI Controller module
import { GameState } from './game-state.js';
import { decisions, endings } from './decisions.js';

export class UIController {
    constructor() {
        this.gameState = new GameState();
    }

    // Render the welcome screen
    renderWelcomeScreen() {
        return `
            <div class="welcome-screen">
                <h1>Protocol Guardian</h1>
                <p>As a Protocol Guardian, you'll face critical decisions that shape the future of the blockchain ecosystem. Each choice affects three key metrics that determine the protocol's success.</p>
                
                <div class="metrics-intro">
                    <div class="metric-intro">
                        <h3>Security</h3>
                        <p>Protocol safety, audit processes, and vulnerability management</p>
                    </div>
                    <div class="metric-intro">
                        <h3>Decentralization</h3>
                        <p>Network distribution, community governance, and power balance</p>
                    </div>
                    <div class="metric-intro">
                        <h3>Adoption</h3>
                        <p>User growth, ecosystem expansion, and mainstream acceptance</p>
                    </div>
                </div>
                
                <button class="start-button" onclick="game.makeDecision('start')">
                    Begin Your Mission
                </button>
            </div>
        `;
    }

    // Render the decision screen
    renderDecisionScreen() {
        const currentDecisionData = decisions[this.gameState.currentDecision];
        const progress = this.gameState.getProgress();
        
        return `
            <div class="decision-screen">
                <div class="progress-bar">
                    <span>Decision ${this.gameState.decisions.length + 1} of 8</span>
                    <div style="width: 100%; height: 4px; background: #ddd;">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                
                <div class="metrics-display">
                    <div class="metric">
                        <span class="metric-label">Security</span>
                        <span class="metric-value">${this.gameState.metrics.security}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Decentralization</span>
                        <span class="metric-value">${this.gameState.metrics.decentralization}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Adoption</span>
                        <span class="metric-value">${this.gameState.metrics.adoption}</span>
                    </div>
                </div>
                
                <div class="decision-document">
                    <h2>${currentDecisionData.title}</h2>
                    <p>${currentDecisionData.description}</p>
                </div>
                
                <div class="decision-buttons">
                    <button class="reject-btn" onclick="game.makeDecision('reject')">
                        Reject
                    </button>
                    <button class="approve-btn" onclick="game.makeDecision('approve')">
                        Approve
                    </button>
                </div>
            </div>
        `;
    }

    // Render the final summary screen
    renderFinalSummary() {
        const endingType = this.gameState.calculateEnding();
        const ending = endings[endingType];
        
        let historyHtml = '';
        this.gameState.decisions.forEach(decision => {
            const statusClass = decision.choice === 'approve' ? 'approve-btn' : 'reject-btn';
            historyHtml += `
                <div class="decision-item">
                    <span class="decision-status ${statusClass}">${decision.choice.toUpperCase()}</span>
                    <span class="decision-title">${decision.title}</span>
                </div>
            `;
        });
        
        return `
            <div class="final-summary">
                <h1>Mission Complete</h1>
                
                <div class="ending-section">
                    <h2>${ending.title}</h2>
                    <h3>${ending.subtitle}</h3>
                    <p>${ending.description}</p>
                </div>
                
                <div class="final-metrics">
                    <div class="metric-card">
                        <span class="metric-value">${this.gameState.metrics.security}</span>
                        <span class="metric-label">Security</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">${this.gameState.metrics.decentralization}</span>
                        <span class="metric-label">Decentralization</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">${this.gameState.metrics.adoption}</span>
                        <span class="metric-label">Adoption</span>
                    </div>
                </div>
                
                <div class="decisions-history">
                    <h3>Your Leadership Journey</h3>
                    ${historyHtml}
                </div>
                
                <button class="restart-btn" onclick="game.restart()">
                    Lead Again
                </button>
            </div>
        `;
    }

    // Main render method
    render() {
        if (this.gameState.decisions.length === 0) {
            return this.renderWelcomeScreen();
        } else if (!this.gameState.isGameComplete()) {
            return this.renderDecisionScreen();
        } else {
            return this.renderFinalSummary();
        }
    }

    // Handle decision making
    makeDecision(choice) {
        if (choice === 'start') {
            // Just trigger a re-render to show first decision
        } else if (!this.gameState.isGameComplete()) {
            const currentDecisionData = decisions[this.gameState.currentDecision];
            this.gameState.makeDecision(choice, currentDecisionData);
        }
        
        // Update the UI
        this.updateUI();
    }

    // Restart the game
    restart() {
        this.gameState.reset();
        this.updateUI();
    }

    // Update the UI display
    updateUI() {
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.innerHTML = this.render();
        }
    }
}