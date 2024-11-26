// entities.js

export const snakeEntity = (initialState) => ({
    type: 'Snake',
    snake: initialState.snake,
    direction: initialState.direction,
    score: initialState.score,
    gameOver: initialState.gameOver,
    food: initialState.food,
});

export const foodEntity = (initialState) => ({
    type: 'Food',
    position: initialState.food,
});

export const leaderboardEntity = () => ({
    type: 'Leaderboard',
    isVisible: false,
});

export const scoreEntity = (initialScore) => ({
    type: 'Score',
    value: initialScore,
});

export const gameStatusEntity = () => ({
    type: 'GameStatus',
    message: 'Почни игру',
    overlayVisible: true,
});