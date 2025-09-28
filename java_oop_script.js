// Enhanced Java OOP Guide with PowerPoint-like features
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideNavigation();
    initializeProgressTracking();
    initializeAnimations();
    initializeCodePlaygrounds();
    initializeQuizzes();
    initializeVoiceControls();
});

// Slide Navigation System
let currentSlideIndex = 1;
const totalSlides = 8;
const sections = ['introduction', 'classes-objects', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction', 'video-resources', 'exercises'];

function initializeSlideNavigation() {
    updateSlideIndicator();
    updateProgressBar();
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            navigateSlide(1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateSlide(-1);
        }
    });
    
    // Navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const slideNumber = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideNumber);
        });
    });
}

function navigateSlide(direction) {
    const newIndex = currentSlideIndex + direction;
    if (newIndex >= 1 && newIndex <= totalSlides) {
        goToSlide(newIndex);
    }
}

function goToSlide(slideNumber) {
    currentSlideIndex = slideNumber;
    const sectionId = sections[slideNumber - 1];
    const section = document.getElementById(sectionId);
    
    if (section) {
        // Smooth scroll with animation
        section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Update UI
        updateSlideIndicator();
        updateProgressBar();
        updateNavigationButtons();
        
        // Trigger section animation
        animateSection(section);
        
        // Update active nav link
        updateActiveNavLink(slideNumber);
    }
}

function updateSlideIndicator() {
    const currentSlideElement = document.getElementById('currentSlide');
    const totalSlidesElement = document.getElementById('totalSlides');
    
    if (currentSlideElement) currentSlideElement.textContent = currentSlideIndex;
    if (totalSlidesElement) totalSlidesElement.textContent = totalSlides;
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const percentage = (currentSlideIndex / totalSlides) * 100;
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = Math.round(percentage) + '% Complete';
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlideIndex === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlideIndex === totalSlides;
    }
}

function updateActiveNavLink(slideNumber) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-slide="${slideNumber}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Progress Tracking and Bookmarks
function initializeProgressTracking() {
    // Load saved progress
    const savedProgress = localStorage.getItem('javaOOPProgress');
    if (savedProgress) {
        currentSlideIndex = parseInt(savedProgress);
        updateSlideIndicator();
        updateProgressBar();
    }
    
    // Save progress on slide change
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const slideIndex = sections.indexOf(sectionId) + 1;
                if (slideIndex > 0) {
                    currentSlideIndex = slideIndex;
                    localStorage.setItem('javaOOPProgress', slideIndex);
                    updateSlideIndicator();
                    updateProgressBar();
                    updateNavigationButtons();
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) observer.observe(section);
    });
}

// Enhanced Animations
function initializeAnimations() {
    // Intersection Observer for section animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSection(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.section').forEach(section => {
        animationObserver.observe(section);
    });
}

function animateSection(section) {
    // Add entrance animation
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 100);
    
    // Animate child elements
    const elements = section.querySelectorAll('.content-box, .code-playground, .quiz-container');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 200 + (index * 100));
    });
}

// Interactive Code Playgrounds
function initializeCodePlaygrounds() {
    // Add syntax highlighting to textareas
    document.querySelectorAll('.code-input').forEach(textarea => {
        textarea.addEventListener('input', function() {
            // Simple syntax highlighting could be added here
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

function runJavaCode(sectionId) {
    const codeInput = document.getElementById(`code-editor-${sectionId}`);
    const output = document.getElementById(`output-${sectionId}`);
    
    if (!codeInput || !output) return;
    
    const code = codeInput.value;
    
    // Simulate code execution with realistic output
    output.innerHTML = '<div style="color: #666;">🔄 Compiling and running...</div>';
    
    setTimeout(() => {
        const simulatedOutput = simulateJavaExecution(code, sectionId);
        output.innerHTML = simulatedOutput;
        
        // Add success animation
        output.style.transform = 'scale(0.95)';
        setTimeout(() => {
            output.style.transition = 'transform 0.3s ease';
            output.style.transform = 'scale(1)';
        }, 100);
    }, 1500);
}

function simulateJavaExecution(code, sectionId) {
    // Simulate realistic Java output based on section
    const outputs = {
        'classes-objects': `✅ Compilation successful!

The Red Toyota is driving.
Car: 2020 Red Toyota
The Blue Honda is driving.
Car: 2019 Blue Honda
The Yellow Ferrari is driving.
Car: 2024 Yellow Ferrari

🎉 Program executed successfully!`,
        
        'inheritance': `✅ Compilation successful!

Vehicle created: Toyota
Car created: Toyota Camry
Tuut, tuut!
Driving the Toyota Camry
Car: 2023 Toyota Camry

🎉 Inheritance working perfectly!`,
        
        'polymorphism': `✅ Compilation successful!

Woof! Woof!
Meow! Meow!
Moo! Moo!

🎉 Polymorphism in action!`
    };
    
    return outputs[sectionId] || `✅ Compilation successful!

Your code executed successfully!
Check the console for any output.

🎉 Great job!`;
}

// Quiz System
function initializeQuizzes() {
    // Initialize all quiz interactions
    document.querySelectorAll('.quiz-options input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Visual feedback for selection
            const label = this.closest('label');
            const allLabels = this.closest('.quiz-options').querySelectorAll('label');
            
            allLabels.forEach(l => l.style.borderColor = 'transparent');
            label.style.borderColor = '#4285f4';
            label.style.background = 'rgba(66, 133, 244, 0.1)';
        });
    });
}

function checkQuizAnswer(questionName, correctAnswer, feedbackMessage) {
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    const feedbackElement = document.getElementById(`feedback-${questionName}`);
    
    if (!selectedOption) {
        alert('Please select an answer first! 🤔');
        return;
    }
    
    const isCorrect = selectedOption.value === correctAnswer;
    
    if (feedbackElement) {
        feedbackElement.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackElement.innerHTML = isCorrect ? 
            feedbackMessage : 
            '❌ Not quite right. Try again! The correct answer is highlighted above.';
        
        // Highlight correct answer
        if (!isCorrect) {
            const correctOption = document.querySelector(`input[name="${questionName}"][value="${correctAnswer}"]`);
            if (correctOption) {
                const correctLabel = correctOption.closest('label');
                correctLabel.style.borderColor = '#4CAF50';
                correctLabel.style.background = 'rgba(76, 175, 80, 0.1)';
            }
        }
        
        // Add celebration animation for correct answers
        if (isCorrect) {
            feedbackElement.style.transform = 'scale(0.9)';
            setTimeout(() => {
                feedbackElement.style.transition = 'transform 0.3s ease';
                feedbackElement.style.transform = 'scale(1)';
            }, 100);
        }
    }
}

// Voice Controls (Basic Implementation)
function initializeVoiceControls() {
    // Add voice control button to header
    const header = document.querySelector('header');
    if (header && 'speechSynthesis' in window) {
        const voiceBtn = document.createElement('button');
        voiceBtn.innerHTML = '🔊 Voice Guide';
        voiceBtn.className = 'voice-btn';
        voiceBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
        `;
        
        voiceBtn.addEventListener('click', toggleVoiceNarration);
        header.appendChild(voiceBtn);
    }
}

let isNarrating = false;

function toggleVoiceNarration() {
    if (isNarrating) {
        speechSynthesis.cancel();
        isNarrating = false;
        document.querySelector('.voice-btn').innerHTML = '🔊 Voice Guide';
    } else {
        const currentSection = document.getElementById(sections[currentSlideIndex - 1]);
        if (currentSection) {
            const text = extractTextForNarration(currentSection);
            speakText(text);
            isNarrating = true;
            document.querySelector('.voice-btn').innerHTML = '🔇 Stop Voice';
        }
    }
}

function extractTextForNarration(section) {
    const title = section.querySelector('h2')?.textContent || '';
    const paragraphs = Array.from(section.querySelectorAll('p')).map(p => p.textContent).join(' ');
    return `${title}. ${paragraphs}`;
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onend = () => {
        isNarrating = false;
        document.querySelector('.voice-btn').innerHTML = '🔊 Voice Guide';
    };
    
    speechSynthesis.speak(utterance);
}

// Utility Functions
function showAnswer(answerId) {
    const answerElement = document.getElementById(answerId);
    if (answerElement) {
        answerElement.style.display = answerElement.style.display === 'none' ? 'block' : 'none';
        
        // Add smooth animation
        if (answerElement.style.display === 'block') {
            answerElement.style.opacity = '0';
            answerElement.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                answerElement.style.transition = 'all 0.3s ease';
                answerElement.style.opacity = '1';
                answerElement.style.transform = 'translateY(0)';
            }, 10);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced Java OOP Guide loaded successfully!');
    
    // Add some interactive Easter eggs
    let clickCount = 0;
    document.querySelector('h1').addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            this.style.animation = 'bounce 0.5s ease';
            setTimeout(() => this.style.animation = '', 500);
            alert('🎉 You found the Easter egg! You\'re a true Java explorer!');
            clickCount = 0;
        }
    });
});

// Add bounce animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-20px); }
        80% { transform: translateY(-10px); }
    }
    
    .nav-link.active {
        background: linear-gradient(135deg, #4285f4, #34a853);
        color: white !important;
        border-radius: 20px;
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);