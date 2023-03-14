// global constants used as problem IDs and answers
const upperAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  // problem set 1
const lowerAlpha = "abcdefghijklmnopqrstuvwxyz";  // problem set 2
const countEmoji = ["L2", "L4", "L8", "B3", "B5", "B7", "B9"];  // problem set 3
const spell = ["cat", "dog", "cow", "pig", "snake", "bear", "lion", "tiger", "frog", "ear", "nose", "mouth", "bee", "ant" ] // problem set 5

// global variables to be used between functions
let answer;  // user answer
let problemID;  // problem selection from HTML
let problemSelect;  // select a new problem per iteration
let totalCorrect = 0;  // total correct answers tally
let set2 = 0; // correct tally of problem set 2
let set3 = 0; // correct tally of problem set 3
let set4 = 0;  // correct tally of problem set 4
let set5 = 0; // correct tally of problem set 5

window.onload = loadProblem();  // sets first problem on page load

// functions and events:

function loadProblem() {
    let previousProblem = problemSelect;  // Prevents an immediate duplicate

    // Select problem type (alpha letters, lowercase letters, or counting)
    while ( previousProblem === problemSelect ) {  // this loop prevents a duplicate

        if ( totalCorrect < 20 )
            // problem set 1 using upperAlpha const
            problemSelect = upperAlpha.charAt(Math.floor(Math.random() * upperAlpha.length));  // selects random alpha char

        else if ( totalCorrect < 40 ) 
            // problem set 2 using lowerAlpha const
            problemSelect = lowerAlpha.charAt(Math.floor(Math.random() * lowerAlpha.length));  // selects random lower char

        else if ( totalCorrect < 60 ) 
            // problem set 3 using countEmoji array
            problemSelect = countEmoji[Math.floor(Math.random() * countEmoji.length)];  // selects random count emoji

        else if ( totalCorrect < 80 )
            // problem set 4 using numbers
            problemSelect = String(Math.floor(Math.random() * ( 11 - 2 ) + 2));  // selects random string number between 2 and 10

        else 
            // problem set 5 using spell array
            problemSelect = spell[Math.floor(Math.random() * spell.length)];  // selects random word to spell
    };

    problemID = document.getElementById(problemSelect);  // alpha char matches html/css ID
    problemID.classList.add("active");  // presents the problem via css class display: flex

    // get answer
    if ( totalCorrect < 40  || totalCorrect >= 60 )
        // for problem sets 1, 2, 4 and 5 the answer is problemSelect
        answer = problemSelect;  
    else if ( totalCorrect >= 40 && totalCorrect < 60 )
        // for problem set 3 the answer is the second char in problemSelect (ex: "L4" - 4 is the answer)
        answer = problemSelect[1];  
};


// textBox event
const TEXTBOX = document.getElementById("textBox"); 
TEXTBOX.addEventListener("keydown", function (event) {
    if ( event.key === "Enter" ) {
        let text = event.target.value;
        checkAnswer(text, answer);
    }
});


// validates answer and initiates transition functions
function checkAnswer(text, answer) {

    // apply case insensitivty
    if ( totalCorrect < 20 )
        text = text.toUpperCase();
    else if ( totalCorrect < 40 )
        text = text.toLowerCase();

    if ( text === answer ) {
        totalCorrect++;
        transition();
        setTimeout(loadProblem, 500);  // 500ms must match setTimeout() in transition() function

    } else {
        TEXTBOX.value = "";
    }
};


// removes correct problem, shows a "Correct!" message for 500ms, presents a new problem
function transition() {
    problemID.classList.remove("active");
    TEXTBOX.value = "";

    footboxGreen();  // paints a footbox green after a correct answer

    correct = document.getElementById("correct");
    correct.classList.add("correct");
    correct.classList.add("active");
    setTimeout(clear, 500);
};


// clears the "Correct!" message after 500ms
function clear() {
    correct.classList.remove("active");
};


// paints a footbox green after a correct answer
function footboxGreen() {

    if ( totalCorrect < 20 ) {
        // Tally for problem set 1
        let footBox = document.getElementById("box" + totalCorrect);
        footBox.classList.add("footBoxCorrect");

    } else if ( totalCorrect === 20 || totalCorrect === 40 || totalCorrect === 60 || totalCorrect === 80 ) {
        // Reset tally for next problem set @ 20, 40, 60, etc.
        for ( let i = 1; i <= 20; i++ ) {
            let footBox = document.getElementById("box" + i);
            footBox.classList.remove("footBoxCorrect");
        }

    } else if ( totalCorrect < 40 ) {
        // Tally for problem set 2
        set2 += 1;
        let footBox = document.getElementById("box" + set2);
        footBox.classList.add("footBoxCorrect");
        
    } else if ( totalCorrect < 60 ) {
        // Tally for problem set 3
        set3 += 1;
        let footBox = document.getElementById("box" + set3);
        footBox.classList.add("footBoxCorrect");

    } else if ( totalCorrect < 80 ) {
        // Tally for problem set 4
        set4 += 1;
        let footBox = document.getElementById("box" + set4);
        footBox.classList.add("footBoxCorrect");
    } else {
        // Tally for problem set 5
        set5 += 1;
        let footBox = document.getElementById("box" + set5);
        footBox.classList.add("footBoxCorrect");
    }
};