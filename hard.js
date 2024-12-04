




// Array of vegetable images
const vegetables = [
    "wp1.jpg", "wp2.jpg", "wp3.jpg", "wp4.jpg", "wp5.jpg", "wp6.jpg",
    "wp7.jpg", "wp8.jpg", "wp9.jpg", "wp10.jpg", "wp11.jpg", "wp12.jpg",
    "wp13.jpg", "wp14.jpg", "wp15.jpg", "wp16.jpg", "wp17.jpg", "wp18.jpg",
    "wp19.jpg", "wp20.jpg",
    "wp1.jpg", "wp2.jpg", "wp3.jpg", "wp4.jpg", "wp5.jpg", "wp6.jpg",
    "wp7.jpg", "wp8.jpg", "wp9.jpg", "wp10.jpg", "wp11.jpg", "wp12.jpg",
    "wp13.jpg", "wp14.jpg", "wp15.jpg", "wp16.jpg", "wp17.jpg", "wp18.jpg",
    "wp19.jpg", "wp20.jpg"
];

// Folder path for images
const basePath = "images/";

// Variables for game logic
let shuffledVegetables = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Timer variables
let timeLeft = 380; // Total time in seconds
let timerInterval;

// Function to shuffle the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to start the timer
function startTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = timeLeft; // Display initial time

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            endGame(); // Trigger game over
        }
    }, 1000); // Update every second
}

// Function to handle card flip
function flipCard(event) {
    const card = event.currentTarget;

    if (lockBoard || card === firstCard || card.classList.contains("flipped")) {
        return;
    }

    // Add image to the card
    const img = document.createElement("img");
    img.src = basePath + shuffledVegetables[card.dataset.index];
    img.alt = "Vegetable";
    card.appendChild(img);
    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card; // Save the first card
        return;
    }

    secondCard = card; // Save the second card
    lockBoard = true;  // Lock the board to prevent further clicks

    checkForMatch();
}

// Function to check for a match
function checkForMatch() {
    const firstImage = firstCard.querySelector("img").src;
    const secondImage = secondCard.querySelector("img").src;

    if (firstImage === secondImage) {
        disableCards();
        matchedPairs++;

        // Check if the game is won
        if (matchedPairs === vegetables.length / 2) {
            clearInterval(timerInterval); // Stop the timer
            setTimeout(() => alert("Congratulations! You matched all pairs!"), 500);
        }

        resetBoard();
    } else {
        setTimeout(unflipCards, 1000);
    }
}

// Function to disable matched cards
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
}

// Function to unflip unmatched cards
function unflipCards() {
    firstCard.innerHTML = "";
    secondCard.innerHTML = "";
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetBoard();
}

// Function to reset board variables
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to handle game over
function endGame() {
    clearInterval(timerInterval); // Stop the timer
    alert("Time's up! Game over.");
    restartGame(); // Optionally restart the game
}

// Function to restart the game
function restartGame() {
    // Reset the timer
    clearInterval(timerInterval);
    timeLeft = 380; // Reset time
    startTimer(); // Start the timer again

    // Existing game reset logic
    shuffledVegetables = shuffle([...vegetables]);
    matchedPairs = 0;

    const cards = document.querySelectorAll(".div1");
    cards.forEach((card, index) => {
        card.innerHTML = ""; // Clear previous images
        card.classList.remove("flipped"); // Reset flipped state
        card.dataset.index = index; // Assign index for matching
        card.addEventListener("click", flipCard); // Add click event
    });
}

// Initialize the game on page load
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".div1");

    // Check if the grid matches the vegetable count
    if (cards.length !== vegetables.length) {
        console.error("Mismatch between the number of cards and images.");
        return;
    }

    restartGame(); // Initialize game

    // Add event listener to restart button
    const restartButton = document.querySelector('a[href="hard.html"]');
    if (restartButton) {
        restartButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent navigation
            restartGame();
        });
    }
});
