import { initialState } from './state.js';
import { updateGame } from './logic.js';
import { renderGame, renderScore, renderLeaderboard } from './render.js';
import { addToLeaderboard } from './leaderboard.js';
import { handleInput } from './input.js';
import {foodEntity, gameStatusEntity, leaderboardEntity, scoreEntity, snakeEntity} from "./entities.js";

let entities = [
    snakeEntity(initialState),
    foodEntity(initialState),
    leaderboardEntity(),
    scoreEntity(initialState.score),
    gameStatusEntity()
];

let gameLoopId = null; // ID petlje igre

const gameOverlay = document.getElementById('game-overlay');
const gameMessage = document.getElementById('game-message');
const gameButton = document.getElementById('game-button');

// pokretanje igre
const startGame = () => {
    console.log('Initial state:', initialState);
    entities = [
        snakeEntity(initialState),
        foodEntity(initialState),
        leaderboardEntity(),
        scoreEntity(initialState.score),
        gameStatusEntity()
    ];
    gameOverlay.style.display = 'none';
    gameMessage.textContent = '';
    renderGame(entities); // prikaz pocetnog stanja
    renderScore(initialState.score); // reset za score
    gameLoop(); // pokretanje petlje igre
};

// petlja igre
const gameLoop = () => {
    console.log('Game loop running...'); // Debug log
    entities = updateGame(entities);
    renderGame(entities);

    const snake = entities.find(entity => entity.type === 'Snake');
    renderScore(snake.score);

    if (!snake.gameOver) { gameLoopId = setTimeout(gameLoop, 100); }
    else                 { endGame(); }
};


const endGame = async () => {
    const name = prompt('Унесите своје име:')
    const snake = entities.find(entity => entity.type === 'Snake');
    if (name) {
        try {
            await addToLeaderboard(name, snake.score); // azurira leaderboard
            renderLeaderboard()
            console.log('Successfully added to leaderboard')
        } catch (error) {
            console.error('Failed to update leaderboard:', error.message);
        }
    }
    clearTimeout(gameLoopId); // zaustavi petlju igre
    gameMessage.textContent = 'Готова игра!'
    gameButton.textContent = 'Пробај поново'
    gameOverlay.style.display = 'flex'
};

document.addEventListener('keydown', (event) => {
    entities = handleInput(entities, event.key); // azuriranje pravca
    const leaderboard = entities.find((entity) => entity.type === 'Leaderboard');

    if (leaderboard.isVisible) { document.getElementById('leaderboard').style.display = 'flex'; }
    else                       { document.getElementById('leaderboard').style.display = 'none'; }
});

gameButton.addEventListener('click', () => {
    startGame();
    renderLeaderboard();
});

gameMessage.textContent = 'Почни игру'
gameOverlay.style.display = 'flex'
