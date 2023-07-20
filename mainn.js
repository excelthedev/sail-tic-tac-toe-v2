"use strict";

const playWithCpu = document.getElementById("cpu-mode");
const playWithFriend = document.getElementById("friend-mode");
const checkX = document.getElementById("Xplayer");
const checkO = document.getElementById("Oplayer");
const iconO = document.querySelector(".O-select");
const iconX = document.querySelector(".X-select");
const boxSpan = document.querySelectorAll(".box");
const goToGame = document.getElementById("continue-game");
const resultDisplay = document.querySelector(".result-box");
const restartGame = document.getElementById("Restart");
const message = document.querySelector(".msg");

let go = "cross"; // player playing first

goToGame.style.opacity = "0";

// Remove result box
resultDisplay.addEventListener("click", function () {
  resultDisplay.style.display = "none";
});

// Function checking the score
function checkScore() {
  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombo.length; i++) {
    const [a, b, c] = winningCombo[i];
    if (
      boxSpan[a].firstChild &&
      boxSpan[a].firstChild.classList.contains(go) &&
      boxSpan[b].firstChild &&
      boxSpan[b].firstChild.classList.contains(go) &&
      boxSpan[c].firstChild &&
      boxSpan[c].firstChild.classList.contains(go)
    ) {
      resultDisplay.style.display = "flex";
      message.textContent = `Player ${go.toUpperCase()} wins`;
      resetBoard();
      return;
    }
  }
}

// Function to add player to the box
function addingPlayer(e) {
  if (!e.target.firstChild) {
    const goDisplay = document.createElement("span");
    goDisplay.classList.add(go);
    e.target.appendChild(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    e.target.removeEventListener("click", addingPlayer);
    checkScore();
  }
}

boxSpan.forEach((elem) => {
  elem.addEventListener("click", addingPlayer);
});

// Selecting the desired play mode (CPU or Friend)
function selectPlayer() {
  document.querySelector(".play-mode").style.display = "none";
  document.querySelector(".select-player").style.display = "flex";
}

playWithCpu.addEventListener("click", selectPlayer);
playWithFriend.addEventListener("click", selectPlayer);

checkX.addEventListener("click", function () {
  document.getElementById("Oplayer").disabled = true;
  iconO.style.opacity = "0.5";
  goToGame.style.opacity = "1";
  go = "cross";
});

checkO.addEventListener("click", function () {
  document.getElementById("Xplayer").disabled = true;
  iconX.style.opacity = "0.5";
  goToGame.style.opacity = "1";
  go = "circle";
});

goToGame.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".select-player").style.display = "none";
  document.querySelector(".game-room").style.display = "flex";
  document.querySelector(".result-box").style.display = "none";
});

restartGame.addEventListener("click", function () {
  resetBoard();
});

// Function to reset the board
function resetBoard() {
  boxSpan.forEach((cell) => {
    cell.innerHTML = "";
    cell.addEventListener("click", addingPlayer);
  });
}
