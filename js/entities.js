import { Position, Velocity, Snake, Food, Score } from './components.js';

let entityId = 0;

export const createEntity = (components) => { return { id: entityId++, ...components };};

export const createSnake = () =>
    createEntity({
        Position: Position(10, 10),
        Velocity: Velocity(0, 0),
        Snake: Snake(),
        Score: Score(0)
    });

export const createFood = (snakeSegments) => {
    let newFood;
    do {
        newFood = createEntity({
            Position: Position(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)),
            Food: Food()
        });
    } while (snakeSegments.some(segment =>
        segment && segment.x === newFood.Position.x && segment.y === newFood.Position.y));
    return newFood;
};