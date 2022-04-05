const alpha = "abcdefghijklmnopqrstuvwxyz"

let answer;  // global declaration
let problemID; // global declaration
let problemSelect; // global declaration
loadProblem(); // sets first problem on page load

function loadProblem() {
    let previousProblem = problemSelect;  // Prevents an immediate duplicate
    while (previousProblem === problemSelect){
    problemSelect = alpha.charAt(Math.floor(Math.random() * alpha.length));  // selects random alpha char
    };

    problemID = document.getElementById(problemSelect);  // alpha char matches html/css ID
    problemID.classList.add("active");  // presents the problem via css class display: flex
    answer = problemSelect;
}

// textBox event
let textBox = document.getElementById("textBox"); 
textBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        let text = e.target.value;
        checkAnswer(text, answer);
    }
});

// validates answer and initiates transition functions
function checkAnswer(text, answer) {
    if (text === answer) {
        transition();
        setTimeout(loadProblem, 1500);
    } else {
        alert("Try again.")
    }
}

// removes correct problem, shows a "Correct!" message for 1500ms, presents a new problem
function transition() {
    problemID.classList.remove("active");
    textBox.value = "";

    correct = document.getElementById("correct");
    correct.classList.add("correct");
    correct.classList.add("active");
    setTimeout(clear, 1500);
}

// clears the "Correct!" message after 1500ms
function clear() {
    correct.classList.remove("active");
}