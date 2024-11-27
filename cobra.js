const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // Tamanho de cada quadrado
const canvasSize = canvas.width / box; // Tamanho do canvas em quadrados

let snake = []; // Array para representar a cobra
snake[0] = {
    x: Math.floor(canvasSize / 2) * box,
    y: Math.floor(canvasSize / 2) * box
};

let direction = 'right'; // Direção inicial da cobra
let food = generateFood();

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode == 37 && direction != 'right') {
        direction = 'left';
    } else if (event.keyCode == 38 && direction != 'down') {
        direction = 'up';
    } else if (event.keyCode == 39 && direction != 'left') {
        direction = 'right';
    } else if (event.keyCode == 40 && direction != 'up') {
        direction = 'down';
    }
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * canvasSize) * box,
        y: Math.floor(Math.random() * canvasSize) * box
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'darkgreen' : 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'left') snakeX -= box;
    if (direction == 'up') snakeY -= box;
    if (direction == 'right') snakeX += box;
    if (direction == 'down') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Fim de jogo');
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(draw, 100);

document.getElementById('restartButton').addEventListener('click', function() {
    location.reload();
});

document.getElementById('exitButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});


