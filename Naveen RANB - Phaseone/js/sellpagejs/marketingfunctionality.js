 // === MARKETING EXCELLENCE FUNCTIONALITY ===
        
        class MarketingExcellence {
            constructor() {
                this.init();
            }
            
            init() {
                this.setupCarousel();
                this.setupBeforeAfterSlider();
                this.setupPhotoComparison();
                this.setupROICalculator();
                this.setupScrollAnimations();
                this.setupStatCounters();
                console.log('🎯 Marketing Excellence section initialized');
            }
            
            setupCarousel() {
                const track = document.querySelector('.carousel-track');
                const prevBtn = document.querySelector('.carousel-prev');
                const nextBtn = document.querySelector('.carousel-next');
                const cards = document.querySelectorAll('.portfolio-card');
                
                if (!track || !prevBtn || !nextBtn) return;
                
                let currentPosition = 0;
                const cardWidth = cards[0].offsetWidth + 24; // width + gap
                
                const updateCarousel = () => {
                    track.style.transform = `translateX(-${currentPosition}px)`;
                };
                
                nextBtn.addEventListener('click', () => {
                    const maxPosition = track.scrollWidth - track.parentElement.offsetWidth;
                    currentPosition = Math.min(currentPosition + cardWidth, maxPosition);
                    updateCarousel();
                });
                
                prevBtn.addEventListener('click', () => {
                    currentPosition = Math.max(currentPosition - cardWidth, 0);
                    updateCarousel();
                });
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    currentPosition = 0;
                    updateCarousel();
                });
            }
            
            setupBeforeAfterSlider() {
                const container = document.getElementById('staging-slider');
                if (!container) return;
                
                const handle = container.querySelector('.slider-handle');
                const beforeImage = container.querySelector('.before-image');
                
                let isDragging = false;
                
                const updateSlider = (clientX) => {
                    const rect = container.getBoundingClientRect();
                    let position = ((clientX - rect.left) / rect.width) * 100;
                    position = Math.max(0, Math.min(100, position));
                    
                    container.style.setProperty('--slider-position', `${position}%`);
                    beforeImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
                };
                
                // Mouse events
                handle.addEventListener('mousedown', () => {
                    isDragging = true;
                });
                
                document.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    updateSlider(e.clientX);
                });
                
                document.addEventListener('mouseup', () => {
                    isDragging = false;
                });
                
                // Touch events for mobile
                handle.addEventListener('touchstart', (e) => {
                    isDragging = true;
                    e.preventDefault();
                });
                
                document.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    updateSlider(e.touches[0].clientX);
                });
                
                document.addEventListener('touchend', () => {
                    isDragging = false;
                });
            }
            
            setupPhotoComparison() {
                const comparisonSliders = document.querySelectorAll('.comparison-slider');
                
                comparisonSliders.forEach(slider => {
                    const container = slider.parentElement;
                    const images = container.querySelectorAll('img');
                    
                    if (images.length < 2) return;
                    
                    slider.addEventListener('input', (e) => {
                        const value = e.target.value;
                        images[1].style.opacity = value / 100;
                    });
                });
            }
            
            setupROICalculator() {
                const propertyValueSlider = document.getElementById('property-value');
                const propertyValueDisplay = document.getElementById('property-value-display');
                const roiResult = document.getElementById('roi-result');
                const marketingOptions = document.querySelectorAll('input[name="marketing-strategy"]');
                
                if (!propertyValueSlider || !propertyValueDisplay || !roiResult) return;
                
                const formatCurrency = (value) => {
                    return new Intl.NumberFormat('nl-NL', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0
                    }).format(value);
                };
                
                const calculateROI = () => {
                    const propertyValue = parseInt(propertyValueSlider.value);
                    const selectedStrategy = document.querySelector('input[name="marketing-strategy"]:checked');
                    
                    if (!selectedStrategy) return;
                    
                    let multiplier = 0;
                    switch(selectedStrategy.value) {
                        case 'basic': multiplier = 0.05; break;
                        case 'premium': multiplier = 0.12; break;
                        case 'luxury': multiplier = 0.18; break;
                    }
                    
                    const roi = propertyValue * multiplier;
                    roiResult.textContent = formatCurrency(roi);
                };
                
                propertyValueSlider.addEventListener('input', (e) => {
                    const value = parseInt(e.target.value);
                    propertyValueDisplay.textContent = formatCurrency(value);
                    calculateROI();
                });
                
                marketingOptions.forEach(option => {
                    option.addEventListener('change', calculateROI);
                });
                
                // Initialize
                calculateROI();
            }
            
            setupScrollAnimations() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, { threshold: 0.1 });
                
                document.querySelectorAll('.fade-in-up').forEach(el => {
                    observer.observe(el);
                });
            }
            
            setupStatCounters() {
                const counters = document.querySelectorAll('.stat-counter');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateCounter(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                counters.forEach(counter => {
                    observer.observe(counter);
                });
            }
            
            animateCounter(element) {
                const target = parseInt(element.getAttribute('data-target'));
                const duration = 2000;
                const steps = 60;
                const stepValue = target / steps;
                const stepTime = duration / steps;
                
                let currentValue = 0;
                const timer = setInterval(() => {
                    currentValue += stepValue;
                    if (currentValue >= target) {
                        currentValue = target;
                        clearInterval(timer);
                    }
                    
                    element.textContent = Math.floor(currentValue) + (target > 100 ? '+' : '%');
                    element.classList.add('animated');
                }, stepTime);
            }
        }
        
        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            new MarketingExcellence();
            console.log('🚀 Marketing Excellence section loaded successfully!');
        });