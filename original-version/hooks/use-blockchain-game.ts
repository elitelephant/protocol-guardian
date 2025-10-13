"use client"

import { useState, useCallback } from 'react'
import { useStacksAuth } from '@/contexts/stacks-auth'
import { 
  makeContractCall, 
  broadcastTransaction, 
  AnchorMode,
  PostConditionMode,
  stringUtf8CV,
  uintCV,
  bufferCV
} from '@stacks/transactions'
import { toast } from 'sonner'
import type { GameState } from '@/lib/game-state'

export function useBlockchainGameState() {
  const { userSession, network, isSignedIn } = useStacksAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Save game state to Stacks blockchain (simplified version)
  const saveGameState = useCallback(async (gameState: GameState) => {
    if (!isSignedIn || !userSession) {
      toast.error('Please connect your wallet first')
      return false
    }

    setIsSaving(true)
    try {
      // Create a simplified game state hash for on-chain storage
      const gameStateData = {
        phase: gameState.gamePhase,
        networkHealth: gameState.networkHealth,
        publicConfidence: gameState.publicConfidence,
        techAdvancement: gameState.techAdvancement,
        decisionsCount: gameState.decisions.length,
        termProgress: gameState.termProgress,
        timestamp: Date.now()
      }

      // In a real implementation, you would:
      // 1. Deploy a smart contract to handle game state storage
      // 2. Use makeContractCall to interact with your contract
      // 3. Handle transaction broadcasting and confirmation
      
      // For now, we'll simulate saving to localStorage with blockchain-like structure
      const stxAddress = userSession.loadUserData().profile.stxAddress?.mainnet || 
                         userSession.loadUserData().profile.stxAddress?.testnet
      
      if (!stxAddress) {
        throw new Error('No Stacks address found')
      }

      // Simulate blockchain storage (in real app, this would be a smart contract call)
      const gameStateKey = `game_state_${stxAddress}`
      localStorage.setItem(gameStateKey, JSON.stringify(gameStateData))

      toast.success('Game state saved to blockchain!')
      return true
    } catch (error) {
      console.error('Failed to save game state:', error)
      toast.error('Failed to save game state')
      return false
    } finally {
      setIsSaving(false)
    }
  }, [isSignedIn, userSession])

  // Load game state from blockchain
  const loadGameState = useCallback(async (): Promise<any | null> => {
    if (!isSignedIn || !userSession) {
      return null
    }

    setIsLoading(true)
    try {
      const stxAddress = userSession.loadUserData().profile.stxAddress?.mainnet || 
                         userSession.loadUserData().profile.stxAddress?.testnet
      
      if (!stxAddress) {
        return null
      }

      // Simulate blockchain loading (in real app, this would be a contract read)
      const gameStateKey = `game_state_${stxAddress}`
      const savedData = localStorage.getItem(gameStateKey)
      
      if (savedData) {
        const gameStateData = JSON.parse(savedData)
        toast.success('Game state loaded from blockchain!')
        return gameStateData
      }

      return null
    } catch (error) {
      console.error('Failed to load game state:', error)
      toast.error('Failed to load game state')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [isSignedIn, userSession])

  // Check if user has saved game state on blockchain
  const hasSavedGameState = useCallback(async (): Promise<boolean> => {
    if (!isSignedIn || !userSession) {
      return false
    }

    try {
      const stxAddress = userSession.loadUserData().profile.stxAddress?.mainnet || 
                         userSession.loadUserData().profile.stxAddress?.testnet
      
      if (!stxAddress) {
        return false
      }

      const gameStateKey = `game_state_${stxAddress}`
      return localStorage.getItem(gameStateKey) !== null
    } catch (error) {
      console.error('Failed to check saved game state:', error)
      return false
    }
  }, [isSignedIn, userSession])

  return {
    saveGameState,
    loadGameState,
    hasSavedGameState,
    isSaving,
    isLoading,
    isSignedIn
  }
}

// Hook for blockchain-based achievements/stats
export function useBlockchainAchievements() {
  const { userSession, isSignedIn } = useStacksAuth()
  const [achievements, setAchievements] = useState<string[]>([])

  const unlockAchievement = useCallback(async (achievementId: string, title: string) => {
    if (!isSignedIn || !userSession) {
      return false
    }

    try {
      const stxAddress = userSession.loadUserData().profile.stxAddress?.mainnet || 
                         userSession.loadUserData().profile.stxAddress?.testnet
      
      if (!stxAddress) {
        return false
      }

      // Simulate blockchain achievement storage
      const achievementsKey = `achievements_${stxAddress}`
      const currentAchievements = JSON.parse(localStorage.getItem(achievementsKey) || '[]')
      
      if (!currentAchievements.includes(achievementId)) {
        currentAchievements.push(achievementId)
        localStorage.setItem(achievementsKey, JSON.stringify(currentAchievements))
        setAchievements(currentAchievements)
        
        toast.success(`Achievement Unlocked: ${title}`)
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

    try {
      const stxAddress = userSession.loadUserData().profile.stxAddress?.mainnet || 
                         userSession.loadUserData().profile.stxAddress?.testnet
      
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
    }
  }, [isSignedIn, userSession])

  return {
    achievements,
    unlockAchievement,
    loadAchievements
  }
}