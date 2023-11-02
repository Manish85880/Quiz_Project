let currentQuestion = 0;
let score = 0;

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const nextBtn = document.querySelector('.next-btn');
const resultContainer = document.querySelector('.result-container');
const scoreElement = document.querySelector('.score');
const messageElement = document.querySelector('.message');
const quizContainer = document.querySelector('.quiz-container');

let questions;

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion();
    });

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'option';
            input.value = option;
            label.textContent = option;
            label.classList.add('option-label'); // Add class for styling
            label.insertBefore(input, label.firstChild); // Place checkbox at the start
            optionsElement.appendChild(label);

            label.addEventListener('click', () => {
                input.checked = true;
            });
        });

        // Dynamically adjust container width based on question length
        const containerWidth = questionElement.clientWidth + 60; // Adding padding and margin
        quizContainer.style.width = `${containerWidth}px`;
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
    nextBtn.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.textContent = `${score} / ${questions.length}`;
    
    if (score === questions.length) {
        messageElement.textContent = "Congratulations! You got all the questions right!";
    } else if (score >= questions.length / 2) {
        messageElement.textContent = "Well done! You passed the quiz.";
    } else {
        messageElement.textContent = "You can do better. Keep practicing!";
    }
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        loadQuestion();
    }
}

nextBtn.addEventListener('click', checkAnswer);
