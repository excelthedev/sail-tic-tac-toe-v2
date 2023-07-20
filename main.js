document.addEventListener("DOMContentLoaded", () => {
  const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  let currentPlayer = "X";

  let gameActive = false;
  let playAgainstComputer = true;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  //selecting all our needed DOM Elements
  const boxes = document.querySelectorAll(".game-area span");
  const playAgainstComputerBtn = document.getElementById("cpu-mode");
  const playAgainstFriendBtn = document.getElementById("friend-mode");
  const restartBtn = document.getElementById("Restart");
  const resultBox = document.querySelector(".result-box");
  const closeBtn = document.querySelector(".close");
  const msgElement = document.querySelector(".notifier h1");

  function handlePlayModeSelection(event) {
    playAgainstComputer = event.target.id === "cpu-mode";
    document.querySelector(".play-mode").style.display = "none";
    document.querySelector(".select-player").style.display = "flex";
  }

  function handlePlayerSelection(event) {
    currentPlayer = event.target.id === "Xplayer" ? "X" : "O";
    document.querySelector(".select-player").style.display = "none";
    document.querySelector(".game-room").style.display = "flex";
    startGame();
  }

  function startGame() {
    gameActive = true;
    resultBox.style.display = "none";
    boxes.forEach((box) => {
      box.textContent = "";
      box.addEventListener("click", handleBoxClick, { once: true });
    });

    if (currentPlayer === "O" && playAgainstComputer) {
      makeComputerMove();
    }
  }

  function handleBoxClick(event) {
    const boxIndex = event.target.id;
    if (board[boxIndex] === " " && gameActive) {
      board[boxIndex] = currentPlayer;
      event.target.textContent = currentPlayer;

      if (checkWin(currentPlayer)) {
        endGame(`Player ${currentPlayer} wins!`);
      } else if (isBoardFull()) {
        endGame("It's a Draw!");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (playAgainstComputer && currentPlayer === "O") {
          makeComputerMove();
        }
      }
    }
  }

  function makeComputerMove() {
    const availableMoves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === " ") {
        availableMoves.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const position = availableMoves[randomIndex];
    board[position] = currentPlayer;
    boxes[position].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      endGame(`Player ${currentPlayer} wins!`);
    } else if (isBoardFull()) {
      endGame("It's a Draw!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  function checkWin(player) {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }
    return false;
  }

  function isBoardFull() {
    return !board.includes(" ");
  }

  function endGame(message) {
    gameActive = false;
    resultBox.style.display = "flex";
    msgElement.textContent = message;
    boxes.forEach((box) => {
      box.removeEventListener("click", handleBoxClick);
    });
  }

  playAgainstComputerBtn.addEventListener("click", handlePlayModeSelection);
  playAgainstFriendBtn.addEventListener("click", handlePlayModeSelection);
  // restartBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", function () {
    // console.log("Restart Game");
    // setInterval("location.reload()", 100);
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  });
  closeBtn.addEventListener("click", () => {
    resultBox.style.display = "none";
  });
  document.querySelectorAll(".playericon input").forEach((input) => {
    input.addEventListener("click", handlePlayerSelection);
  });
});
