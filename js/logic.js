export const updateGame = (entities) => {
    // nadji trenutni state zmije i hrane
    const snakeEntity = entities.find(e => e.type === 'Snake');
    let newHead = {
        x: snakeEntity.snake[0].x + snakeEntity.direction.x,
        y: snakeEntity.snake[0].y + snakeEntity.direction.y,
    };

    if (snakeEntity.direction.x !== 0 || snakeEntity.direction.y !== 0) {
        const outOfBounds =
            newHead.x < 0 || newHead.y < 0 ||
            newHead.x >= 20 || newHead.y >= 20;

        const selfCollision = snakeEntity.snake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
        );

        if (outOfBounds || selfCollision) {
            return entities.map(e => e.type === 'Snake' ? { ...e, gameOver: true } : e);
        }
    }
            // provera da li je zmija pojela hranu
    const foodEntity = entities.find(e => e.type === 'Food');
    const foodEaten = newHead.x === foodEntity.position.x && newHead.y === foodEntity.position.y;

            // azuriranje pozicije zmije
    const newSnake = foodEaten
        ? [newHead, ...snakeEntity.snake]
        : [newHead, ...snakeEntity.snake.slice(0, -1)];
    return entities.map(entity => {
        if (entity.type === 'Snake') {
            return {
                ...entity,
                snake: newSnake,
                score: foodEaten ? entity.score + 1 : entity.score,
            };
        } else if (entity.type === 'Food' && foodEaten) {
            return {
                ...entity,
                position: generateFood(newSnake),
            };
        }
        return entity;
    });
}


const generateFood = (snake) => {
    let newFood, isOnSnake;
    do {
        newFood = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
        isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isOnSnake);
    return newFood;
};
