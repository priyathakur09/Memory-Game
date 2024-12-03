const vegetables = [
    "flower1.jpg", "flower2.jpg", "flower3.jpg", "flower4.jpg", "flower5.jpg", "flower6.jpg",
    "flower7.jpg", "flower8.jpg", "flower9.jpg", "flower10.jpg", "flower11.jpg", "flower12.jpg",
     "flower1.jpg", "flower2.jpg", "flower3.jpg", "flower4.jpg", "flower5.jpg", "flower6.jpg",
    "flower7.jpg", "flower8.jpg", "flower9.jpg", "flower10.jpg", "flower11.jpg", "flower12.jpg"
];

const basePath = "images/"; // Path to your images folder

// Shuffle the vegetables array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let shuffledVegetables = shuffle([...vegetables]);
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Function to handle card flip
function flipCard(event) {
    if (lockBoard) return;

    const card = event.target;

    if (card === firstCard) return;

    const img = document.createElement("img");
    img.src = basePath + shuffledVegetables[card.dataset.index];
    img.alt = "Vegetable";

    card.appendChild(img);
    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkForMatch();
}

// Function to check for a match
function checkForMatch() {
    const firstImage = firstCard.querySelector("img").src;
    const secondImage = secondCard.querySelector("img").src;

    if (firstImage === secondImage) {
        disableCards();
        matchedPairs++;

        if (matchedPairs === vegetables.length / 2) {
            setTimeout(() => alert("Congratulations! You matched all the flowers!"), 500);
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

// Function to unflip cards
function unflipCards() {
    firstCard.innerHTML = ""; // Clear image
    secondCard.innerHTML = ""; // Clear image
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetBoard();
}

// Function to reset board after each turn
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to restart the game
function restartGame() {
    shuffledVegetables = shuffle([...vegetables]);
    matchedPairs = 0;

    const cards = document.querySelectorAll(".div1");

    cards.forEach((card, index) => {
        card.innerHTML = ""; // Clear any previous images
        card.classList.remove("flipped");
        card.addEventListener("click", flipCard);
        card.dataset.index = index; // Set the index to match the shuffled array
    });
}

// Initialize the game on page load
document.addEventListener("DOMContentLoaded", () => {
    restartGame();

    // Add event listener for the restart button
    const restartButton = document.querySelector('a[href="medium.html"]');
    if (restartButton) {
        restartButton.addEventListener("click", restartGame);
    }
});


























let timeLeft = 300; // Total time in seconds
let timerInterval;

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

// Function to handle game over
function endGame() {
    alert("Time's up! Game over.");
    restartGame(); // Optionally restart the game
}

// Call startTimer when the game begins
document.addEventListener("DOMContentLoaded", () => {
    startTimer();
    restartGame(); // Start the game as usual
});









function restartGame() {
    // Reset the timer
    clearInterval(timerInterval);
    timeLeft = 300; // Reset time
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


















