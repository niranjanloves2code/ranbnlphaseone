// === PHASE 2: Complete Property Filter System ===

class PropertyFilterSystem {
    constructor() {
        this.properties = [];
        this.filteredProperties = [];
        this.filters = {
            location: 'all',
            minPrice: 0,
            maxPrice: 999999999,
            propertyType: 'all',
            bedrooms: 'all',
            features: [],
            sortBy: 'newest'
        };
        this.currentView = 'grid';
        this.currentPage = 1;
        this.propertiesPerPage = 6;
        
        this.init();
    }
    
    init() {
        this.loadSampleProperties();
        this.setupEventListeners();
        this.applyFilters();
        console.log('🏠 Property Filter System initialized');
    }
    
    loadSampleProperties() {
        // Comprehensive sample data matching your screenshot
        this.properties = [
            {
                id: 1,
                title: "Nordic Light Villa",
                location: "amsterdam",
                address: "Jordaan, Amsterdam",
                price: 850000,
                beds: 3,
                baths: 2,
                size: 180,
                type: "villa",
                status: "sale",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                features: ["garden", "parking", "balcony"],
                dateAdded: "2024-01-15"
            },
            {
                id: 2,
                title: "Harbor View Residence",
                location: "rotterdam",
                address: "Kop van Zuid, Rotterdam",
                price: 1200000,
                beds: 4,
                baths: 3,
                size: 240,
                type: "apartment",
                status: "sale",
                image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                features: ["parking", "balcony"],
                dateAdded: "2024-01-10"
            },
            {
                id: 3,
                title: "Forest Retreat Cabin",
                location: "utrecht",
                address: "Forest Area, Utrecht",
                price: 2500,
                beds: 2,
                baths: 1,
                size: 120,
                type: "house",
                status: "rent",
                image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                features: ["garden", "furnished"],
                dateAdded: "2024-01-12"
            },
            {
                id: 4,
                title: "Modern Canal Apartment",
                location: "amsterdam",
                address: "Grachtengordel, Amsterdam",
                price: 650000,
                beds: 2,
                baths: 1,
                size: 85,
                type: "apartment",
                status: "sale",
                image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                features: ["balcony"],
                dateAdded: "2024-01-08"
            },
            {
                id: 5,
                title: "City Center Penthouse",
                location: "the-hague",
                address: "Centrum, The Hague",
                price: 950000,
                beds: 3,
                baths: 2,
                size: 150,
                type: "apartment",
                status: "sale",
                image: "https://images.unsplash.com/photo-1600607687559-1a2c0e0e0a0a?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                features: ["parking", "balcony", "furnished"],
                dateAdded: "2024-01-05"
            },
            {
                id: 6,
                title: "Garden Family Home",
                location: "rotterdam",
                address: "Kralingen, Rotterdam",
                price: 750000,
                beds: 4,
                baths: 2,
                size: 160,
                type: "house",
                status: "sale",
                image: "https://images.unsplash.com/photo-1600585154340-9633f73c85da?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                features: ["garden", "parking"],
                dateAdded: "2024-01-03"
            },
            // Add more properties to reach 24...
            {
                id: 7,
                title: "Luxury Waterfront Villa",
                location: "amsterdam",
                address: "Amstel, Amsterdam",
                price: 2200000,
                beds: 5,
                baths: 4,
                size: 320,
                type: "villa",
                status: "sale",
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                features: ["garden", "parking", "balcony"],
                dateAdded: "2024-01-20"
            },
            {
                id: 8,
                title: "Studio Apartment Central",
                location: "utrecht",
                address: "Centrum, Utrecht",
                price: 1800,
                beds: 1,
                baths: 1,
                size: 45,
                type: "apartment",
                status: "rent",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                features: ["furnished"],
                dateAdded: "2024-01-18"
            }
        ];
        
        // Add more properties to make it 24 total
        for (let i = 9; i <= 24; i++) {
            this.properties.push({
                id: i,
                title: `Property ${i}`,
                location: ["amsterdam", "rotterdam", "the-hague", "utrecht"][Math.floor(Math.random() * 4)],
                address: `Location ${i}`,
                price: [250000, 450000, 650000, 850000, 1200000, 2500, 1800][Math.floor(Math.random() * 7)],
                beds: Math.floor(Math.random() * 4) + 1,
                baths: Math.floor(Math.random() * 3) + 1,
                size: Math.floor(Math.random() * 200) + 50,
                type: ["apartment", "house", "villa"][Math.floor(Math.random() * 3)],
                status: Math.random() > 0.3 ? "sale" : "rent",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                features: ["garden", "parking", "balcony", "furnished"].filter(() => Math.random() > 0.5),
                dateAdded: `2024-01-${Math.floor(Math.random() * 20) + 1}`
            });
        }
    }
    
    setupEventListeners() {
        // Location filter buttons
        document.querySelectorAll('.location-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleLocationFilter(e.target.closest('button').dataset.location);
            });
        });
        
        // Price filters
        document.querySelectorAll('.price-min-filter, .price-max-filter').forEach(select => {
            select.addEventListener('change', (e) => {
                const type = e.target.classList.contains('price-min-filter') ? 'minPrice' : 'maxPrice';
                this.filters[type] = parseInt(e.target.value);
                this.debouncedApplyFilters();
            });
        });
        
        // Property type filters
        document.querySelectorAll('.property-type-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handlePropertyTypeFilter(e.target.closest('button').dataset.type);
            });
        });
        
        // Bedroom filters
        document.querySelectorAll('.bedroom-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleBedroomFilter(e.target.closest('button').dataset.bedrooms);
            });
        });
        
        // Feature filters
        document.querySelectorAll('.feature-filter').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const feature = e.target.dataset.feature;
                if (e.target.checked) {
                    this.filters.features.push(feature);
                } else {
                    this.filters.features = this.filters.features.filter(f => f !== feature);
                }
                this.debouncedApplyFilters();
            });
        });
        
        // Apply filters button
        document.querySelector('.apply-filters-btn').addEventListener('click', () => {
            this.applyFilters();
        });
        
        // Sort functionality
        document.querySelector('.sort-select').addEventListener('change', (e) => {
            this.filters.sortBy = e.target.value;
            this.applyFilters();
        });
        
        // View toggle
        document.querySelectorAll('.view-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleViewToggle(e.target.closest('button').dataset.view);
            });
        });
        
        // Load more button
        document.querySelector('.load-more-btn').addEventListener('click', () => {
            this.loadMoreProperties();
        });
        
        // Clear all filters
        document.querySelector('.clear-all-filters-btn')?.addEventListener('click', () => {
            this.clearAllFilters();
        });
        
        // Debounce for performance
        this.debouncedApplyFilters = this.debounce(this.applyFilters.bind(this), 300);
    }
    
    handleLocationFilter(location) {
        this.filters.location = location;
        this.updateLocationButtons(location);
        this.applyFilters();
    }
    
    handlePropertyTypeFilter(type) {
        this.filters.propertyType = type;
        this.updatePropertyTypeButtons(type);
        this.applyFilters();
    }
    
    handleBedroomFilter(bedrooms) {
        this.filters.bedrooms = bedrooms;
        this.updateBedroomButtons(bedrooms);
        this.applyFilters();
    }
    
    handleViewToggle(view) {
        this.currentView = view;
        this.updateViewToggleButtons(view);
        this.renderProperties();
    }
    
    updateLocationButtons(activeLocation) {
        document.querySelectorAll('.location-filter-btn').forEach(btn => {
            const location = btn.dataset.location;
            btn.classList.toggle('active', location === activeLocation);
            btn.classList.toggle('bg-emerald-600', location === activeLocation);
            btn.classList.toggle('text-white', location === activeLocation);
            btn.classList.toggle('bg-white', location !== activeLocation);
            btn.classList.toggle('text-gray-700', location !== activeLocation);
        });
    }
    
    updatePropertyTypeButtons(activeType) {
        document.querySelectorAll('.property-type-filter-btn').forEach(btn => {
            const type = btn.dataset.type;
            btn.classList.toggle('active', type === activeType);
            btn.classList.toggle('bg-emerald-600', type === activeType);
            btn.classList.toggle('text-white', type === activeType);
            btn.classList.toggle('bg-white', type !== activeType);
            btn.classList.toggle('text-gray-700', type !== activeType);
        });
    }
    
    updateBedroomButtons(activeBedrooms) {
        document.querySelectorAll('.bedroom-filter-btn').forEach(btn => {
            const bedrooms = btn.dataset.bedrooms;
            btn.classList.toggle('active', bedrooms === activeBedrooms);
            btn.classList.toggle('bg-emerald-600', bedrooms === activeBedrooms);
            btn.classList.toggle('text-white', bedrooms === activeBedrooms);
            btn.classList.toggle('bg-white', bedrooms !== activeBedrooms);
            btn.classList.toggle('text-gray-700', bedrooms !== activeBedrooms);
        });
    }
    
    updateViewToggleButtons(activeView) {
        document.querySelectorAll('.view-toggle-btn').forEach(btn => {
            const view = btn.dataset.view;
            btn.classList.toggle('active', view === activeView);
        });
    }
    
    applyFilters() {
        this.currentPage = 1;
        this.filterProperties();
        this.sortProperties();
        this.renderProperties();
        this.updateUI();
    }
    
    filterProperties() {
        this.filteredProperties = this.properties.filter(property => {
            // Location filter
            if (this.filters.location !== 'all' && property.location !== this.filters.location) {
                return false;
            }
            
            // Price filter
            if (property.price < this.filters.minPrice || property.price > this.filters.maxPrice) {
                return false;
            }
            
            // Property type filter
            if (this.filters.propertyType !== 'all' && property.type !== this.filters.propertyType) {
                return false;
            }
            
            // Bedrooms filter
            if (this.filters.bedrooms !== 'all' && property.beds < parseInt(this.filters.bedrooms)) {
                return false;
            }
            
            // Features filter
            if (this.filters.features.length > 0) {
                const hasAllFeatures = this.filters.features.every(feature => 
                    property.features.includes(feature)
                );
                if (!hasAllFeatures) return false;
            }
            
            return true;
        });
    }
    
    sortProperties() {
        switch (this.filters.sortBy) {
            case 'price-low':
                this.filteredProperties.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProperties.sort((a, b) => b.price - a.price);
                break;
            case 'size-large':
                this.filteredProperties.sort((a, b) => b.size - a.size);
                break;
            case 'newest':
            default:
                this.filteredProperties.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
        }
    }
    
    renderProperties() {
        const container = document.getElementById('property-results');
        const noResults = document.querySelector('.no-results-message');
        const loadMoreContainer = document.querySelector('.load-more-container');
        
        container.innerHTML = '';
        
        if (this.filteredProperties.length === 0) {
            container.classList.add('hidden');
            noResults.classList.remove('hidden');
            loadMoreContainer.classList.add('hidden');
            return;
        }
        
        container.classList.remove('hidden');
        noResults.classList.add('hidden');
        
        const startIndex = 0;
        const endIndex = this.currentPage * this.propertiesPerPage;
        const propertiesToShow = this.filteredProperties.slice(startIndex, endIndex);
        
        propertiesToShow.forEach((property, index) => {
            const card = this.createPropertyCard(property, index);
            container.appendChild(card);
        });
        
        // Show/hide load more button
        loadMoreContainer.classList.toggle('hidden', endIndex >= this.filteredProperties.length);
        
        // Initialize animations
        this.initializeCardAnimations();
    }
    
    createPropertyCard(property, index) {
        const card = document.createElement('div');
        card.className = `property-card ${this.currentView === 'list' ? 'flex' : ''}`;
        card.style.animationDelay = `${index * 0.1}s`;
        
        const isRent = property.status === 'rent';
        const priceDisplay = isRent ? 
            `${this.formatPrice(property.price)}/mo` : 
            this.formatPrice(property.price);
        
        const badgeClass = isRent ? 'status-rent' : 'status-sale';
        const badgeText = isRent ? 'For Rent' : 'For Sale';
        
        card.innerHTML = `
            <div class="${this.currentView === 'list' ? 'w-1/3' : ''} relative overflow-hidden">
                <img src="${property.image}" alt="${property.title}" 
                     class="property-image w-full ${this.currentView === 'list' ? 'h-full' : 'h-48'} object-cover">
                <div class="status-badge ${badgeClass}">${badgeText}</div>
                <div class="location-badge">${this.getLocationName(property.location)}</div>
            </div>
            <div class="${this.currentView === 'list' ? 'w-2/3' : ''} p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${property.title}</h3>
                <p class="text-gray-600 mb-4 flex items-center">
                    <i class="fas fa-map-marker-alt text-emerald-600 mr-2"></i>
                    ${property.address}
                </p>
                <div class="flex justify-between items-center mb-4 text-sm text-gray-600 ${this.currentView === 'list' ? 'w-2/3' : ''}">
                    <div class="flex items-center">
                        <i class="fas fa-bed mr-2"></i>
                        <span>${property.beds} Bed${property.beds !== 1 ? 's' : ''}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-bath mr-2"></i>
                        <span>${property.baths} Bath${property.baths !== 1 ? 's' : ''}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-ruler-combined mr-2"></i>
                        <span>${property.size}m²</span>
                    </div>
                </div>
                <div class="flex justify-between items-center ${this.currentView === 'list' ? 'w-2/3' : ''}">
                    <div class="text-2xl font-bold text-emerald-600">${priceDisplay}</div>
                    <button class="view-details-btn bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300" 
                            data-id="${property.id}">
                        View Details
                    </button>
                </div>
            </div>
        `;
        
        // Add click event to view details button
        const viewBtn = card.querySelector('.view-details-btn');
        viewBtn.addEventListener('click', () => {
            this.viewPropertyDetails(property.id);
        });
        
        return card;
    }
    
    viewPropertyDetails(propertyId) {
        const property = this.properties.find(p => p.id === propertyId);
        if (property) {
            alert(`Viewing details for: ${property.title}\nPrice: ${this.formatPrice(property.price)}${property.status === 'rent' ? '/month' : ''}\nLocation: ${property.address}`);
            // In real implementation, this would open a modal or navigate to detail page
        }
    }
    
    loadMoreProperties() {
        this.currentPage++;
        this.renderProperties();
    }
    
    updateUI() {
        // Update property count
        document.querySelector('.properties-count').textContent = 
            `${this.filteredProperties.length} ${this.filteredProperties.length === 1 ? 'Property' : 'Properties'} Found`;
        
        // Update location display
        document.querySelector('.location-display').textContent = 
            `Showing properties in ${this.getLocationName(this.filters.location)}`;
        
        // Update filter counts (simplified - in real app you'd calculate these)
        this.updateFilterCounts();
    }
    
    updateFilterCounts() {
        // This would calculate actual counts per filter in a real application
        const locationCounts = {
            'all': this.properties.length,
            'amsterdam': this.properties.filter(p => p.location === 'amsterdam').length,
            'rotterdam': this.properties.filter(p => p.location === 'rotterdam').length,
            'the-hague': this.properties.filter(p => p.location === 'the-hague').length,
            'utrecht': this.properties.filter(p => p.location === 'utrecht').length
        };
        
        document.querySelectorAll('.location-filter-btn').forEach(btn => {
            const location = btn.dataset.location;
            const countSpan = btn.querySelector('span:last-child');
            if (countSpan) {
                countSpan.textContent = locationCounts[location] || 0;
            }
        });
    }
    
    clearAllFilters() {
        // Reset filters
        this.filters = {
            location: 'all',
            minPrice: 0,
            maxPrice: 999999999,
            propertyType: 'all',
            bedrooms: 'all',
            features: [],
            sortBy: 'newest'
        };
        
        // Reset UI elements
        this.updateLocationButtons('all');
        this.updatePropertyTypeButtons('all');
        this.updateBedroomButtons('all');
        
        // Reset form elements
        document.querySelector('.price-min-filter').value = '0';
        document.querySelector('.price-max-filter').value = '999999999';
        document.querySelector('.sort-select').value = 'newest';
        
        document.querySelectorAll('.feature-filter').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Re-apply filters
        this.applyFilters();
    }
    
    getLocationName(location) {
        const names = {
            'all': 'all locations',
            'amsterdam': 'Amsterdam',
            'rotterdam': 'Rotterdam',
            'the-hague': 'The Hague',
            'utrecht': 'Utrecht'
        };
        return names[location] || location;
    }
    
    formatPrice(price) {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(price);
    }
    
    initializeCardAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.property-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing components
    new MegaMenu();
    new NavigationManager();
    
    // Initialize property filter system
    new PropertyFilterSystem();
    
    console.log('🚀 NordicEstates Buy Page with Advanced Filters initialized!');
});