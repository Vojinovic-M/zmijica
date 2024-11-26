import { initialState } from './state.js';
import { updateGame } from './logic.js';
import { renderGame, renderScore, renderLeaderboard } from './render.js';
import { addToLeaderboard } from './leaderboard.js';
import { handleInput } from './input.js';

const snakeEntity = {
    type: 'Snake',
    snake: initialState.snake,
    direction: initialState.direction,
    score: initialState.score,
    gameOver: initialState.gameOver,
    food: initialState.food
};
let foodEntity = {
    type: 'Food',
    position: initialState.food
}


let entities = [snakeEntity, foodEntity];

let gameLoopId = null; // ID petlje igre

const gameOverlay = document.getElementById('game-overlay');
const gameMessage = document.getElementById('game-message');
const gameButton = document.getElementById('game-button');

// pokretanje igre
const startGame = () => {
    console.log('Initial state:', initialState);
    entities = [{
        type: 'Snake',
        snake: initialState.snake,
        direction: initialState.direction,
        score: initialState.score,
        gameOver: initialState.gameOver,
        food: initialState.food
    }, {
        type: 'Food',
        position: initialState.food
    }] // resetovanje entiteta

    gameOverlay.style.display = 'none'; // Sakrivanje overlay-a
    gameMessage.textContent = ''; // Očisti poruku
    renderGame(entities[0]); // Prikaz početnog stanja
    renderScore(entities[0].score); // Reset skora
    gameLoop(); // Pokretanje petlje igre
};

// petlja igre
const gameLoop = () => {
    console.log('Game loop running...'); // Debug log
    entities = updateGame(entities);
    renderGame(entities[0]);
    renderScore(entities[0].score); // azuriranje skora

    if (!entities[0].gameOver) {
        gameLoopId = setTimeout(gameLoop, 100);
    } else {
        endGame();
    }
};


const endGame = async () => {
    const name = prompt('Унесите своје име:')
    if (name) {
        try {
            await addToLeaderboard(name, entities[0].score); // azurira leaderboard
            renderLeaderboard()
            console.log('Successfully added to leaderboard')
        } catch (error) {
            console.error('Failed to update leaderboard:', error.message);
        }
    }
    clearTimeout(gameLoopId); // zaustavi petlju igre
    gameMessage.textContent = 'Готова игра!'
    gameButton.textContent = 'Пробај поново'
    gameOverlay.style.display = 'flex' // prikazuje overlay
};

document.addEventListener('keydown', (event) => {
    entities = handleInput(entities, event.key); // azuriranje pravca
});

gameButton.addEventListener('click', () => {
    startGame()
    renderLeaderboard()
});


gameMessage.textContent = 'Почни игру'
gameOverlay.style.display = 'flex'
