// === PHASE 4: Featured Neighborhoods Carousel System ===

class NeighborhoodCarousel {
    constructor() {
        this.carousel = document.getElementById('neighborhood-carousel');
        this.prevBtn = document.querySelector('.neighborhood-prev');
        this.nextBtn = document.querySelector('.neighborhood-next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.neighborhoods = [];
        this.currentIndex = 0;
        this.autoScrollInterval = null;
        this.isAutoScrolling = true;
        this.scrollAmount = 380 + 24; // card width + gap
        
        this.init();
    }
    
    init() {
        this.loadNeighborhoods();
        this.setupEventListeners();
        this.startAutoScroll();
        this.setupIntersectionObserver();
        console.log('🏘️ Neighborhood Carousel initialized');
    }
    
    loadNeighborhoods() {
        this.neighborhoods = [
            {
                id: 1,
                name: "Jordaan, Amsterdam",
                image: "https://images.unsplash.com/photo-1542988538-eead3f3a040a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
                price: "€850,000 avg.",
                description: "Historic canals, trendy boutiques, and charming cafes in the heart of Amsterdam.",
                properties: 234,
                highlights: ["Canals", "Boutiques", "Cafes", "Historic"],
                avgPrice: 850000,
                popularity: 95
            },
            {
                id: 2,
                name: "Kop van Zuid, Rotterdam",
                image: "https://cdn-cms.bookingexperts.com/media/611/3/optimized.jpg",
                price: "€650,000 avg.",
                description: "Modern architecture, waterfront living, and vibrant cultural scene.",
                properties: 156,
                highlights: ["Modern", "Waterfront", "Cultural", "Skyline"],
                avgPrice: 650000,
                popularity: 88
            },
            {
                id: 3,
                name: "Statenkwartier, The Hague",
                image: "https://realting.com/uploads/thumbs/c1e/99b4bedee94d88015f86b6b3c25f6.webp",
                price: "€720,000 avg.",
                description: "Upscale residential area with international schools and embassy district.",
                properties: 89,
                highlights: ["Upscale", "International", "Embassies", "Parks"],
                avgPrice: 720000,
                popularity: 82
            },
            {
                id: 4,
                name: "Museumkwartier, Utrecht",
                image: "https://www.holland.com/upload_mm/4/1/5/80634_fullimage_utrecht%20rietveld%20schroderhuis%20%C2%A9%20merel%20tuk%20via%20nbtc.jpg",
                price: "€580,000 avg.",
                description: "Cultural hub with museums, universities, and beautiful canals.",
                properties: 167,
                highlights: ["Cultural", "Student", "Canals", "Museums"],
                avgPrice: 580000,
                popularity: 78
            },
            {
                id: 5,
                name: "Strijp-S, Eindhoven",
                image: "https://vormliving.com/content/uploads/2022/11/LeSagetenBroeklaan1517Eindhoven10-1-768x512.jpg",
                price: "€490,000 avg.",
                description: "Creative district with innovative startups and industrial heritage.",
                properties: 123,
                highlights: ["Creative", "Innovation", "Startups", "Design"],
                avgPrice: 490000,
                popularity: 75
            },
            {
                id: 6,
                name: "De Pijp, Amsterdam",
                image: "https://www.marmol-radziner.com/wp-content/uploads/2017/10/02_Villa_Buitenveldert_%C2%A9Ossip-copy-400x245.jpg",
                price: "€710,000 avg.",
                description: "Bohemian vibe with street markets, cafes, and artistic community.",
                properties: 198,
                highlights: ["Bohemian", "Markets", "Artistic", "Vibrant"],
                avgPrice: 710000,
                popularity: 90
            }
        ];
        
        this.renderCarousel();
        this.createIndicators();
    }
    
    renderCarousel() {
        this.carousel.innerHTML = '';
        
        this.neighborhoods.forEach((neighborhood, index) => {
            const card = this.createNeighborhoodCard(neighborhood, index);
            this.carousel.appendChild(card);
        });
        
        this.initializeCardAnimations();
    }
    
    createNeighborhoodCard(neighborhood, index) {
        const card = document.createElement('div');
        card.className = `neighborhood-card bg-white rounded-2xl overflow-hidden shadow-lg flex-shrink-0`;
        card.dataset.index = index;
        card.style.animationDelay = `${index * 0.1}s`;
        
        const popularityColor = this.getPopularityColor(neighborhood.popularity);
        
        card.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${neighborhood.image}" alt="${neighborhood.name}" 
                     class="neighborhood-image w-full object-cover">
                <div class="neighborhood-overlay absolute inset-0"></div>
                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 class="text-xl font-semibold mb-2">${neighborhood.name}</h3>
                    <div class="neighborhood-price text-emerald-300 font-semibold text-lg">${neighborhood.price}</div>
                </div>
                <div class="absolute top-4 right-4 property-count text-gray-700 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                    ${neighborhood.properties} properties
                </div>
                <div class="absolute top-4 left-4">
                    <div class="popularity-badge ${popularityColor} text-white px-2 py-1 rounded-full text-xs font-semibold">
                        ${neighborhood.popularity}% Popular
                    </div>
                </div>
            </div>
            <div class="p-6">
                <p class="text-gray-600 mb-4 leading-relaxed">${neighborhood.description}</p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${neighborhood.highlights.map(highlight => 
                        `<span class="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">${highlight}</span>`
                    ).join('')}
                </div>
                
                <div class="flex justify-between items-center">
                    <div class="text-sm text-gray-500">
                        <i class="fas fa-home mr-1"></i>
                        ${neighborhood.properties} available
                    </div>
                    <button class="explore-neighborhood bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-300 text-sm"
                            data-neighborhood="${neighborhood.id}">
                        Explore <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        const exploreBtn = card.querySelector('.explore-neighborhood');
        exploreBtn.addEventListener('click', () => {
            this.exploreNeighborhood(neighborhood.id);
        });
        
        // Add hover pause for auto-scroll
        card.addEventListener('mouseenter', () => {
            this.pauseAutoScroll();
        });
        
        card.addEventListener('mouseleave', () => {
            this.resumeAutoScroll();
        });
        
        return card;
    }
    
    getPopularityColor(popularity) {
        if (popularity >= 90) return 'bg-red-500';
        if (popularity >= 80) return 'bg-orange-500';
        if (popularity >= 70) return 'bg-emerald-500';
        return 'bg-gray-500';
    }
    
    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        
        this.neighborhoods.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
            this.indicatorsContainer.appendChild(indicator);
        });
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.setupTouchEvents();
        
        // Intersection observer for auto-play
        this.setupAutoPlayObserver();
    }
    
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.pauseAutoScroll();
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchend', () => {
            const diff = startX - endX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            this.resumeAutoScroll();
        });
    }
    
    setupAutoPlayObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.resumeAutoScroll();
                } else {
                    this.pauseAutoScroll();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(this.carousel);
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.neighborhood-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    prevSlide() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.neighborhoods.length - 1;
        this.updateCarousel();
    }
    
    nextSlide() {
        this.currentIndex = this.currentIndex < this.neighborhoods.length - 1 ? this.currentIndex + 1 : 0;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const scrollPosition = this.currentIndex * this.scrollAmount;
        this.carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active indicator
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update active card
        document.querySelectorAll('.neighborhood-card').forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            if (this.isAutoScrolling) {
                this.nextSlide();
            }
        }, 4000); // Change slide every 4 seconds
    }
    
    pauseAutoScroll() {
        this.isAutoScrolling = false;
    }
    
    resumeAutoScroll() {
        this.isAutoScrolling = true;
    }
    
    exploreNeighborhood(neighborhoodId) {
        const neighborhood = this.neighborhoods.find(n => n.id === neighborhoodId);
        if (neighborhood) {
            // Show neighborhood details (in real implementation, this could open a modal or filter properties)
            console.log(`Exploring: ${neighborhood.name}`);
            
            // Update property filters to show this neighborhood
            const filterSystem = window.propertyFilterSystem;
            if (filterSystem) {
                filterSystem.handleLocationFilter(neighborhood.name.toLowerCase().split(',')[0]);
                
                // Scroll to properties section
                document.getElementById('property-search').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
            
            // Visual feedback
            const button = document.querySelector(`[data-neighborhood="${neighborhoodId}"]`);
            if (button) {
                button.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Loading...';
                setTimeout(() => {
                    button.innerHTML = 'Explore <i class="fas fa-arrow-right ml-1"></i>';
                }, 1500);
            }
        }
    }
    
    initializeCardAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.neighborhood-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    // Method to filter neighborhoods by city
    filterByCity(city) {
        const filtered = this.neighborhoods.filter(neighborhood => 
            neighborhood.name.toLowerCase().includes(city.toLowerCase())
        );
        // This could be extended to update the carousel with filtered results
        return filtered;
    }
    
    // Cleanup method
    destroy() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }
}

// Update the main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing components
    new MegaMenu();
    new NavigationManager();
    
    // Initialize property filter system and make it globally accessible
    window.propertyFilterSystem = new PropertyFilterSystem();
    
    // Initialize buying process timeline
    new BuyingProcessTimeline();
    
    // Initialize neighborhoods carousel
    new NeighborhoodCarousel();
    
    console.log('🚀 NordicEstates Buy Page with Neighborhood Carousel initialized!');
});

// Make neighborhood filtering available globally
window.filterNeighborhoods = function(city) {
    const carousel = window.neighborhoodCarousel;
    if (carousel) {
        return carousel.filterByCity(city);
    }
};