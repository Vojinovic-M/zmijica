// Funkcija za obradu unosa korisnika
export const handleInput = (state, key) => {
    // kopija trenutnog stanja za kasnije menjanje
    const newState = { ...state };

    // Pravac se menja samo ako zmija ne ide unazad
    switch (key) {
        case 'ArrowUp':
            if (newState.direction.y !== 1) { // Ne može da ide dole
                newState.direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (newState.direction.y !== -1) { // Ne može da ide gore
                newState.direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (newState.direction.x !== 1) { // Ne može da ide desno
                newState.direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (newState.direction.x !== -1) { // Ne može da ide levo
                newState.direction = { x: 1, y: 0 };
            }
            break;
    }

    return newState; // Vraćamo novo stanje sa ažuriranim pravcem
};
