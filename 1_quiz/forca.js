
const words = [
    { word: 'javascript', hint: 'Linguagem de programação' },
    { word: 'html', hint: 'Linguagem de marcação' },
    { word: 'css', hint: 'Linguagem de estilos' }
];
const hangmanImages = [
    "imagens/forca0.png",
    "imagens/forca01.png",
    "imagens/forca02.png",
    "imagens/forca03.png",
    "imagens/forca04.png",
    "imagens/forca06.png",
];
let selectedWord;
let hint;
let guessedLetters = [];
let incorrectGuesses = 0;

// Botões e sons
document.getElementById('play-alone-btn').addEventListener('click', startGame);
document.getElementById('choose-word-btn').addEventListener('click', showCustomWordScreen);
document.getElementById('start-game-btn').addEventListener('click', startCustomGame);
document.getElementById('guess-btn').addEventListener('click', guessLetter);
document.getElementById('new-word-btn').addEventListener('click', showStartScreen);
document.getElementById('exit-btn').addEventListener('click', showStartScreen);

function showStartScreen() {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('choose-word-screen').style.display = 'none';
    localStorage.clear();
}

function showCustomWordScreen() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('choose-word-screen').style.display = 'block';
}

function startGame() {
    // Seleciona uma palavra aleatória da lista
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    hint = words[randomIndex].hint;
    resetGame();
}

function startCustomGame() {
    // Inicia o jogo com a palavra e dica fornecidas pelo usuário
    selectedWord = document.getElementById('custom-word').value.toLowerCase();
    hint = document.getElementById('custom-hint').value;
    resetGame();
}

function resetGame() {
    // Reseta o estado do jogo
    guessedLetters = [];
    incorrectGuesses = 0;

    document.getElementById('word').textContent = '_ '.repeat(selectedWord.length);
    document.getElementById('hint').textContent = `Dica: ${hint}`;
    document.getElementById('incorrect-letters').textContent = '';
    document.getElementById('remaining-attempts').textContent = `Tentativas restantes: ${6 - incorrectGuesses}`;
    document.getElementById('letter-input').value = '';
    document.getElementById('hangman-img').src = hangmanImages[0];
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('choose-word-screen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    saveGameState();
}

function guessLetter() {
    const input = document.getElementById('letter-input').value.toLowerCase();
    if (input && !guessedLetters.includes(input)) {
        guessedLetters.push(input);

        if (selectedWord.includes(input)) {
            document.getElementById('correct-sound').play();
            displayWord();
        } else {
            incorrectGuesses++;
            document.getElementById('wrong-sound').play();
            document.getElementById('incorrect-letters').textContent += `${input} `;
            document.getElementById('hangman-img').src = hangmanImages[incorrectGuesses];
            document.getElementById('remaining-attempts').textContent = `Tentativas restantes: ${6 - incorrectGuesses}`;
            if (incorrectGuesses === 6) {
                document.getElementById('lose-sound').play();
                alert('Você perdeu!');
                showStartScreen();
            }
        }

        document.getElementById('letter-input').value = '';
        saveGameState();
    }
}

function displayWord() {
    // Exibe a palavra com as letras adivinhadas
    let display = '';
    for (const letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            display += `${letter} `;
        } else {
            display += '_ ';
        }
    }
    document.getElementById('word').textContent = display.trim();

    if (!display.includes('_')) {
        document.getElementById('win-sound').play();
        alert('Você venceu!');
        showStartScreen();
    }
}

function saveGameState() {
    // Salva o estado atual do jogo no localStorage
    const gameState = {
        selectedWord,
        hint,
        guessedLetters,
        incorrectGuesses
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState() {
    // Carrega o estado do jogo do localStorage
    const gameState = JSON.parse(localStorage.getItem('gameState'));
    if (gameState) {
        selectedWord = gameState.selectedWord;
        hint = gameState.hint;
        guessedLetters = gameState.guessedLetters;
        incorrectGuesses = gameState.incorrectGuesses;

        document.getElementById('word').textContent = guessedLetters.map(letter => selectedWord.includes(letter) ? letter : '_').join(' ');
        document.getElementById('hint').textContent = `Dica: ${hint}`;
        document.getElementById('incorrect-letters').textContent = guessedLetters.filter(letter => !selectedWord.includes(letter)).join(' ');
        document.getElementById('remaining-attempts').textContent = `Tentativas restantes: ${6 - incorrectGuesses}`;
        document.getElementById('hangman-img').src = hangmanImages[incorrectGuesses];
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game').style.display = 'block';
    }
}
loadGameState();