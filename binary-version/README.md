# Protocol Guardian: Stacks Edition

A blockchain governance simulation game with **Stacks wallet integration** and **NFT certification**. Built with Next.js 14, React, TypeScript, and Stacks.js.

## 🎮 Game Overview

Shape the future of Bitcoin's smart contract layer through **10 Stacks ecosystem governance decisions**:

### Core Metrics
- **Security**: Protocol safety, smart contract audits, and Bitcoin alignment
- **Decentralization**: Network distribution, community governance, and accessibility
- **Adoption**: User growth, developer activity, and ecosystem expansion

### Blockchain Features
- **Wallet Connection**: Connect Leather, Xverse, or any Stacks wallet
- **Progress Saving**: Automatic blockchain-based progress saving (simulated)
- **Achievements**: Unlock blockchain-verified milestones
- **NFT Certificates**: Mint unique governance style certificates (UI ready)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (uses Stacks testnet)
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:3000` to play the game.

## 📁 Project Structure

```
binary-version/
├── app/
│   ├── page.tsx           # Main game component
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles and game CSS
├── components/            # React components
├── contexts/              # Stacks authentication
├── hooks/                 # Game logic hooks
└── package.json           # Dependencies and scripts
```

## 🎯 Game Mechanics

Make 10 binary decisions (approve/reject) that impact three metrics. Your choices determine your governance archetype and unlock achievements.

### Ending Archetypes
- **Security Guardian**: Prioritizes protocol safety
- **Balanced Builder**: Achieves harmony across priorities
- **Ecosystem Catalyst**: Champions rapid growth
- **Community Champion**: Empowers decentralized governance

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Stacks.js** - Blockchain integration
- **Lucide React** - Icon library

## � Deployment

Optimized for Vercel deployment. Run `npm run build` and deploy the `out/` directory.

---

**Status**: ✅ Complete and ready for Stacks Vibe Coding Hackathon