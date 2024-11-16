// Definišemo početno stanje igre
export const initialState = {
    snake: [ // Početni segmenti zmije (glava na poziciji 10,10)
        { x: 10, y: 10 }
    ],
    food: { x: 15, y: 10 }, // Početna pozicija hrane
    direction: { x: 0, y: 0 }, // Početni pravac (zmija stoji)
    gameOver: false // Da li je igra završena
};
