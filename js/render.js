import { getLeaderboard } from "./leaderboard.js";

export const renderGame = (entities) => {
    const board = document.getElementById('game-board'); // element tabele
    board.innerHTML = ''; // brisanje prethodne igre

    entities.map(entity => {
        switch (entity.type) {
            case 'Snake':
                renderSnake(board, entity.snake);
                break;
            case 'Food':
                renderFood(board, entity.position);
                break;
            default:
                break;
        }
    });
};

const renderSnake = (board, snake) => {
    snake.map(segment => {
        const segmentDiv = document.createElement('div');
        segmentDiv.style.gridRowStart = segment.y + 1;
        segmentDiv.style.gridColumnStart = segment.x + 1;
        segmentDiv.className = 'snake';
        board.appendChild(segmentDiv);
    });
};

const renderFood = (board, food) => {
    const foodDiv = document.createElement('div');
    foodDiv.style.gridRowStart = food.y + 1;
    foodDiv.style.gridColumnStart = food.x + 1;
    foodDiv.className = 'food';
    board.appendChild(foodDiv);
};

export const renderScore = (score) => {
    const scoreElement = document.getElementById('score'); // element bodova
    scoreElement.textContent = score;
};

export const renderLeaderboard = async () => {
    try {
        const leaderboard = await getLeaderboard();
        const leaderboardList = document.getElementById('leaderboard-list');
        leaderboardList.innerHTML = ''; // ocisti prethodne rezultate

        if (Array.isArray(leaderboard)) {
            leaderboard.slice(0, 10).map((entry, index) => {
                const li = document.createElement('li');
                li.textContent = `${entry.name} - ${entry.score} поена`;
                leaderboardList.appendChild(li);
                return li;
            });
        } else {
            console.error('Leaderboard is not an array:', leaderboard);
        }
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
};
