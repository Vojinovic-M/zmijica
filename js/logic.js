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
            newHead.x >= 20 || // Pretpostavljamo mrežu 20x20
            newHead.y >= 20;

        const selfCollision = state.snake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
        );

        if (outOfBounds || selfCollision) {
            return { ...state, gameOver: true };
        }
    }

    // Ažuriranje pozicije zmije
    const newSnake = [newHead, ...state.snake.slice(0, -1)];

    // Provera da li je zmija pojela hranu
    const foodEaten = newHead.x === state.food.x && newHead.y === state.food.y;
    const newFood = foodEaten
        ? { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) }
        : state.food;

    // Ako je zmija pojela hranu, dodajemo novu glavu i povećavamo skor
    if (foodEaten) {
        return {
            ...state,
            snake: [newHead, ...state.snake], // Dodajemo novu glavu
            food: newFood,
            score: state.score + 1, // Povećaj skor
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

