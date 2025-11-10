const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Which language runs in a browser?",
        answers: ["Java", "C", "Python", "JavaScript"],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        answers: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Colorful Style Sheets"],
        correct: 1
    },
    {
        question: "HTML stands for?",
        answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Main Language"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let timer; // برای تایمر
let timeLeft = 10;
const results = []; // ذخیره ریزالت‌ها

const questionEl = document.getElementById('question');
const buttons = document.querySelectorAll('.answer-btn');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');

// اضافه کردن نمایش تایمر روی صفحه
const timerEl = document.createElement('div');
timerEl.id = 'timer';
timerEl.style.margin = '10px 0';
timerEl.style.fontWeight = 'bold';
document.querySelector('.quiz-container').insertBefore(timerEl, resultEl);

function startTimer() {
    timeLeft = 10;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    // وقتی تایمر تموم شد، سوال را بدون جواب علامت می‌زنیم
    const q = questions[currentQuestion];
    const res = {question: q.question, selected: null, correct: false, timeout: true};
    results.push(res);
    resultEl.textContent = `⏰ Time's up! Correct answer: ${q.answers[q.correct]}`;
    buttons.forEach(b => b.disabled = true);
}

function loadQuestion() {
    clearInterval(timer);
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    buttons.forEach((btn, index) => {
        btn.textContent = q.answers[index];
        btn.disabled = false;
        btn.style.background = "#444";
    });
    resultEl.textContent = '';
    startTimer();
}

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        clearInterval(timer);
        const q = questions[currentQuestion];
        let res;
        if(index === q.correct){
            resultEl.textContent = '✅ Correct!';
            btn.style.background = "#28a745";
            score++;
            res = {question: q.question, selected: q.answers[index], correct: true, timeout: false};
        } else {
            resultEl.textContent = `❌ Wrong! Correct: ${q.answers[q.correct]}`;
            btn.style.background = "#dc3545";
            buttons[q.correct].style.background = "#28a745";
            res = {question: q.question, selected: q.answers[index], correct: false, timeout: false};
        }
        results.push(res);
        buttons.forEach(b => b.disabled = true);
        console.log("Current Results:", results);
    });
});

nextBtn.addEventListener('click', () => {
    clearInterval(timer);
    currentQuestion++;
    if(currentQuestion < questions.length){
        loadQuestion();
    } else {
        questionEl.textContent = `🎉 Quiz finished! Your score: ${score}/${questions.length}`;
        buttons.forEach(b => b.style.display = 'none');
        nextBtn.style.display = 'none';
        resultEl.textContent = '';
        timerEl.textContent = '';
        console.log("Final Results:", results);
    }
});

// بارگذاری اولین سوال
loadQuestion();