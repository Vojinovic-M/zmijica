// Funkcija za obradu unosa korisnika
export const handleInput = (state, key) => {
    // Kopiramo trenutno stanje kako bismo ga menjali
    const newState = { ...state };

    // Pravac se menja samo ako zmija ne ide unazad
    switch (key) {
        case 'ArrowUp': // Strelica gore
            if (newState.direction.y !== 1) { // Ne može da ide dole
                newState.direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown': // Strelica dole
            if (newState.direction.y !== -1) { // Ne može da ide gore
                newState.direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft': // Strelica levo
            if (newState.direction.x !== 1) { // Ne može da ide desno
                newState.direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight': // Strelica desno
            if (newState.direction.x !== -1) { // Ne može da ide levo
                newState.direction = { x: 1, y: 0 };
            }
            break;
    }

    return newState; // Vraćamo novo stanje sa ažuriranim pravcem
};
