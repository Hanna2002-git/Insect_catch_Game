// Selecting Elements
const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
const finalScoreEl = document.getElementById('final-score');

// Game Variables
let timeLimit = 20; // Countdown starts from 20 seconds
let seconds = 0;
let score = 0;
let selected_insect = {};
let timeInterval;
let gameOver = false; // To control game ending state

// Start Game Button (First Screen)
start_btn.addEventListener('click', () => screens[0].classList.add('up'));

// Choosing an Insect (Second Screen)
choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});

// Start the Game: Timer and Score System
function startGame() {
    timeInterval = setInterval(decreaseTime, 1000); // Countdown
}

// Countdown Timer
function decreaseTime() {
    timeLimit--; // Decrease by 1 second
    updateTimeDisplay();

    // End Game When Time Reaches 0
    if (timeLimit === 0) {
        endGame();
    }
}

// Display the Timer
function updateTimeDisplay() {
    timeEl.innerHTML = `Time: ${timeLimit}`; // Display countdown timer
}

// Create Insect Element
function createInsect() {
    if (gameOver) return; // Stop creating insects when the game ends
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

    insect.addEventListener('click', catchInsect);
    game_container.appendChild(insect);
}

// Get Random Location for the Insect
function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

// Catch Insect
function catchInsect() {
    if (gameOver) return; // Stop scoring after the game ends
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addInsects();
}

// Add More Insects to the Game
function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

// Increase Score
function increaseScore() {
    score++;
    scoreEl.innerHTML = `Score: ${score}`;
}

// End the Game and Display Final Score
function endGame() {
    gameOver = true; // Set game over state
    clearInterval(timeInterval); // Stop the timer
    message.classList.add('visible');
    finalScoreEl.innerHTML = score; // Display final score
}

// Restart the game
function restartGame() {
    location.reload();
}
