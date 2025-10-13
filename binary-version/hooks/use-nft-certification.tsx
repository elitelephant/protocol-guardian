"use client"

import { useState, useCallback } from 'react'
import { useStacksAuth } from '../contexts/stacks-auth'
import { 
  makeContractCall, 
  broadcastTransaction, 
  AnchorMode,
  PostConditionMode,
  stringUtf8CV,
  uintCV,
  standardPrincipalCV
} from '@stacks/transactions'

// NFT Certificate types based on game endings
export type CertificateType = 'secure_conservative' | 'balanced_leader' | 'growth_advocate' | 'decentralization_champion'

export interface GameCertificate {
  type: CertificateType
  title: string
  description: string
  metrics: {
    security: number
    decentralization: number
    adoption: number
  }
  decisions: Array<{
    title: string
    choice: 'approve' | 'reject'
  }>
  timestamp: number
}

// For testnet deployment - this would be the actual contract address
const NFT_CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM' // Placeholder testnet address
const NFT_CONTRACT_NAME = 'protocol-guardian-certificates'

export function useNFTCertification() {
  const { userSession, network, isSignedIn } = useStacksAuth()
  const [isMinting, setIsMinting] = useState(false)
  const [mintStatus, setMintStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')

  // Mint NFT certificate on Stacks testnet
  const mintCertificate = useCallback(async (certificate: GameCertificate): Promise<boolean> => {
    if (!isSignedIn || !userSession) {
      throw new Error('Please connect your wallet first')
    }

    setIsMinting(true)
    setMintStatus('pending')

    try {
      const userData = userSession.loadUserData()
      const userAddress = userData.profile.stxAddress?.testnet || userData.profile.stxAddress?.mainnet

      if (!userAddress) {
        throw new Error('No Stacks address found')
      }

      // Create certificate metadata
      const certificateMetadata = {
        title: certificate.title,
        description: certificate.description,
        type: certificate.type,
        finalMetrics: certificate.metrics,
        totalDecisions: certificate.decisions.length,
        timestamp: certificate.timestamp,
        attributes: [
          { trait_type: 'Security Score', value: certificate.metrics.security },
          { trait_type: 'Decentralization Score', value: certificate.metrics.decentralization },
          { trait_type: 'Adoption Score', value: certificate.metrics.adoption },
          { trait_type: 'Leadership Style', value: certificate.title },
          { trait_type: 'Game Version', value: 'Stacks Edition' },
          { trait_type: 'Completion Date', value: new Date(certificate.timestamp).toISOString() }
        ]
      }

      // In a real implementation, you would:
      // 1. Deploy a Clarity NFT contract to Stacks testnet
      // 2. Store metadata on IPFS or Arweave
      // 3. Use makeContractCall to mint the NFT
      
      // For demo purposes, we'll simulate the minting process
      console.log('Minting NFT Certificate:', {
        recipient: userAddress,
        metadata: certificateMetadata,
        contract: `${NFT_CONTRACT_ADDRESS}.${NFT_CONTRACT_NAME}`
      })

      // Simulate contract call
      const simulatedTxOptions = {
        contractAddress: NFT_CONTRACT_ADDRESS,
        contractName: NFT_CONTRACT_NAME,
        functionName: 'mint',
        functionArgs: [
          standardPrincipalCV(userAddress),
          stringUtf8CV(JSON.stringify(certificateMetadata)),
          uintCV(Date.now()) // token ID
        ],
        senderKey: 'placeholder',
        network,
        anchorMode: AnchorMode.Any,
        postConditionMode: PostConditionMode.Allow,
      }

      // Simulate successful minting (in real app, use makeContractCall and broadcastTransaction)
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate blockchain delay

      // Store certificate locally as backup
      const certificatesKey = `certificates_${userAddress}`
      const existingCertificates = JSON.parse(localStorage.getItem(certificatesKey) || '[]')
      existingCertificates.push({
        ...certificate,
        txId: `simulated_tx_${Date.now()}`,
        blockHeight: Math.floor(Math.random() * 100000) + 50000, // Simulate block height
        contractAddress: `${NFT_CONTRACT_ADDRESS}.${NFT_CONTRACT_NAME}`,
        tokenId: Date.now()
      })
      localStorage.setItem(certificatesKey, JSON.stringify(existingCertificates))

      setMintStatus('success')
      return true
    } catch (error) {
      console.error('Failed to mint certificate:', error)
      setMintStatus('error')
      throw error
    } finally {
      setIsMinting(false)
    }
  }, [isSignedIn, userSession, network])

  // Get user's certificates
  const getUserCertificates = useCallback(async () => {
    if (!isSignedIn || !userSession) {
      return []
    }

    try {
      const userData = userSession.loadUserData()
      const userAddress = userData.profile.stxAddress?.testnet || userData.profile.stxAddress?.mainnet

      if (!userAddress) {
        return []
      }

      // In real implementation, query the blockchain for user's NFTs
      // For demo, return from localStorage
      const certificatesKey = `certificates_${userAddress}`
      const certificates = JSON.parse(localStorage.getItem(certificatesKey) || '[]')
      return certificates
    } catch (error) {
      console.error('Failed to load certificates:', error)
      return []
    }
  }, [isSignedIn, userSession])

  return {
    mintCertificate,
    getUserCertificates,
    isMinting,
    mintStatus,
    isSignedIn
  }
}

// Helper function to get certificate display information
export function getCertificateInfo(certificateType: CertificateType) {
  const certificates = {
    secure_conservative: {
      title: "The Security Guardian",
      subtitle: "Safety First Approach",
      description: "Certified Protocol Guardian specializing in security and stability. Prioritized robust infrastructure and careful stewardship of the Stacks ecosystem.",
      color: "#2E86AB",
      icon: "🛡️"
    },
    balanced_leader: {
      title: "The Balanced Builder", 
      subtitle: "Harmony in Innovation",
      description: "Certified Protocol Guardian with exceptional balance across all priorities. Demonstrated sustainable ecosystem growth with measured decision-making.",
      color: "#A23B72",
      icon: "⚖️"
    },
    growth_advocate: {
      title: "The Ecosystem Catalyst",
      subtitle: "Innovation and Expansion", 
      description: "Certified Protocol Guardian focused on rapid growth and adoption. Successfully expanded the Stacks ecosystem through bold innovation.",
      color: "#F18F01",
      icon: "🚀"
    },
    decentralization_champion: {
      title: "The Community Champion",
      subtitle: "Power to the People",
      description: "Certified Protocol Guardian championing decentralized governance. Maintained community-driven development and accessibility principles.",
      color: "#C73E1D",
      icon: "👥"
    }
  }

  return certificates[certificateType]
}

// Component for displaying certificate preview
export function CertificatePreview({ certificate }: { certificate: GameCertificate }) {
  const info = getCertificateInfo(certificate.type)

  return (
    <div className="certificate-preview" style={{ borderColor: info.color }}>
      <div className="certificate-header">
        <span className="certificate-icon">{info.icon}</span>
        <div>
          <h3 style={{ color: info.color }}>{info.title}</h3>
          <p className="certificate-subtitle">{info.subtitle}</p>
        </div>
      </div>
      
      <div className="certificate-metrics">
        <div className="certificate-metric">
          <span className="metric-label">Security</span>
          <span className="metric-value">{certificate.metrics.security}</span>
        </div>
        <div className="certificate-metric">
          <span className="metric-label">Decentralization</span>
          <span className="metric-value">{certificate.metrics.decentralization}</span>
        </div>
        <div className="certificate-metric">
          <span className="metric-label">Adoption</span>
          <span className="metric-value">{certificate.metrics.adoption}</span>
        </div>
      </div>
      
      <p className="certificate-description">{info.description}</p>
      
      <div className="certificate-footer">
        <span>Protocol Guardian: Stacks Edition</span>
        <span>{new Date(certificate.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  )
}