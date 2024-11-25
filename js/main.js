import { initialState } from './state.js';
import { getLeaderboard } from './logic.js';
import { renderScore, renderLeaderboard, renderSystem } from './render.js';
import { addToLeaderboard } from './leaderboard.js';
import { controlInput } from './input.js';
import { createFood, createSnake } from './entities.js';
import {handleInput, updateGameEntities} from './systems.js';

const gameOverlay = document.getElementById('game-overlay');
const gameMessage = document.getElementById('game-message');
const gameButton = document.getElementById('game-button');
const scoreElement = document.getElementById('score');

const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

let gameLoopId = null; // Game loop ID
const gameDelay = 150;

const initializeGameState = () => {
    const initialSnake = createSnake();
    const food = createFood([initialSnake.Position]);
    return [initialSnake, food];
};

let gameState = initializeGameState();

const startGame = () => {
    gameState = initializeGameState();
    gameOverlay.style.display = 'none';
    gameMessage.textContent = '';
    gameLoop();
};

const gameLoop = () => {
    console.log("gameState before update:", gameState);

    if (!Array.isArray(gameState)) {
        console.error("Expected gameState to be an array, received:", gameState);
        gameState = initializeGameState();
    }

    gameState = updateGameEntities(gameState);
    console.log("gameState after update:", gameState);

    renderSystem(gameState);

    const snakeEntity = gameState.find(entity => entity.Snake);
    renderScore(snakeEntity?.Score?.value || 0);

    if (!gameState.some(entity => entity.gameOver)) {
        gameLoopId = setTimeout(gameLoop, gameDelay);
    } else {
        endGame();
    }
};

const endGame = async () => {
    const name = prompt('Enter your name:');
    if (name) {
        try {
            const snakeEntity = gameState.find(entity => entity.Snake);
            await addToLeaderboard(name, snakeEntity.Score.value);
            await renderLeaderboard(getLeaderboard);
        } catch (error) {
            console.error('Failed to update leaderboard:', error.message);
        }
    }
    clearTimeout(gameLoopId); // Stop the loop
    gameMessage.textContent = 'Game Over!';
    gameButton.textContent = 'Try Again';
    gameOverlay.style.display = 'flex';
};


document.addEventListener('keydown', (event) => {
    const direction = {
        'ArrowUp': { x: 0, y: -1 },
        'ArrowDown': { x: 0, y: 1 },
        'ArrowLeft': { x: -1, y: 0 },
        'ArrowRight': { x: 1, y: 0 }
    }[event.key];
    if (direction) {
        console.log("gameState before handleInput:", gameState);
        gameState = handleInput(gameState, { direction });
        console.log("gameState after handleInput:", gameState);
    }
});

gameButton.addEventListener('click', startGame);

gameMessage.textContent = 'Почни игру';
gameOverlay.style.display = 'flex';