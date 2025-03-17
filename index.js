const board = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Handles cell clicks
board.forEach(cell => {
    cell.addEventListener("click", function() {
        const index = this.getAttribute("data-index");

        if (gameState[index] === "" && gameActive) {
            gameState[index] = currentPlayer;
            this.textContent = currentPlayer;

            if (checkWinner()) {
                statusText.textContent = `Player ${currentPlayer} Wins!`;
                gameActive = false;
            } else if (gameState.includes("")) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusText.textContent = `Player ${currentPlayer}'s Turn`;
            } else {
                statusText.textContent = "It's a Draw!";
                gameActive = false;
            }
        }
    });
});

// Checks for a winner
function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] !== "" && gameState[a] === gameState[b] && gameState[b] === gameState[c];
    });
}

// Resets the game
resetButton.addEventListener("click", function() {
    gameState.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

    board.forEach(cell => {
        cell.textContent = "";
    });
});
