const capAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerAlpha = "abcdefghijklmnopqrstuvwxyz";

let answer;  // global declaration
let problemID;  // global declaration
let problemSelect;  // global declaration
let totalCorrect = 0;  // global declaration for total correct answers tally
let set2 = 0; // global decleration for correct tally of problem set 2
loadProblem();  // sets first problem on page load


function loadProblem() {
    let previousProblem = problemSelect;  // Prevents an immediate duplicate

    // Select problem type (alpha letters or lowercase letters)
    while ( previousProblem === problemSelect ) {
        if ( totalCorrect < 20 ) {
            problemSelect = capAlpha.charAt(Math.floor(Math.random() * capAlpha.length));  // selects random alpha char
        } else {
            problemSelect = lowerAlpha.charAt(Math.floor(Math.random() * lowerAlpha.length));  // selects random lower char
        }
    };

    problemID = document.getElementById(problemSelect);  // alpha char matches html/css ID
    problemID.classList.add("active");  // presents the problem via css class display: flex
    answer = problemSelect;
};


// textBox event
let textBox = document.getElementById("textBox"); 
textBox.addEventListener("keydown", function (e) {
    if ( e.key === "Enter" ) {
        let text = e.target.value;
        checkAnswer(text, answer);
    }
});


// validates answer and initiates transition functions
function checkAnswer(text, answer) {
    if (text === answer) {
        totalCorrect += 1;
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

    footboxGreen();  // paints a footbox green after a correct answer

    correct = document.getElementById("correct");
    correct.classList.add("correct");
    correct.classList.add("active");
    setTimeout(clear, 1500);
}


// clears the "Correct!" message after 1500ms
function clear() {
    correct.classList.remove("active");
}


// paints a footbox green after a correct answer
function footboxGreen() {

    if ( totalCorrect < 20 ) {
        // Tally for problem set 1
        let footBox = document.getElementById("box" + totalCorrect);
        footBox.classList.add("footBoxCorrect");

    } else if ( totalCorrect === 20 ) {
        // Reset tally for next problem set
        for ( let i = 1; i <= 20; i++ ) {
            let footBox = document.getElementById("box" + i);
            footBox.classList.remove("footBoxCorrect");
        }

    } else {
        // Tally for problem set 2
        set2 += 1;
        let footBox = document.getElementById("box" + set2);
        footBox.classList.add("footBoxCorrect");
    }
};