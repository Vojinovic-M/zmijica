// Funkcija za ažuriranje igre
export const updateGame = (state) => {
    // Kopiramo trenutno stanje kako bismo radili promene
    const newState = { ...state };

    // Ako je igra gotova, ništa ne radimo
    if (newState.gameOver) {
        return newState;
    }

    // Novi segment glave zmije na osnovu trenutnog pravca
    const newHead = {
        x: newState.snake[0].x + newState.direction.x,
        y: newState.snake[0].y + newState.direction.y,
    };

    // Provera sudara sa zidovima ili samom zmijom
    if (
        newHead.x < 0 || newHead.x >= 20 || // Zidovi levo/desno
        newHead.y < 0 || newHead.y >= 20 || // Zidovi gore/dole
        newState.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y) // Sudar sa samim sobom
    ) {
        newState.gameOver = true; // Igra se završava
        return newState;
    }

    // Dodajemo novi segment glave
    newState.snake = [newHead, ...newState.snake];

    // Ako zmija pojede hranu
    if (newHead.x === newState.food.x && newHead.y === newState.food.y) {
        // Nasumično generišemo novu hranu
        newState.food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
        };
    } else {
        // Uklanjamo poslednji segment zmije (ako nije pojela hranu)
        newState.snake.pop();
    }

    return newState; // Vraćamo ažurirano stanje
};
