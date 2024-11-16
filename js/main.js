import { initialState } from './state.js';
import { updateGame } from './logic.js';
import { renderGame, renderScore } from './render.js';
import { handleInput } from './input.js';

let gameState = { ...initialState }; // Kopija početnog stanja
let gameLoopId = null; // ID petlje igre

const gameOverlay = document.getElementById('game-overlay'); // Div za overlay
const gameMessage = document.getElementById('game-message'); // Poruka
const gameButton = document.getElementById('game-button'); // Dugme

// Funkcija za pokretanje igre
const startGame = () => {
    console.log('Initial state:', initialState);
    gameState = { ...initialState }; // Resetovanje stanja
    gameOverlay.style.display = 'none'; // Sakrivanje overlay-a
    renderGame(gameState); // Prikaz početnog stanja
    renderScore(gameState.score); // Reset skora
    gameLoop(); // Pokretanje petlje igre
};

// Funkcija za petlju igre
const gameLoop = () => {
    console.log('Game loop running...'); // Debug log
    gameState = updateGame(gameState); // Update game state
    renderGame(gameState); // Render updated game state
    renderScore(gameState.score); // Ažuriranje skora

    if (!gameState.gameOver) {
        gameLoopId = setTimeout(gameLoop, 200); // Nastavi petlju igre
    } else {
        endGame(); // Handle game over
    }
};

// Funkcija za završetak igre
const endGame = () => {
    clearTimeout(gameLoopId); // Zaustavljanje petlje igre
    gameMessage.textContent = 'Game Over!'; // Poruka za kraj igre
    gameButton.textContent = 'Restart'; // Menjamo tekst dugmeta
    gameOverlay.style.display = 'flex'; // Prikazujemo overlay
};

// Obrada unosa korisnika
document.addEventListener('keydown', (event) => {
    gameState = handleInput(gameState, event.key); // Ažuriranje pravca
});

// Pokretanje igre pritiskom na dugme
gameButton.addEventListener('click', startGame);

// Inicijalno stanje: prikazujemo poruku za start
gameMessage.textContent = 'Start Game';
gameOverlay.style.display = 'flex';
