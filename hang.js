const words = ['flowers', 'javascript', 'mobile', 'Engineering', 'laptop'];

let selectedWord;
let guessedWord;
let guessesRemaining;
let guessedLetters;

const wordElement = document.getElementById('word');
const guessesElement = document.getElementById('guesses');
const lettersElement = document.getElementById('letters');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function initializeGame() {
  selectedWord = getRandomWord();
  guessedWord = Array(selectedWord.length).fill('_');
  guessesRemaining = 6;
  guessedLetters = [];

  wordElement.textContent = guessedWord.join(' ');
  guessesElement.textContent = guessesRemaining;
  lettersElement.textContent = guessedLetters.join(' ');

  guessInput.disabled = false;
  guessButton.disabled = false;
  resetButton.disabled = true;

  guessInput.value = '';
  guessInput.focus();
}

function updateGuessedWord(letter) {
  let letterFound = false;

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      guessedWord[i] = letter;
      letterFound = true;
    }
  }

  if (!letterFound) {
    guessesRemaining--;
    guessedLetters.push(letter);
  }

  wordElement.textContent = guessedWord.join(' ');
  guessesElement.textContent = guessesRemaining;
  lettersElement.textContent = guessedLetters.join(' ');

  checkGameStatus();
}

function checkGameStatus() {
  if (guessedWord.indexOf('_') === -1) {
    endGame(true);
  } else if (guessesRemaining === 0) {
    endGame(false);
  }
}

function endGame(isWin) {
  guessInput.disabled = true;
  guessButton.disabled = true;
  resetButton.disabled = false;

  if (isWin) {
    alert('Congratulations! You won!');
  } else {
    alert('Game over! You lost! The word was: ' + selectedWord);
  }
}

guessButton.addEventListener('click', function() {
  const guess = guessInput.value.toLowerCase().trim();

  if (guess && guess.length === 1 && guess.match(/[a-z]/i)) {
    if (guessedLetters.includes(guess)) {
      alert('You already guessed that letter! Try another one.');
    } else {
      updateGuessedWord(guess);
    }
  } else {
    alert('Please enter a single letter!');
  }

  guessInput.value = '';
  guessInput.focus();
});

resetButton.addEventListener('click', initializeGame);

initializeGame();
