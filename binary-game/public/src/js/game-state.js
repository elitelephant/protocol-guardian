// Game state management module
export class GameState {
    constructor() {
        this.currentDecision = 0;
        this.metrics = {
            security: 50,
            decentralization: 50,
            adoption: 50
        };
        this.decisions = [];
    }

    // Make a decision and update metrics
    makeDecision(choice, decisionData) {
        if (choice === 'start') {
            return;
        }

        const impact = choice === 'approve' ? decisionData.approve : decisionData.reject;
        
        // Update metrics with bounds checking
        Object.keys(impact).forEach(metric => {
            this.metrics[metric] = Math.max(0, Math.min(100, this.metrics[metric] + impact[metric]));
        });

        // Record the decision
        this.decisions.push({
            title: decisionData.title,
            choice: choice,
            impact: impact
        });

        this.currentDecision++;
    }

    // Calculate the ending based on final metrics
    calculateEnding() {
        const { security, decentralization, adoption } = this.metrics;
        
        // Calculate primary tendency
        if (security >= 65) {
            return 'secure_conservative';
        } else if (adoption >= 65) {
            return 'growth_advocate'; 
        } else if (decentralization >= 65) {
            return 'decentralization_champion';
        } else {
            // Check for balanced approach
            const variance = Math.max(security, decentralization, adoption) - Math.min(security, decentralization, adoption);
            if (variance <= 25) {
                return 'balanced_leader';
            } else if (security > decentralization && security > adoption) {
                return 'secure_conservative';
            } else if (adoption > security && adoption > decentralization) {
                return 'growth_advocate';
            } else {
                return 'decentralization_champion';
            }
        }
    }

    // Get current progress percentage
    getProgress() {
        return Math.round((this.decisions.length / 8) * 100);
    }

    // Check if game is complete
    isGameComplete() {
        return this.decisions.length >= 8;
    }

    // Reset game state
    reset() {
        this.currentDecision = 0;
        this.metrics = {
            security: 50,
            decentralization: 50, 
            adoption: 50
        };
        this.decisions = [];
    }
}