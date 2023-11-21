// declared variables
const startButton = document.getElementById("startButton");
const viewHighScoresButton = document.getElementById("viewHighScores");
const submitButton = document.getElementById("submitButton");
const clearScoresButton = document.getElementById("clearScores");
const backToStartButton = document.getElementById("backToStart");
const timerEl = document.getElementById("timer");
const timeLeftEl = document.getElementById("timeLeft");
const questionsEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const finalScoreEl = document.getElementById("finalScore");
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const endScreen = document.getElementById("endScreen");
const highScoresScreen = document.getElementById("highScores");
const initialsInput = document.getElementById("initials");
const choice1El = document.getElementById("choice-1");
const choice2El = document.getElementById("choice-2");
const choice3El = document.getElementById("choice-3");
const choice4El = document.getElementById("choice-4");
const highScoresList = document.getElementById("highScoresList");
// array of questions in quiz with answers
const questionsArray = [
    {
        text: "Which keyword is used to declare a variable in JavaScript?",
        choices: [
            "var",
            "let",
            "const",
            "variable"
        ],
        answer: "var"
    },
    {
        text: "What is the purpose of the 'typeof' operator in JavaScript?",
        choices: [
            "To check if a variable is defined",
            "To determine the type of a variable",
            "To concatenate strings",
            "To declare a function"
        ],
        answer: "To determine the type of a variable"
    },
    {
        text: "In JavaScript, what is the purpose of the 'this' keyword?",
        choices: [
            "To refer to the current function",
            "To refer to the global object",
            "To refer to the object the function is a method of",
            "To declare a new variable"
        ],
        answer: "To refer to the object the function is a method of"
    },
    {
        text: "Which method is used to add an element to the end of an array in JavaScript?",
        choices: [
            "append()",
            "push()",
            "addToEnd()",
            "addElement()"
        ],
        answer: "push()"
    },
    {
        text: "What is the purpose of the 'querySelector' method in JavaScript?",
        choices: [
            "To select and modify HTML elements",
            "To query a database",
            "To select and modify CSS styles",
            "To select and manipulate DOM elements by CSS selector"
        ],
        answer: "To select and manipulate DOM elements by CSS selector"
    },
    {
        text: "What is the purpose of the 'let' keyword in JavaScript?",
        choices: [
            "To declare a constant variable",
            "To declare a variable with block scope",
            "To declare a global variable",
            "To declare a function"
        ],
        answer: "To declare a variable with block scope"
    },
    {
        text: "What function is used to print content to the console in JavaScript?",
        choices: [
            "console.log()",
            "print()",
            "log()",
            "write()"
        ],
        answer: "console.log()"
    }
]

let timeLeft = 60;
let currentIndex = 0;
let correctAnswers = 0;
let highScores = [];
let intervalId;
// Function to start quiz timer
function startTimer() {
    intervalId = setInterval(function () {
        timeLeft = timeLeft - 1;
        timeLeftEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            endQuiz();
        }
    }, 1000)
}
// function to render the current question with choices
function renderQuestion() {
    questionsEl.textContent = questionsArray[currentIndex].text;
    choice1El.textContent = questionsArray[currentIndex].choices[0];
    choice2El.textContent = questionsArray[currentIndex].choices[1];
    choice3El.textContent = questionsArray[currentIndex].choices[2];
    choice4El.textContent = questionsArray[currentIndex].choices[3];
}
// function to see if answer is correct or not and adding points to score if correct or taking away time if incorrect
function checkAnswer(e) {
    if (e.target.textContent == questionsArray[currentIndex].answer) {
        console.log("correct")
        correctAnswers += 100;
    } else {
        console.log("wrong")
        timeLeft -= 10;
        if (timeLeft <= 0) {
            timeLeft = 0;
            endQuiz();
        }
    }
    // adds one to questions array to go next
    currentIndex++;
    // goes to next if less than length of array or ends quiz
    if (currentIndex < questionsArray.length) {
        renderQuestion();
    } else {
        endQuiz();
    }
}
// function to end the quiz and go to screen to type in initials
function endQuiz() {
    clearInterval(intervalId);
    quizScreen.classList = "hidden";
    endScreen.classList = "visible";
    finalScoreEl.textContent = correctAnswers;
    timeLeftEl.textContent = timeLeft;
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        highScores.push(
            {
                initials: initialsInput.value,
                score: correctAnswers
            }
        );
        displayHighScores();
    }
}
// function to show the high scores submitted from highest to lowest
function displayHighScores() {
    highScores.sort((a, b) => b.score - a.score);
    highScoresList.innerHTML = "";
    highScores.forEach((score, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
        highScoresList.appendChild(listItem);
    });
}
// starts quiz when start button is clicked
startButton.addEventListener("click", function () {
    startScreen.classList = "hidden";
    quizScreen.classList = "visible";
    startTimer();
    renderQuestion();
})
// listeners for the choice buttons
choice1El.addEventListener("click", checkAnswer);
choice2El.addEventListener("click", checkAnswer);
choice3El.addEventListener("click", checkAnswer);
choice4El.addEventListener("click", checkAnswer);
// takes you straight to high scores screen when clicked
viewHighScoresButton.addEventListener("click", function () {
    startScreen.classList = "hidden";
    quizScreen.classList = "hidden";
    endScreen.classList = "hidden";
    highScoresScreen.classList = "visible";
    clearInterval(intervalId);
    timeLeftEl.textContent = 0;
})
// takes you back to the start of the quiz and resets clock to 60, resets score and resets questions array to 0
backToStartButton.addEventListener("click", function () {
    highScoresScreen.classList = "hidden";
    startScreen.classList = "visible";
    timeLeftEl.textContent = 60;
    correctAnswers = 0;
    currentIndex = 0;
})
// listener for submit button to store initials and push input value into high scores
submitButton.addEventListener("click", function () {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        highScores.push({
            initials,
            score: correctAnswers
        });
        displayHighScores();
        highScoresScreen.classList = "visible";
        endScreen.classList = "hidden";
        startScreen.classList = "hidden";
        timeLeft = 60;
        correctAnswers = 0;
        currentIndex = 0;
        initialsInput.value = "";
    } else {
        alert("Please enter your initials.");

    }
});
// listener for button that clears all high scores saved on high scores screen
clearScoresButton.addEventListener("click", function () {
    highScoresList.innerHTML = "";
    highScores = [];
})