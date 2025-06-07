// Game variables
let gameSequence = [];
let playerSequence = [];
let level = 0;
let isPlayerTurn = false;
let gameStarted = false;

let backgroundMusic;

let playerTimer;
let countdownInterval;

// Get all the buttons
let redButton = document.getElementById('red');
let blueButton = document.getElementById('blue');
let greenButton = document.getElementById('green');
let yellowButton = document.getElementById('yellow');

// Add click listeners to each button

//RED
redButton.addEventListener('click', function() {
    if (isPlayerTurn) {
        playerClick('red');
    }
});

redButton.addEventListener('click', function() {
    const audio = new Audio('bruh.mp3');
    audio.play();
});

//BLUE
blueButton.addEventListener('click', function() {
    if (isPlayerTurn) {
        playerClick('blue');
    }
});

blueButton.addEventListener('click', function() {
    const audio = new Audio('yeet.mp3');
    audio.play();
});

//GREEN
greenButton.addEventListener('click', function() {
    if (isPlayerTurn) {
        playerClick('green');
    }
});

greenButton.addEventListener('click', function() {
    const audio = new Audio('got-eem2.mp3');
    audio.play();
});

//YELLOW
yellowButton.addEventListener('click', function() {
    if (isPlayerTurn) {
        playerClick('yellow');
    }
});

yellowButton.addEventListener('click', function() {
    const audio = new Audio('perfect.mp3');
    audio.play();
});


// Start the game
function startGame() {

    // Stop pulsing and disable both buttons during gameplay
    document.querySelector('.startButton').classList.remove('pulse');
    document.querySelector('.startButton').disabled = true;
    document.querySelector('.resetButton').disabled = true;

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

    if (backgroundMusic) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    }

    // Stop reset pulsing, disable reset, enable and pulse start
    document.querySelector('.resetButton').classList.remove('pulse');
    document.querySelector('.resetButton').disabled = true;
    document.querySelector('.startButton').disabled = false;
    document.querySelector('.startButton').classList.add('pulse');

    // Clear timers
    clearTimeout(playerTimer);
    clearInterval(countdownInterval);
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

            // Start 2 second grace period, then countdown
            playerTimer = setTimeout (startPlayerCountdown, 2000); 
        }
    }
    
    showNextColor();
}


// Flash a button AND play the meme sound
function flashButton(color) {
    let button = document.getElementById(color);
    button.classList.add('flash');

    let audio;

    if (color === 'red') {
        audio = new Audio('bruh.mp3');
    } else if (color === 'blue') {
        audio = new Audio('yeet.mp3');
    } else if (color === 'green') {
        audio = new Audio('got-eem2.mp3');
    } else if (color === 'yellow') {
        audio = new Audio('perfect.mp3');
    } 

    if (audio) {
        audio.play();
    }
    
    setTimeout(function() {
        button.classList.remove('flash');
    }, 300);
}

// Handle player button click
function playerClick(color) {
    
    // Clear any active timers
    clearTimeout(playerTimer);
    clearInterval(countdownInterval);
    updateScore(); // Reset score display

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

    // Enable reset button and make it pulse, keep start disabled
    document.querySelector('.resetButton').disabled = false;
    document.querySelector('.resetButton').classList.add('pulse');
    document.querySelector('.startButton').disabled = true;
    

    //Stop background music
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }

    // Play game over sound
    setTimeout(function() {
        const gameOverAudio = new Audio('spongebob.mp3');
        gameOverAudio.play();
    }, 900);
    
    // Flash background red quickly
    setTimeout(function() {
        document.body.style.backgroundColor = '#FFB3BA'; //light red
        setTimeout(function() {
            document.body.style.backgroundColor = '#eceff8'; //original background color
        }, 400);
    }, 100);

    // Clear timers
    clearTimeout(playerTimer);
    clearInterval(countdownInterval);

    document.getElementById('score').textContent = 'Oops... try again!';

}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = 'Level: ' + level;
}


// Splash screens / loading screens
window.addEventListener('load', function() {
    // Show a button on the splash screen for user interaction
    const splashScreen = document.getElementById('splash-screen');
    const button = document.createElement('button');
    button.textContent = 'Enable sound for best experience!';
    button.style.position = 'absolute';
    button.style.bottom = '20%';
    button.style.left = '50%';
    button.style.transform = 'translateX(-50%)';
    button.style.padding = '15px 30px';
    button.style.fontSize = '18px';
    splashScreen.appendChild(button);


    button.addEventListener('click', function() {
        // Play audio
        const audio = new Audio('heavenly-music.mp3');
        audio.play();
        
        // Start animation
        document.getElementById('simon-title').style.animation = 'titleAnimation 4s ease-in-out forwards';
        
        // Remove button
        button.remove();
        
        // After 3 seconds, hide splash and show menu
        setTimeout(function() {
            document.getElementById('splash-screen').classList.add('hidden');
            document.getElementById('menu-screen').classList.remove('hidden');

            const audio = new Audio('ahh-fade.mp3');
            audio.play();
        }, 4000);
    });

});


// MENU SCREEN
const instructionsBtn = document.querySelector('.menu-btn[onclick="showInstructions()"]');
const enterGameBtn = document.querySelector('.menu-btn[onclick="enterGame()"]');

// Add hover sound to Instructions button
instructionsBtn.addEventListener('mouseenter', function() {
    const hoverAudio = new Audio('vine-boom.mp3');
    hoverAudio.play();
});

// Add hover sound to Enter Game button  
enterGameBtn.addEventListener('mouseenter', function() {
    const hoverAudio = new Audio('vine-boom.mp3');
    hoverAudio.play();
});


//show instructions
function showInstructions() {

    const modalAudio = new Audio('taco-bell.mp3');
    modalAudio.play();

    const modal = new bootstrap.Modal(document.getElementById('instructionsModal'));
    modal.show();
}

//enter game
function enterGame() {

    const menuScreen = document.getElementById('menu-screen');
    const gameScreen = document.getElementById('game-screen');

    
    setTimeout(function() {
        
        // Glitch clip
        const videoElement = document.createElement('video');
        videoElement.src = 'glitch-video-edit.mp4';
        videoElement.style.position = 'fixed';
        videoElement.style.top = '0';
        videoElement.style.left = '0';
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.zIndex = '1001';
        videoElement.autoplay = true;
        videoElement.muted = false;
        
        document.body.appendChild(videoElement);

        menuScreen.classList.add("fade-out");

        setTimeout(function() {
            menuScreen.classList.add('hidden');
        }, 500);
        
        videoElement.addEventListener('ended', function() {
            videoElement.remove();
            gameScreen.classList.remove('hidden');
            gameScreen.classList.add('show');
        });

        setTimeout(function() {
            backgroundMusic = new Audio('wii-shop-quiet.mp3');
            backgroundMusic.loop = true;
            backgroundMusic.play();
        }, 3000);
        
    }, 500);

    // When game first loads - start button pulses, reset is disabled
    setTimeout(function() {
        document.querySelector('.startButton').classList.add('pulse');
        document.querySelector('.resetButton').disabled = true;
    }, 500);
}



//  Player countdown functionality
function startPlayerCountdown() {
    let countdown = 3;
    document.getElementById('score').textContent = `Choose in ${countdown}`;
    
    countdownInterval = setInterval(function() {
        countdown--;
        if (countdown > 0) {
            document.getElementById('score').textContent = `Choose in ${countdown}`;
        } else {
            clearInterval(countdownInterval);

            const timeoutAudio = new Audio('bonk.mp3');
            timeoutAudio.play();

            gameOver();
        }
    }, 1000);
}