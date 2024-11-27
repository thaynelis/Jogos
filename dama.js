const board = document.getElementById('game-board');
const capturedRed = document.getElementById('captured-red');
const capturedBlack = document.getElementById('captured-black');
const turnIndicator = document.getElementById('turn-indicator');
const rows = 8;
const cols = 8;
let isRedTurn = true;
let selectedPiece = null;

// Função para iniciar o tabuleiro
function initializeBoard() {
    board.innerHTML = '';
    capturedRed.innerHTML = 'Peças Vermelhas Capturadas';
    capturedBlack.innerHTML = 'Peças Pretas Capturadas';
    turnIndicator.textContent = 'Vez: Vermelho';
   
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            if ((row + col) % 2 === 0) {
                cell.classList.add('black');
                if (row < 3) {
                    const piece = document.createElement('div');
                    piece.classList.add('piece', 'red-piece');
                    piece.dataset.color = 'red';
                    cell.appendChild(piece);
                } else if (row > 4) {
                    const piece = document.createElement('div');
                    piece.classList.add('piece', 'black-piece');
                    piece.dataset.color = 'black';
                    cell.appendChild(piece);
                }
            } else {
                cell.classList.add('red');
            }
            cell.addEventListener('click', handleCellClick); // Adiciona evento de clique para as células
            board.appendChild(cell);
        }
    }
}

// Manipulador de clique nas células
function handleCellClick(event) {
    const cell = event.currentTarget;
    const piece = cell.querySelector('.piece');

    if (selectedPiece) {
        // Move a peça para a nova célula
        if (isValidMove(selectedPiece, cell)) {
            cell.appendChild(selectedPiece);
            selectedPiece = null;
            isRedTurn = !isRedTurn; // Alterna a vez
            turnIndicator.textContent = `Vez: ${isRedTurn ? 'Vermelho' : 'Preto'}`; // Atualiza o indicador de vez
        }
    } else if (piece && piece.dataset.color === (isRedTurn ? 'red' : 'black')) {
        // Seleciona a peça
        selectedPiece = piece;
    }
}

// Verifica se o movimento é válido
function isValidMove(piece, cell) {
    const startRow = parseInt(piece.parentElement.dataset.row);
    const startCol = parseInt(piece.parentElement.dataset.col);
    const endRow = parseInt(cell.dataset.row);
    const endCol = parseInt(cell.dataset.col);
    const direction = piece.dataset.color === 'red' ? 1 : -1;

    // Movimento básico
    if (Math.abs(startRow - endRow) === 1 && Math.abs(startCol - endCol) === 1 && endRow - startRow === direction) {
        return true;
    }

    // Movimento de captura
    if (Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 2 && endRow - startRow === 2 * direction) {
        const middleRow = (startRow + endRow) / 2;
        const middleCol = (startCol + endCol) / 2;
        const middleCell = board.querySelector(`.cell[data-row='${middleRow}'][data-col='${middleCol}']`);
        const middlePiece = middleCell.querySelector('.piece');
        if (middlePiece && middlePiece.dataset.color !== piece.dataset.color) {
            if (middlePiece.dataset.color === 'red') {
                capturedRed.appendChild(middlePiece); // Move a peça capturada para a área das peças vermelhas capturadas
            } else {
                capturedBlack.appendChild(middlePiece); // Move a peça capturada para a área das peças pretas capturadas
            }
            return true;
        }
    }

    return false;
}

// Evento de clique no botão "Reiniciar"
document.getElementById('restart-button').addEventListener('click', function() {
    isRedTurn = true;
    selectedPiece = null;
    initializeBoard();
});

// Evento de clique no botão "Sair"
document.getElementById('exit-button').addEventListener('click', function() {
    window.location.href = 'index.html';
});

// Inicializa o tabuleiro ao carregar a página
initializeBoard();