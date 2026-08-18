/* ========================================
   STARS
   ======================================== */
function createStars() {
    const starsEl = document.getElementById('stars');
    if (!starsEl) return;
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
        star.style.setProperty('--opacity', (0.3 + Math.random() * 0.7));
        star.style.animationDelay = Math.random() * 4 + 's';
        starsEl.appendChild(star);
    }
}

/* ========================================
   NAVBAR
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
        });
        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => links.classList.remove('active'));
        });
    }

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
}

/* ========================================
   FADE-IN ON SCROLL
   ======================================== */
function initFadeIn() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ========================================
   FLOATING HEARTS ON CLICK
   ======================================== */
function initHearts() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;

    document.addEventListener('click', (e) => {
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart-particle';
            heart.textContent = ['❤️', '💕', '💖', '💜', '✨'][Math.floor(Math.random() * 5)];
            heart.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
            heart.style.top = (e.clientY + (Math.random() - 0.5) * 20) + 'px';
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }
    });
}

/* ========================================
   QUIZ
   ======================================== */
const quizData = [
    {
        question: 'Что делает человека по-настоящему особенным?',
        options: ['Внешность', 'Доброта и искренность', 'Богатство', 'Знания'],
        correct: 1
    },
    {
        question: 'Какой суперсилой обладает тот, кто умеет слушать?',
        options: ['Умение летать', 'Умение делать людей счастливыми', 'Умение быть невидимым', 'Умение читать мысли'],
        correct: 1
    },
    {
        question: 'Что важнее всего в общении?',
        options: ['Говорить громче всех', 'Искренность и внимание', 'Всегда быть правым', 'Молчать'],
        correct: 1
    },
    {
        question: 'Как лучше поддержать человека?',
        options: ['Сказать "не переживай"', 'Быть рядом и выслушать', 'Отвлечь его', 'Ничего не делать'],
        correct: 1
    },
    {
        question: 'Что делает мир лучше?',
        options: ['Технологии', 'Деньги', 'Доброта людей', 'Случайности'],
        correct: 2
    }
];

let currentQuestion = 0;
let quizScore = 0;

function loadQuiz() {
    const questionText = document.getElementById('quizQuestionText');
    const optionsContainer = document.getElementById('quizOptions');
    const progressBar = document.getElementById('quizProgressBar');
    const progressText = document.getElementById('quizProgressText');

    if (!questionText || !optionsContainer) return;

    if (currentQuestion >= quizData.length) {
        showResult();
        return;
    }

    const q = quizData[currentQuestion];
    questionText.textContent = q.question;
    progressBar.style.width = ((currentQuestion + 1) / quizData.length * 100) + '%';
    progressText.textContent = (currentQuestion + 1) + ' / ' + quizData.length;

    optionsContainer.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectAnswer(idx, btn));
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(idx, btn) {
    const q = quizData[currentQuestion];
    document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    setTimeout(() => {
        if (idx === q.correct) quizScore++;
        currentQuestion++;
        loadQuiz();
    }, 400);
}

function showResult() {
    const container = document.getElementById('quizContainer');
    const result = document.getElementById('quizResult');
    const title = document.getElementById('quizResultTitle');
    const text = document.getElementById('quizResultText');

    if (!container || !result) return;

    container.style.display = 'none';
    result.style.display = 'block';
    result.classList.add('fade-in', 'visible');

    const messages = [
        { min: 0, title: 'Юл, попробуй ещё раз! 😊', text: 'Ничего, ты一定能 проще! Важен сам процесс ❤️' },
        { min: 3, title: 'Юл, ты молодец! ✨', text: 'Ты хорошо знаешь то, что важно для сердца.' },
        { min: 4, title: 'Юл, ты прошла испытание! 🌟', text: 'Почти идеально! Ты замечательная.' },
        { min: 5, title: 'Юл, ты лучшая! 👑❤️', text: 'Безупречно! Ты знаешь самое важное — доброта делает мир лучше.' }
    ];

    const msg = [...messages].reverse().find(m => quizScore >= m.min);
    title.textContent = msg.title;
    text.textContent = msg.text;
}

function restartQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    const container = document.getElementById('quizContainer');
    const result = document.getElementById('quizResult');
    if (container) container.style.display = 'block';
    if (result) result.style.display = 'none';
    loadQuiz();
}

/* ========================================
   MUSIC TOGGLE
   ======================================== */
function initMusic() {
    const btn = document.getElementById('musicBtn');
    if (!btn) return;

    let audio = null;

    btn.addEventListener('click', () => {
        if (!audio) {
            audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
            audio.loop = true;
        }

        if (audio.paused) {
            audio.play().catch(() => {});
            btn.classList.add('playing');
            btn.textContent = '🎵';
        } else {
            audio.pause();
            btn.classList.remove('playing');
            btn.textContent = '🎵';
        }
    });
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initNavbar();
    initFadeIn();
    initHearts();
    loadQuiz();
    initMusic();
});
