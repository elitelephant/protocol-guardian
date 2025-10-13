# Protocol Guardian - Original Version

The original multi-choice blockchain governance simulation game built with Next.js.

## 🎮 Game Overview

This is the original Protocol Guardian game featuring complex multi-choice scenarios where players make governance decisions for blockchain protocols. Unlike the binary version, this offers multiple options per decision with more nuanced outcomes.

## 🏗️ Features

- **Multi-Choice Decisions**: Complex scenarios with 3-5 options each
- **Rich UI Components**: Advanced interface with drag-and-drop mechanics  
- **Stacks Integration**: Blockchain wallet connectivity and interactions
- **Comprehensive Advisors System**: Multiple advisor characters with different perspectives
- **Advanced Analytics**: Detailed tracking and reporting systems
- **Educational Content**: In-depth explanations of blockchain governance concepts

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - Advanced component system
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Stacks.js** - Blockchain integration
- **Shadcn/ui** - Component library
- **Custom Hooks** - Advanced state management

## 📁 Project Structure

```
original-version/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── admin-*.tsx        # Admin interface components  
│   ├── *-panel.tsx        # Game panel components
│   ├── ui/                # Base UI components
│   └── accessibility/     # Accessibility features
├── contexts/              # React contexts (Auth, Game State)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and data
├── public/               # Static assets
├── scripts/              # Build and utility scripts
└── styles/               # Global styles
```

## 🎯 Key Components

### Game Features
- **Dynamic Events Feed**: Real-time blockchain events simulation
- **Policy Direction System**: Complex policy outcome modeling  
- **Crisis Alert System**: Emergency governance scenarios
- **Geopolitical Panel**: International relations impact
- **Educational Sidebar**: Contextual learning content

### Technical Features  
- **Wallet Connect**: Stacks blockchain wallet integration
- **Sample Data Seeder**: Development data generation
- **Error Handling**: Comprehensive error boundaries
- **Performance Optimization**: Lazy loading and virtualization
- **Analytics Dashboard**: Detailed game metrics

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server  
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔄 Differences from Binary Version

| Feature | Original Version | Binary Version |
|---------|-----------------|----------------|
| **Decision Format** | Multi-choice (3-5 options) | Binary (Approve/Reject) |
| **UI Complexity** | Advanced components | Simplified flat design |
| **Blockchain Integration** | Full Stacks.js integration | Conceptual only |
| **Scenarios** | Complex governance cases | Streamlined decisions |  
| **Learning Curve** | Steep, educational focus | Accessible, quick play |
| **Target Audience** | Blockchain professionals | General audience |

## 📈 Evolution Path

1. **Original Version** (This) → Complex multi-choice governance simulation
2. **Binary Version** → Simplified approve/reject mechanics for broader accessibility
3. **Next.js Migration** → Modern React implementation with TypeScript

---

**Status**: 📚 Complete original implementation with full blockchain integration