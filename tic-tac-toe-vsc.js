const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const board = document.getElementById('board');
const status = document.getElementById('status')

let currentPlayer = 'X';
let boardNow = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (boardNow[cellIndex] !== '' || !gameActive) {
        return;
    }

    placeMark(clickedCell, cellIndex);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        switchPlayer();
        randomMove();
    }
};

const placeMark = (cell, index) => {
    cell.textContent = currentPlayer;
    boardNow[index] = currentPlayer;
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = (player) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardNow[index] === player;
        });
    });
};

const isBoardFull = () => {
    return boardNow.every(cell => cell !== '');
};

const endGame = (draw) => {
    gameActive = false;
    if (draw) {
        status.innerText = "Match draw";
        return;
    } else {
        status.innerText=` ${currentPlayer} won!`;
    }
};

const randomMove = () => {
    const emptyCells = [];
    boardNow.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cellIndex = emptyCells[randomIndex];
    const cell = cells[cellIndex];
    placeMark(cell, cellIndex);

    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        switchPlayer();
    }
};

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    boardNow = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.innerText='';
});
