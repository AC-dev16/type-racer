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
let testStarted = false;
let testCompleted = false;

// Function to get random text based on difficulty
function getRandomText(difficulty) {
    const texts = textSamples[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

// Function to start the timer
function startTimer() {
    startTime = new Date().getTime();
    testStarted = true;
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

// Function to highlight words based on typing accuracy
function highlightWords(userText, sampleText) {
    const userWords = userText.trim().split(/\s+/);
    const sampleWords = sampleText.split(/\s+/);
    const sampleTextElement = document.getElementById('sampleText');
    
    let highlightedHTML = '';
    
    for (let i = 0; i < sampleWords.length; i++) {
        const sampleWord = sampleWords[i];
        
        if (i < userWords.length) {
            // User has typed this word position
            if (userWords[i] === sampleWord) {
                // Correct word - highlight in blue
                highlightedHTML += `<span style="color: blue; font-weight: bold;">${sampleWord}</span>`;
            } else {
                // Incorrect word - highlight in red
                highlightedHTML += `<span style="color: red; font-weight: bold;">${sampleWord}</span>`;
            }
        } else {
            // User hasn't reached this word yet - keep default styling
            highlightedHTML += `<span>${sampleWord}</span>`;
        }
        
        // Add space after each word except the last one
        if (i < sampleWords.length - 1) {
            highlightedHTML += ' ';
        }
    }
    
    sampleTextElement.innerHTML = highlightedHTML;
}

// Function to handle real-time typing feedback and auto-start
function handleTypingInput() {
    const userText = document.getElementById('typingInput').value;
    
    // Auto-start the test when user begins typing
    if (!testStarted && userText.length > 0) {
        startTimer();
        console.log('Test auto-started');
    }
    
    highlightWords(userText, currentText);
}

// Function to handle key press events (for Enter key detection)
function handleKeyPress(event) {
    const typingInput = document.getElementById('typingInput');
    const retryBtn = document.getElementById('retryBtn');
    
    // Check if Enter key is pressed and test is active
    if (event.key === 'Enter' && testStarted && !testCompleted) {
        event.preventDefault(); // Prevent new line in textarea
        
        // Stop the test
        testCompleted = true;
        typingInput.disabled = true;
        
        // Re-enable retry button when test is completed
        retryBtn.disabled = false;
        
        // Stop the timer and calculate WPM
        stopTimer();
        calculateAndDisplayWPM();
        
        console.log('Test stopped by Enter key');
    }
}

// Function to reset timer variables
function resetTimer() {
    startTime = null;
    endTime = null;
    testStarted = false;
    testCompleted = false;
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
    
    // Reset test state when difficulty changes
    resetTimer();
    const typingInput = document.getElementById('typingInput');
    const retryBtn = document.getElementById('retryBtn');
    typingInput.disabled = false;
    
    // Disable retry button when difficulty changes to prevent immediate retry
    retryBtn.disabled = true;
    
    // Reset results
    document.getElementById('timeResult').textContent = '0';
    document.getElementById('wpmResult').textContent = '0';
}

// Named function to handle retry button click
function handleRetryButtonClick(typingInput, retryBtn) {
    // Reset the test
    updateSampleText();
    typingInput.disabled = false;
    typingInput.value = '';
    typingInput.focus();
    
    // Disable retry button after clicking it
    retryBtn.disabled = true;
    
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
    const retryBtn = document.getElementById('retryBtn');
    const typingInput = document.getElementById('typingInput');
    
    retryBtn.addEventListener('click', function() {
        handleRetryButtonClick(typingInput, retryBtn);
    });
    
    // Add real-time typing feedback and auto-start functionality
    typingInput.addEventListener('input', handleTypingInput);
    
    // Add Enter key detection for stopping the test
    typingInput.addEventListener('keydown', handleKeyPress);
    
    // Focus on the typing input initially
    typingInput.focus();
});