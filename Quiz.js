const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');


const questions = [
    {
        question: 'Qual é a capital do Brasil?',
        answers: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'],
        correct: 'Brasília'
    },
    {
        question: 'Qual a montanha mais alta do mundo?',
        answers: ['Mauna Kea', 'Dhaulagiri', ' Monte Chimborazo', 'Monte Everest'],
        correct: 'Monte Everest'
    },
    {
        question: 'Onde se localiza Machu Picchu?',
        answers: [' Colômbia', 'Peru', ' China', 'Bolívia'],
        correct: 'Peru'
    },
    {
        question: ' Que país tem o formato de uma bota?',
        answers: [' Butão', 'Brasil', ' Portugal', 'Itália'],
        correct: 'Itália'
    },
    {
        question: ' Quem inventou a lâmpada?',
        answers: [' Graham Bell', 'Steve Jobs', ' Thomas Edison', 'Henry Ford'],
        correct: ' Thomas Edison'
    },
    {
        question: ' A que temperatura a água ferve?',
        answers: [' 200 ºC', '-10 ºC', ' 100 ºC', '0 ºC'],
        correct: ' 100 ºC'
    },
    {
        question: ' Quais são as fases da Lua?',
        answers: [' Nova, cheia e superlua', 'Penumbral, lunar parcial, lunar total e cheia', ' Nova, cheia, minguante e lua de sangue', 'Nova, crescente, cheia e minguante'],
        correct: ' Nova, crescente, cheia e minguante'
    },
    {
        question: ' Quantos ossos temos no nosso corpo?',
        answers: [' 126', '206', '18', '300'],
        correct: ' 206'
    }, 
    {
        question: ' Qual o maior planeta do sistema solar?',
        answers: [' Marte', 'Lua', 'Saturno', 'Júpiter'],
        correct: ' Júpiter'
    },
    {
        question: ' Um anel tem 3 pedras preciosas. Quantas pedras preciosas têm 11 anéis?',
        answers: [' 33', '110', '333', '30'],
        correct: ' 33'
    }

];


let currentQuestionIndex = 0;


function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => checkAnswer(currentQuestion.answers[index]);
    });
}


function checkAnswer(answer) {
    if (answer === questions[currentQuestionIndex].correct) {
        alert('Correto!');
    } else {
        alert('Errado!');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert('Fim do jogo!');
    }
}


showQuestion();

