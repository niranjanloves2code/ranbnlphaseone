// === RENTAL TYPES SHOWCASE FUNCTIONALITY ===

class RentalTypesShowcase {
    constructor() {
        this.categories = {
            expat: {
                title: 'EXPAT RENTALS',
                description: 'Seamless transition for international professionals with full support services',
                filters: {
                    furnishing: 'furnished',
                    propertyTypes: ['apartment'],
                    amenities: ['furnished', 'utilities-included']
                }
            },
            student: {
                title: 'STUDENT HOUSING',
                description: 'Affordable living solutions near universities with vibrant student communities',
                filters: {
                    priceMax: 800,
                    propertyTypes: ['room', 'studio'],
                    amenities: ['shared-kitchen', 'study-area']
                }
            },
            family: {
                title: 'FAMILY HOMES',
                description: 'Spacious properties in family-friendly neighborhoods with excellent amenities',
                filters: {
                    bedrooms: '3',
                    propertyTypes: ['house'],
                    amenities: ['garden', 'parking']
                }
            },
            luxury: {
                title: 'LUXURY APARTMENTS',
                description: 'Premium living experiences with exceptional amenities and services',
                filters: {
                    priceMin: 2500,
                    amenities: ['concierge', 'gym', 'pool']
                }
            },
            social: {
                title: 'SOCIAL HOUSING',
                description: 'Affordable housing solutions through government-supported programs',
                filters: {
                    priceMax: 1000,
                    rentalPeriod: 'long-term'
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupScrollAnimations();
        console.log('🏠 Rental Types Showcase initialized');
    }
    
    cacheElements() {
        this.categoryCards = document.querySelectorAll('.category-card');
        this.ctaButtons = document.querySelectorAll('.category-cta');
        this.quickFilterModal = document.getElementById('quick-filter-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalDescription = document.getElementById('modal-description');
        this.confirmFilterBtn = document.querySelector('.confirm-filter-btn');
        this.closeModalBtns = document.querySelectorAll('.close-modal');
    }
    
    setupEventListeners() {
        // CTA button clicks
        this.ctaButtons.forEach(button => {
            if (!button.classList.contains('disabled')) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const category = button.dataset.category;
                    this.handleCategorySelection(category);
                });
            }
        });
        
        // Category card clicks (for accessibility)
        this.categoryCards.forEach(card => {
            if (!card.classList.contains('coming-soon')) {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.category-cta')) {
                        const category = card.dataset.category;
                        this.handleCategorySelection(category);
                    }
                });
                
                // Keyboard navigation
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const category = card.dataset.category;
                        this.handleCategorySelection(category);
                    }
                });
            }
        });
        
        // Modal interactions
        this.confirmFilterBtn.addEventListener('click', () => {
            this.applyCategoryFilters();
        });
        
        this.closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeQuickFilterModal();
            });
        });
        
        this.quickFilterModal.addEventListener('click', (e) => {
            if (e.target === this.quickFilterModal) {
                this.closeQuickFilterModal();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.quickFilterModal.classList.contains('hidden')) {
                this.closeQuickFilterModal();
            }
        });
    }
    
    handleCategorySelection(category) {
        const categoryData = this.categories[category];
        
        if (categoryData) {
            this.showQuickFilterModal(categoryData);
        }
    }
    
    showQuickFilterModal(categoryData) {
        this.modalTitle.textContent = `Browse ${categoryData.title}`;
        this.modalDescription.textContent = categoryData.description;
        this.currentCategory = categoryData;
        
        this.quickFilterModal.classList.remove('hidden');
        
        // Add entrance animation
        setTimeout(() => {
            this.quickFilterModal.querySelector('.bg-white').style.transform = 'scale(1)';
            this.quickFilterModal.querySelector('.bg-white').style.opacity = '1';
        }, 10);
    }
    
    closeQuickFilterModal() {
        this.quickFilterModal.querySelector('.bg-white').style.transform = 'scale(0.95)';
        this.quickFilterModal.querySelector('.bg-white').style.opacity = '0';
        
        setTimeout(() => {
            this.quickFilterModal.classList.add('hidden');
        }, 300);
    }
    
    applyCategoryFilters() {
        if (this.currentCategory) {
            console.log('Applying filters for:', this.currentCategory.title);
            console.log('Filters:', this.currentCategory.filters);
            
            // In a real implementation, this would:
            // 1. Store the filters in a global state
            // 2. Navigate to the search page with pre-applied filters
            // 3. Or update an existing search component
            
            this.showNotification(`Filters applied for ${this.currentCategory.title}`, 'success');
            
            // Simulate navigation to search page
            setTimeout(() => {
                window.location.href = `rent.html?category=${this.currentCategory.title.toLowerCase().replace(' ', '-')}`;
            }, 1000);
        }
        
        this.closeQuickFilterModal();
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
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
        
        // Stagger animation for category cards
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        this.categoryCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            cardObserver.observe(card);
        });
    }
    
    // Utility method to format category names
    formatCategoryName(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
}

// Initialize the rental types showcase when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RentalTypesShowcase();
    
    // Add tabindex for keyboard accessibility
    document.querySelectorAll('.category-card').forEach(card => {
        if (!card.classList.contains('coming-soon')) {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Browse ${card.dataset.category} rentals`);
        }
    });
});

// Additional utility functions
const RentalTypesUtils = {
    // Method to get category statistics (could be fetched from API)
    getCategoryStats: async (category) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const stats = {
                    expat: { available: 1234, averagePrice: 1200 },
                    student: { available: 2567, averagePrice: 450 },
                    family: { available: 1890, averagePrice: 1800 },
                    luxury: { available: 567, averagePrice: 3500 },
                    social: { available: 3421, averagePrice: 750 }
                };
                resolve(stats[category] || { available: 0, averagePrice: 0 });
            }, 300);
        });
    },
    
    // Method to preload category images for better performance
    preloadImages: () => {
        const images = [
            'https://images.unsplash.com/photo-1555854871-d5c0d7e29e88?ixlib=rb-4.0.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.1&auto=format&fit=crop&w=600&q=80'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
};

// Preload images when the page loads
window.addEventListener('load', () => {
    RentalTypesUtils.preloadImages();
});