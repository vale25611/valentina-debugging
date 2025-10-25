const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function hideAllMessages(){
  for(let i = 0; i < messages.length; i++) {
    messages[i].style.display = 'none';
  }
}

function disableInput() {
  submitButton.disabled = true;
  guessInput.disabled = true;
}

function enableInput() {
  submitButton.disabled = false;
  guessInput.disabled = false;
}


function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  if (Number.isNaN(guess)) {
    alert('Please enter a number.');
    return;
  }

  attempts = attempts + 1;
  const remainingAttempts = maxNumberOfAttempts - attempts;


  hideAllMessages();

  // Correct guess
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;

    correctMessage.style.display = '';
    disableInput();
    submitButton.disabled = true;
    guessInput.disabled = true;
    return;
  }
  // Incorrect guess path
  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  // Out of tries
  if (attempts === maxNumberOfAttempts) {
    disableInput();
    maxGuessesMessage.style.display = '';
    maxGuessesMessage.textContent = '0 guesses remaining';
  }

  guessInput.value = '';
  resetButton.style.display = '';
  
}


function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  enableInput();
  guessInput.value = '';

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
