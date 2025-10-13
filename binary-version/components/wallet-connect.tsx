"use client"

import { useStacksAuth, formatStacksAddress, getStacksAddress } from '../contexts/stacks-auth'
import { Wallet, User, Copy, ExternalLink, LogOut } from 'lucide-react'

export function WalletConnectButton() {
  const { isSignedIn, connectWallet, isLoading } = useStacksAuth()

  if (isLoading) {
    return (
      <button 
        className="wallet-btn wallet-btn-loading" 
        disabled
      >
        <Wallet size={16} className="animate-spin" />
        Loading...
      </button>
    )
  }

  if (isSignedIn) {
    return <WalletProfile />
  }

  return (
    <button 
      className="wallet-btn wallet-btn-connect"
      onClick={connectWallet}
    >
      <Wallet size={16} />
      Connect Wallet
    </button>
  )
}

export function WalletProfile() {
  const { userData, disconnectWallet, isMainnet } = useStacksAuth()
  
  if (!userData) return null

  const stxAddress = getStacksAddress(userData)
  const displayName = userData.profile?.name || formatStacksAddress(stxAddress)
  const avatarUrl = userData.profile?.image?.[0]?.contentUrl

  const copyAddress = async () => {
    if (stxAddress) {
      await navigator.clipboard.writeText(stxAddress)
      // Simple toast notification
      const toast = document.createElement('div')
      toast.className = 'wallet-toast'
      toast.textContent = 'Address copied!'
      document.body.appendChild(toast)
      setTimeout(() => document.body.removeChild(toast), 2000)
    }
  }

  const openInExplorer = () => {
    if (stxAddress) {
      const explorerUrl = isMainnet 
        ? `https://explorer.stacks.co/address/${stxAddress}`
        : `https://explorer.stacks.co/address/${stxAddress}?chain=testnet`
      window.open(explorerUrl, '_blank')
    }
  }

  return (
    <div className="wallet-profile">
      <div className="wallet-profile-trigger">
        <div className="wallet-avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} />
          ) : (
            <User size={14} />
          )}
        </div>
        <span className="wallet-name">{displayName}</span>
        <span className="wallet-network">
          {isMainnet ? 'Mainnet' : 'Testnet'}
        </span>
      </div>
      
      <div className="wallet-dropdown">
        <div className="wallet-dropdown-header">
          <div className="wallet-avatar-large">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} />
            ) : (
              <User size={20} />
            )}
          </div>
          <div className="wallet-info">
            <div className="wallet-display-name">{displayName}</div>
            <div className="wallet-address">{formatStacksAddress(stxAddress, 4)}</div>
          </div>
          <div className="wallet-network-badge">
            {isMainnet ? '🟢 Mainnet' : '🟡 Testnet'}
          </div>
        </div>
        
        <div className="wallet-dropdown-actions">
          <button onClick={copyAddress} className="wallet-action">
            <Copy size={16} />
            Copy Address
          </button>
          
          <button onClick={openInExplorer} className="wallet-action">
            <ExternalLink size={16} />
            View in Explorer
          </button>
          
          <button onClick={disconnectWallet} className="wallet-action wallet-action-danger">
            <LogOut size={16} />
            Disconnect
          </button>
        </div>
      </div>
    </div>
  )
}

// Compact wallet status for inline display
export function WalletStatus() {
  const { isSignedIn, userData, isLoading } = useStacksAuth()

  if (isLoading) {
    return <span className="wallet-status wallet-status-loading">Connecting...</span>
  }

  if (!isSignedIn) {
    return <span className="wallet-status wallet-status-disconnected">Not Connected</span>
  }

  const stxAddress = getStacksAddress(userData)
  return (
    <span className="wallet-status wallet-status-connected">
      {formatStacksAddress(stxAddress, 3)}
    </span>
  )
}

// Compact wallet connection prompt
export function StacksWelcomeCard() {
  const { isSignedIn } = useStacksAuth()

  // Don't show if already connected
  if (isSignedIn) return null

  return (
    <div className="stacks-welcome-card">
      <p>
        💡 <strong>Optional:</strong> Connect your Stacks wallet to save progress and earn blockchain achievements
      </p>
    </div>
  )
}