// === SELL PAGE: Phase 3 Selling Process Timeline ===

class SellingProcessTimeline {
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
        console.log('📈 Selling Process Timeline initialized');
    }
    
    cacheElements() {
        // Desktop elements
        this.desktopSteps = document.querySelectorAll('.process-step');
        this.stepDetailBtns = document.querySelectorAll('.step-detail-btn');
        this.timelineLine = document.querySelector('.timeline-line');
        this.arrowheads = document.querySelectorAll('.arrowhead');
        
        // Mobile elements
        this.mobileSteps = document.querySelectorAll('.process-step-mobile');
        this.mobileDetailBtns = document.querySelectorAll('.step-detail-btn-mobile');
        
        // CTA buttons
        this.ctaButtons = {
            personalizedPlan: document.querySelector('.get-personalized-plan-btn'),
            downloadGuide: document.querySelector('.download-process-guide-btn')
        };
        
        // Process statistics
        this.processStats = document.querySelectorAll('.process-stat');
    }
    
    setupEventListeners() {
        // Desktop step interactions
        this.desktopSteps.forEach((step, index) => {
            step.addEventListener('mouseenter', () => {
                this.handleStepHover(index);
            });
            
            step.addEventListener('mouseleave', () => {
                this.handleStepLeave(index);
            });
            
            step.addEventListener('click', () => {
                this.handleStepClick(index);
            });
        });
        
        // Step detail buttons
        this.stepDetailBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showStepDetails(index);
            });
        });
        
        // Mobile step interactions
        this.mobileSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                this.handleMobileStepClick(index);
            });
        });
        
        this.mobileDetailBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileStepDetails(index);
            });
        });
        
        // CTA buttons
        this.ctaButtons.personalizedPlan.addEventListener('click', () => {
            this.handlePersonalizedPlan();
        });
        
        this.ctaButtons.downloadGuide.addEventListener('click', () => {
            this.handleDownloadGuide();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.nextStep();
            if (e.key === 'ArrowLeft') this.previousStep();
            if (e.key === ' ') this.toggleAutoPlay();
        });
        
        // Auto-play controls
        const timelineSection = document.getElementById('selling-process');
        timelineSection.addEventListener('mouseenter', () => {
            this.pauseAutoPlay();
        });
        
        timelineSection.addEventListener('mouseleave', () => {
            this.resumeAutoPlay();
        });
        
        // Touch events for mobile
        this.setupTouchEvents();
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const timelineSection = document.getElementById('selling-process');
        
        timelineSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.pauseAutoPlay();
        });
        
        timelineSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
            this.resumeAutoPlay();
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextStep();
            } else {
                this.previousStep();
            }
        }
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
        
        // Observe desktop steps
        this.desktopSteps.forEach(step => {
            observer.observe(step);
        });
        
        // Observe mobile steps
        this.mobileSteps.forEach(step => {
            observer.observe(step);
        });
        
        // Observe process stats
        this.processStats.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    animateStep(step) {
        const stepNumber = step.querySelector('.step-indicator, .step-indicator-mobile');
        const icon = step.querySelector('.w-16, .w-12');
        
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
        
        // Animate process stats
        if (step.classList.contains('process-stat')) {
            this.animateProcessStat(step);
        }
    }
    
    animateProcessStat(stat) {
        const numberElement = stat.querySelector('.text-3xl');
        if (numberElement) {
            const targetValue = this.getStatTargetValue(numberElement.textContent);
            this.animateValue(numberElement, 0, targetValue, 1500);
        }
    }
    
    getStatTargetValue(text) {
        // Extract numeric value from stat text
        const match = text.match(/(\d+[.,]?\d*)/);
        return match ? parseFloat(match[0].replace(',', '')) : 0;
    }
    
    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Format number with commas for thousands
            element.textContent = value.toLocaleString('nl-NL');
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    handleStepHover(stepIndex) {
        this.highlightStep(stepIndex);
        this.animateConnections(stepIndex);
    }
    
    handleStepLeave(stepIndex) {
        this.removeStepHighlight(stepIndex);
        this.resetConnections();
    }
    
    handleStepClick(stepIndex) {
        this.setActiveStep(stepIndex);
        this.showStepModal(stepIndex);
    }
    
    handleMobileStepClick(stepIndex) {
        this.setActiveStep(stepIndex);
        this.showStepModal(stepIndex);
    }
    
    highlightStep(stepIndex) {
        this.desktopSteps[stepIndex].classList.add('active');
        
        // Highlight connections up to this step
        for (let i = 0; i < stepIndex; i++) {
            if (this.arrowheads[i]) {
                this.arrowheads[i].classList.add('active');
            }
        }
    }
    
    removeStepHighlight(stepIndex) {
        this.desktopSteps[stepIndex].classList.remove('active');
        this.arrowheads.forEach(arrow => arrow.classList.remove('active'));
    }
    
    setActiveStep(stepIndex) {
        // Remove active class from all steps
        this.desktopSteps.forEach(step => step.classList.remove('active'));
        this.mobileSteps.forEach(step => step.classList.remove('active'));
        
        // Add active class to current step
        this.desktopSteps[stepIndex]?.classList.add('active');
        this.mobileSteps[stepIndex]?.classList.add('active');
        
        this.currentStep = stepIndex;
        this.updateConnections(stepIndex);
    }
    
    animateConnections(stepIndex) {
        // Animate connection lines up to the hovered step
        for (let i = 0; i < stepIndex; i++) {
            const arrow = this.arrowheads[i];
            
            if (arrow) {
                arrow.style.animation = 'arrowheadPulse 0.6s ease-in-out';
            }
        }
        
        // Animate timeline line
        if (this.timelineLine) {
            this.timelineLine.style.animation = 'timelineFlowHover 1s ease-in-out infinite';
        }
    }
    
    resetConnections() {
        this.arrowheads.forEach(arrow => {
            arrow.style.animation = '';
        });
        
        if (this.timelineLine) {
            this.timelineLine.style.animation = 'timelineFlow 3s ease-in-out infinite';
        }
    }
    
    updateConnections(stepIndex) {
        // Reset all connections
        this.arrowheads.forEach(arrow => arrow.classList.remove('active'));
        
        // Activate connections up to current step
        for (let i = 0; i < stepIndex; i++) {
            if (this.arrowheads[i]) {
                this.arrowheads[i].classList.add('active');
            }
        }
    }
    
    showStepDetails(stepIndex) {
        const stepData = this.getStepData(stepIndex);
        this.showStepModal(stepIndex, stepData);
    }
    
    toggleMobileStepDetails(stepIndex) {
        const step = this.mobileSteps[stepIndex];
        const details = step.querySelector('.step-details-mobile');
        
        if (!details) {
            this.createMobileStepDetails(stepIndex);
        } else {
            details.classList.toggle('expanded');
            
            // Update button text
            const btn = this.mobileDetailBtns[stepIndex];
            if (details.classList.contains('expanded')) {
                btn.innerHTML = 'Hide details <i class="fas fa-chevron-up ml-1 text-xs"></i>';
            } else {
                btn.innerHTML = 'View details <i class="fas fa-chevron-down ml-1 text-xs"></i>';
            }
        }
    }
    
    createMobileStepDetails(stepIndex) {
        const step = this.mobileSteps[stepIndex];
        const stepData = this.getStepData(stepIndex);
        
        const detailsHTML = `
            <div class="step-details-mobile expanded mt-4 pt-4 border-t border-gray-200">
                <div class="space-y-3">
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div class="text-center p-3 bg-gray-50 rounded-lg">
                            <div class="font-semibold text-gray-700">Duration</div>
                            <div class="text-emerald-600 font-semibold">${stepData.duration}</div>
                        </div>
                        <div class="text-center p-3 bg-gray-50 rounded-lg">
                            <div class="font-semibold text-gray-700">Success Rate</div>
                            <div class="text-emerald-600 font-semibold">${stepData.successRate}</div>
                        </div>
                    </div>
                    <div class="text-sm text-gray-600 leading-relaxed">
                        ${stepData.fullDescription}
                    </div>
                    <div class="space-y-2">
                        ${stepData.features.map(feature => `
                            <div class="flex items-center text-sm text-gray-700">
                                <i class="fas fa-check text-emerald-500 mr-2 w-4"></i>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        step.insertAdjacentHTML('beforeend', detailsHTML);
        
        // Update button text
        const btn = this.mobileDetailBtns[stepIndex];
        btn.innerHTML = 'Hide details <i class="fas fa-chevron-up ml-1 text-xs"></i>';
    }
    
    showStepModal(stepIndex, stepData = null) {
        if (!stepData) {
            stepData = this.getStepData(stepIndex);
        }
        
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 process-step-modal">
                <div class="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                                ${stepIndex + 1}
                            </div>
                            <div>
                                <h3 class="text-2xl font-semibold text-gray-800">${stepData.title}</h3>
                                <div class="flex items-center space-x-2 mt-1">
                                    <span class="bg-${stepData.color}-100 text-${stepData.color}-700 text-xs px-2 py-1 rounded-full font-semibold">
                                        ${stepData.duration}
                                    </span>
                                    <span class="text-sm text-gray-500">${stepData.successRate} success rate</span>
                                </div>
                            </div>
                        </div>
                        <button class="close-modal text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="space-y-6">
                            <div class="w-20 h-20 bg-${stepData.color}-100 rounded-2xl flex items-center justify-center mx-auto">
                                <i class="${stepData.icon} text-${stepData.color}-600 text-3xl"></i>
                            </div>
                            
                            <div class="space-y-4">
                                <h4 class="font-semibold text-gray-800">What We Deliver</h4>
                                <div class="space-y-2">
                                    ${stepData.features.map(feature => `
                                        <div class="flex items-center text-sm text-gray-700">
                                            <i class="fas fa-check text-${stepData.color}-500 mr-2 w-4"></i>
                                            <span>${feature}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <div class="space-y-6">
                            <div class="bg-${stepData.color}-50 border border-${stepData.color}-200 rounded-xl p-4">
                                <h4 class="font-semibold text-${stepData.color}-800 mb-2">Process Overview</h4>
                                <p class="text-${stepData.color}-700 text-sm leading-relaxed">
                                    ${stepData.fullDescription}
                                </p>
                            </div>
                            
                            <div class="bg-gray-50 rounded-xl p-4">
                                <h4 class="font-semibold text-gray-800 mb-2">Typical Timeline</h4>
                                <div class="space-y-2 text-sm text-gray-600">
                                    ${stepData.timeline.map(item => `
                                        <div class="flex justify-between">
                                            <span>${item.task}</span>
                                            <span class="font-semibold">${item.time}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <div class="flex flex-col sm:flex-row gap-4">
                            <button class="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors contact-specialist-btn" data-step="${stepIndex}">
                                <i class="fas fa-user-tie mr-2"></i>
                                Contact Specialist
                            </button>
                            <button class="flex-1 border border-emerald-600 text-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors download-checklist-btn" data-step="${stepIndex}">
                                <i class="fas fa-download mr-2"></i>
                                Download Checklist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners for modal
        const modal = document.querySelector('.process-step-modal');
        const closeBtn = modal.querySelector('.close-modal');
        const contactBtn = modal.querySelector('.contact-specialist-btn');
        const downloadBtn = modal.querySelector('.download-checklist-btn');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        contactBtn.addEventListener('click', () => {
            this.handleContactSpecialist(stepIndex);
            modal.remove();
        });
        
        downloadBtn.addEventListener('click', () => {
            this.handleDownloadChecklist(stepIndex);
        });
    }
    
    getStepData(stepIndex) {
        const stepsData = [
            {
                title: "Valuation & Strategy",
                duration: "1 week",
                successRate: "99%",
                color: "emerald",
                icon: "fas fa-chart-line",
                features: [
                    "WOZ value analysis and optimization",
                    "Comprehensive market analysis",
                    "Competitive pricing strategy",
                    "Personalized selling timeline"
                ],
                fullDescription: "We conduct a thorough analysis of your property's value using Dutch market data, WOZ valuations, and neighborhood comparables to develop a winning pricing strategy.",
                timeline: [
                    { task: "Initial consultation", time: "Day 1" },
                    { task: "Market analysis", time: "Days 2-3" },
                    { task: "Strategy development", time: "Days 4-5" },
                    { task: "Presentation", time: "Day 7" }
                ]
            },
            {
                title: "Preparation & Staging",
                duration: "2 weeks",
                successRate: "95%",
                color: "blue",
                icon: "fas fa-camera",
                features: [
                    "Professional photography & virtual tour",
                    "Expert home staging advice",
                    "Energy label preparation",
                    "Property presentation optimization"
                ],
                fullDescription: "Our team prepares your property for maximum market appeal with professional photography, strategic staging, and ensuring all Dutch requirements are met.",
                timeline: [
                    { task: "Property assessment", time: "Week 1" },
                    { task: "Professional photography", time: "Week 1" },
                    { task: "Home staging", time: "Week 2" },
                    { task: "Final preparations", time: "Week 2" }
                ]
            },
            {
                title: "Marketing Launch",
                duration: "Immediate",
                successRate: "98%",
                color: "purple",
                icon: "fas fa-bullhorn",
                features: [
                    "Funda.nl optimization and premium placement",
                    "International marketing exposure",
                    "Social media campaigns",
                    "Exclusive buyer network access"
                ],
                fullDescription: "We launch your property across multiple channels including Funda.nl, international platforms, and our exclusive network to maximize exposure and attract qualified buyers.",
                timeline: [
                    { task: "Funda listing", time: "Immediate" },
                    { task: "International platforms", time: "Day 1" },
                    { task: "Social media launch", time: "Day 1" },
                    { task: "Network distribution", time: "Day 1" }
                ]
            },
            {
                title: "Viewings & Negotiation",
                duration: "4-6 weeks",
                successRate: "96%",
                color: "orange",
                icon: "fas fa-handshake",
                features: [
                    "Professional viewing coordination",
                    "Smart bid management system",
                    "Expert negotiation strategy",
                    "Continuous market feedback"
                ],
                fullDescription: "We manage all viewings, coordinate with potential buyers, and employ expert negotiation techniques to secure the best possible price and conditions.",
                timeline: [
                    { task: "Viewing scheduling", time: "Weeks 1-4" },
                    { task: "Offer management", time: "Weeks 2-5" },
                    { task: "Negotiation", time: "Weeks 3-6" },
                    { task: "Contract preparation", time: "Week 6" }
                ]
            },
            {
                title: "Notary & Transfer",
                duration: "6-8 weeks",
                successRate: "100%",
                color: "green",
                icon: "fas fa-file-contract",
                features: [
                    "Contract preparation and review",
                    "Notary appointment coordination",
                    "Mortgage cancellation assistance",
                    "Final key handover"
                ],
                fullDescription: "We handle all legal aspects including contract preparation, notary coordination, and ensure a smooth transfer process until final key handover.",
                timeline: [
                    { task: "Contract signing", time: "Week 6" },
                    { task: "Notary appointment", time: "Week 7" },
                    { task: "Funds transfer", time: "Week 8" },
                    { task: "Key handover", time: "Week 8" }
                ]
            }
        ];
        
        return stepsData[stepIndex] || stepsData[0];
    }
    
    nextStep() {
        this.currentStep = (this.currentStep + 1) % this.desktopSteps.length;
        this.setActiveStep(this.currentStep);
    }
    
    previousStep() {
        this.currentStep = (this.currentStep - 1 + this.desktopSteps.length) % this.desktopSteps.length;
        this.setActiveStep(this.currentStep);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (this.isAutoPlaying) {
                this.nextStep();
            }
        }, 4000); // Change step every 4 seconds
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
    
    handlePersonalizedPlan() {
        const btn = this.ctaButtons.personalizedPlan;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating Plan...';
        btn.disabled = true;
        
        // Simulate plan creation
        setTimeout(() => {
            // Scroll to valuation section
            document.getElementById('property-valuation').scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // Reset button
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 1000);
        }, 1500);
    }
    
    handleDownloadGuide() {
        const btn = this.ctaButtons.downloadGuide;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-download mr-2"></i>Downloading...';
        
        // Create and download guide
        this.generateProcessGuide();
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check mr-2"></i>Downloaded!';
            btn.style.backgroundColor = '#10b981';
            btn.style.borderColor = '#10b981';
            btn.style.color = 'white';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 3000);
        }, 1000);
    }
    
    handleContactSpecialist(stepIndex) {
        const stepData = this.getStepData(stepIndex);
        
        // In real implementation, this would open a contact form
        console.log(`Contacting specialist for: ${stepData.title}`);
        alert(`We'll connect you with our ${stepData.title} specialist shortly!`);
    }
    
    handleDownloadChecklist(stepIndex) {
        const stepData = this.getStepData(stepIndex);
        
        // Create checklist content
        const checklistContent = `
            NORDICESTATES CHECKLIST: ${stepData.title.toUpperCase()}
            =============================================
            
            Step: ${stepData.title}
            Duration: ${stepData.duration}
            
            TASKS:
            ${stepData.features.map((feature, index) => `${index + 1}. ${feature}`).join('\n')}
            
            TIMELINE:
            ${stepData.timeline.map(item => `- ${item.task}: ${item.time}`).join('\n')}
            
            Need help? Contact us: hello@nordicestates.nl
        `;
        
        // Create and trigger download
        const blob = new Blob([checklistContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `checklist-${stepData.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    generateProcessGuide() {
        const guideContent = `
            NORDICESTATES SELLING PROCESS GUIDE
            ===================================
            
            COMPLETE 5-STEP SELLING PROCESS:
            
            1. VALUATION & STRATEGY (1 week)
               - WOZ value analysis
               - Market positioning
               - Pricing strategy development
            
            2. PREPARATION & STAGING (2 weeks)
               - Professional photography
               - Home staging
               - Energy label preparation
            
            3. MARKETING LAUNCH (Immediate)
               - Funda.nl optimization
               - International exposure
               - Virtual tours
            
            4. VIEWINGS & NEGOTIATION (4-6 weeks)
               - Viewing coordination
               - Bid management
               - Expert negotiation
            
            5. NOTARY & TRANSFER (6-8 weeks)
               - Contract preparation
               - Notary coordination
               - Key handover
            
            SUCCESS METRICS:
            - 98% of asking price achieved
            - 28 days average time on market
            - 2,450 average Funda views
            - 24/7 dedicated support
            
            Contact: hello@nordicestates.nl
            Phone: +31 20 123 4567
        `;
        
        const blob = new Blob([guideContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nordicestates-selling-process-guide.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Method to programmatically highlight completion of steps
    markStepCompleted(stepIndex) {
        const step = this.desktopSteps[stepIndex];
        if (step) {
            step.classList.add('process-completed');
        }
        
        const mobileStep = this.mobileSteps[stepIndex];
        if (mobileStep) {
            mobileStep.classList.add('process-completed');
        }
    }
    
    // Cleanup method
    destroy() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize Selling Process Timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing components
    if (window.SellHeroSection) {
        new SellHeroSection();
    }
    
    if (window.PropertyValuationWizard) {
        new PropertyValuationWizard();
    }
    
    // Initialize selling process timeline
    new SellingProcessTimeline();
    
    console.log('🚀 Sell Page Phase 3 initialized successfully!');
});

// Export for potential use in other modules
window.SellingProcessTimeline = SellingProcessTimeline;