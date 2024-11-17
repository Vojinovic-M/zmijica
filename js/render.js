// Funkcija za prikaz igre
export const renderGame = (state) => {
    const board = document.getElementById('game-board'); // div tabele
    board.innerHTML = ''; // brisanje prethodne igre

    // Prikaz svakog segmenta zmije
    state.snake.forEach(segment => {
        const segmentDiv = document.createElement('div'); // div za segment
        segmentDiv.style.gridRowStart = segment.y + 1; // Postavljamo red na gridu
        segmentDiv.style.gridColumnStart = segment.x + 1; // Postavljamo kolonu na gridu
        segmentDiv.className = 'snake'; // klasа za stil
        board.appendChild(segmentDiv); // segment na tablu
    });

    // Prikaz hrane
    const foodDiv = document.createElement('div'); // Kreiramo div za hranu
    foodDiv.style.gridRowStart = state.food.y + 1; // Postavljamo red na gridu
    foodDiv.style.gridColumnStart = state.food.x + 1; // Postavljamo kolonu na gridu
    foodDiv.className = 'food'; // klasu za stil
    board.appendChild(foodDiv); // Dodajemo hranu na tablu

};

// Funkcija za prikaz skora
export const renderScore = (score) => {
    const scoreElement = document.getElementById('score'); // Selektujemo element skora
    scoreElement.textContent = score; // Ažuriramo tekst
};
