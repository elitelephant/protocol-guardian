'use client'

import React, { useState, useEffect } from 'react'
import { WalletConnectButton, StacksWelcomeCard } from '../components/wallet-connect'
import { useBlockchainGameState, useBlockchainAchievements } from '../hooks/use-blockchain-game'
import { useNFTCertification, CertificatePreview, getCertificateInfo, type GameCertificate, type CertificateType } from '../hooks/use-nft-certification'

// Bitcoin/Stacks Protocol Decision Scenarios
const decisions = [
  {
    title: "Lightning Network Integration Proposal",
    description: "A community proposal suggests integrating Stacks smart contracts with Bitcoin's Lightning Network to enable instant micropayments and DeFi transactions. This could improve transaction throughput by 300%, but requires significant protocol changes and raises compatibility concerns with existing Stacks applications.",
    approve: { security: -3, decentralization: 4, adoption: 7 },
    reject: { security: 2, decentralization: -2, adoption: -4 }
  },
  {
    title: "Stacks Developer Fund Initiative", 
    description: "The Stacks Foundation has received a request for 500,000 STX to fund Bitcoin DeFi tooling and educational resources. The proposal has strong community backing and could accelerate ecosystem growth, but would reduce the treasury by 15% and require careful allocation oversight.",
    approve: { security: 3, decentralization: 2, adoption: 6 },
    reject: { security: -2, decentralization: 1, adoption: -8 }
  },
  {
    title: "Bitcoin Mining Pool Diversification",
    description: "Three major Bitcoin mining pools control 65% of the network hashrate, raising concerns about centralization. A proposal suggests implementing PoX incentives to encourage smaller pools to participate in Stacks consensus, potentially improving decentralization but temporarily reducing overall network security.",
    approve: { security: -4, decentralization: 8, adoption: 1 },
    reject: { security: 3, decentralization: -6, adoption: -1 }
  },
  {
    title: "Clarity Smart Contract Security Audit",
    description: "A critical vulnerability has been discovered in a popular Stacks DeFi protocol built with Clarity. The proposed fix leverages Clarity's safety features but requires an emergency upgrade that could disrupt transactions for 24 hours while preventing potential exploits.",
    approve: { security: 8, decentralization: -1, adoption: -3 },
    reject: { security: -8, decentralization: 2, adoption: 4 }
  },
  {
    title: "Bitcoin-Stacks Bridge Enhancement",
    description: "A proposal to enhance the BTC-STX bridge could increase interoperability between Bitcoin and Stacks, attracting new users and enabling novel DeFi applications. However, it introduces additional complexity and potential attack vectors to the Layer 2 ecosystem.",
    approve: { security: -2, decentralization: -1, adoption: 8 },
    reject: { security: 4, decentralization: 3, adoption: -5 }
  },
  {
    title: "STX Stacking Rewards Distribution",
    description: "The community proposes distributing additional STX stacking rewards to all active participants in Proof-of-Transfer consensus. This would increase participation in Bitcoin mining rewards but may dilute existing stacker influence and complicate the economic model.",
    approve: { security: 1, decentralization: 6, adoption: 4 },
    reject: { security: -1, decentralization: -4, adoption: -2 }
  },
  {
    title: "Bitcoin Privacy Enhancement Integration",
    description: "A new privacy feature could make Stacks transactions more confidential while maintaining Bitcoin's transparent base layer. This would attract privacy-focused users to the ecosystem, but regulators have expressed concerns about compliance implications for Bitcoin Layer 2 solutions.",
    approve: { security: 2, decentralization: 3, adoption: -6 },
    reject: { security: -1, decentralization: -2, adoption: 5 }
  },
  {
    title: "Bitcoin DeFi Security Standards (2024)",
    description: "Despite Clarity's safety features, several Stacks DeFi protocols have experienced exploits costing users millions. The community debates mandatory security audits and formal verification requirements versus maintaining the permissionless innovation environment that enabled rapid ecosystem growth.",
    approve: { security: 8, decentralization: -3, adoption: 4 },
    reject: { security: -4, decentralization: 7, adoption: -2 }
  },
  {
    title: "Stacks Proof-of-Transfer Evolution",
    description: "The Stacks network proposes enhancing its Proof-of-Transfer (PoX) consensus mechanism to increase Bitcoin miner participation and STX stacking rewards. This could strengthen Bitcoin-Stacks alignment and reward long-term holders, but requires changes to the economic model that some fear could centralize STX distribution.",
    approve: { security: 6, decentralization: -2, adoption: 7 },
    reject: { security: 2, decentralization: 4, adoption: -3 }
  },
  {
    title: "Bitcoin NFT Infrastructure Proposal",
    description: "A major proposal suggests building comprehensive NFT infrastructure on Stacks, including marketplace protocols, creator royalty systems, and cross-chain Bitcoin Ordinals integration. This could establish Stacks as the premier Bitcoin NFT platform, but critics worry about network congestion and deviation from Bitcoin's monetary focus.",
    approve: { security: -1, decentralization: 3, adoption: 8 },
    reject: { security: 5, decentralization: 6, adoption: -4 }
  }
];

const endings = {
  secure_conservative: {
    title: "The Security Guardian",
    subtitle: "Safety First Approach",
    description: "You prioritized security and stability in every decision. The Stacks ecosystem remains robust and trusted, with strong Bitcoin alignment. While growth was measured, users have confidence in the platform's reliability and your careful stewardship."
  },
  balanced_leader: {
    title: "The Balanced Builder", 
    subtitle: "Harmony in Innovation",
    description: "You achieved remarkable balance across all priorities, building a sustainable Stacks ecosystem. Your measured approach earned widespread respect, successfully growing adoption while maintaining security and decentralization principles."
  },
  growth_advocate: {
    title: "The Ecosystem Catalyst",
    subtitle: "Innovation and Expansion", 
    description: "You championed rapid growth and adoption, making bold moves to expand the Stacks ecosystem. Your vision attracted millions of new users to Bitcoin DeFi and Web3, though some worry about the pace of change and potential risks."
  },
  decentralization_champion: {
    title: "The Community Champion",
    subtitle: "Power to the People",
    description: "You consistently chose to empower the community and maintain decentralized governance. The Stacks network remains truly community-driven and accessible to all, though growth was sometimes slower than competing platforms."
  }
};

interface GameState {
  currentDecision: number;
  gameStarted: boolean;
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
    gameStarted: false,
    metrics: {
      security: 50,
      decentralization: 50,
      adoption: 50
    },
    decisions: []
  });

  // Blockchain hooks
  const { 
    saveGameState, 
    loadGameState, 
    hasSavedData, 
    isSaving, 
    isLoading: isLoadingGame,
    isSignedIn 
  } = useBlockchainGameState()
  
  const { unlockAchievement } = useBlockchainAchievements()
  
  const { 
    mintCertificate, 
    isMinting, 
    mintStatus,
    isSignedIn: isWalletConnected 
  } = useNFTCertification()

  const [showNFTMint, setShowNFTMint] = useState(false)

  // Auto-save game state when connected
  useEffect(() => {
    if (isSignedIn && gameState.gameStarted && gameState.decisions.length > 0) {
      saveGameState(gameState)
    }
  }, [gameState.decisions.length, isSignedIn])

  // Unlock achievements based on progress
  useEffect(() => {
    if (!isSignedIn) return

    if (gameState.decisions.length === 1) {
      unlockAchievement('first_decision', 'Protocol Pioneer - Made your first governance decision')
    }
    if (gameState.decisions.length === 5) {
      unlockAchievement('halfway_point', 'Halfway Hero - Completed half the protocol decisions')
    }
    if (gameState.decisions.length === 10) {
      unlockAchievement('governance_master', 'Governance Master - Completed all protocol decisions')
    }
    
    // Metric-based achievements
    const { security, decentralization, adoption } = gameState.metrics
    if (security >= 80) {
      unlockAchievement('security_guardian', 'Security Guardian - Achieved 80+ Security Score')
    }
    if (decentralization >= 80) {
      unlockAchievement('decentralization_champion', 'Decentralization Champion - Achieved 80+ Decentralization Score')
    }
    if (adoption >= 80) {
      unlockAchievement('adoption_catalyst', 'Adoption Catalyst - Achieved 80+ Adoption Score')
    }
  }, [gameState.metrics, gameState.decisions.length, isSignedIn])

  // Load saved game on wallet connection
  const handleLoadSavedGame = async () => {
    const savedState = await loadGameState()
    if (savedState) {
      setGameState(prevState => ({
        ...prevState,
        ...savedState,
        decisions: savedState.decisions || []
      }))
    }
  }

  // Handle NFT certificate minting
  const handleMintCertificate = async () => {
    if (!isWalletConnected) return

    const endingType = calculateEnding() as CertificateType
    const certificate: GameCertificate = {
      type: endingType,
      title: endings[endingType].title,
      description: endings[endingType].description,
      metrics: gameState.metrics,
      decisions: gameState.decisions.map(d => ({
        title: d.title,
        choice: d.choice
      })),
      timestamp: Date.now()
    }

    try {
      await mintCertificate(certificate)
      setShowNFTMint(false)
      unlockAchievement('nft_certified', 'NFT Certified - Minted Protocol Guardian Certificate')
    } catch (error) {
      console.error('Failed to mint certificate:', error)
    }
  }

  const makeDecision = (choice: 'start' | 'approve' | 'reject') => {
    if (choice === 'start') {
      // Start the game by setting gameStarted to true
      setGameState(prev => ({
        ...prev,
        gameStarted: true
      }));
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
      gameStarted: false,
      metrics: {
        security: 50,
        decentralization: 50, 
        adoption: 50
      },
      decisions: []
    });
  };

  const isGameComplete = gameState.decisions.length >= 10;
  const progress = Math.round((gameState.decisions.length / 10) * 100);

  // Welcome Screen
  if (!gameState.gameStarted) {
    return (
      <div className="game-wrapper">
        {/* Skip navigation for screen readers */}
        <a href="#main-content" className="sr-only">Skip to main content</a>
        
        {/* Mobile Warning */}
        <div className="mobile-warning" role="dialog" aria-labelledby="mobile-title" aria-describedby="mobile-desc">
          <div>
            <h2 id="mobile-title">Desktop Required</h2>
            <p id="mobile-desc">This game is optimized for desktop screens. Please access from a computer for the best experience.</p>
          </div>
        </div>

        {/* Wallet Header Section */}
        <header className="wallet-header">
          <WalletConnectButton />
        </header>

        <main id="main-content" className="game-container" role="main">

          <div className="welcome-screen">
            <div className="welcome-content">
              <h1>Protocol Guardian: Stacks Edition</h1>
              <p>Shape the future of Bitcoin's smart contract layer as a Protocol Guardian. Navigate the evolving Stacks ecosystem, balancing innovation with security while building the foundation for Bitcoin DeFi and Web3 applications.</p>
              
              <StacksWelcomeCard />

            {/* Show load option if user has saved data */}
            {hasSavedData && isSignedIn && (
              <div className="blockchain-features-panel">
                <div className="blockchain-features-header">
                  <span className="blockchain-features-title">🔗 Blockchain Save Found</span>
                  <button 
                    className="blockchain-btn"
                    onClick={handleLoadSavedGame}
                    disabled={isLoadingGame}
                  >
                    {isLoadingGame ? 'Loading...' : 'Continue Game'}
                  </button>
                </div>
                <div className="blockchain-status-item">
                  <span>Saved progress found on Stacks blockchain</span>
                  <span>Click to resume your governance journey</span>
                </div>
              </div>
            )}
            
            <div className="metrics-intro">
              <div className="metric-intro">
                <h3>Security</h3>
                <p>Protocol safety, smart contract audits, and Bitcoin alignment</p>
              </div>
              <div className="metric-intro">
                <h3>Decentralization</h3>
                <p>Network distribution, community governance, and accessibility</p>
              </div>
              <div className="metric-intro">
                <h3>Adoption</h3>
                <p>User growth, developer activity, and ecosystem expansion</p>
              </div>
            </div>
            
              <button className="start-button" onClick={() => makeDecision('start')}>
                Begin Your Mission
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Decision Screen
  if (!isGameComplete) {
    const currentDecisionData = decisions[gameState.currentDecision];
    
    return (
      <div className="game-wrapper">
        {/* Wallet Header Section */}
        <header className="wallet-header">
          <WalletConnectButton />
        </header>

        <main className="game-container" role="main">

        <div className="decision-screen">
          <div className="progress-bar">
            <span>Protocol Decision {gameState.decisions.length + 1} of 10</span>
            <div className="main-progress-container">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              <div className="main-progress-segments">
                <div className="main-progress-segment"></div>
                <div className="main-progress-segment"></div>
                <div className="main-progress-segment"></div>
                <div className="main-progress-segment"></div>
                <div className="main-progress-segment"></div>
                <div className="main-progress-segment"></div>
                <div className="main-progress-segment"></div>
                <div className="main-progress-segment"></div>
                <div className="main-progress-segment"></div>
                <div className="main-progress-segment"></div>
              </div>
            </div>
          </div>
          
          <div className="metrics-display">
            <div className="metric">
              <span className="metric-label">Security</span>
              <span className="metric-value">{gameState.metrics.security}</span>
              <div className="metric-progress">
                <div className="metric-progress-fill" style={{ width: `${gameState.metrics.security}%` }}></div>
                <div className="metric-progress-segments">
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                </div>
              </div>
            </div>
            <div className="metric">
              <span className="metric-label">Decentralization</span>
              <span className="metric-value">{gameState.metrics.decentralization}</span>
              <div className="metric-progress">
                <div className="metric-progress-fill" style={{ width: `${gameState.metrics.decentralization}%` }}></div>
                <div className="metric-progress-segments">
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                </div>
              </div>
            </div>
            <div className="metric">
              <span className="metric-label">Adoption</span>
              <span className="metric-value">{gameState.metrics.adoption}</span>
              <div className="metric-progress">
                <div className="metric-progress-fill" style={{ width: `${gameState.metrics.adoption}%` }}></div>
                <div className="metric-progress-segments">
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                  <div className="metric-progress-segment"></div>
                </div>
              </div>
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
      </div>
    );
  }

  // Final Summary Screen
  const endingType = calculateEnding();
  const ending = endings[endingType as keyof typeof endings];
  
  return (
    <div className="game-wrapper">
      {/* Wallet Header Section */}
      <header className="wallet-header">
        <WalletConnectButton />
      </header>

      <main className="game-container" role="main">

      <div className="final-summary">
        <h1>Your Stacks Legacy</h1>
        
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
        
        {/* NFT Certificate Minting Section */}
        {isWalletConnected && (
          <div className="nft-mint-section">
            <h3>🏆 Mint Your Protocol Guardian Certificate</h3>
            <p>
              Immortalize your governance journey on the Stacks blockchain! 
              Mint a unique NFT certificate that proves your leadership as <strong>{ending.title}</strong>.
            </p>
            
            {!showNFTMint && (
              <button 
                className="nft-mint-btn"
                onClick={() => setShowNFTMint(true)}
              >
                Preview Certificate
              </button>
            )}

            {showNFTMint && (
              <div>
                <CertificatePreview certificate={{
                  type: endingType as CertificateType,
                  title: ending.title,
                  description: ending.description,
                  metrics: gameState.metrics,
                  decisions: gameState.decisions.map(d => ({
                    title: d.title,
                    choice: d.choice
                  })),
                  timestamp: Date.now()
                }} />
                
                <div className="blockchain-status">
                  {mintStatus === 'pending' && '⏳ Minting certificate on Stacks testnet...'}
                  {mintStatus === 'success' && '✅ Certificate minted successfully!'}
                  {mintStatus === 'error' && '❌ Failed to mint certificate. Please try again.'}
                  {mintStatus === 'idle' && 'Ready to mint your unique Protocol Guardian certificate'}
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                  <button 
                    className="nft-mint-btn"
                    onClick={handleMintCertificate}
                    disabled={isMinting || mintStatus === 'success'}
                  >
                    {isMinting ? 'Minting...' : mintStatus === 'success' ? 'Minted!' : 'Mint NFT Certificate'}
                  </button>
                  
                  <button 
                    className="blockchain-btn"
                    onClick={() => setShowNFTMint(false)}
                    disabled={isMinting}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Blockchain save status */}
        {isSignedIn && (
          <div className="blockchain-features-panel">
            <div className="blockchain-features-header">
              <span className="blockchain-features-title">🔗 Blockchain Status</span>
              <button 
                className="blockchain-btn"
                onClick={() => saveGameState(gameState)}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Progress'}
              </button>
            </div>
            <div className="blockchain-status-item">
              <span>Game progress</span>
              <span>{hasSavedData ? '✅ Saved' : '❌ Not saved'}</span>
            </div>
            <div className="blockchain-status-item">
              <span>Wallet status</span>
              <span>✅ Connected</span>
            </div>
          </div>
        )}

        <div className="decisions-history">
          <h3>Your Protocol Governance Journey</h3>
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
    </div>
  );
}