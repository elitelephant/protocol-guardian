"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AppConfig, UserSession, authenticate, UserData } from '@stacks/connect'
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network'

interface StacksAuthContextType {
  userSession: UserSession | null
  userData: UserData | null
  isSignedIn: boolean
  connectWallet: () => void
  disconnectWallet: () => void
  isLoading: boolean
  network: typeof STACKS_MAINNET | typeof STACKS_TESTNET
  isMainnet: boolean
}

const StacksAuthContext = createContext<StacksAuthContextType | undefined>(undefined)

interface StacksAuthProviderProps {
  children: ReactNode
  testnet?: boolean // Default to testnet for development
}

export function StacksAuthProvider({ children, testnet = true }: StacksAuthProviderProps) {
  const [userSession, setUserSession] = useState<UserSession | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Configure network (testnet by default for NFT testing)
  const network = testnet ? STACKS_TESTNET : STACKS_MAINNET
  const isMainnet = !testnet
  
  // App configuration for Stacks Connect (only on client side)
  const appConfig = typeof window !== 'undefined' 
    ? new AppConfig(['store_write', 'publish_data'], window.location.origin)
    : null

  useEffect(() => {
    const initializeAuth = async () => {
      // Only initialize on client side
      if (typeof window === 'undefined' || !appConfig) {
        setIsLoading(false)
        return
      }

      try {
        const session = new UserSession({ appConfig })
        setUserSession(session)
        
        if (session.isSignInPending()) {
          // Handle redirect from wallet
          const userData = await session.handlePendingSignIn()
          setUserData(userData)
        } else if (session.isUserSignedIn()) {
          // User is already signed in
          const userData = session.loadUserData()
          setUserData(userData)
        }
      } catch (error) {
        console.error('Failed to initialize Stacks auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [appConfig])

  const connectWallet = () => {
    if (!userSession || typeof window === 'undefined') return
    
    authenticate({
      appDetails: {
        name: 'Protocol Guardian: Stacks Edition',
        icon: window.location.origin + '/favicon.ico',
      },
      redirectTo: '/',
      onFinish: () => {
        window.location.reload() // Refresh to update auth state
      },
      userSession,
    })
  }

  const disconnectWallet = () => {
    if (!userSession) return
    
    userSession.signUserOut()
    setUserData(null)
    window.location.reload() // Refresh to clear auth state
  }

  const isSignedIn = !!userData

  const value: StacksAuthContextType = {
    userSession,
    userData,
    isSignedIn,
    connectWallet,
    disconnectWallet,
    isLoading,
    network,
    isMainnet,
  }

  return (
    <StacksAuthContext.Provider value={value}>
      {children}
    </StacksAuthContext.Provider>
  )
}

export function useStacksAuth(): StacksAuthContextType {
  const context = useContext(StacksAuthContext)
  if (context === undefined) {
    throw new Error('useStacksAuth must be used within a StacksAuthProvider')
  }
  return context
}

// Utility function to format Stacks address for display
export function formatStacksAddress(address: string, chars: number = 6): string {
  if (!address) return ''
  if (address.length <= chars * 2) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

// Utility function to get user's STX address
export function getStacksAddress(userData: UserData | null): string {
  if (!userData?.profile?.stxAddress) return ''
  return userData.profile.stxAddress.mainnet || userData.profile.stxAddress.testnet || ''
}