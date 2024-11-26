export const updateGame = (entities) => {
    return entities.map((entity) => {
        if (entity.type === 'Snake') {
            const newHead = {
                x: entity.snake[0].x + entity.direction.x,
                y: entity.snake[0].y + entity.direction.y,
            };

            if (entity.direction.x !== 0 || entity.direction.y !== 0) {
                const outOfBounds =
                    newHead.x < 0 || newHead.y < 0 ||
                    newHead.x >= 20 || newHead.y >= 20;

                const selfCollision = entity.snake.some(
                    (segment) => segment.x === newHead.x && segment.y === newHead.y
                );

                if (outOfBounds || selfCollision) {
                    return { ...entity, gameOver: true };
                }
            }
            // provera da li je zmija pojela hranu
            const foodEaten = newHead.x === entity.food.x && newHead.y === entity.food.y;
            const newFood = foodEaten ? generateFood(entity.snake) : entity.food;

            // azuriranje pozicije zmije
            const newSnake = foodEaten
                ? [newHead, ...entity.snake]
                : [newHead, ...entity.snake.slice(0, -1)];

            return {
                // kad zmija pojede hranu, dodaje novu glavu i povecava skor
                ...entity,
                snake: newSnake,
                food: newFood,
                score: foodEaten ? entity.score + 1 : entity.score,
            };
        }
        // FOOD ENTITY LOGIKA
        return entity;
    })
}


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
