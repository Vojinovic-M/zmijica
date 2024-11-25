export const updateGame = (state) => {
    const newHead = {
        x: state.snake[0].x + state.direction.x,
        y: state.snake[0].y + state.direction.y,
    };
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
    // provera da li je zmija pojela hranu
    const foodEaten = newHead.x === state.food.x && newHead.y === state.food.y;
    const newFood = foodEaten ? generateFood(state.snake) : state.food;

    // azuriranje pozicije zmije
    const newSnake = foodEaten
        ? [newHead, ...state.snake]
        : [newHead, ...state.snake.slice(0, -1)];

    return {
            // kad zmija pojede hranu, dodaje novu glavu i povecava skor
        ...state,
        snake: newSnake,
        food: newFood,
        score: foodEaten ? state.score + 1 : state.score,
    };
};

const generateFood = (snake) => {
    let newFood;
    let isOnSnake;
    do {
        newFood = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
        isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isOnSnake);
    return newFood;
};
