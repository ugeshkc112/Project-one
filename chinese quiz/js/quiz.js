// Quiz Elements
const question = document.getElementById('questions');
const buttons = document.querySelectorAll('.btn');
const nextBtn = document.getElementById('next');
const dialoge = document.querySelector('.dialoge');
const okayBtn = document.getElementById('OK');
const scoreMsg = document.getElementById('msg');
const progressBar = document.getElementById('progress');

// Quiz Questions
const QuizQn = [
    { q: "Which sentence is grammatically correct?", options: ["他是学生", "学生是他", "是他学生", "他学生是"], answer: 0 },
    { q: "What does 我有一本书 mean?", options: ["I have two books", "I don't have a book", "I have a book", "This is a book"], answer: 2 },
    { q: "Choose the best option. 你好吗？", options: ["谢谢", "我很好", "再见!", "不客气"], answer: 1 },
    { q: "What is the Chinese word for 'apple'?", options: ["香蕉 (xiāngjiāo)", "橘子(júzi)", "苹果 (píngguǒ)", "葡萄(pútao)"], answer: 2 },
    { q: "我____一个朋友. Complete the sentence", options: ["在", "和", "不", "有"], answer: 3 },
];

let score = 0;
let current = 0;
let answered = false;

// Display current question
function displayQn() {
    const qns = QuizQn[current];
    question.innerText = `${current + 1}. ${qns.q}`;
    
    buttons.forEach((btn, index) => {
        btn.innerText = qns.options[index];
        btn.className = 'btn';
    });
    
    updateProgress();
    answered = false;
}

// Handle answer selection
function handleAnswer(index) {
    if (answered) return;
    
    answered = true;
    const qns = QuizQn[current];
    
    if (index === qns.answer) {
        score++;
        buttons[index].classList.add('correct');
    } else {
        buttons[index].classList.add('wrong');
        buttons[qns.answer].classList.add('correct');
    }
}

// Update progress bar
function updateProgress() {
    const progress = ((current) / QuizQn.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Next question or show results
function nextQuestion() {
    if (!answered && current < QuizQn.length) {
        alert('Please select an answer!');
        return;
    }

    current++;
    
    if (current < QuizQn.length) {
        displayQn();
        if (current === QuizQn.length - 1) {
            nextBtn.innerText = 'Submit';
        }
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    dialoge.showModal();
    scoreMsg.textContent = `You scored ${score}/${QuizQn.length}`;
}

// Reset quiz
function resetQuiz() {
    current = 0;
    score = 0;
    nextBtn.innerText = 'Next';
    displayQn();
    dialoge.close();
}

// Event Listeners
buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => handleAnswer(index));
});

nextBtn.addEventListener('click', nextQuestion);
okayBtn.addEventListener('click', resetQuiz);

// Initialize quiz
displayQn();