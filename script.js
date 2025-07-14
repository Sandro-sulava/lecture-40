const words = ["apple", "star", "blue", "dog", "moon", "ball", "sun", "tree"];

let elements = [];
let timeLeft = 15;
let timerId;

let currentWords = [...words];

const gameArea = document.getElementById("gameArea");
const wordInput = document.getElementById("wordInput");
const wordList = document.getElementById("wordList");
const statusDisplay = document.getElementById("status");
const timerDisplay = document.getElementById("timer");

function updateWordList() {
  wordList.textContent = `📃 words: ${currentWords.join(", ")}`;
}

function createBox() {
  for (let i = 0; i < 6; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    gameArea.appendChild(box);
    elements.push(box);
    console.log(box);
  }
}

function removeBox() {
  const box = elements.pop();

  if (box) {
    box.remove();
  }

  if (elements.length === 0) {
    endGame("💥 You lost! All elements are gone.");
  }
}

function startTimer() {
  timerId = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      removeBox();
      timeLeft = 3;
    }
  }, 1000);
}

function endGame(message) {
  clearInterval(timerId);
  statusDisplay.textContent = message;
  wordInput.disabled = true;
}

wordInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const value = wordInput.value.trim().toLowerCase();

    if (currentWords.includes(value)) {
      currentWords = currentWords.filter((word) => word !== value);
      updateWordList();
      timeLeft += 2;
      wordInput.value = "";

      if (currentWords.length === 0) {
        endGame("🏆 you win! All words matched");
      }
    } else {
      removeBox();
    }
  }
});

updateWordList();
createBox();
startTimer();
