// === SELL PAGE: Phase 1 Hero Section Functionality ===

class SellHeroSection {
    constructor() {
        this.carouselSlides = document.querySelectorAll('.carousel-slide');
        this.valueCounters = document.querySelectorAll('.value-counter');
        this.ctaButtons = {
            valuation: document.querySelector('.get-valuation-btn'),
            strategy: document.querySelector('.view-strategy-btn')
        };
        this.currentSlide = 0;
        this.carouselInterval = null;
        this.hasAnimatedCounters = false;
        
        this.init();
    }
    
    init() {
        this.startBackgroundCarousel();
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupIntersectionObserver();
        console.log('🏠 Sell Page Hero Section initialized');
    }
    
    startBackgroundCarousel() {
        this.carouselInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    nextSlide() {
        // Remove active class from current slide
        this.carouselSlides[this.currentSlide].classList.remove('active');
        
        // Move to next slide
        this.currentSlide = (this.currentSlide + 1) % this.carouselSlides.length;
        
        // Add active class to new slide
        this.carouselSlides[this.currentSlide].classList.add('active');
    }
    
    setupEventListeners() {
        // CTA button interactions
        this.ctaButtons.valuation.addEventListener('click', () => {
            this.handleGetValuation();
        });
        
        this.ctaButtons.strategy.addEventListener('click', () => {
            this.handleViewStrategy();
        });
        
        // Pause carousel on hover
        const heroSection = document.querySelector('.pt-32');
        heroSection.addEventListener('mouseenter', () => {
            this.pauseCarousel();
        });
        
        heroSection.addEventListener('mouseleave', () => {
            this.resumeCarousel();
        });
        
        // Touch events for mobile
        heroSection.addEventListener('touchstart', () => {
            this.pauseCarousel();
        });
    }
    
    setupScrollAnimations() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            
            // Smart CTA behavior
            this.updateCTABehavior(currentScrollY, scrollDirection);
            
            // Animate counters when in view
            if (!this.hasAnimatedCounters && this.isCountersInView()) {
                this.animateValueCounters();
                this.hasAnimatedCounters = true;
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('hero-loaded');
                    
                    // Start animations when hero section is in view
                    if (entry.target.classList.contains('pt-32')) {
                        this.startEntranceAnimations();
                    }
                }
            });
        }, { threshold: 0.3 });
        
        const heroSection = document.querySelector('.pt-32');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }
    
    startEntranceAnimations() {
        // Animate trust badges with stagger
        const trustBadges = document.querySelectorAll('.bg-white\\/80');
        trustBadges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.animation = 'slideInDown 0.6s ease-out forwards';
            }, index * 100);
        });
    }
    
    animateValueCounters() {
        this.valueCounters.forEach(counter => {
            const targetValue = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepValue = targetValue / steps;
            const stepTime = duration / steps;
            
            let currentValue = 0;
            const timer = setInterval(() => {
                currentValue += stepValue;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(timer);
                }
                
                // Format number with one decimal place
                counter.textContent = currentValue.toFixed(1);
                counter.classList.add('animated');
            }, stepTime);
        });
    }
    
    isCountersInView() {
        const firstCounter = this.valueCounters[0];
        if (!firstCounter) return false;
        
        const rect = firstCounter.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    updateCTABehavior(scrollY, direction) {
        const ctaSection = document.querySelector('.animate-slide-up.delay-300');
        const scrollThreshold = 100;
        
        if (scrollY > scrollThreshold) {
            ctaSection.classList.add('scrolled');
            
            // Change CTA text based on scroll direction
            if (direction === 'down') {
                this.ctaButtons.valuation.innerHTML = '<i class="fas fa-arrow-up mr-2"></i>Get Valuation';
            } else {
                this.ctaButtons.valuation.innerHTML = '<i class="fas fa-chart-line mr-2"></i>Get Free Valuation';
            }
        } else {
            ctaSection.classList.remove('scrolled');
            this.ctaButtons.valuation.innerHTML = '<i class="fas fa-chart-line mr-2"></i>Get Free Valuation';
        }
    }
    
    handleGetValuation() {
        const btn = this.ctaButtons.valuation;
        const originalHTML = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Preparing Valuation...';
        btn.disabled = true;
        
        // Simulate API call/processing
        setTimeout(() => {
            // Scroll to valuation section (will be added in Phase 2)
            const valuationSection = document.getElementById('property-valuation');
            if (valuationSection) {
                valuationSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Reset button after scroll
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 1000);
            
        }, 1500);
        
        // Track conversion (in real implementation)
        console.log('Valuation CTA clicked - tracking conversion');
    }
    
    handleViewStrategy() {
        const btn = this.ctaButtons.strategy;
        const originalHTML = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-play-circle mr-2"></i>Loading Strategy...';
        
        // Simulate strategy loading
        setTimeout(() => {
            // In real implementation, this would open a modal or navigate
            this.showSellingStrategyModal();
            
            // Reset button
            btn.innerHTML = originalHTML;
        }, 1000);
    }
    
    showSellingStrategyModal() {
        // Create and show strategy modal
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 strategy-modal">
                <div class="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-semibold text-gray-800">Our Selling Strategy</h3>
                        <button class="close-modal text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="prose prose-emerald">
                        <p class="text-gray-600 mb-4">Our proven 5-step selling process maximizes your property's value while minimizing stress:</p>
                        <ol class="list-decimal list-inside space-y-3 text-gray-700">
                            <li><strong>Expert Valuation</strong> - Comprehensive market analysis</li>
                            <li><strong>Strategic Preparation</strong> - Professional staging & photography</li>
                            <li><strong>Multi-Channel Marketing</strong> - Funda optimization & international exposure</li>
                            <li><strong>Smart Negotiation</strong> - Bid management & expert negotiation</li>
                            <li><strong>Seamless Transfer</strong> - Notary coordination & paperwork handling</li>
                        </ol>
                    </div>
                    <div class="mt-6 flex gap-4">
                        <button class="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                            Download Full Strategy
                        </button>
                        <button class="flex-1 border border-emerald-600 text-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
                            Schedule Consultation
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners for modal
        const modal = document.querySelector('.strategy-modal');
        const closeBtn = modal.querySelector('.close-modal');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    pauseCarousel() {
        if (this.carouselInterval) {
            clearInterval(this.carouselInterval);
        }
    }
    
    resumeCarousel() {
        this.pauseCarousel(); // Clear existing interval
        this.carouselInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    // Cleanup method
    destroy() {
        this.pauseCarousel();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sell page hero section
    new SellHeroSection();
    
    console.log('🚀 Sell Page Phase 1 initialized successfully!');
});

// Export for potential use in other modules
window.SellHeroSection = SellHeroSection;