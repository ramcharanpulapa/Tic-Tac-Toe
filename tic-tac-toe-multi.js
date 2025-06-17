const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');

let currentPlayer = 'X';
let moves = 0;
let gameActive = true;
let boardNow = ['', '', '', '', '', '', '', '', ''];

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

const Move = (index) => {
  if (gameActive && boardNow[index] === '') {
    boardNow[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    moves++;
    checkWinner();
    switchPlayer();
  }
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (boardNow[a] && boardNow[a] === boardNow[b] && boardNow[a] === boardNow[c]) {
      gameActive = false;
      status.innerText = `${currentPlayer} won!`;
      return;
    }
  }
  if (moves === 9) {
    gameActive = false;
    status.innerText = 'Match Draw';
  }
};

const resetGame = () => {
  currentPlayer = 'X';
  moves = 0;
  gameActive = true;
  boardNow = ['', '', '', '', '', '', '', '', ''];
  status.innerText = '';
  cells.forEach(cell => cell.innerText = '');
};
