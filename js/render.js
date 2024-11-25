export const renderSystem = (entities) => {
    console.log('Rendering entities:', entities);
    const canvas = document.getElementById('game-board');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    entities.forEach(entity => {
        if (entity.Snake && entity.Position) {
            context.fillStyle = 'green';
            context.fillRect(entity.Position.x * 10, entity.Position.y * 10, 10, 10);
        }
        if (entity.Food && entity.Position) {
            context.fillStyle = 'red';
            context.fillRect(entity.Position.x * 10, entity.Position.y * 10, 10, 10);
        }
    });
};

export const renderScore = (score) => {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
};

export const renderLeaderboard = async (getLeaderboard) => {
    const leaderboard = await getLeaderboard();
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    leaderboard.slice(0, 10).forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name} - ${entry.score} поена`;
        leaderboardList.appendChild(li);
    });
};