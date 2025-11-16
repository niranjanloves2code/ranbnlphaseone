// === PHASE 3: Buying Process Timeline Interactions ===

class BuyingProcessTimeline {
    constructor() {
        this.timelineSteps = document.querySelectorAll('.timeline-step');
        this.downloadButton = document.querySelector('.download-guide-btn');
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupEventListeners();
        this.initializeStepAnimations();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateStep(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.timelineSteps.forEach(step => {
            observer.observe(step);
        });
    }
    
    animateStep(step) {
        const stepNumber = step.querySelector('.timeline-dot');
        const icon = step.querySelector('.w-12');
        
        // Add animation classes
        step.style.animation = 'timelineStepIn 0.8s ease-out forwards';
        
        // Animate step number
        if (stepNumber) {
            stepNumber.style.animation = 'pulse-glow 2s ease-in-out';
        }
        
        // Animate icon with delay
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'rotateY(0deg)';
            }, 300);
        }
    }
    
    setupEventListeners() {
        // Step hover effects
        this.timelineSteps.forEach(step => {
            step.addEventListener('mouseenter', this.handleStepHover.bind(this));
            step.addEventListener('mouseleave', this.handleStepLeave.bind(this));
            
            // Click to expand details
            step.addEventListener('click', this.handleStepClick.bind(this));
        });
        
        // Download guide button
        if (this.downloadButton) {
            this.downloadButton.addEventListener('click', this.handleDownloadGuide.bind(this));
        }
    }
    
    handleStepHover(e) {
        const step = e.currentTarget;
        const dot = step.querySelector('.timeline-dot');
        const icon = step.querySelector('.w-12');
        
        // Enhance glow effect
        if (dot) {
            dot.style.boxShadow = '0 0 0 4px #10b981, 0 10px 25px -5px rgba(16, 185, 129, 0.4)';
        }
        
        // Rotate icon
        if (icon) {
            icon.style.transform = 'rotateY(180deg) scale(1.1)';
        }
    }
    
    handleStepLeave(e) {
        const step = e.currentTarget;
        const dot = step.querySelector('.timeline-dot');
        const icon = step.querySelector('.w-12');
        
        // Reset styles
        if (dot) {
            dot.style.boxShadow = '';
        }
        
        if (icon) {
            icon.style.transform = 'rotateY(0deg) scale(1)';
        }
    }
    
    handleStepClick(e) {
        const step = e.currentTarget;
        const stepNumber = step.querySelector('.timeline-dot')?.textContent;
        const title = step.querySelector('h3')?.textContent;
        
        // Show step details (in real implementation, this could open a modal)
        console.log(`Step ${stepNumber}: ${title}`);
        
        // Add visual feedback
        step.style.transform = 'scale(0.98)';
        setTimeout(() => {
            step.style.transform = 'scale(1)';
        }, 150);
    }
    
    handleDownloadGuide() {
        // Simulate download action
        this.downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Downloading...';
        this.downloadButton.disabled = true;
        
        setTimeout(() => {
            this.downloadButton.innerHTML = '<i class="fas fa-check mr-2"></i>Downloaded!';
            this.downloadButton.style.backgroundColor = '#059669';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.downloadButton.innerHTML = '<i class="fas fa-download mr-2"></i>Download Complete Buying Guide';
                this.downloadButton.disabled = false;
                this.downloadButton.style.backgroundColor = '';
            }, 2000);
        }, 1500);
        
        // In real implementation, this would trigger actual file download
        console.log('Downloading buying guide...');
    }
    
    initializeStepAnimations() {
        // Initialize step states
        this.timelineSteps.forEach((step, index) => {
            step.style.animationDelay = `${index * 0.2}s`;
        });
    }
    
    // Method to programmatically highlight a specific step
    highlightStep(stepNumber) {
        this.timelineSteps.forEach(step => {
            step.classList.remove('active-step');
        });
        
        const targetStep = this.timelineSteps[stepNumber - 1];
        if (targetStep) {
            targetStep.classList.add('active-step');
            targetStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Add to your existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing components
    new MegaMenu();
    new NavigationManager();
    new PropertyFilterSystem();
    
    // Initialize buying process timeline
    new BuyingProcessTimeline();
    
    console.log('🚀 NordicEstates Buy Page with Timeline initialized!');
});

// Additional CSS for active step state (add to custom.css)
const additionalTimelineCSS = `
.active-step .timeline-dot {
    background: #059669;
    transform: scale(1.15);
    box-shadow: 0 0 0 4px #059669, 0 10px 30px -5px rgba(5, 150, 105, 0.6);
}

.active-step .w-12 {
    background: #059669 !important;
    transform: rotateY(180deg) scale(1.1);
}

.active-step h3 {
    color: #059669;
    font-weight: 700;
}

/* Progress indicator for timeline */
.timeline-progress {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    background: #10b981;
    height: 0%;
    transition: height 1s ease-in-out;
    z-index: 5;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalTimelineCSS;
document.head.appendChild(style);