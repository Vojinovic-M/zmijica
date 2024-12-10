# Snake Game

This is a Snake game implemented in JavaScript. The game features a simple UI, a scoreboard, and a leaderboard that stores top scores using Supabase as the backend.

## Table of Contents

- [Getting Started](#getting-started)
- [Game Rules](#game-rules)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Running the Game](#running-the-game)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get a copy of this project up and running on your local machine for development and testing, follow these steps.

### Prerequisites

- Node.js (v14.x or higher recommended)
- npm (v6.x or higher recommended)

### Installation

1. Clone the repository

    ```sh
    git clone https://github.com/Vojinovic-M/snake-game.git
    ```

2. Navigate to the project directory

    ```sh
    cd snake-game
    ```

3. Install the dependencies

    ```sh
    npm install
    ```

## Game Rules

- Use the arrow keys to control the direction of the snake.
- Eat the food to grow and increase your score.
- Avoid colliding with the walls or the snake's own body.
- When the game is over, you can enter your name to save your score to the leaderboard.

## Project Structure

├── css <br>
│└── styles.css // Styling for the game UI <br>
├── js <br>
│ ├── entities.js // Game entities definitions <br>
│ ├── input.js // Input handling <br>
│ ├── leaderboard.js // Leaderboard functionality <br>
│ ├── logic.js // Game logic <br>
│ ├── main.js // Main game loop <br>
│ ├── render.js // Rendering functions <br>
│ └── state.js // Game state definitions <br>
├── index.html // Main HTML file <br>
├── package.json // Project dependencies and scripts <br>
└── README.md<br>

## Dependencies

This project uses the following main dependencies:

- [@supabase/supabase-js](https://github.com/supabase/supabase-js) - A JavaScript client for Supabase.

## Running the Game

To run the game locally:

1. Start a local server:

    ```sh
    npm start
    ```

2. Open your web browser and navigate to:

    ```
    http://localhost:8080
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.
