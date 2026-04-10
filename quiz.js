var quizData = [
    { question: "What does CPU stand for?", options: ["Computer Personal Unit", "Central Processing Unit", "Central Process Unit", "Computer Processing Unit"], correct: "Central Processing Unit" },
    { question: "Which of the following is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correct: "Keyboard" },
    { question: "What is the primary function of RAM?", options: ["Permanent data storage", "Temporary data storage", "Cooling the computer", "Power supply"], correct: "Temporary data storage" },
    { question: "Which of the following is an operating system?", options: ["Microsoft Word", "Windows", "Google Chrome", "Intel"], correct: "Windows" },
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"], correct: "HyperText Markup Language" },
    { question: "What is considered the brain of the computer?", options: ["Motherboard", "Hard Drive", "CPU", "RAM"], correct: "CPU" },
    { question: "1 Byte is equal to how many bits?", options: ["4 bits", "8 bits", "16 bits", "32 bits"], correct: "8 bits" },
    { question: "Which part of the computer displays visual output?", options: ["Mouse", "Keyboard", "Monitor", "CPU"], correct: "Monitor" },
    { question: "Which of the following is a storage device?", options: ["Monitor", "Hard Drive", "Keyboard", "Mouse"], correct: "Hard Drive" },
    { question: "What does WWW stand for?", options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"], correct: "World Wide Web" }
];

var timerDisplay = document.getElementById("timer-display");
var questionText = document.getElementById("question-text");
var optionsContainer = document.getElementById("options-container");
var quizMessage = document.getElementById("quiz-message");
var btnNext = document.getElementById("btn-next");
var btnTryAgain = document.getElementById("btn-try-again");
var scoreDisplay = document.getElementById("score-display");

var timer;
var timeLeft = 15;
var hasAnswered = false;
var currentQuestionIndex = 0;
var score = 0;

function loadQuiz() {
    timeLeft = 15;
    hasAnswered = false;
    timerDisplay.innerText = "Time left: " + timeLeft + "s";
    quizMessage.innerText = "";
    optionsContainer.innerHTML = "";
    btnNext.style.display = "none";
    btnTryAgain.style.display = "none";
    
    var currentQuiz = quizData[currentQuestionIndex];
    questionText.innerText = "Q" + (currentQuestionIndex + 1) + ". " + currentQuiz.question;
    
    for (var i = 0; i < currentQuiz.options.length; i++) {
        var optionBtn = document.createElement("button");
        optionBtn.innerText = currentQuiz.options[i];
        optionBtn.classList.add("option-btn");
        optionBtn.addEventListener("click", function(event) {
            selectOption(event.target, currentQuiz.correct);
        });
        optionsContainer.appendChild(optionBtn);
    }
    scoreDisplay.innerText = "Score: " + score + " / " + quizData.length;
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(function() {
        timeLeft--;
        timerDisplay.innerText = "Time left: " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!hasAnswered) {
                autoSubmit();
            }
        }
    }, 1000);
}

function processAnswer(selectedAnswer, correctAnswer, selectedElement) {
    if (selectedAnswer === correctAnswer) {
        if (selectedElement) selectedElement.classList.add("correct");
        score++;
    } else {
        if (selectedElement) selectedElement.classList.add("wrong");
    }
    
    scoreDisplay.innerText = "Score: " + score + " / " + quizData.length;

    var allOptions = document.querySelectorAll(".option-btn");
    for (var i = 0; i < allOptions.length; i++) {
        if (allOptions[i].innerText === correctAnswer) {
            allOptions[i].classList.add("correct");
        }
    }
    showNextStep();
}

function selectOption(selectedElement, correctAnswer) {
    if (hasAnswered) return;
    hasAnswered = true;
    clearInterval(timer);
    processAnswer(selectedElement.innerText, correctAnswer, selectedElement);
}

function autoSubmit() {
    hasAnswered = true;
    var correctAnswer = quizData[currentQuestionIndex].correct;
    processAnswer(null, correctAnswer, null);
    quizMessage.innerText = "Time's up!";
}

function showNextStep() {
    if (currentQuestionIndex < quizData.length - 1) {
        btnNext.style.display = "block";
    } else {
        var emoji = "🎉";
        if (score === quizData.length) {
            emoji = "🏆🏆 Perfect Score! 🏆🏆";
        } else if (score >= 7) {
            emoji = "🌟 Great Job! 🌟";
        } else if (score >= 4) {
            emoji = "👍 Good Effort! 👍";
        } else {
            emoji = "📚 Keep Learning! 📚";
        }
        quizMessage.innerText = "Quiz Completed \u2705\n\n" + emoji + "\nFinal Score: " + score + " out of " + quizData.length;
        btnTryAgain.style.display = "block";
    }
}

btnNext.addEventListener("click", function() {
    currentQuestionIndex++;
    loadQuiz();
});

btnTryAgain.addEventListener("click", function() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuiz();
});

loadQuiz();
