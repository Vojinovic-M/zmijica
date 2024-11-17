export const updateGame = (state) => {
    const newHead = {
        x: state.snake[0].x + state.direction.x,
        y: state.snake[0].y + state.direction.y,
    };

    // Provera sudara samo ako je zmija počela da se pomera
    if (state.direction.x !== 0 || state.direction.y !== 0) {
        const outOfBounds =
            newHead.x < 0 ||
            newHead.y < 0 ||
            newHead.x >= 20 || 
            newHead.y >= 20;

        const selfCollision = state.snake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
        );

        if (outOfBounds || selfCollision) {
            return { ...state, gameOver: true };
        }
    }

    // azuriranje pozicije zmije
    const newSnake = [newHead, ...state.snake.slice(0, -1)];

    // provera da li je zmija pojela hranu
    const foodEaten = newHead.x === state.food.x && newHead.y === state.food.y;
    const newFood = foodEaten
        ? { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) }
        : state.food;

    // ako je zmija pojela hranu, dodaje novu glavu i povecava skor
    if (foodEaten) {
        return {
            ...state,
            snake: [newHead, ...state.snake],
            food: newFood,
            score: state.score + 1,
        };
    } else {
        // Ako nije pojela, uklanjamo rep
        return {
            ...state,
            snake: newSnake,
            food: newFood,
        };
    }
};

