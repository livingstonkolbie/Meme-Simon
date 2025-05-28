// Game variables
let gameSequence = [];
let playerSequence = [];
let level = 0;
let isPlayerTurn = false;
let gameStarted = false;

// Get all the buttons
let redButton = document.getElementById('red');
let blueButton = document.getElementById('blue');
let greenButton = document.getElementById('green');
let yellowButton = document.getElementById('yellow');

// Add click listeners to each button
redButton.addEventListener('click', function() {
    if (isPlayerTurn) {
        playerClick('red');
    }
});

blueButton.addEventListener('click', function() {
    if (isPlayerTurn) {
        playerClick('blue');
    }
});

greenButton.addEventListener('click', function() {
    if (isPlayerTurn) {
        playerClick('green');
    }
});

yellowButton.addEventListener('click', function() {
    if (isPlayerTurn) {
        playerClick('yellow');
    }
});

// Start the game
function startGame() {
    if (gameStarted) return;
    
    gameStarted = true;
    gameSequence = [];
    level = 0;
    // updateMessage("Watch the sequence!");
    nextLevel();
}

// Reset the game
function resetGame() {
    gameStarted = false;
    isPlayerTurn = false;
    gameSequence = [];
    playerSequence = [];
    level = 0;
    updateScore();
    // updateMessage("Press Start to begin!");
}

// Go to next level
function nextLevel() {
    level = level + 1;
    playerSequence = [];
    isPlayerTurn = false;
    
    // Add random color to sequence
    let colors = ['red', 'blue', 'green', 'yellow'];
    let randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
    
    updateScore();
    // updateMessage("Level " + level + " - Watch!");
    
    // Show the sequence after a short delay
    setTimeout(function() {
        showSequence();
    }, 200);
}

// Show the game sequence
function showSequence() {
    let i = 0;
    
    function showNextColor() {
        if (i < gameSequence.length) {
            flashButton(gameSequence[i]);
            i = i + 1;
            setTimeout(showNextColor, 800);
        } else {
            // Sequence is done, player's turn
            isPlayerTurn = true;
            // updateMessage("Your turn! Repeat the sequence");
        }
    }
    
    showNextColor();
}

// Flash a button
function flashButton(color) {
    let button = document.getElementById(color);
    button.classList.add('flash');
    
    setTimeout(function() {
        button.classList.remove('flash');
    }, 400);
}

// Handle player button click
function playerClick(color) {
    flashButton(color);
    playerSequence.push(color);
    
    // Check if player got it right so far
    let currentIndex = playerSequence.length - 1;
    
    if (playerSequence[currentIndex] !== gameSequence[currentIndex]) {
        // Wrong! Game over
        gameOver();
        return;
    }
    
    // Check if player finished the sequence
    if (playerSequence.length === gameSequence.length) {
        // Player got the whole sequence right!
        isPlayerTurn = false;
        // updateMessage("Correct! Next level coming...");
        
        setTimeout(function() {
            nextLevel();
        }, 600);
    }
}

// Game over
function gameOver() {
    gameStarted = false;
    isPlayerTurn = false;
    // updateMessage("Game Over! Your score: " + level);
    
    // Flash all buttons red quickly
    setTimeout(function() {
        document.body.style.backgroundColor = '#ff0000';
        setTimeout(function() {
            document.body.style.backgroundColor = '#222';
        }, 200);
    }, 100);
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = 'Level: ' + level;
}

// Update message display
// function updateMessage(text) {
//     document.getElementById('message').textContent = text;
// }