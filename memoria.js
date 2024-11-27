// Array de imagens para as cartas
const images = [
    'imagens/image1.png',
    'imagens/image2.png',
    'imagens/image3.png',
    'imagens/image4.png',
    'imagens/image5.png',
    'imagens/image6.png',
    'imagens/image1.png',
    'imagens/image2.png',
    'imagens/image3.png',
    'imagens/image4.png',
    'imagens/image5.png',
    'imagens/image6.png'
];

let firstCard, secondCard;
let lockBoard = false;
let matches = 0;
let timer;
let time = 0;
let score = 0;

// Função para embaralhar as cartas
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Função para criar o tabuleiro do jogo
function createBoard() {
    const board = document.getElementById('game-board');
    shuffle(images);

    images.forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.setAttribute('role', 'gridcell');
        card.setAttribute('aria-label', 'carta');

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Memory card';
        img.style.display = 'none';

        card.appendChild(img);
        card.addEventListener('click', flipCard);

        board.appendChild(card);
    });
}

// Função para virar a carta
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.querySelector('img').style.display = 'block';

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Função para checar se as duas cartas combinam
function checkForMatch() {
    const firstImage = firstCard.querySelector('img').src;
    const secondImage = secondCard.querySelector('img').src;

    if (firstImage === secondImage) {
        disableCards();
        matches++;
        score += 10;
        document.getElementById('score').textContent = `Pontuação: ${score}`;
        if (matches === images.length / 2) {
            clearInterval(timer);
            setTimeout(() => alert(`Você venceu! Tempo: ${time}s | Pontuação: ${score}`), 500);
        }
    } else {
        unflipCards();
    }
}

// Função para desabilitar cartas combinadas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Função para desvirar cartas se não combinarem
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.querySelector('img').style.display = 'none';
        secondCard.querySelector('img').style.display = 'none';
        resetBoard();
    }, 1000);
}

// Função para resetar o estado do tabuleiro
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Função para reiniciar o jogo
function restartGame() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    matches = 0;
    score = 0;
    time = 0;
    document.getElementById('score').textContent = `Pontuação: ${score}`;
    document.getElementById('timer').textContent = `Tempo: ${time}s`;
    clearInterval(timer);
    createBoard();
    startTimer();
}

// Função para iniciar o temporizador
function startTimer() {
    timer = setInterval(() => {
        time++;
        document.getElementById('timer').textContent = `Tempo: ${time}s`;
    }, 1000);
}

// Função para sair do jogo
function exitGame() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    clearInterval(timer);
    alert('Você saiu do jogo.');
}

// Configurar os event listeners
document.getElementById('reset-btn').addEventListener('click', restartGame);
document.getElementById('exit-btn').addEventListener('click', exitGame);

// Inicializar o jogo
createBoard();
startTimer();