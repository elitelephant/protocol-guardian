'use client'

import { useState, useEffect } from 'react'

// Game decisions data
const decisions = [
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

const endings = {
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

interface GameState {
  currentDecision: number;
  metrics: {
    security: number;
    decentralization: number;
    adoption: number;
  };
  decisions: Array<{
    title: string;
    choice: 'approve' | 'reject';
    impact: any;
  }>;
}

export default function ProtocolGuardianGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentDecision: 0,
    metrics: {
      security: 50,
      decentralization: 50,
      adoption: 50
    },
    decisions: []
  });

  const makeDecision = (choice: 'start' | 'approve' | 'reject') => {
    if (choice === 'start') {
      return;
    }

    const currentDecisionData = decisions[gameState.currentDecision];
    const impact = choice === 'approve' ? currentDecisionData.approve : currentDecisionData.reject;
    
    setGameState(prev => ({
      ...prev,
      currentDecision: prev.currentDecision + 1,
      metrics: {
        security: Math.max(0, Math.min(100, prev.metrics.security + impact.security)),
        decentralization: Math.max(0, Math.min(100, prev.metrics.decentralization + impact.decentralization)),
        adoption: Math.max(0, Math.min(100, prev.metrics.adoption + impact.adoption))
      },
      decisions: [...prev.decisions, {
        title: currentDecisionData.title,
        choice: choice,
        impact: impact
      }]
    }));
  };

  const calculateEnding = () => {
    const { security, decentralization, adoption } = gameState.metrics;
    
    if (security >= 65) {
      return 'secure_conservative';
    } else if (adoption >= 65) {
      return 'growth_advocate'; 
    } else if (decentralization >= 65) {
      return 'decentralization_champion';
    } else {
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
  };

  const restart = () => {
    setGameState({
      currentDecision: 0,
      metrics: {
        security: 50,
        decentralization: 50, 
        adoption: 50
      },
      decisions: []
    });
  };

  const isGameComplete = gameState.decisions.length >= 8;
  const progress = Math.round((gameState.decisions.length / 8) * 100);

  // Welcome Screen
  if (gameState.decisions.length === 0) {
    return (
      <>
        {/* Skip navigation for screen readers */}
        <a href="#main-content" className="sr-only">Skip to main content</a>
        
        {/* Mobile Warning */}
        <div className="mobile-warning" role="dialog" aria-labelledby="mobile-title" aria-describedby="mobile-desc">
          <div>
            <h2 id="mobile-title">Desktop Required</h2>
            <p id="mobile-desc">This game is optimized for desktop screens. Please access from a computer for the best experience.</p>
          </div>
        </div>

        <main id="main-content" className="game-container" role="main">
          <div className="welcome-screen">
            <h1>Protocol Guardian</h1>
            <p>As a Protocol Guardian, you'll face critical decisions that shape the future of the blockchain ecosystem. Each choice affects three key metrics that determine the protocol's success.</p>
            
            <div className="metrics-intro">
              <div className="metric-intro">
                <h3>Security</h3>
                <p>Protocol safety, audit processes, and vulnerability management</p>
              </div>
              <div className="metric-intro">
                <h3>Decentralization</h3>
                <p>Network distribution, community governance, and power balance</p>
              </div>
              <div className="metric-intro">
                <h3>Adoption</h3>
                <p>User growth, ecosystem expansion, and mainstream acceptance</p>
              </div>
            </div>
            
            <button className="start-button" onClick={() => makeDecision('start')}>
              Begin Your Mission
            </button>
          </div>
        </main>
      </>
    );
  }

  // Decision Screen
  if (!isGameComplete) {
    const currentDecisionData = decisions[gameState.currentDecision];
    
    return (
      <main className="game-container" role="main">
        <div className="decision-screen">
          <div className="progress-bar">
            <span>Decision {gameState.decisions.length + 1} of 8</span>
            <div style={{ width: '100%', height: '4px', background: '#ddd' }}>
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          
          <div className="metrics-display">
            <div className="metric">
              <span className="metric-label">Security</span>
              <span className="metric-value">{gameState.metrics.security}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Decentralization</span>
              <span className="metric-value">{gameState.metrics.decentralization}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Adoption</span>
              <span className="metric-value">{gameState.metrics.adoption}</span>
            </div>
          </div>
          
          <div className="decision-document">
            <h2>{currentDecisionData.title}</h2>
            <p>{currentDecisionData.description}</p>
          </div>
          
          <div className="decision-buttons">
            <button className="reject-btn" onClick={() => makeDecision('reject')}>
              Reject
            </button>
            <button className="approve-btn" onClick={() => makeDecision('approve')}>
              Approve
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Final Summary Screen
  const endingType = calculateEnding();
  const ending = endings[endingType as keyof typeof endings];
  
  return (
    <main className="game-container" role="main">
      <div className="final-summary">
        <h1>Mission Complete</h1>
        
        <div className="ending-section">
          <h2>{ending.title}</h2>
          <h3>{ending.subtitle}</h3>
          <p>{ending.description}</p>
        </div>
        
        <div className="final-metrics">
          <div className="metric-card">
            <span className="metric-value">{gameState.metrics.security}</span>
            <span className="metric-label">Security</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{gameState.metrics.decentralization}</span>
            <span className="metric-label">Decentralization</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{gameState.metrics.adoption}</span>
            <span className="metric-label">Adoption</span>
          </div>
        </div>
        
        <div className="decisions-history">
          <h3>Your Leadership Journey</h3>
          {gameState.decisions.map((decision, index) => (
            <div key={index} className="decision-item">
              <span className={`decision-status ${decision.choice === 'approve' ? 'approve-btn' : 'reject-btn'}`}>
                {decision.choice.toUpperCase()}
              </span>
              <span className="decision-title">{decision.title}</span>
            </div>
          ))}
        </div>
        
        <button className="restart-btn" onClick={restart}>
          Lead Again
        </button>
      </div>
    </main>
  );
}