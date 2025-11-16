// === RENT PAGE: Phase 1 Hero Section Functionality ===

class RentHeroSection {
    constructor() {
        this.carouselSlides = document.querySelectorAll('.carousel-slide');
        this.valueCounters = document.querySelectorAll('.value-counter');
        this.ctaButtons = {
            search: document.querySelector('.search-rentals-btn'),
            guide: document.querySelector('.rental-guide-btn')
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
        console.log('🏠 Rent Page Hero Section initialized');
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
        this.ctaButtons.search.addEventListener('click', () => {
            this.handleSearchRentals();
        });
        
        this.ctaButtons.guide.addEventListener('click', () => {
            this.handleRentalGuide();
        });
        
        // Quick search functionality
        this.setupQuickSearch();
        
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
    
    setupQuickSearch() {
        const quickSearchBtn = document.querySelector('.quick-search-bar button');
        const searchInputs = document.querySelectorAll('.quick-search-bar select');
        
        if (quickSearchBtn) {
            quickSearchBtn.addEventListener('click', () => {
                this.performQuickSearch();
            });
        }
        
        // Add enter key support
        searchInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performQuickSearch();
                }
            });
        });
    }
    
    performQuickSearch() {
        const city = document.querySelector('.quick-search-bar select:nth-child(1)').value;
        const type = document.querySelector('.quick-search-bar select:nth-child(2)').value;
        const price = document.querySelector('.quick-search-bar select:nth-child(3)').value;
        
        if (!city || !type || !price) {
            this.showSearchModal('Please fill in all search criteria to find your perfect rental home.');
            return;
        }
        
        // Simulate search process
        const btn = document.querySelector('.quick-search-bar button');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Searching...';
        btn.disabled = true;
        
        setTimeout(() => {
            // In real implementation, this would navigate to search results
            this.showSearchModal(`Found 245 rentals matching your criteria in ${city}! We're redirecting you to the search results...`);
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 2000);
        }, 1500);
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
        const trustBadges = document.querySelectorAll('.trust-badge');
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
                
                // Format number based on target
                if (targetValue === 7 || targetValue === 98) {
                    counter.textContent = Math.floor(currentValue);
                } else {
                    // For 5000, add + when reached
                    counter.textContent = Math.floor(currentValue).toLocaleString();
                    if (currentValue >= targetValue) {
                        counter.textContent += '+';
                    }
                }
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
                this.ctaButtons.search.innerHTML = '<i class="fas fa-search mr-2"></i>Search Now';
            } else {
                this.ctaButtons.search.innerHTML = '<i class="fas fa-search mr-3"></i>Search Rentals';
            }
        } else {
            ctaSection.classList.remove('scrolled');
            this.ctaButtons.search.innerHTML = '<i class="fas fa-search mr-3"></i>Search Rentals';
        }
    }
    
    handleSearchRentals() {
        const btn = this.ctaButtons.search;
        const originalHTML = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading Rentals...';
        btn.disabled = true;
        
        // Simulate API call/processing
        setTimeout(() => {
            // Scroll to search section (will be added in Phase 2)
            const searchSection = document.getElementById('rental-search');
            if (searchSection) {
                searchSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback: show search modal
                this.showSearchModal('Ready to find your perfect rental? Our comprehensive search tools will help you discover available properties across the Netherlands.');
            }
            
            // Reset button after scroll
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 1000);
            
        }, 1500);
        
        // Track conversion (in real implementation)
        console.log('Search Rentals CTA clicked - tracking conversion');
    }
    
    handleRentalGuide() {
        const btn = this.ctaButtons.guide;
        const originalHTML = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-book-open mr-2"></i>Loading Guide...';
        
        // Simulate guide loading
        setTimeout(() => {
            this.showRentalGuideModal();
            
            // Reset button
            btn.innerHTML = originalHTML;
        }, 1000);
    }
    
    showRentalGuideModal() {
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 rental-guide-modal">
                <div class="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-semibold text-gray-800">Dutch Rental Guide</h3>
                        <button class="close-modal text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="prose prose-emerald">
                        <p class="text-gray-600 mb-4">Everything you need to know about renting in the Netherlands:</p>
                        
                        <div class="grid md:grid-cols-2 gap-6 mb-6">
                            <div class="bg-emerald-50 rounded-lg p-4">
                                <h4 class="font-semibold text-emerald-800 mb-2">📋 Requirements</h4>
                                <ul class="text-sm text-emerald-700 space-y-1">
                                    <li>• Income: 3-4x monthly rent</li>
                                    <li>• Employment contract</li>
                                    <li>• BSN number</li>
                                    <li>• Bank statements</li>
                                </ul>
                            </div>
                            
                            <div class="bg-blue-50 rounded-lg p-4">
                                <h4 class="font-semibold text-blue-800 mb-2">💰 Costs</h4>
                                <ul class="text-sm text-blue-700 space-y-1">
                                    <li>• Security deposit: 1-2 months</li>
                                    <li>• Agency fees (sometimes)</li>
                                    <li>• Utilities estimate</li>
                                    <li>• Municipal taxes</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 rounded-lg p-4 mb-6">
                            <h4 class="font-semibold text-gray-800 mb-2">⚡ Quick Facts</h4>
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span class="font-semibold">Avg. Response Time:</span>
                                    <span class="text-emerald-600"> 24 hours</span>
                                </div>
                                <div>
                                    <span class="font-semibold">Move-in Time:</span>
                                    <span class="text-emerald-600"> 7 days avg.</span>
                                </div>
                                <div>
                                    <span class="font-semibold">Tenant Satisfaction:</span>
                                    <span class="text-emerald-600"> 98%</span>
                                </div>
                                <div>
                                    <span class="font-semibold">Properties Available:</span>
                                    <span class="text-emerald-600"> 5,000+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex gap-4">
                        <button class="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors download-guide-btn">
                            Download Full Guide
                        </button>
                        <button class="flex-1 border border-emerald-600 text-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
                            Talk to Expert
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners for modal
        const modal = document.querySelector('.rental-guide-modal');
        const closeBtn = modal.querySelector('.close-modal');
        const downloadBtn = modal.querySelector('.download-guide-btn');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        downloadBtn.addEventListener('click', () => {
            this.downloadRentalGuide();
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    downloadRentalGuide() {
        // Simulate guide download
        const guideContent = `
            NORDICESTATES - DUTCH RENTAL GUIDE
            ===================================
            
            QUICK FACTS:
            - Average response time: 24 hours
            - Average move-in time: 7 days
            - Tenant satisfaction: 98%
            - Active listings: 5,000+ properties
            
            INCOME REQUIREMENTS:
            - Typically 3-4x monthly rent
            - Stable employment contract
            - BSN number required
            - Bank statements (3 months)
            
            COST BREAKDOWN:
            - Security deposit: 1-2 months rent
            - Agency fees: Varies by property
            - Utilities: €150-€300/month
            - Municipal taxes: Included or separate
            
            Download full guide at: nordicestates.nl/rental-guide
        `;
        
        // Create and trigger download
        const blob = new Blob([guideContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'NordicEstates-Rental-Guide.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    showSearchModal(message) {
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 search-modal">
                <div class="bg-white rounded-2xl p-8 max-w-md w-full">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-semibold text-gray-800">Rental Search</h3>
                        <button class="close-modal text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <p class="text-gray-600">${message}</p>
                        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-home text-emerald-600 text-xl"></i>
                                <div>
                                    <div class="font-semibold text-emerald-800">5,000+ Properties</div>
                                    <div class="text-sm text-emerald-700">Available across the Netherlands</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex gap-4">
                        <button class="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors close-modal">
                            Got It
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.search-modal');
        const closeBtns = modal.querySelectorAll('.close-modal');
        
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
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
    // Initialize rent page hero section
    new RentHeroSection();
    
    console.log('🚀 Rent Page Phase 1 initialized successfully!');
});

// Export for potential use in other modules
window.RentHeroSection = RentHeroSection;