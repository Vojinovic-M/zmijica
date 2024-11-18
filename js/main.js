import { initialState } from './state.js';
import { updateGame } from './logic.js';
import { renderGame, renderScore, renderLeaderboard } from './render.js';
import { addToLeaderboard } from './leaderboard.js';
import { handleInput } from './input.js';

let gameState = { ...initialState }; // kopija pocetnog stanja
let gameLoopId = null; // ID petlje igre

const gameOverlay = document.getElementById('game-overlay');
const gameMessage = document.getElementById('game-message');
const gameButton = document.getElementById('game-button');

// pokretanje igre
const startGame = () => {
    console.log('Initial state:', initialState);
    gameState = { ...initialState }; // Resetovanje stanja
    gameOverlay.style.display = 'none'; // Sakrivanje overlay-a
    gameMessage.textContent = ''; // Očisti poruku
    renderGame(gameState); // Prikaz početnog stanja
    renderScore(gameState.score); // Reset skora
    gameLoop(); // Pokretanje petlje igre
};

// petlja igre
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
const endGame = async () => {
    const name = prompt('Унесите своје име:') // Tražimo ime korisnika
    if (name) {
        try {
            await addToLeaderboard(name, gameState.score) // Ažuriramo leaderboard
            renderLeaderboard()
            console.log('Successfully added to leaderboard')
        } catch (error) {
            console.error('Failed to update leaderboard:', error.message);
        }
    }

    clearTimeout(gameLoopId); // Zaustavljanje petlje igre
    gameMessage.textContent = 'Готова игра!'
    gameButton.textContent = 'Пробај поново'
    gameOverlay.style.display = 'flex' // Prikazujemo overlay
};




// Obrada unosa korisnika
document.addEventListener('keydown', (event) => {
    gameState = handleInput(gameState, event.key); // Ažuriranje pravca
});

// Pokretanje igre pritiskom na dugme
gameButton.addEventListener('click', () => {
    startGame()
    renderLeaderboard()
});

// Inicijalno stanje: prikazujemo poruku za start
gameMessage.textContent = 'Почни игру'
gameOverlay.style.display = 'flex'
