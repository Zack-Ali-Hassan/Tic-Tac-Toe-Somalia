let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;
const messageElement = document.getElementById("message");
const modal = document.getElementById("modal");
const winnerMessage = document.getElementById("winner-message");

function cellClicked(cellIndex) {
    if (!gameActive || gameState[cellIndex] !== "") return;
    gameState[cellIndex] = currentPlayer;
    document.getElementsByClassName("cell")[cellIndex].innerText = currentPlayer;
    if (checkWin()) {
        messageElement.innerText = winningMessage();
        showModal();
        gameActive = false;
        return;
    }
    if (checkDraw()) {
        messageElement.innerText = drawMessage();
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageElement.innerText = currentPlayerTurn();
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => {
        return cell !== "";
    });
}

function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    messageElement.innerText = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
    closeModal();
}

function showModal() {
    modal.style.display = "block";
    winnerMessage.innerText = winningMessage();
}

function closeModal() {
    modal.style.display = "none";
}
