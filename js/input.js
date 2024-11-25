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

export const handleInput = (state, key) => {
    // kopija trenutnog stanja za kasnije menjanje
    const newState = { ...state };

    const newDirection = directionMap[key];
    if (newDirection && newDirection.opposite !== state.direction.opposite) {
        newState.direction = newDirection;
    }
    return newState;
};
