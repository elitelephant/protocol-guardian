"use client"

import { useState, useCallback, useEffect } from 'react'
import { useStacksAuth } from '../contexts/stacks-auth'

export interface GameState {
  currentDecision: number
  gameStarted: boolean
  metrics: {
    security: number
    decentralization: number
    adoption: number
  }
  decisions: Array<{
    title: string
    choice: 'approve' | 'reject'
    impact: any
  }>
}

export function useBlockchainGameState() {
  const { userSession, isSignedIn } = useStacksAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSavedData, setHasSavedData] = useState(false)

  // Check if user has saved game data
  useEffect(() => {
    checkForSavedData()
  }, [isSignedIn])

  const checkForSavedData = useCallback(async () => {
    if (!isSignedIn || !userSession) {
      setHasSavedData(false)
      return
    }

    try {
      const userData = userSession.loadUserData()
      const stxAddress = userData.profile.stxAddress?.testnet || userData.profile.stxAddress?.mainnet
      
      if (!stxAddress) {
        setHasSavedData(false)
        return
      }

      const gameStateKey = `game_state_${stxAddress}`
      const savedData = localStorage.getItem(gameStateKey)
      setHasSavedData(!!savedData)
    } catch (error) {
      console.error('Failed to check for saved data:', error)
      setHasSavedData(false)
    }
  }, [isSignedIn, userSession])

  // Save game state to blockchain (simulated with localStorage for demo)
  const saveGameState = useCallback(async (gameState: GameState): Promise<boolean> => {
    if (!isSignedIn || !userSession) {
      return false
    }

    setIsSaving(true)
    try {
      const userData = userSession.loadUserData()
      const stxAddress = userData.profile.stxAddress?.testnet || userData.profile.stxAddress?.mainnet
      
      if (!stxAddress) {
        throw new Error('No Stacks address found')
      }

      // Create simplified game state for blockchain storage
      const gameStateData = {
        currentDecision: gameState.currentDecision,
        gameStarted: gameState.gameStarted,
        metrics: gameState.metrics,
        decisionsCount: gameState.decisions.length,
        decisions: gameState.decisions.map(d => ({
          title: d.title,
          choice: d.choice
        })),
        timestamp: Date.now(),
        version: '1.0.0'
      }

      // In production, this would use Stacks smart contracts
      // For demo, simulate with localStorage
      const gameStateKey = `game_state_${stxAddress}`
      localStorage.setItem(gameStateKey, JSON.stringify(gameStateData))
      
      setHasSavedData(true)
      return true
    } catch (error) {
      console.error('Failed to save game state:', error)
      return false
    } finally {
      setIsSaving(false)
    }
  }, [isSignedIn, userSession])

  // Load game state from blockchain
  const loadGameState = useCallback(async (): Promise<Partial<GameState> | null> => {
    if (!isSignedIn || !userSession) {
      return null
    }

    setIsLoading(true)
    try {
      const userData = userSession.loadUserData()
      const stxAddress = userData.profile.stxAddress?.testnet || userData.profile.stxAddress?.mainnet
      
      if (!stxAddress) {
        return null
      }

      const gameStateKey = `game_state_${stxAddress}`
      const savedData = localStorage.getItem(gameStateKey)
      
      if (savedData) {
        const gameStateData = JSON.parse(savedData)
        return {
          currentDecision: gameStateData.currentDecision,
          gameStarted: gameStateData.gameStarted,
          metrics: gameStateData.metrics,
          decisions: gameStateData.decisions || []
        }
      }

      return null
    } catch (error) {
      console.error('Failed to load game state:', error)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [isSignedIn, userSession])

  // Clear saved game state
  const clearGameState = useCallback(async (): Promise<boolean> => {
    if (!isSignedIn || !userSession) {
      return false
    }

    try {
      const userData = userSession.loadUserData()
      const stxAddress = userData.profile.stxAddress?.testnet || userData.profile.stxAddress?.mainnet
      
      if (!stxAddress) {
        return false
      }

      const gameStateKey = `game_state_${stxAddress}`
      localStorage.removeItem(gameStateKey)
      setHasSavedData(false)
      return true
    } catch (error) {
      console.error('Failed to clear game state:', error)
      return false
    }
  }, [isSignedIn, userSession])

  return {
    saveGameState,
    loadGameState,
    clearGameState,
    checkForSavedData,
    isSaving,
    isLoading,
    hasSavedData,
    isSignedIn
  }
}

// Hook for blockchain-based achievements
export function useBlockchainAchievements() {
  const { userSession, isSignedIn } = useStacksAuth()
  const [achievements, setAchievements] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      loadAchievements()
    }
  }, [isSignedIn])

  const unlockAchievement = useCallback(async (achievementId: string, title: string): Promise<boolean> => {
    if (!isSignedIn || !userSession) {
      return false
    }

    try {
      const userData = userSession.loadUserData()
      const stxAddress = userData.profile.stxAddress?.testnet || userData.profile.stxAddress?.mainnet
      
      if (!stxAddress) {
        return false
      }

      const achievementsKey = `achievements_${stxAddress}`
      const currentAchievements = JSON.parse(localStorage.getItem(achievementsKey) || '[]')
      
      if (!currentAchievements.includes(achievementId)) {
        currentAchievements.push(achievementId)
        localStorage.setItem(achievementsKey, JSON.stringify(currentAchievements))
        setAchievements(currentAchievements)
        
        // Show achievement notification
        showAchievementNotification(title)
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to unlock achievement:', error)
      return false
    }
  }, [isSignedIn, userSession])

  const loadAchievements = useCallback(async () => {
    if (!isSignedIn || !userSession) {
      return []
    }

    setIsLoading(true)
    try {
      const userData = userSession.loadUserData()
      const stxAddress = userData.profile.stxAddress?.testnet || userData.profile.stxAddress?.mainnet
      
      if (!stxAddress) {
        return []
      }

      const achievementsKey = `achievements_${stxAddress}`
      const currentAchievements = JSON.parse(localStorage.getItem(achievementsKey) || '[]')
      setAchievements(currentAchievements)
      return currentAchievements
    } catch (error) {
      console.error('Failed to load achievements:', error)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [isSignedIn, userSession])

  return {
    achievements,
    unlockAchievement,
    loadAchievements,
    isLoading
  }
}

// Helper function to show achievement notification
function showAchievementNotification(title: string) {
  const notification = document.createElement('div')
  notification.className = 'achievement-notification'
  notification.innerHTML = `
    <div class="achievement-content">
      <span class="achievement-icon">★</span>
      <div>
        <div class="achievement-title">Achievement Unlocked!</div>
        <div class="achievement-description">${title}</div>
      </div>
    </div>
  `
  
  document.body.appendChild(notification)
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification)
    }
  }, 4000)
  
  // Add click to dismiss
  notification.addEventListener('click', () => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification)
    }
  })
}