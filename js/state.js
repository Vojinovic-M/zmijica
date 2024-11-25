export const initialState = {
    snake: [{ x: 10, y: 10 }], // pocetni segmenti zmije (glava na poziciji 10,10)
    food: { x: 15, y: 10 }, // pocetna pozicija hrane
    direction: { x: 0, y: 0 }, // pocetni pravac (zmija stoji)
    gameOver: false, // Da li je igra završena
    score: 0
};
