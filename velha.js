

// Seleciona os elementos das células do tabuleiro
const cellElements = document.querySelectorAll('[data-cell]');
// Seleciona o tabuleiro do jogo
const board = document.getElementById('game');
// Seleciona o elemento da mensagem de vitória
const winningMessageElement = document.getElementById('winning-message');
// Seleciona o texto da mensagem de vitória
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
// Seleciona o botão de reiniciar
const restartButton = document.getElementById('restartButton');
// Seleciona o botão de sair
const exitButton = document.getElementById('exitButton');
// Classes para X e O
const X_CLASS = 'x';
const O_CLASS = 'o';
// Combinações vencedoras
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let oTurn;

// Inicia o jogo
startGame();

restartButton.addEventListener('click', startGame);
exitButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

function startGame() {
    // Define o turno inicial para X
    oTurn = false;
    cellElements.forEach(cell => {
        // Remove classes X e O e reseta o evento de clique
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
        // Remove imagens de X e O
        cell.innerHTML = '<img src="imagens/x.png" class="x-img"><img src="imagens/o.png" class="o-img">';
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target.closest('.cell');
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Empate!';
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Venceram!`;
    }
    winningMessageElement.classList.add('show');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}
