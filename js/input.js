// entitet za mapiranje pravaca
const Direction = {
    UP: { x: 0, y: -1, opposite: 'DOWN' },
    DOWN: { x: 0, y: 1, opposite: 'UP' },
    LEFT: { x: -1, y: 0, opposite: 'RIGHT' },
    RIGHT: { x: 1, y: 0, opposite: 'LEFT' }
};

const directionMap = {
    'ArrowUp': Direction.UP,
    'ArrowDown': Direction.DOWN,
    'ArrowLeft': Direction.LEFT,
    'ArrowRight': Direction.RIGHT
};

export const handleInput = (entities, key) => {
    return entities.map((entity) => {
        if (entity.type === 'Snake' && directionMap[key]) {
            const newDirection = directionMap[key];
            if (newDirection.opposite !== entity.direction.opposite) {
                return {
                    ...entity,
                    direction: newDirection
                };
            }
        } else if (entity.type === 'Leaderboard' && key === 'l') { // Assuming 'l' is for 'Leaderboard'
            return {
                ...entity,
                isVisible: !entity.isVisible,
            };
        }
        return entity;
    });
};
