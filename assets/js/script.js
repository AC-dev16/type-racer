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

// Function to get random text based on difficulty
function getRandomText(difficulty) {
    const texts = textSamples[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
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
        // Enable typing input and start test
        typingInput.disabled = false;
        typingInput.focus();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        
        // Start timer (you can implement timing logic here)
        console.log('Test started with difficulty:', currentDifficulty);
    });
    
    stopBtn.addEventListener('click', function() {
        // Disable typing input and stop test
        typingInput.disabled = true;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        console.log('Test stopped');
    });
    
    retryBtn.addEventListener('click', function() {
        // Reset the test
        updateSampleText();
        typingInput.disabled = true;
        typingInput.value = '';
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        // Reset results
        document.getElementById('timeResult').textContent = '0';
        document.getElementById('wpmResult').textContent = '0';
        
        console.log('Test reset');
    });
});