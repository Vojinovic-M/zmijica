export const updateGame = (state) => {
    const newHead = {
        x: state.snake[0].x + state.direction.x,
        y: state.snake[0].y + state.direction.y,
    };

    // Check for collisions only if the snake has started moving
    if (state.direction.x !== 0 || state.direction.y !== 0) {
        const outOfBounds =
            newHead.x < 0 ||
            newHead.y < 0 ||
            newHead.x >= 20 || // Assuming a 20x20 grid
            newHead.y >= 20;

        const selfCollision = state.snake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
        );

        if (outOfBounds || selfCollision) {
            return { ...state, gameOver: true };
        }
    }

    // Update snake's position
    const newSnake = [newHead, ...state.snake.slice(0, -1)];

    // Check if food is eaten
    const foodEaten = newHead.x === state.food.x && newHead.y === state.food.y;
    const newFood = foodEaten
        ? { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) }
        : state.food;

    return {
        ...state,
        snake: foodEaten ? [newHead, ...state.snake] : newSnake,
        food: newFood,
    };
};
