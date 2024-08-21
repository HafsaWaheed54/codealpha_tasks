const wordList = ["apple", "banana", "grapefruit", "kiwi", "strawberry", "pineapple", "blueberry"];
let wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
let guessedLetters = new Set();
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const wordDisplay = document.getElementById("word-display");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");
const wrongGuessesDisplay = document.getElementById("wrong-guesses");
const resetButton = document.getElementById("reset-button");

function updateDisplay() {
    const displayWord = wordToGuess.split('').map(letter => guessedLetters.has(letter) ? letter : '_').join(' ');
    wordDisplay.textContent = displayWord;
}

function checkGuess() {
    const guess = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (guessedLetters.has(guess)) {
        message.textContent = "You've already guessed that letter!";
        return;
    }

    if (wordToGuess.includes(guess)) {
        guessedLetters.add(guess);
        updateDisplay();

        if (wordToGuess.split('').every(letter => guessedLetters.has(letter))) {
            message.textContent = `Congratulations! You've guessed the word: ${wordToGuess}`;
            guessButton.disabled = true;
            letterInput.disabled = true;
        }
    } else {
        guessedLetters.add(guess);
        wrongGuesses++;
        wrongGuessesDisplay.textContent = wrongGuesses;

        if (wrongGuesses >= maxWrongGuesses) {
            message.textContent = `Game Over! The word was: ${wordToGuess}`;
            guessButton.disabled = true;
            letterInput.disabled = true;
        } else {
            message.textContent = `Incorrect guess! You have ${maxWrongGuesses - wrongGuesses} guesses left.`;
        }
    }
}

function resetGame() {
    wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
    guessedLetters.clear();
    wrongGuesses = 0;
    wrongGuessesDisplay.textContent = wrongGuesses;
    guessButton.disabled = false;
    letterInput.disabled = false;
    message.textContent = '';
    updateDisplay();
}

guessButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", resetGame);

updateDisplay();
