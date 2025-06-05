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
    if (gameStarted) {
        return;
    } else {
        gameStarted = true;
        gameSequence = [];
        level = 0;
        nextLevel();
    }
}

// Reset the game
function resetGame() {
    gameStarted = false;
    isPlayerTurn = false;
    gameSequence = [];
    playerSequence = [];
    level = 0;
    updateScore();
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

    // Show the sequence after a short delay
    setTimeout(showSequence, 200);
    
}

// Show the game sequence
function showSequence() {
    let i = 0; //like a pointer finger... going to start by pointing at "color 0"
    
    function showNextColor() {
        if (i < gameSequence.length) {
            flashButton(gameSequence[i]);
            i = i + 1;
            setTimeout(showNextColor, 800);
        } else {
            // Sequence is done, player's turn
            isPlayerTurn = true;
        }
    }
    
    showNextColor();
}

// 6/5/25

// THIS IS WHERE WE FINISHED YESTERDAY--- GET CLEAR ON PLACEHOLDER (COLOR) SITUATION

// i think we feel mostly good... we need to walk through flashButton(), playerClick(), and the splash screen / menu screen stuff for real

// NEED TO ADD THE SFX!!

// Flash a button
function flashButton(color) {
    let button = document.getElementById(color);
    button.classList.add('flash');
    
    setTimeout(function() {
        button.classList.remove('flash');
    }, 300);
}

// Handle player button click
function playerClick(color) {
    flashButton(color);
    playerSequence.push(color);
    
    // Check if player got it right so far
    let currentIndex = playerSequence.length - 1;
    
    if (playerSequence[currentIndex] !== gameSequence[currentIndex]) {
        // Wrong... Game over
        gameOver();
        return;
    }
    
    // Check if player finished the sequence
    if (playerSequence.length === gameSequence.length) {
        // Player got the whole sequence right
        isPlayerTurn = false;
        
        setTimeout(function() {
            nextLevel();
        }, 600);
    }
}

// Game over
function gameOver() {
    gameStarted = false;
    isPlayerTurn = false;
    
    // Flash background red quickly
    setTimeout(function() {
        document.body.style.backgroundColor = '#FFB3BA';
        setTimeout(function() {
            document.body.style.backgroundColor = '#eceff8';
        }, 400);
    }, 100);
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = 'Level: ' + level;
}


// Splash screens / loading screens

// Splash screen functionality
window.addEventListener('load', function() {
    // After 3 seconds, hide splash and show menu
    setTimeout(function() {
        document.getElementById('splash-screen').classList.add('hidden');
        document.getElementById('menu-screen').classList.remove('hidden');
    }, 3000);
});

function showInstructions() {
    const modal = new bootstrap.Modal(document.getElementById('instructionsModal'));
    modal.show();
}

function enterGame() {
    const menuScreen = document.getElementById('menu-screen');
    const gameScreen = document.getElementById('game-screen');
    
    // Fade out menu first
    menuScreen.classList.add('fade-out');
    
    setTimeout(function() {
        // Hide menu and show game
        menuScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        // Small delay then ease in the game
        setTimeout(function() {
            gameScreen.classList.add('show');
        }, 50);
    }, 500);
}


// sound effects

function play() {
    let audio = document.getElementById("audio");
    audio.play();
}