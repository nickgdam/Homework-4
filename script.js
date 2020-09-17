var questions = [{
    title: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers",],
    answer: "Alerts"
},
{
    title: "The condition in an if / else statment is enclosed within ____.",
    choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    answer: "Parentheses"
},
{
    title: "Arrays in Javascript can be used to store ____.",
    choices: ["Numbers and Strings", "other arrays", "Booleans", "All of the above"],
    answer: "All of the above",
},
{
    title: "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["Commas", "Curly Bracets", "Quotes", "Parentheses"],
    answer: "Quotes",
},
{
    title: "A very useful tool used during developement and debugging for printing content to the debugger is:",
    choices: ["Javascript", "Terminal", "For loops", "Console.log"],
    answer: "Console.log"
}
]

//setting variables;
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;



//starts timeclock upon click of start button;
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;
timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //ends game if timer reachers zero;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<input type="text" id="name" placeholder="First name"> 
<button class="btn btn-primary" style='border-radius: 100px' onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}



//stores highscore to local storage;
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}

// shows high score page;
function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName", " ") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore", " ") + `</h1><br> 

<button class="btn btn-primary" style='border-radius: 100px; margin: 5px' onclick="clearScore()">Clear score!</button><button class="btn btn-primary" style='border-radius: 100px' onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears scores out of local storage;
function clearScore() {
localStorage.setItem("highscore", " ");
localStorage.setItem("highscoreName", " ");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;

currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    JavaScript Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button class="btn btn-primary" style='border-radius: 100px' onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//-10 seconds if incorrect answer is chosen;
function incorrect() {
timeLeft -= 10; 
next();
}

//+20 points if correct answer is chosen;
function correct() {
score += 20;
next();
}

//loops through the questions;
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button style='border-radius: 100px; margin: 5px' class='btn btn-primary' onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
        
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}