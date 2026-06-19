let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const questionNumberEl = document.getElementById("questionNumber");
const scoreEl = document.getElementById("score");

const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const btnC = document.getElementById("btnC");
const btnD = document.getElementById("btnD");

let questions = [];

fetch("questions.json")
.then(res => res.json())
.then(data => {
    questions = data;
    loadQuestion();
});

function loadQuestion() {

    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    let q = questions[currentQuestion];

    questionEl.innerText = q.question;

    questionNumberEl.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;

    btnA.innerText = "A. " + q.options[0];
    btnB.innerText = "B. " + q.options[1];
    btnC.innerText = "C. " + q.options[2];
    btnD.innerText = "D. " + q.options[3];

    btnA.onclick = () => checkAnswer(0);
    btnB.onclick = () => checkAnswer(1);
    btnC.onclick = () => checkAnswer(2);
    btnD.onclick = () => checkAnswer(3);
}

function checkAnswer(selected) {

    let correct = questions[currentQuestion].answer;

    if (selected === correct) {
        score += 10;
        alert("🎉 Correct! +10 Score");
    } else {
        alert("❌ Wrong Answer!");
    }

    scoreEl.innerText = "⭐ Score : " + score;

    currentQuestion++;
    loadQuestion();
}

function showResult() {
    questionEl.innerHTML = `
        🎉 Quiz Completed!<br><br>
        Final Score: ${score}
    `;

    questionNumberEl.innerText = "Finished";

    btnA.style.display = "none";
    btnB.style.display = "none";
    btnC.style.display = "none";
    btnD.style.display = "none";
}