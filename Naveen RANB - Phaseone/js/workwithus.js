// === PHASE 6: Why Buy Through Us Flowchart System ===

class FlowchartSystem {
    constructor() {
        this.steps = [];
        this.currentStep = 0;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.startAutoPlay();
        console.log('📊 Flowchart System initialized');
    }
    
    cacheElements() {
        this.flowchartSteps = document.querySelectorAll('.flowchart-step');
        this.connectionLines = document.querySelectorAll('.connection-line, .connection-line-mobile');
        this.arrowheads = document.querySelectorAll('.arrowhead, .arrowhead-mobile');
        
        // CTA buttons
        this.ctaButtons = {
            schedule: document.querySelector('.schedule-consultation-btn'),
            brochure: document.querySelector('.download-brochure-btn')
        };
    }
    
    setupEventListeners() {
        // Step hover effects
        this.flowchartSteps.forEach((step, index) => {
            step.addEventListener('mouseenter', () => {
                this.handleStepHover(index);
            });
            
            step.addEventListener('mouseleave', () => {
                this.handleStepLeave(index);
            });
            
            step.addEventListener('click', () => {
                this.handleStepClick(index);
            });
            
            // Touch events for mobile
            step.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleStepClick(index);
            });
        });
        
        // CTA button events
        this.ctaButtons.schedule.addEventListener('click', () => {
            this.handleScheduleConsultation();
        });
        
        this.ctaButtons.brochure.addEventListener('click', () => {
            this.handleDownloadBrochure();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.nextStep();
            if (e.key === 'ArrowLeft') this.previousStep();
            if (e.key === ' ') this.toggleAutoPlay();
        });
        
        // Pause auto-play on hover
        document.getElementById('why-choose-us').addEventListener('mouseenter', () => {
            this.pauseAutoPlay();
        });
        
        document.getElementById('why-choose-us').addEventListener('mouseleave', () => {
            this.resumeAutoPlay();
        });
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
        
        this.flowchartSteps.forEach(step => {
            observer.observe(step);
        });
    }
    
    animateStep(step) {
        const stepNumber = step.querySelector('.step-number');
        const icon = step.querySelector('.step-icon');
        
        // Animate step number
        if (stepNumber) {
            stepNumber.style.animation = 'bounceIn 0.6s ease';
        }
        
        // Animate icon with delay
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
                icon.style.opacity = '1';
            }, 200);
        }
    }
    
    handleStepHover(stepIndex) {
        this.highlightStep(stepIndex);
        this.animateConnections(stepIndex);
        this.showStepTooltip(stepIndex);
    }
    
    handleStepLeave(stepIndex) {
        this.removeStepHighlight(stepIndex);
        this.resetConnections();
        this.hideStepTooltip(stepIndex);
    }
    
    handleStepClick(stepIndex) {
        this.setActiveStep(stepIndex);
        this.showStepDetails(stepIndex);
    }
    
    highlightStep(stepIndex) {
        this.flowchartSteps[stepIndex].classList.add('active');
        
        // Highlight previous connections
        for (let i = 0; i <= stepIndex; i++) {
            if (this.connectionLines[i]) {
                this.connectionLines[i].classList.add('active');
            }
            if (this.arrowheads[i]) {
                this.arrowheads[i].classList.add('active');
            }
        }
    }
    
    removeStepHighlight(stepIndex) {
        this.flowchartSteps[stepIndex].classList.remove('active');
        
        // Reset connections
        this.connectionLines.forEach(line => line.classList.remove('active'));
        this.arrowheads.forEach(arrow => arrow.classList.remove('active'));
    }
    
    setActiveStep(stepIndex) {
        // Remove active class from all steps
        this.flowchartSteps.forEach(step => step.classList.remove('active'));
        
        // Add active class to current step
        this.flowchartSteps[stepIndex].classList.add('active');
        this.currentStep = stepIndex;
        
        // Update connections
        this.updateConnections(stepIndex);
    }
    
    animateConnections(stepIndex) {
        // Animate connection lines up to the hovered step
        for (let i = 0; i < stepIndex; i++) {
            const line = this.connectionLines[i];
            const arrow = this.arrowheads[i];
            
            if (line) {
                line.style.animation = 'lineFlowHover 1s ease-in-out infinite';
            }
            
            if (arrow) {
                arrow.style.animation = 'arrowPulse 0.6s ease-in-out';
            }
        }
    }
    
    resetConnections() {
        this.connectionLines.forEach(line => {
            line.style.animation = '';
        });
        
        this.arrowheads.forEach(arrow => {
            arrow.style.animation = '';
        });
    }
    
    updateConnections(stepIndex) {
        // Reset all connections
        this.connectionLines.forEach(line => line.classList.remove('active'));
        this.arrowheads.forEach(arrow => arrow.classList.remove('active'));
        
        // Activate connections up to current step
        for (let i = 0; i < stepIndex; i++) {
            if (this.connectionLines[i]) {
                this.connectionLines[i].classList.add('active');
            }
            if (this.arrowheads[i]) {
                this.arrowheads[i].classList.add('active');
            }
        }
    }
    
    showStepTooltip(stepIndex) {
        const tooltip = this.flowchartSteps[stepIndex].querySelector('.step-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(0)';
        }
    }
    
    hideStepTooltip(stepIndex) {
        const tooltip = this.flowchartSteps[stepIndex].querySelector('.step-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(10px)';
        }
    }
    
    showStepDetails(stepIndex) {
        const steps = [
            {
                title: "Expert Dutch Agents",
                details: "Our bilingual team has an average of 12 years experience in Dutch real estate market.",
                stats: "98% client satisfaction rate",
                action: "Meet the team"
            },
            {
                title: "Premium Property Access",
                details: "Get access to exclusive off-market listings and pre-market opportunities.",
                stats: "2,345+ active listings",
                action: "View exclusives"
            },
            {
                title: "Financial Guidance",
                details: "Partner with trusted mortgage advisors for the best rates and tax optimization.",
                stats: "Average 0.6% better rates",
                action: "Get pre-approved"
            },
            {
                title: "Stress-Free Process",
                details: "End-to-end support including legal, technical, and relocation services.",
                stats: "24/7 dedicated support",
                action: "Start your journey"
            }
        ];
        
        const step = steps[stepIndex];
        if (step) {
            // In a real implementation, this would show a modal or update a details panel
            console.log(`Step ${stepIndex + 1}: ${step.title}`, step);
            
            // Visual feedback
            this.flowchartSteps[stepIndex].style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.flowchartSteps[stepIndex].style.transform = '';
            }, 150);
        }
    }
    
    nextStep() {
        this.currentStep = (this.currentStep + 1) % this.flowchartSteps.length;
        this.setActiveStep(this.currentStep);
    }
    
    previousStep() {
        this.currentStep = (this.currentStep - 1 + this.flowchartSteps.length) % this.flowchartSteps.length;
        this.setActiveStep(this.currentStep);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (this.isAutoPlaying) {
                this.nextStep();
            }
        }, 3000); // Change step every 3 seconds
    }
    
    pauseAutoPlay() {
        this.isAutoPlaying = false;
    }
    
    resumeAutoPlay() {
        this.isAutoPlaying = true;
    }
    
    toggleAutoPlay() {
        this.isAutoPlaying = !this.isAutoPlaying;
    }
    
    handleScheduleConsultation() {
        const btn = this.ctaButtons.schedule;
        const originalHTML = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Scheduling...';
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check mr-2"></i>Scheduled!';
            btn.style.backgroundColor = '#059669';
            
            // Reset after 2 seconds
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                btn.style.backgroundColor = '';
                
                // In real implementation, this would open a scheduling modal
                console.log('Opening scheduling modal...');
            }, 2000);
        }, 1500);
    }
    
    handleDownloadBrochure() {
        const btn = this.ctaButtons.brochure;
        const originalHTML = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-download mr-2"></i>Downloading...';
        
        // Simulate download
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check mr-2"></i>Downloaded!';
            btn.style.backgroundColor = '#10b981';
            btn.style.color = 'white';
            btn.style.borderColor = '#10b981';
            
            // Create and trigger download
            this.createBrochureDownload();
            
            // Reset after 2 seconds
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 2000);
        }, 1000);
    }
    
    createBrochureDownload() {
        // In real implementation, this would download an actual PDF
        // For demo purposes, we'll create a simple text file
        const brochureContent = `
            NordicEstates Buyer's Guide
            ===========================
            
            Why Choose Us:
            • 98% Client Satisfaction
            • 2,345+ Properties
            • Best Mortgage Rates
            • 24/7 Support
            
            Contact: hello@nordicestates.nl
            Phone: +31 20 123 4567
        `;
        
        const blob = new Blob([brochureContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nordicestates-buyers-guide.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Method to programmatically go to a specific step
    goToStep(stepIndex) {
        if (stepIndex >= 0 && stepIndex < this.flowchartSteps.length) {
            this.setActiveStep(stepIndex);
        }
    }
    
    // Cleanup method
    destroy() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Add additional CSS animations
const flowchartAdditionalCSS = `
@keyframes bounceIn {
    0% { transform: translateX(-50%) scale(0.3); opacity: 0; }
    50% { transform: translateX(-50%) scale(1.1); }
    70% { transform: translateX(-50%) scale(0.9); }
    100% { transform: translateX(-50%) scale(1); opacity: 1; }
}

.connection-line.active,
.connection-line-mobile.active {
    background: linear-gradient(90deg, #34d399, #10b981, #34d399) !important;
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
}

.arrowhead.active,
.arrowhead-mobile.active {
    opacity: 1 !important;
    color: #10b981 !important;
}

/* Enhanced mobile responsiveness */
@media (max-width: 640px) {
    .flowchart-step {
        margin: 0 auto 3rem auto;
        max-width: 300px;
    }
    
    .flowchart-step:last-child {
        margin-bottom: 0;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .connection-line,
    .connection-line-mobile,
    .arrowhead,
    .arrowhead-mobile {
        animation: none;
    }
    
    .flowchart-step {
        animation: none;
        opacity: 1;
        transform: none;
    }
}
`;

// Inject additional CSS
const flowchartStyle = document.createElement('style');
flowchartStyle.textContent = flowchartAdditionalCSS;
document.head.appendChild(flowchartStyle);

// Update the main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing components
    new MegaMenu();
    new NavigationManager();
    window.propertyFilterSystem = new PropertyFilterSystem();
    new BuyingProcessTimeline();
    new NeighborhoodCarousel();
    new MortgageCalculator();
    
    // Initialize flowchart system
    new FlowchartSystem();
    
    console.log('🚀 NordicEstates Buy Page Complete! All systems initialized.');
});