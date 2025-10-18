// Predefined text samples for different difficulty levels
const textSamples = {
    easy: [
        "The cat sat on the mat. It was a warm sunny day.",
        "Dogs like to play in the park. They run and jump with joy.",
        "Birds fly high in the blue sky. They sing sweet songs."
    ],
    medium: [
        "Technology has revolutionized the way we communicate and work. Social media platforms connect people across the globe instantly.",
        "Environmental conservation requires collective effort from individuals, communities, and governments to protect our planet for future generations.",
        "Learning new skills and adapting to change are essential qualities in today's rapidly evolving professional landscape."
    ],
    hard: [
        "Quantum mechanics fundamentally challenges our classical understanding of reality, introducing concepts like superposition and entanglement that defy intuitive comprehension.",
        "The philosophical implications of artificial intelligence raise profound questions about consciousness, free will, and the nature of human cognition in an increasingly automated world.",
        "Biodiversity loss represents one of the most critical environmental challenges of our time, requiring unprecedented international cooperation and innovative conservation strategies."
    ]
};

// Current text and difficulty
let currentDifficulty = 'easy';
let currentText = '';

// Timer variables
let startTime = null;
let endTime = null;

// Function to get random text based on difficulty
function getRandomText(difficulty) {
    const texts = textSamples[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

// Function to start the timer
function startTimer() {
    startTime = new Date().getTime();
    console.log('Timer started at:', startTime);
}

// Function to stop the timer
function stopTimer() {
    endTime = new Date().getTime();
    console.log('Timer stopped at:', endTime);
}

// Function to calculate and display the elapsed time
function calculateAndDisplayTime() {
    if (startTime && endTime) {
        const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
        const roundedTime = elapsedTime.toFixed(2); // Round to 2 decimal places
        
        document.getElementById('timeResult').textContent = roundedTime;
        console.log('Elapsed time:', roundedTime, 'seconds');
        
        return elapsedTime;
    }
    return 0;
}

// Function to count correctly typed words
function countCorrectWords(userText, sampleText) {
    const userWords = userText.trim().split(/\s+/);
    const sampleWords = sampleText.trim().split(/\s+/);
    
    let correctWords = 0;
    
    for (let i = 0; i < Math.min(userWords.length, sampleWords.length); i++) {
        if (userWords[i] === sampleWords[i]) {
            correctWords++;
        }
    }
    
    console.log('Correct words:', correctWords, 'out of', sampleWords.length);
    return correctWords;
}

// Function to calculate WPM (Words Per Minute)
function calculateWPM(correctWords, timeInSeconds) {
    if (timeInSeconds === 0) return 0;
    
    const timeInMinutes = timeInSeconds / 60;
    const wpm = correctWords / timeInMinutes;
    const roundedWPM = Math.round(wpm);
    
    console.log('WPM calculation:', correctWords, 'words /', timeInMinutes, 'minutes =', roundedWPM, 'WPM');
    return roundedWPM;
}

// Function to calculate and display WPM
function calculateAndDisplayWPM() {
    const userText = document.getElementById('typingInput').value;
    const correctWords = countCorrectWords(userText, currentText);
    const elapsedTime = calculateAndDisplayTime();
    
    const wpm = calculateWPM(correctWords, elapsedTime);
    document.getElementById('wpmResult').textContent = wpm;
    
    console.log('Final WPM:', wpm);
}

// Function to reset timer variables
function resetTimer() {
    startTime = null;
    endTime = null;
}

// Function to update the sample text display
function updateSampleText() {
    currentText = getRandomText(currentDifficulty);
    document.getElementById('sampleText').textContent = currentText;
    
    // Clear the typing input when text changes
    document.getElementById('typingInput').value = '';
    
    // Update the level result display
    document.getElementById('levelResult').textContent = currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1);
}

// Named function to handle difficulty change
function handleDifficultyChange(selectedDifficulty) {
    currentDifficulty = selectedDifficulty;
    updateSampleText();
}

// Named function to handle start button click
function handleStartButtonClick(startBtn, stopBtn, typingInput) {
    // Enable typing input and start test
    typingInput.disabled = false;
    typingInput.focus();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    // Start the timer
    startTimer();
    
    console.log('Test started with difficulty:', currentDifficulty);
}

// Named function to handle stop button click
function handleStopButtonClick(startBtn, stopBtn, typingInput) {
    // Disable typing input and stop test
    typingInput.disabled = true;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    // Stop the timer and calculate WPM
    stopTimer();
    calculateAndDisplayWPM();
    
    console.log('Test stopped');
}

// Named function to handle retry button click
function handleRetryButtonClick(startBtn, stopBtn, typingInput) {
    // Reset the test
    updateSampleText();
    typingInput.disabled = true;
    typingInput.value = '';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    // Reset timer and results
    resetTimer();
    document.getElementById('timeResult').textContent = '0';
    document.getElementById('wpmResult').textContent = '0';
    
    console.log('Test reset');
}

// Event listener for difficulty selection
document.addEventListener('DOMContentLoaded', function() {
    const difficultySelect = document.getElementById('difficultySelect');
    
    // Set initial text
    updateSampleText();
    
    // Listen for difficulty changes
    difficultySelect.addEventListener('change', function() {
        handleDifficultyChange(this.value);
    });
    
    // Add event listeners for control buttons
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const retryBtn = document.getElementById('retryBtn');
    const typingInput = document.getElementById('typingInput');
    
    startBtn.addEventListener('click', function() {
        handleStartButtonClick(startBtn, stopBtn, typingInput);
    });
    
    stopBtn.addEventListener('click', function() {
        handleStopButtonClick(startBtn, stopBtn, typingInput);
    });
    
    retryBtn.addEventListener('click', function() {
        handleRetryButtonClick(startBtn, stopBtn, typingInput);
    });
});