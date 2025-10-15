# Protocol Guardian: Stacks Edition 🛡️

An interactive governance simulation game where you become a **Protocol Guardian** making critical decisions that shape the future of Bitcoin and the Stacks ecosystem.

## 🎮 Game Overview

**Protocol Guardian** is a strategic decision-making game that teaches players about Bitcoin protocol governance and Stacks ecosystem challenges. Make 10 binary decisions (approve/reject) that impact three core metrics: Security, Decentralization, and Adoption.

### Your Mission
As the Protocol Guardian, you'll:
- 📊 **Balance Three Key Metrics**: Security, Decentralization, and Adoption
- ⚡ **Make Governance Decisions**: Navigate realistic Bitcoin/Stacks scenarios
- � **Unlock Achievements**: Earn blockchain-verified milestones
- 🎯 **Receive Your Archetype**: Get a personalized governance style certificate

## ✨ Features

### 🎯 Core Gameplay
- **10 Governance Scenarios**: Real Bitcoin/Stacks ecosystem decisions
- **Three-Metric System**: Visual progress tracking with immediate feedback
- **Four Ending Archetypes**: Different outcomes based on your decision patterns
- **Educational Value**: Learn about blockchain governance through gameplay

### 🔗 Blockchain Integration
- **Stacks Wallet Connection**: Connect with Leather, Xverse, and other Stacks wallets
- **Progress Saving**: Store game progress securely (simulated for demo)
- **Achievement System**: Unlock blockchain-verified achievements
- **NFT Certificates**: Mint unique governance style certificates (UI ready)

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop with mobile warnings
- **Accessibility First**: Screen reader support and keyboard navigation
- **Professional Design**: Clean, modern interface with Stacks-inspired colors

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **npm** or **pnpm**
- **Stacks Wallet** (optional, for blockchain features)

### Installation

```bash
# Clone the repository
git clone https://github.com/elitelephant/cre-game.git
cd cre-game

# Navigate to the main game
cd binary-version

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:3000`

### 🎮 Play Online

**Live Demo**: [https://protocol-guardian-latest.vercel.app/](https://protocol-guardian-latest.vercel.app/)

**🎥 Game Walkthrough**: [Watch how to play](https://www.loom.com/share/e652fec7ffd44ab987801f50f69ad79c?sid=c9c8e556-c0d3-47c3-851b-f975fff6db2f)

> **Note**: The game is optimized for desktop screens. It may not display properly on smaller devices and does not work on mobile phones.

## 📁 Project Structure

```
cre-game/
├── binary-version/          # 🏆 MAIN GAME - Stacks Edition
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── contexts/            # Stacks authentication
│   ├── hooks/               # Game logic hooks
│   └── package.json         # Dependencies
├── binary-prototypes/       # Development prototypes
├── original-version/        # Legacy multi-choice version
└── README.md               # This file
```

## 🎯 Game Mechanics

### Core Metrics (0-100 scale)
- **🛡️ Security**: Protocol safety, smart contract audits, Bitcoin alignment
- **🌐 Decentralization**: Network distribution, community governance, accessibility
- **📈 Adoption**: User growth, developer activity, ecosystem expansion

### Decision Flow
1. **Welcome Screen**: Learn about your role as Protocol Guardian
2. **10 Decisions**: Binary approve/reject choices with immediate metric impacts
3. **Progress Tracking**: Visual progress bars and real-time feedback
4. **Final Assessment**: Receive your governance archetype and NFT certificate

### Ending Archetypes
- **Security Guardian**: Prioritizes protocol safety and stability
- **Balanced Builder**: Achieves harmony across all priorities
- **Ecosystem Catalyst**: Champions rapid growth and adoption
- **Community Champion**: Empowers decentralized governance

## 🛠️ Development

### Available Scripts
```bash
cd binary-version

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Tech Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Stacks.js** - Blockchain integration
- **Lucide React** - Icon library

## 🚀 Deployment

### Vercel (Recommended)
```bash
cd binary-version
npm run build
# Deploy the out/ directory to Vercel
```

### Environment Configuration
```env
# Development uses testnet automatically
NODE_ENV=development

# Optional: Force mainnet in production
NEXT_PUBLIC_FORCE_MAINNET=false
```

## 🤝 Contributing

We welcome contributions! Focus on the `binary-version/` directory for the main game.

### Areas for Contribution
- 🎮 **Game Content**: New governance scenarios and decisions
- 🔗 **Blockchain Features**: Smart contract integration, NFT achievements
- 🎨 **UI/UX**: Design improvements and mobile optimization
- 📚 **Educational**: Enhanced learning content and explanations

## 📜 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Stacks Foundation** for the blockchain infrastructure
- **Stacks Vibe Coding Hackathon** for the inspiration
- **Leather Wallet** and **Xverse** for wallet integration

---

**Made with ❤️ for the Bitcoin and Stacks community**

*Protocol Guardian - Shaping Bitcoin's Future, One Decision at a Time* 🛡️⚡
