"use client"

import { useState, useEffect } from 'react'
import { useStacksAuth } from '@/contexts/stacks-auth'
import { useBlockchainGameState, useBlockchainAchievements } from '@/hooks/use-blockchain-game'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Save, 
  Download, 
  Trophy, 
  Link, 
  Shield,
  AlertCircle,
  Check
} from 'lucide-react'
import { toast } from 'sonner'
import type { GameState } from '@/lib/game-state'

interface BlockchainGameFeaturesProps {
  gameState: GameState
  onLoadGameState?: (gameStateData: any) => void
}

export function BlockchainGameFeatures({ gameState, onLoadGameState }: BlockchainGameFeaturesProps) {
  const { isSignedIn, userData } = useStacksAuth()
  const { 
    saveGameState, 
    loadGameState, 
    hasSavedGameState, 
    isSaving, 
    isLoading 
  } = useBlockchainGameState()
  const { achievements, unlockAchievement, loadAchievements } = useBlockchainAchievements()
  
  const [hasCloudSave, setHasCloudSave] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      loadAchievements()
      checkForCloudSave()
    }
  }, [isSignedIn, loadAchievements])

  const checkForCloudSave = async () => {
    const hasSave = await hasSavedGameState()
    setHasCloudSave(hasSave)
  }

  const handleSaveToBlockchain = async () => {
    const success = await saveGameState(gameState)
    if (success) {
      setHasCloudSave(true)
      // Unlock save achievement
      await unlockAchievement('first_save', 'Blockchain Guardian - Saved your first game to the blockchain')
    }
  }

  const handleLoadFromBlockchain = async () => {
    const savedData = await loadGameState()
    if (savedData && onLoadGameState) {
      onLoadGameState(savedData)
    }
  }

  // Check for achievements based on game state
  useEffect(() => {
    if (!isSignedIn) return

    // Achievement: First Era Completion
    if (gameState.gamePhase === 'era2' && !achievements.includes('first_era')) {
      unlockAchievement('first_era', 'Era Pioneer - Completed your first era')
    }

    // Achievement: High Network Health
    if (gameState.networkHealth >= 80 && !achievements.includes('network_guardian')) {
      unlockAchievement('network_guardian', 'Network Guardian - Maintained high network health')
    }

    // Achievement: Balanced Decision Making
    if (
      gameState.networkHealth >= 60 && 
      gameState.publicConfidence >= 60 && 
      gameState.techAdvancement >= 60 &&
      !achievements.includes('balanced_leader')
    ) {
      unlockAchievement('balanced_leader', 'Balanced Leader - Excelled in all areas')
    }
  }, [gameState, achievements, isSignedIn, unlockAchievement])

  if (!isSignedIn) {
    return (
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center gap-3 mb-3">
          <Link className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium text-muted-foreground">Blockchain Features</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Connect your Stacks wallet to unlock blockchain-powered features like cloud saves and achievements.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            <Save className="h-3 w-3 mr-1" />
            Cloud Saves
          </Badge>
          <Badge variant="outline">
            <Trophy className="h-3 w-3 mr-1" />
            Achievements
          </Badge>
          <Badge variant="outline">
            <Shield className="h-3 w-3 mr-1" />
            Secure Storage
          </Badge>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <Link className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Blockchain Features</h3>
        <Badge variant="secondary" className="ml-auto">
          <Check className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      </div>

      {/* Cloud Save Section */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span className="text-sm font-medium">Cloud Save</span>
            {hasCloudSave && (
              <Badge variant="outline" className="text-xs">
                <Check className="h-3 w-3 mr-1" />
                Saved
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleSaveToBlockchain}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Save className="h-3 w-3 mr-1 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-3 w-3 mr-1" />
                  Save
                </>
              )}
            </Button>
            {hasCloudSave && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleLoadFromBlockchain}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Download className="h-3 w-3 mr-1 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Download className="h-3 w-3 mr-1" />
                    Load
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Your game progress is securely stored on the Stacks blockchain.
        </p>
      </div>

      <Separator className="my-4" />

      {/* Achievements Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4" />
          <span className="text-sm font-medium">Achievements</span>
          <Badge variant="secondary">{achievements.length}</Badge>
        </div>
        
        {achievements.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {achievements.map((achievement) => (
              <Badge key={achievement} variant="outline" className="text-xs">
                {achievement.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Complete game milestones to unlock blockchain-verified achievements.
          </p>
        )}
      </div>

      {/* Network Info */}
      <div className="mt-4 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          <span>Demo mode: Data stored locally. In production, this would use Stacks smart contracts.</span>
        </div>
      </div>
    </Card>
  )
}