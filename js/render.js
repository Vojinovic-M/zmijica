import { getLeaderboard } from "./leaderboard.js";


export const renderGame = (state) => {
    const board = document.getElementById('game-board'); // element tabele
    board.innerHTML = ''; // brisanje prethodne igre

    // prikaz svakog segmenta zmije
    state.snake.forEach(segment => {
        const segmentDiv = document.createElement('div'); // element za segment
        segmentDiv.style.gridRowStart = segment.y + 1; // postavka reda na grid
        segmentDiv.style.gridColumnStart = segment.x + 1; // postavka kolone na grid
        segmentDiv.className = 'snake'; // klasа za stil
        board.appendChild(segmentDiv); // segment na tablu
    });


    const foodDiv = document.createElement('div'); // element za hranu
    foodDiv.style.gridRowStart = state.food.y + 1; // postavka reda na grid
    foodDiv.style.gridColumnStart = state.food.x + 1; // postavka kolone na grid
    foodDiv.className = 'food'; // klasa za stil
    board.appendChild(foodDiv); // dodaje hranu na tablu

};


export const renderScore = (score) => {
    const scoreElement = document.getElementById('score'); // element bodova
    scoreElement.textContent = score; // azurira tekst
};


export const renderLeaderboard = async () => {
    const leaderboard = await getLeaderboard();
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // ocisti prethodne rezultate

    leaderboard.slice(0, 10).forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${entry.name} - ${entry.score} поена`;
        leaderboardList.appendChild(li);
    });
};
