"use client"

import { useStacksAuth, formatStacksAddress, getStacksAddress } from '@/contexts/stacks-auth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'
import { Wallet, LogOut, Copy, ExternalLink, User } from 'lucide-react'
import { toast } from 'sonner'

export function WalletConnectButton() {
  const { isSignedIn, connectWallet, isLoading } = useStacksAuth()

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Wallet className="h-4 w-4 mr-2 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (isSignedIn) {
    return <WalletProfile />
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={connectWallet}
      className="flex items-center gap-2"
    >
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
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
      toast.success('Address copied to clipboard')
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>
              <User className="h-3 w-3" />
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline-block">{displayName}</span>
          <Badge variant="secondary" className="hidden md:inline-block">
            {isMainnet ? 'Mainnet' : 'Testnet'}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{displayName}</p>
              <p className="text-xs text-muted-foreground">
                {formatStacksAddress(stxAddress, 4)}
              </p>
            </div>
          </div>
          
          <Badge variant="outline" className="w-full justify-center">
            {isMainnet ? '🟢 Mainnet' : '🟡 Testnet'}
          </Badge>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={openInExplorer}>
          <ExternalLink className="h-4 w-4 mr-2" />
          View in Explorer
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={disconnectWallet} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Compact wallet status for inline display
export function WalletStatus() {
  const { isSignedIn, userData, isLoading } = useStacksAuth()

  if (isLoading) {
    return <Badge variant="outline">Connecting...</Badge>
  }

  if (!isSignedIn) {
    return <Badge variant="outline">Not Connected</Badge>
  }

  const stxAddress = getStacksAddress(userData)
  return (
    <Badge variant="default" className="bg-primary/10 text-primary">
      {formatStacksAddress(stxAddress, 3)}
    </Badge>
  )
}

// Compact wallet connection prompt
export function StacksWelcomeCard() {
  const { isSignedIn } = useStacksAuth()

  // Don't show if already connected
  if (isSignedIn) return null

  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground">
        Optional: Connect your Stacks wallet to save progress and earn blockchain achievements
      </p>
    </div>
  )
}