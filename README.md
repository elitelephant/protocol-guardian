# Protocol Guardian 🛡️

An interactive educational simulation game where you serve as the **Bitcoin Protocol Guardian**, making critical decisions that shape the future of Bitcoin and the Stacks ecosystem. Navigate through five transformative eras of Bitcoin's evolution while balancing network health, public confidence, and technological advancement.

## 🎮 Game Overview

**Protocol Guardian** is a strategic decision-making game built for the Stacks ecosystem that teaches players about Bitcoin protocol governance, Layer 2 solutions, and the complex challenges facing the Bitcoin network. Originally created for the Base Batches 001 hackathon and now adapted for the Stacks Vibe Coding hackathon.

### Your Mission
As the Bitcoin Protocol Guardian, you'll:
- 📊 **Manage Three Key Metrics**: Network Health, Public Confidence, and Tech Advancement
- ⚡ **Navigate Crisis Events**: Handle urgent situations with time-limited decisions
- 🏛️ **Shape Bitcoin's Future**: Guide the ecosystem through 5 transformative eras (2035-2040)
- 🎯 **Choose Your Path**: From Bitcoin maximalist to Layer 2 catalyst

## ✨ Features

### 🎯 Core Gameplay
- **Strategic Decision Making**: Choose from multiple options that impact the Bitcoin ecosystem
- **Era-Based Progression**: Experience 5 distinct eras of Bitcoin evolution
- **Crisis Management**: Handle urgent situations with time-sensitive decisions
- **Multiple Endings**: Different outcomes based on your leadership style

### 🔗 Blockchain Integration
- **Stacks Wallet Connection**: Connect with Leather, Xverse, and other Stacks wallets
- **Cloud Save System**: Store game progress securely on the blockchain
- **Achievement System**: Unlock blockchain-verified achievements
- **Cross-Device Sync**: Access your saved games from any device

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop and mobile devices
- **Accessibility First**: Screen reader support, keyboard navigation, and WCAG compliance
- **Performance Optimized**: Lazy loading, code splitting, and efficient rendering
- **Dark/Light Themes**: Integrated with Next.js themes

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **pnpm** (recommended) or npm
- **Stacks Wallet** (optional, for blockchain features)

### Installation

```bash
# Clone the repository
git clone https://github.com/elitelephant/protocol-guardin.git
cd protocol-guardin

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🎯 Available Versions

This project contains **three different implementations** of the Protocol Guardian game:

### `original-version/` - Complete Blockchain Experience
- **Framework**: Next.js 14 + React + TypeScript + Stacks.js
- **Decision Format**: Multi-choice scenarios (3-5 options per decision)
- **Features**: Full blockchain integration, wallet connectivity, educational content
- **Target**: Blockchain professionals and enthusiasts
- **Usage**: `cd original-version && npm install && npm run dev`

### `binary-nextjs-version/binary-game/` - Hackathon Ready
- **Framework**: Next.js 14 + React + TypeScript  
- **Decision Format**: Binary approve/reject decisions
- **Features**: Streamlined gameplay, 8 key decisions, multiple endings
- **Target**: General audience, quick demos, hackathons
- **Usage**: `cd binary-nextjs-version/binary-game && npm install && npm run dev`

### `binary-prototypes/` - Development Prototypes
- **Framework**: Vanilla HTML/CSS/JavaScript
- **Decision Format**: Binary decisions with detailed scenarios
- **Features**: Standalone files, rapid iteration, no dependencies
- **Target**: Development, testing, concept validation
- **Usage**: Open `complete-game.html` in browser

### Environment Configuration

Create a `.env.local` file for custom configuration:

```env
# Development uses testnet automatically
NODE_ENV=development

# Optional: Force mainnet in development
NEXT_PUBLIC_FORCE_MAINNET=false
```

## 🏗️ Technology Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives

### Blockchain Integration
- **@stacks/connect** - Wallet authentication
- **@stacks/auth** - User session management  
- **@stacks/network** - Network configuration
- **@stacks/transactions** - Transaction handling

### Development Tools
- **ESLint** - Code linting (build errors ignored for rapid prototyping)
- **PostCSS** - CSS processing
- **Geist Fonts** - Modern typography
- **Lucide React** - Icon library

### Analytics & Monitoring
- **Vercel Analytics** - Usage analytics
- **Sonner** - Toast notifications
- **React Hook Form** - Form handling with validation

## 📁 Project Structure

```
protocol-guardin/
├── 📱 app/                          # Next.js App Router
│   ├── layout.tsx                   # Root layout with providers
│   ├── page.tsx                     # Main game interface
│   └── admin/                       # Admin panel (hidden)
├── 🧩 components/                   # React components
│   ├── ui/                          # Reusable UI components (shadcn/ui)
│   ├── accessibility/               # Accessibility components
│   ├── analytics/                   # Analytics components
│   ├── performance/                 # Performance optimization
│   ├── game-header.tsx              # Game status header
│   ├── indicators-panel.tsx         # Metrics display
│   ├── decision-modal.tsx           # Decision interface
│   ├── crisis-alert.tsx             # Crisis notifications
│   ├── wallet-connect.tsx           # Wallet connection UI
│   └── blockchain-game-features.tsx # Blockchain features panel
├── 🔗 contexts/                     # React contexts
│   └── stacks-auth.tsx              # Stacks authentication
├── 🎣 hooks/                        # Custom React hooks
│   ├── use-game-state.ts            # Game state management
│   ├── use-blockchain-game.ts       # Blockchain integration
│   └── use-*.ts                     # Other utility hooks
├── 📚 lib/                          # Utility libraries
│   ├── game-state.ts                # Game state types and logic
│   ├── sample-decisions.ts          # Decision scenarios
│   ├── crisis-events.ts             # Crisis definitions
│   ├── educational-content.ts       # Learning materials
│   └── utils.ts                     # Utility functions
├── 🎨 styles/                       # Global styles
├── 🔧 scripts/                      # Build and seed scripts
└── 📖 docs/                         # Documentation
    ├── STORY.md                     # Game narrative
    ├── PROJECT_NOTES.md             # Development notes
    └── STACKS_INTEGRATION.md        # Blockchain integration docs
```

## 🎯 Game Mechanics

### Core Metrics (0-100 scale)
- **🛡️ Network Health**: Bitcoin network security and decentralization
- **👥 Public Confidence**: Community trust in the protocol
- **⚡ Tech Advancement**: Innovation in Layer 2 solutions

### Game Phases
1. **Welcome Screen**: Introduction and context setting
2. **Policy Direction**: Choose your initial governance approach
3. **Era 1-5**: Progressive decision-making through different time periods
4. **Ending**: Final assessment based on your leadership style

### Decision Types
- **📋 Regular Decisions**: Standard policy choices with multiple options
- **🚨 Crisis Events**: Time-limited urgent situations requiring immediate action
- **📚 Educational Moments**: Learning opportunities about Bitcoin and Stacks

### Ending Types
- **🔒 Sovereign**: Bitcoin maximalist approach prioritizing base layer security
- **🚀 Progressive**: Layer 2 catalyst emphasizing innovation and adoption  
- **⚖️ Pragmatic**: Balanced steward approach with community consensus
- **💥 Disruptive**: Network fragmentation due to poor decision-making

## 🔗 Blockchain Features

### Wallet Integration
```typescript
// Connect to Stacks wallet
const { connectWallet, isSignedIn, userData } = useStacksAuth()

// Save game progress to blockchain (simulated)
const { saveGameState, loadGameState } = useBlockchainGameState()
```

### Supported Wallets
- **Leather Wallet** (recommended)
- **Xverse Wallet** 
- **Any Stacks-compatible wallet**

### Network Support
- **Testnet**: Automatic in development mode
- **Mainnet**: Production deployment

## 🎮 Gameplay Guide

### Getting Started
1. **🌟 Welcome**: Learn about your role as Protocol Guardian
2. **⚖️ Policy Direction**: Choose your initial governance philosophy
3. **🎯 Make Decisions**: Navigate through scenarios and crises
4. **📊 Monitor Metrics**: Keep track of network health, confidence, and advancement
5. **🏆 Complete Eras**: Progress through 5 transformative periods

### Tips for Success
- **Balance is Key**: Extreme positions often lead to negative consequences
- **Crisis Response**: Act quickly during crisis events to minimize damage
- **Educational Content**: Read the explanations to understand real-world implications
- **Multiple Playthroughs**: Different choices lead to different outcomes

### Achievement System
- **🛡️ Blockchain Guardian**: Save your first game to blockchain
- **🚀 Era Pioneer**: Complete your first era
- **💪 Network Guardian**: Maintain high network health (80+)
- **⚖️ Balanced Leader**: Excel in all three metrics (60+ each)

## 🛠️ Development

### Available Scripts
```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Game Content
npm run seed      # Seed sample events and decisions
```

### Code Style & Architecture

The project follows modern React patterns:
- **Custom Hooks**: Game logic separated into reusable hooks
- **Component Composition**: Small, focused components with clear responsibilities
- **TypeScript First**: Comprehensive type safety throughout
- **Performance Optimized**: Lazy loading and code splitting
- **Accessibility**: WCAG compliant with screen reader support

### Adding New Content

#### New Decisions
```typescript
// lib/sample-decisions.ts
export const newDecision: Decision = {
  id: "unique-id",
  title: "Decision Title",
  description: "Detailed scenario description",
  options: [
    {
      id: "option1",
      text: "First choice",
      consequences: [
        { type: "networkHealth", change: 10 },
        { type: "publicConfidence", change: -5 }
      ]
    }
    // ... more options
  ],
  educationalNotes: "Explain the real-world context"
}
```

#### New Crisis Events
```typescript
// lib/crisis-events.ts
export const newCrisis: Crisis = {
  id: "crisis-id",
  title: "Crisis Title", 
  description: "What's happening",
  era: 2, // Which era this crisis appears in
  timeLimit: 7, // Days to respond
  decisions: [...], // Array of related decisions
  unresolvedPenalty: {
    type: "networkHealth",
    change: -20
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables
```env
NODE_ENV=production
NEXT_PUBLIC_FORCE_MAINNET=true  # Use mainnet in production
```

### Build Optimization
The project includes several optimizations:
- **Next.js App Router**: Optimal performance and SEO
- **Code Splitting**: Lazy loading for better initial load times
- **Image Optimization**: Disabled for compatibility (can be re-enabled)
- **Bundle Analysis**: Use `npm run analyze` to inspect bundle size

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **💻 Make your changes** following the existing code style
4. **✅ Test thoroughly** including edge cases
5. **📝 Update documentation** if needed
6. **🚀 Submit a pull request**

### Contribution Guidelines
- Follow TypeScript best practices
- Maintain accessibility standards
- Add educational value to game content
- Test with both testnet and mainnet configurations
- Document any new features or breaking changes

### Areas for Contribution
- 🎮 **Game Content**: New decisions, crises, and educational materials
- 🔗 **Blockchain Features**: Smart contract integration, NFT achievements
- 🎨 **UI/UX**: Design improvements, animations, mobile optimization
- 📚 **Educational**: More comprehensive Bitcoin/Stacks learning content
- 🌐 **Localization**: Support for multiple languages

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stacks Foundation** for the blockchain infrastructure and developer tools
- **Base Batches 001 Hackathon** where this project first won recognition
- **IncuBase Program** for incubation and development support
- **Radix UI** for accessible component primitives
- **Shadcn/ui** for the beautiful component system
- **Vercel** for seamless deployment and analytics

## 📞 Support & Community

- **🐛 Issues**: [GitHub Issues](https://github.com/elitelephant/protocol-guardin/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/elitelephant/protocol-guardin/discussions)
- **📧 Email**: Contact the maintainers for direct support
- **🐦 Twitter**: Follow for updates and announcements

---

**Made with ❤️ for the Bitcoin and Stacks community**

*Protocol Guardian - Shaping Bitcoin's Future, One Decision at a Time* 🛡️⚡
