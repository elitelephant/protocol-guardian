// Main game initialization
import { UIController } from './ui-controller.js';

// Initialize the game
const game = new UIController();

// Make the game globally accessible for button onclick handlers
window.game = game;

// Initialize the UI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    game.updateUI();
});