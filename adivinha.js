const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const resultMessage = document.getElementById('result-message');

let randomNumber = Math.floor(Math.random() * 100) + 1;

guessButton.addEventListener('click', () => {
    const userGuess = parseInt(guessInput.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        resultMessage.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        return;
    }

    if (userGuess === randomNumber) {
        resultMessage.textContent = 'Parabéns! Você adivinhou o número!';
    } else if (userGuess < randomNumber) {
        resultMessage.textContent = 'Tente um número maior.';
    } else {
        resultMessage.textContent = 'Tente um número menor.';
    }
});