// Setting up game controls
let gameSeq = [];
let userSeq = [];
let buttons = ["btn1", "btn2", "btn3", "btn4"];
let h3 = document.querySelector("h3");

// Setting up sound effects
const userSelect = new Audio("assets/sounds/countdown.mp3");
const systemSelect = new Audio("assets/sounds/select.mp3");
const gameOver = new Audio("assets/sounds/over.mp3");

// Setting up level configs
let started = false;
let level = 0;
let gameOverState = false; // Flag to check if game is over

// Function to Play Sound
function playSound(soundName) {
	switch (soundName) {
		case "userSelect":
			userSelect.currentTime = 0; // Reset playback position
			userSelect.play();
			break;
		case "systemSelect":
			systemSelect.currentTime = 0;
			systemSelect.play();
			break;
		case "gameOver":
			systemSelect.currentTime = 0;
			systemSelect.play();
			break;
		default:
			break;
	}
}

// Function to check if the user is on a mobile device
function isMobileDevice() {
	return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
}

// Start game by pressing Enter key.
document.addEventListener("keypress", function (event) {
	if (event.key == "Enter" && !gameOverState) {
		// Check if the game is not over
		if (started == false) {
			started = true;
			setTimeout(levelUp, 300);
		}
	}
});

// Add click event for mobile devices only if the game is not over
if (isMobileDevice()) {
	document.addEventListener("click", function () {
		if (started == false && !gameOverState) {
			// Ensure game hasn't ended
			started = true;
			setTimeout(levelUp, 300);
		}
	});
}

// Flashing button
function btnFlash(btn) {
	btn.classList.add("flash");
	setTimeout(function () {
		btn.classList.remove("flash");
	}, 300);
}

// Levelup
function levelUp() {
	userSeq = [];
	level++;
	h3.innerText = `Level ${level}`;

	let randomButton = randomBtnIndex();
	btnFlash(randomButton);
	playSound("systemSelect");
}

// Selecting random button for system selection
function randomBtnIndex() {
	let randomIndexNumber = Math.floor(Math.random() * 4);
	let randomBtnId = buttons[randomIndexNumber];
	gameSeq.push(randomBtnId);
	let randomSelectedButton = document.querySelector(`#${randomBtnId}`);
	return randomSelectedButton;
}

// Checking user sequence with game sequence
function checkSeq(levelIndex) {
	if (userSeq[levelIndex] === gameSeq[levelIndex]) {
		if (userSeq.length == gameSeq.length) {
			setTimeout(levelUp, 1300);
		}
	} else {
		h3.innerHTML = `Game over! Your score was <b>${level - 1}</b>`;
		playSound("gameOver");
		gameOverState = true; // Set game over state

		// Start countdown before resetting the game
		countdownBeforeReset(4);
	}
}

// Countdown logic before resetting the game
function countdownBeforeReset(seconds) {
	let countdown = seconds;

	let countdownInterval = setInterval(() => {
		if (countdown > 0) {
			h3.innerHTML = `Restarting game in ${countdown}...`;
			countdown--;
		} else {
			clearInterval(countdownInterval);
			resetGame(); // Reset after countdown ends
		}
	}, 2000);
}

// Button Press
function buttonPress() {
	if (started != true) {
		return 0;
	}
	let btn = this;
	let userSelectedButton = btn.getAttribute("id");
	userSeq.push(userSelectedButton);
	btnFlash(btn);
	playSound("userSelect");
	checkSeq(userSeq.length - 1);
}

// Adding event listener for all buttons
let allButtons = document.querySelectorAll(".btn");
for (btn of allButtons) {
	btn.addEventListener("click", buttonPress);
}

// Resetting Game and User Sequence and Environment
function resetGame() {
	started = false;
	gameSeq = [];
	userSeq = [];
	level = 0;
	gameOverState = false; // Reset the game over state
	h3.innerHTML = `Press "Enter" key or click to start the game.`;
}
