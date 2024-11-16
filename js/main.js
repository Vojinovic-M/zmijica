import { initialState } from './state.js';
import { updateGame } from './logic.js';
import { renderGame } from './render.js';
import { handleInput } from './input.js';

let gameState = { ...initialState }; // Kopija početnog stanja
let gameLoopId = null; // ID petlje igre

const gameOverlay = document.getElementById('game-overlay'); // Div za overlay
const gameMessage = document.getElementById('game-message'); // Poruka
const gameButton = document.getElementById('game-button'); // Dugme

// Funkcija za pokretanje igre
const startGame = () => {
    gameState = { ...initialState }; // Resetovanje stanja
    gameOverlay.style.display = 'none'; // Sakrivanje overlay-a
    renderGame(gameState); // Prikaz početnog stanja
    gameLoop(); // Pokretanje petlje igre
};

// Funkcija za petlju igre
const gameLoop = () => {
    gameState = updateGame(gameState); // Ažuriranje igre
    renderGame(gameState); // Prikaz igre

    if (!gameState.gameOver) {
        gameLoopId = setTimeout(gameLoop, 200); // Nastavljamo petlju
    } else {
        endGame(); // Kraj igre
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
