# Protocol Guardian: Stacks Edition 🚀

Modern blockchain governance simulation game with **Stacks wallet integration** and **NFT certification**. Built with Next.js 14, React, TypeScript, and Stacks.js.

## 🎮 Game Overview

Shape the future of Bitcoin's smart contract layer through **10 Stacks ecosystem governance decisions**:

### Core Metrics
- 🛡️ **Security**: Protocol safety, smart contract audits, and Bitcoin alignment
- 👥 **Decentralization**: Network distribution, community governance, and accessibility
- 🚀 **Adoption**: User growth, developer activity, and ecosystem expansion

### New Blockchain Features ⭐
- 🔗 **Wallet Connection**: Connect Leather, Xverse, or any Stacks wallet
- ☁️ **Cloud Saves**: Automatic blockchain-based progress saving
- 🏆 **Achievements**: Unlock blockchain-verified milestones  
- 💎 **NFT Certificates**: Mint unique governance style certificates
- 🌐 **Cross-Device Sync**: Resume your game from anywhere

## 🏗️ Architecture & Best Practices

This project follows modern web development best practices:

### File Structure
```
binary-game/
├── app/
│   ├── page.tsx           # Main game component with React hooks
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles and game CSS
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration for static export
├── tsconfig.json          # TypeScript configuration
├── vercel.json           # Deployment configuration
└── README.md             # This file
```

### Code Organization
- **Next.js 14 App Router**: Modern React framework with TypeScript
- **React Hooks**: useState and useEffect for game state management
- **Static Export**: Configured for deployment to any static host
- **Semantic HTML**: Proper accessibility attributes and structure
- **SEO Optimized**: Meta tags, Open Graph, and proper heading hierarchy

### Accessibility Features
- Screen reader support with ARIA labels
- Keyboard navigation with visible focus indicators
- Skip navigation links
- Semantic HTML structure
- High contrast design

## 🚀 Deployment

### Vercel Deployment (Recommended)
This project is optimized for Vercel deployment:

1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically with `vercel.json` configuration

### Local Development
```bash
# Install dependencies (includes Stacks.js packages)
npm install

# Start development server (uses Stacks testnet)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm start
```

### Wallet Setup for Development
1. Install **Leather Wallet** browser extension
2. Create or import a Stacks testnet wallet
3. Visit `http://localhost:3000` and click "Connect Wallet"
4. Approve connection to start using blockchain features

### Environment Configuration
- **Development**: Automatically uses Stacks Testnet for safe testing
- **Production**: Uses Stacks Mainnet for real transactions

### Manual Deployment
The project exports to static files and can be deployed to any web server:
- Run `npm run build` to generate the `out/` directory
- Upload the contents of the `out/` folder to your web server
- The `index.html` file in `out/` is the entry point

## 📋 Deployment Checklist

- ✅ **Separated CSS**: All styles in external files
- ✅ **Modular JavaScript**: ES6 modules with proper imports
- ✅ **Proper File Structure**: Organized src/ and public/ directories
- ✅ **SEO Meta Tags**: Title, description, Open Graph tags
- ✅ **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- ✅ **Vercel Configuration**: Proper routing and headers
- ✅ **Security Headers**: XSS protection, content type options
- ✅ **Mobile Responsive**: Warning for mobile devices
- ✅ **Loading States**: Graceful loading experience

## 🔧 Technical Details

### Browser Support
- Modern browsers with ES6 module support
- Chrome 61+, Firefox 60+, Safari 10.1+, Edge 16+

### Performance
- No external dependencies or frameworks
- Minimal JavaScript footprint
- CSS optimized for fast rendering
- Preloaded critical resources

### Security
- Content Security Policy headers
- XSS protection
- No inline scripts or styles
- Secure meta tags

## 🎯 Next Steps for Production

1. **Add Analytics**: Google Analytics or similar tracking
2. **Error Monitoring**: Sentry or similar error tracking
3. **Performance Monitoring**: Web vitals tracking
4. **Progressive Enhancement**: Service worker for offline functionality
5. **Internationalization**: Multi-language support
6. **Testing**: Unit tests and E2E testing
7. **CI/CD Pipeline**: Automated testing and deployment

## 📖 Development Notes

This game was built as a prototype for exploring binary decision mechanics in blockchain governance scenarios. The modular architecture makes it easy to:

- Add new decision scenarios
- Modify ending conditions
- Extend the UI components
- Integrate with existing Next.js applications

The code is designed to be maintainable, accessible, and deployable across multiple platforms.

---

## Legacy Files (Original Prototypes)

The following files contain the original prototypes used during development:
- `prototype-ui.html` - Initial flat design concept
- `binary-decisions.md` - Converted decision scenarios  
- `complete-game.html` - Fully functional game implementation (legacy)
- `game-engine.js` - JavaScript game logic (legacy, now modularized)