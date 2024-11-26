// definicija pocetnog stanja igre
export const initialState = {
    snake: [{ x: 10, y: 10 }],  // glava na poziciji 10,10
    food: { x: 15, y: 10 },
    direction: { x: 0, y: 0 }, // zmija stoji
    gameOver: false,
    score: 0
};
