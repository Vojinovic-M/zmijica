import { createFood } from './entities.js';
import { createEntity } from './ecs.js';
import { Snake } from './components.js';

export const updatePosition = (entities) => {
    if (!Array.isArray(entities)) {
        throw new TypeError("updatePosition expected an array but got:", entities);
    }
    return entities.map(entity => {
        if (entity.Position && entity.Velocity) {
            return {
                ...entity,
                Position: {
                    x: entity.Position.x + entity.Velocity.dx,
                    y: entity.Position.y + entity.Velocity.dy
                }
            };
        }
        return entity;
    });
};

export const handleInput = (entities, input) => {
    console.log('handleInput called with:', entities);
    if (!Array.isArray(entities)) {
        throw new TypeError("handleInput expected an array but got:", entities);
    }
    const updatedEntities = entities.map(entity => {
        if (entity.Snake && input.direction) {
            return {
                ...entity,
                Velocity: {
                    dx: input.direction.x,
                    dy: input.direction.y
                }
            };
        }
        return entity;
    });
    console.log('handleInput returning:', updatedEntities);
    return updatedEntities;
};

export const detectCollisions = (entities) => {
    console.log("Checking collisions for entities:", entities);

    const snake = entities.find(entity => entity.Snake);
    if (!snake) {
        return entities;
    }
    const head = snake.Position;

    const outOfBounds = head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20;
    const selfCollision = entities.some(entity =>
        entity.Snake && entity !== snake && entity.Position.x === head.x && entity.Position.y === head.y
    );

    if (outOfBounds || selfCollision) {
        console.log("Collision detected: outOfBounds:", outOfBounds, "selfCollision:", selfCollision);
        return entities.map(entity => entity.Snake ? { ...entity, gameOver: true } : entity);
    }

    const foodEntity = entities.find(entity => entity.Food && entity.Position.x === head.x && entity.Position.y === head.y);
    if (foodEntity) {
        console.log("Food eaten at position:", head);
        return entities.map(entity =>
            entity.Snake
                ? { ...entity, grew: true, Score: { ...entity.Score, value: entity.Score.value + 1 } }
                : entity
        ).filter(entity => !entity.Food || entity !== foodEntity);
    }

    return entities;
};

export const updateGameEntities = (entities) => {
    console.log("entities before update:", entities);

    if (!Array.isArray(entities)) {
        console.error("updateGameEntities expected an array but got:", entities);
        return [];
    }

    let grew = false;
    entities = updatePosition(entities);
    entities = detectCollisions(entities);

    entities.forEach(entity => {
        if (entity.Snake && entity.grew) {
            grew = true;
            entity.grew = false;
        }
    });

    if (grew) {
        const snake = entities.find(entity => entity.Snake);
        if (snake) {
            const oldTail = { ...snake.Position };
            entities = entities.map(entity => (entity.Food ? createFood([oldTail, ...entities]) : entity));
            if (!entities.some(entity => entity.Food)) {
                entities.push(createFood([snake.Position]));
            }
            entities.push(createEntity({
                Position: { ...snake.Position },
                Snake: Snake(),
                Score: snake.Score
            }));
        }
    }

    console.log("newEntities after update:", entities);

    // Remove any remaining food if multiple detected
    const foodEntities = entities.filter(entity => entity.Food);
    if (foodEntities.length > 1) {
        entities = entities.filter(entity => !entity.Food).concat(foodEntities.slice(0, 1));
    }

    return entities;
};