# Protocol Guardian - Complete Game Flow

## Game Architecture

### Flow Overview:
1. **Welcome Screen** - Introduction and context
2. **Decision Loop** (8 rounds) - Binary approve/reject decisions
3. **Final Summary** - Results and ending type

---

## Game State Management

### Core Game State:
```javascript
const gameState = {
    currentDecision: 0,           // 0-7 (8 total decisions)
    networkHealth: 50,            // Starting values
    publicConfidence: 60,
    techAdvancement: 45,
    decisions: [],                // Array of player choices
    isComplete: false
}
```

### Decision Structure:
```javascript
const decision = {
    id: "decision-1",
    title: "Mining Environmental Standards",
    proposal: "Implement mandatory environmental impact assessments...",
    consequences: {
        approve: {
            networkHealth: -3,
            publicConfidence: +8,
            techAdvancement: +5
        },
        reject: {
            networkHealth: +5,
            publicConfidence: -3,
            techAdvancement: +8
        }
    }
}
```

---

## Complete Game Flow Implementation

### 1. Welcome Screen
- **Purpose**: Set context and explain role as Protocol Guardian
- **Content**: Brief explanation of the 3 metrics and binary decision system
- **Action**: "Begin Your Mission" button

### 2. Decision Loop (8 rounds)
Each decision follows this pattern:
- **Display**: Show proposal document in center
- **Choice**: APPROVE or REJECT buttons
- **Feedback**: Brief animation showing metric changes
- **Progress**: Show "Decision X of 8" progress indicator

### 3. Metric Updates
After each decision:
- **Calculate**: Apply consequences to current metrics
- **Animate**: Show metric bars updating with new values
- **Persist**: Save decision and new state

### 4. Final Summary
After 8 decisions:
- **Calculate Ending**: Based on final metric values
- **Display Results**: Show ending type, metrics, and decision history
- **Actions**: Restart, detailed analysis, wallet connect

---

## Implementation Files Needed:

### Core Game Files:
1. `game-engine.js` - Main game logic and state management
2. `decisions-data.js` - All 8 binary decisions with consequences
3. `endings-calculator.js` - Ending type determination logic
4. `game-flow.html` - Complete playable game

### UI Components:
1. `welcome-screen.html` - Introduction screen
2. `decision-screen.html` - Binary decision interface  
3. `final-summary.html` - Results screen (already done)

---

## Next Steps:

1. **Create the game engine** with state management
2. **Build the decision screen** using our binary UI design
3. **Connect everything together** in a single playable flow
4. **Add animations and transitions** for better UX
5. **Test the complete experience** end-to-end

Should we start by creating the game engine that manages the state and flow between screens?