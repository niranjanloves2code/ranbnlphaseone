  // === RENT PAGE: Phase 2 Advanced Search Functionality ===

class RentalSearch {
    constructor() {
        this.properties = [];
        this.filteredProperties = [];
        this.currentFilters = {
            city: '',
            neighborhoods: [],
            priceMin: 800,
            priceMax: 4000,
            propertyTypes: ['apartment', 'house', 'studio', 'room'],
            furnishing: 'any',
            bedrooms: 'any',
            sizeMin: 20,
            sizeMax: 200,
            rentalPeriod: 'any',
            availableDate: '',
            availability: 'any',
            amenities: []
        };
        this.currentView = 'grid';
        this.currentPage = 1;
        this.propertiesPerPage = 9;
        this.savedSearches = new Set();
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.generateSampleData();
        this.applyFilters();
        this.setupScrollAnimations();
        this.loadSavedSearches();
        console.log('🔍 Rental Search system initialized');
    }
    
    cacheElements() {
        // Filter elements
        this.cityFilter = document.getElementById('city-filter');
        this.neighborhoodMap = document.getElementById('neighborhood-map');
        this.neighborhoodOptions = document.getElementById('neighborhood-options');
        this.priceMin = document.getElementById('price-min');
        this.priceMax = document.getElementById('price-max');
        this.minPriceDisplay = document.getElementById('min-price-display');
        this.maxPriceDisplay = document.getElementById('max-price-display');
        this.sizeMin = document.getElementById('size-min');
        this.sizeMax = document.getElementById('size-max');
        this.minSizeDisplay = document.getElementById('min-size-display');
        this.maxSizeDisplay = document.getElementById('max-size-display');
        
        // Action elements
        this.toggleAdvancedBtn = document.getElementById('toggle-advanced-filters');
        this.advancedFilters = document.querySelector('.advanced-filters');
        this.applyFiltersBtn = document.querySelector('.apply-filters-btn');
        this.resetFiltersBtn = document.querySelector('.reset-filters-btn');
        this.saveSearchBtn = document.querySelector('.save-search-btn');
        
        // Results elements
        this.resultsCount = document.getElementById('results-count');
        this.activeFiltersContainer = document.getElementById('active-filters');
        this.propertiesGrid = document.getElementById('properties-grid');
        this.loadingState = document.getElementById('loading-state');
        this.noResultsState = document.getElementById('no-results');
        this.pagination = document.getElementById('pagination');
        
        // View elements
        this.viewBtns = document.querySelectorAll('.view-btn');
        this.sortSelect = document.querySelector('.sort-select');
        
        // Modal elements
        this.quickApplyModal = document.getElementById('quick-apply-modal');
    }
    
    setupEventListeners() {
        // City filter with neighborhood map
        this.cityFilter.addEventListener('change', (e) => {
            this.handleCityChange(e.target.value);
        });
        
        // Price range sliders
        this.setupRangeSliders();
        
        // Property type checkboxes
        document.querySelectorAll('input[name="property-type"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updatePropertyTypes();
            });
        });
        
        // Furnishing radios
        document.querySelectorAll('input[name="furnishing"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentFilters.furnishing = e.target.value;
                this.debouncedApplyFilters();
            });
        });
        
        // Bedroom buttons
        document.querySelectorAll('.bedroom-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleBedroomSelect(e.target.closest('.bedroom-btn'));
            });
        });
        
        // Size range sliders
        this.setupSizeSliders();
        
        // Rental period radios
        document.querySelectorAll('input[name="rental-period"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentFilters.rentalPeriod = e.target.value;
                this.debouncedApplyFilters();
            });
        });
        
        // Availability radios
        document.querySelectorAll('input[name="availability"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentFilters.availability = e.target.value;
                this.debouncedApplyFilters();
            });
        });
        
        // Amenities checkboxes
        document.querySelectorAll('input[name="amenities"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateAmenities();
            });
        });
        
        // Available date
        const availableDate = document.getElementById('available-date');
        if (availableDate) {
            availableDate.addEventListener('change', (e) => {
                this.currentFilters.availableDate = e.target.value;
                this.debouncedApplyFilters();
            });
        }
        
        // Action buttons
        this.toggleAdvancedBtn.addEventListener('click', () => {
            this.toggleAdvancedFilters();
        });
        
        this.applyFiltersBtn.addEventListener('click', () => {
            this.applyFilters();
        });
        
        this.resetFiltersBtn.addEventListener('click', () => {
            this.resetFilters();
        });
        
        this.saveSearchBtn.addEventListener('click', () => {
            this.saveSearch();
        });
        
        // View controls
        this.viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeView(e.target.closest('.view-btn').dataset.view);
            });
        });
        
        // Sort control
        this.sortSelect.addEventListener('change', (e) => {
            this.sortProperties(e.target.value);
        });
        
        // Quick apply modal
        this.setupQuickApplyModal();
    }
    
    setupRangeSliders() {
        // Price range dual slider
        const priceMin = this.priceMin;
        const priceMax = this.priceMax;
        
        const updatePriceDisplay = () => {
            this.minPriceDisplay.textContent = priceMin.value;
            this.maxPriceDisplay.textContent = priceMax.value;
            this.currentFilters.priceMin = parseInt(priceMin.value);
            this.currentFilters.priceMax = parseInt(priceMax.value);
            this.debouncedApplyFilters();
        };
        
        priceMin.addEventListener('input', () => {
            if (parseInt(priceMin.value) > parseInt(priceMax.value)) {
                priceMax.value = priceMin.value;
            }
            updatePriceDisplay();
        });
        
        priceMax.addEventListener('input', () => {
            if (parseInt(priceMax.value) < parseInt(priceMin.value)) {
                priceMin.value = priceMax.value;
            }
            updatePriceDisplay();
        });
    }
    
    setupSizeSliders() {
        // Size range dual slider
        const sizeMin = this.sizeMin;
        const sizeMax = this.sizeMax;
        
        const updateSizeDisplay = () => {
            this.minSizeDisplay.textContent = sizeMin.value;
            this.maxSizeDisplay.textContent = sizeMax.value;
            this.currentFilters.sizeMin = parseInt(sizeMin.value);
            this.currentFilters.sizeMax = parseInt(sizeMax.value);
            this.debouncedApplyFilters();
        };
        
        sizeMin.addEventListener('input', () => {
            if (parseInt(sizeMin.value) > parseInt(sizeMax.value)) {
                sizeMax.value = sizeMin.value;
            }
            updateSizeDisplay();
        });
        
        sizeMax.addEventListener('input', () => {
            if (parseInt(sizeMax.value) < parseInt(sizeMin.value)) {
                sizeMin.value = sizeMax.value;
            }
            updateSizeDisplay();
        });
    }
    
    handleCityChange(city) {
        this.currentFilters.city = city;
        this.currentFilters.neighborhoods = [];
        
        if (city) {
            this.showNeighborhoodMap(city);
        } else {
            this.hideNeighborhoodMap();
        }
        
        this.debouncedApplyFilters();
    }
    
    showNeighborhoodMap(city) {
        const neighborhoods = this.getNeighborhoodsForCity(city);
        
        this.neighborhoodOptions.innerHTML = neighborhoods.map(neighborhood => `
            <button class="neighborhood-option" data-neighborhood="${neighborhood.id}">
                ${neighborhood.name}
                <div class="text-xs text-gray-500">${neighborhood.count} properties</div>
            </button>
        `).join('');
        
        // Add event listeners to neighborhood options
        this.neighborhoodOptions.querySelectorAll('.neighborhood-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleNeighborhood(option.dataset.neighborhood, option);
            });
        });
        
        this.neighborhoodMap.classList.remove('hidden');
    }
    
    hideNeighborhoodMap() {
        this.neighborhoodMap.classList.add('hidden');
    }
    
    getNeighborhoodsForCity(city) {
        const neighborhoods = {
            'amsterdam': [
                { id: 'jordaan', name: 'Jordaan', count: 234 },
                { id: 'de-pijp', name: 'De Pijp', count: 189 },
                { id: 'oud-zuid', name: 'Oud-Zuid', count: 156 },
                { id: 'oost', name: 'Oost', count: 278 },
                { id: 'noord', name: 'Noord', count: 195 },
                { id: 'west', name: 'West', count: 167 }
            ],
            'rotterdam': [
                { id: 'centrum', name: 'Centrum', count: 145 },
                { id: 'kralingen', name: 'Kralingen', count: 98 },
                { id: 'kop-van-zuid', name: 'Kop van Zuid', count: 76 },
                { id: 'feijenoord', name: 'Feijenoord', count: 112 }
            ],
            'the-hague': [
                { id: 'centrum', name: 'Centrum', count: 134 },
                { id: 'statenkwartier', name: 'Statenkwartier', count: 87 },
                { id: 'benoordenhout', name: 'Benoordenhout', count: 65 },
                { id: 'segbroek', name: 'Segbroek', count: 93 }
            ],
            'utrecht': [
                { id: 'centrum', name: 'Centrum', count: 156 },
                { id: 'lombok', name: 'Lombok', count: 78 },
                { id: 'overvecht', name: 'Overvecht', count: 112 },
                { id: 'wittevrouwen', name: 'Wittevrouwen', count: 89 }
            ]
        };
        
        return neighborhoods[city] || [];
    }
    
    toggleNeighborhood(neighborhoodId, element) {
        const index = this.currentFilters.neighborhoods.indexOf(neighborhoodId);
        
        if (index > -1) {
            this.currentFilters.neighborhoods.splice(index, 1);
            element.classList.remove('active');
        } else {
            this.currentFilters.neighborhoods.push(neighborhoodId);
            element.classList.add('active');
        }
        
        this.debouncedApplyFilters();
    }
    
    updatePropertyTypes() {
        this.currentFilters.propertyTypes = Array.from(
            document.querySelectorAll('input[name="property-type"]:checked')
        ).map(checkbox => checkbox.value);
        
        this.debouncedApplyFilters();
    }
    
    handleBedroomSelect(button) {
        document.querySelectorAll('.bedroom-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        button.classList.add('active');
        this.currentFilters.bedrooms = button.dataset.bedrooms;
        
        this.debouncedApplyFilters();
    }
    
    updateAmenities() {
        this.currentFilters.amenities = Array.from(
            document.querySelectorAll('input[name="amenities"]:checked')
        ).map(checkbox => checkbox.value);
        
        this.debouncedApplyFilters();
    }
    
    toggleAdvancedFilters() {
        this.advancedFilters.classList.toggle('hidden');
        const icon = this.toggleAdvancedBtn.querySelector('i');
        
        if (this.advancedFilters.classList.contains('hidden')) {
            icon.className = 'fas fa-sliders-h';
            this.toggleAdvancedBtn.querySelector('span').textContent = 'Advanced Filters';
        } else {
            icon.className = 'fas fa-chevron-up';
            this.toggleAdvancedBtn.querySelector('span').textContent = 'Hide Filters';
        }
    }
    
    applyFilters() {
        this.showLoadingState();
        
        // Simulate API call delay
        setTimeout(() => {
            this.filterProperties();
            this.updateResultsCount();
            this.updateActiveFilters();
            this.renderProperties();
            this.hideLoadingState();
        }, 500);
    }
    
    debouncedApplyFilters = this.debounce(() => {
        this.applyFilters();
    }, 300);
    
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
    
    filterProperties() {
        console.log('Filtering properties with:', this.currentFilters);
        console.log('Total properties:', this.properties.length);
        
        this.filteredProperties = this.properties.filter(property => {
            let matches = true;
            
            // City filter
            if (this.currentFilters.city && property.city !== this.currentFilters.city) {
                matches = false;
            }
            
            // Neighborhood filter
            if (matches && this.currentFilters.neighborhoods.length > 0 && 
                !this.currentFilters.neighborhoods.includes(property.neighborhood)) {
                matches = false;
            }
            
            // Price filter
            if (matches && (property.price < this.currentFilters.priceMin || property.price > this.currentFilters.priceMax)) {
                matches = false;
            }
            
            // Property type filter
            if (matches && !this.currentFilters.propertyTypes.includes(property.type)) {
                matches = false;
            }
            
            // Furnishing filter
            if (matches && this.currentFilters.furnishing !== 'any' && property.furnishing !== this.currentFilters.furnishing) {
                matches = false;
            }
            
            // Bedrooms filter
            if (matches && this.currentFilters.bedrooms !== 'any') {
                if (this.currentFilters.bedrooms === '5') {
                    if (property.bedrooms < 5) {
                        matches = false;
                    }
                } else if (property.bedrooms !== parseInt(this.currentFilters.bedrooms)) {
                    matches = false;
                }
            }
            
            // Size filter
            if (matches && (property.size < this.currentFilters.sizeMin || property.size > this.currentFilters.sizeMax)) {
                matches = false;
            }
            
            // Amenities filter
            if (matches && this.currentFilters.amenities.length > 0) {
                const hasAllAmenities = this.currentFilters.amenities.every(amenity => 
                    property.amenities.includes(amenity)
                );
                if (!hasAllAmenities) {
                    matches = false;
                }
            }
            
            return matches;
        });
        
        console.log('Filtered properties:', this.filteredProperties.length);
    }
    
    sortProperties(sortBy) {
        switch (sortBy) {
            case 'price-low':
                this.filteredProperties.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProperties.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                this.filteredProperties.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
                break;
            case 'size':
                this.filteredProperties.sort((a, b) => b.size - a.size);
                break;
            default: // relevance
                this.filteredProperties.sort((a, b) => b.score - a.score);
        }
        
        this.renderProperties();
    }
    
    updateResultsCount() {
        const count = this.filteredProperties.length;
        this.resultsCount.textContent = count.toLocaleString();
        
        if (count === 0) {
            this.noResultsState.classList.remove('hidden');
            this.propertiesGrid.classList.add('hidden');
        } else {
            this.noResultsState.classList.add('hidden');
            this.propertiesGrid.classList.remove('hidden');
        }
    }
    
    updateActiveFilters() {
        this.activeFiltersContainer.innerHTML = '';
        
        // City filter
        if (this.currentFilters.city) {
            this.addActiveFilter('city', `City: ${this.capitalizeFirst(this.currentFilters.city)}`);
        }
        
        // Neighborhood filters
        this.currentFilters.neighborhoods.forEach(neighborhood => {
            this.addActiveFilter(`neighborhood-${neighborhood}`, `Area: ${this.capitalizeFirst(neighborhood)}`);
        });
        
        // Price filter
        if (this.currentFilters.priceMin > 800 || this.currentFilters.priceMax < 4000) {
            this.addActiveFilter('price', `Price: €${this.currentFilters.priceMin}-€${this.currentFilters.priceMax}`);
        }
        
        // Property types
        if (this.currentFilters.propertyTypes.length < 4) {
            const types = this.currentFilters.propertyTypes.map(type => this.capitalizeFirst(type)).join(', ');
            this.addActiveFilter('property-types', `Types: ${types}`);
        }
        
        // Furnishing
        if (this.currentFilters.furnishing !== 'any') {
            this.addActiveFilter('furnishing', `Furnishing: ${this.capitalizeFirst(this.currentFilters.furnishing)}`);
        }
        
        // Bedrooms
        if (this.currentFilters.bedrooms !== 'any') {
            const text = this.currentFilters.bedrooms === '5' ? '5+ bedrooms' : `${this.currentFilters.bedrooms} bedroom${this.currentFilters.bedrooms > 1 ? 's' : ''}`;
            this.addActiveFilter('bedrooms', text);
        }
        
        // Size
        if (this.currentFilters.sizeMin > 20 || this.currentFilters.sizeMax < 200) {
            this.addActiveFilter('size', `Size: ${this.currentFilters.sizeMin}-${this.currentFilters.sizeMax}m²`);
        }
        
        // Amenities
        if (this.currentFilters.amenities.length > 0) {
            const amenities = this.currentFilters.amenities.map(amenity => this.capitalizeFirst(amenity)).join(', ');
            this.addActiveFilter('amenities', `Amenities: ${amenities}`);
        }
    }
    
    addActiveFilter(key, text) {
        const filterElement = document.createElement('div');
        filterElement.className = 'active-filter';
        filterElement.innerHTML = `
            <span>${text}</span>
            <span class="remove" data-filter="${key}">&times;</span>
        `;
        
        filterElement.querySelector('.remove').addEventListener('click', (e) => {
            this.removeFilter(e.target.dataset.filter);
        });
        
        this.activeFiltersContainer.appendChild(filterElement);
    }
    
    removeFilter(filterKey) {
        switch (filterKey) {
            case 'city':
                this.currentFilters.city = '';
                this.cityFilter.value = '';
                this.hideNeighborhoodMap();
                break;
            case 'price':
                this.currentFilters.priceMin = 800;
                this.currentFilters.priceMax = 4000;
                this.priceMin.value = 800;
                this.priceMax.value = 4000;
                this.minPriceDisplay.textContent = '800';
                this.maxPriceDisplay.textContent = '4000';
                break;
            case 'property-types':
                document.querySelectorAll('input[name="property-type"]').forEach(checkbox => {
                    checkbox.checked = true;
                });
                this.currentFilters.propertyTypes = ['apartment', 'house', 'studio', 'room'];
                break;
            case 'furnishing':
                document.querySelector('input[name="furnishing"][value="any"]').checked = true;
                this.currentFilters.furnishing = 'any';
                break;
            case 'bedrooms':
                document.querySelector('.bedroom-btn[data-bedrooms="any"]').classList.add('active');
                document.querySelectorAll('.bedroom-btn:not([data-bedrooms="any"])').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.currentFilters.bedrooms = 'any';
                break;
            case 'size':
                this.currentFilters.sizeMin = 20;
                this.currentFilters.sizeMax = 200;
                this.sizeMin.value = 20;
                this.sizeMax.value = 200;
                this.minSizeDisplay.textContent = '20';
                this.maxSizeDisplay.textContent = '200';
                break;
            case 'amenities':
                document.querySelectorAll('input[name="amenities"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
                this.currentFilters.amenities = [];
                break;
            default:
                if (filterKey.startsWith('neighborhood-')) {
                    const neighborhood = filterKey.replace('neighborhood-', '');
                    const index = this.currentFilters.neighborhoods.indexOf(neighborhood);
                    if (index > -1) {
                        this.currentFilters.neighborhoods.splice(index, 1);
                        const option = this.neighborhoodOptions.querySelector(`[data-neighborhood="${neighborhood}"]`);
                        if (option) option.classList.remove('active');
                    }
                }
        }
        
        this.applyFilters();
    }
    
    resetFilters() {
        // Reset all filter values
        this.currentFilters = {
            city: '',
            neighborhoods: [],
            priceMin: 800,
            priceMax: 4000,
            propertyTypes: ['apartment', 'house', 'studio', 'room'],
            furnishing: 'any',
            bedrooms: 'any',
            sizeMin: 20,
            sizeMax: 200,
            rentalPeriod: 'any',
            availableDate: '',
            availability: 'any',
            amenities: []
        };
        
        // Reset UI elements
        this.cityFilter.value = '';
        this.hideNeighborhoodMap();
        this.priceMin.value = 800;
        this.priceMax.value = 4000;
        this.minPriceDisplay.textContent = '800';
        this.maxPriceDisplay.textContent = '4000';
        
        document.querySelectorAll('input[name="property-type"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        
        document.querySelector('input[name="furnishing"][value="any"]').checked = true;
        
        document.querySelector('.bedroom-btn[data-bedrooms="any"]').classList.add('active');
        document.querySelectorAll('.bedroom-btn:not([data-bedrooms="any"])').forEach(btn => {
            btn.classList.remove('active');
        });
        
        this.sizeMin.value = 20;
        this.sizeMax.value = 200;
        this.minSizeDisplay.textContent = '20';
        this.maxSizeDisplay.textContent = '200';
        
        document.querySelector('input[name="rental-period"][value="any"]').checked = true;
        document.querySelector('input[name="availability"][value="any"]').checked = true;
        
        document.querySelectorAll('input[name="amenities"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        const availableDate = document.getElementById('available-date');
        if (availableDate) availableDate.value = '';
        
        this.applyFilters();
    }
    
    changeView(view) {
        this.currentView = view;
        
        // Update view buttons
        this.viewBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        // Update grid class
        this.propertiesGrid.className = `properties-grid ${view}-view`;
        
        this.renderProperties();
    }
    
    renderProperties() {
        const startIndex = (this.currentPage - 1) * this.propertiesPerPage;
        const endIndex = startIndex + this.propertiesPerPage;
        const propertiesToShow = this.filteredProperties.slice(startIndex, endIndex);
        
        console.log('Rendering properties:', propertiesToShow.length);
        
        if (propertiesToShow.length === 0) {
            this.propertiesGrid.innerHTML = '';
        } else {
            this.propertiesGrid.innerHTML = propertiesToShow.map(property => this.createPropertyCard(property)).join('');
            this.setupPropertyInteractions();
        }
        
        this.renderPagination();
    }
    
    createPropertyCard(property) {
        const isListView = this.currentView === 'list';
        
        return `
            <div class="property-card ${isListView ? 'list-view' : 'grid-view'}" data-property-id="${property.id}">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=80'">
                    <div class="property-badges">
                        ${property.isNew ? '<div class="property-badge badge-new">New</div>' : ''}
                        ${property.isFeatured ? '<div class="property-badge badge-featured">Featured</div>' : ''}
                        <div class="property-badge badge-furnished">${this.capitalizeFirst(property.furnishing)}</div>
                    </div>
                    <div class="property-actions">
                        <button class="property-action favorite" title="Add to favorites">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="property-action compare" title="Add to compare">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="property-content">
                    <div class="property-header">
                        <div class="property-price">€${property.price.toLocaleString()}/month</div>
                        <div class="property-address">
                            <i class="fas fa-map-marker-alt"></i>
                            ${property.address}, ${this.capitalizeFirst(property.city)}
                        </div>
                        <h3 class="property-title">${property.title}</h3>
                    </div>
                    
                    <div class="property-features">
                        <div class="property-feature">
                            <i class="fas fa-bed"></i>
                            <span>${property.bedrooms} bed${property.bedrooms > 1 ? 's' : ''}</span>
                        </div>
                        <div class="property-feature">
                            <i class="fas fa-bath"></i>
                            <span>${property.bathrooms} bath${property.bathrooms > 1 ? 's' : ''}</span>
                        </div>
                        <div class="property-feature">
                            <i class="fas fa-ruler-combined"></i>
                            <span>${property.size}m²</span>
                        </div>
                    </div>
                    
                    <p class="property-description">${property.description}</p>
                    
                    <div class="property-footer">
                        <div class="property-availability">
                            <i class="fas fa-calendar-check"></i>
                            Available ${property.availableFrom}
                        </div>
                        <button class="quick-apply-btn" data-property-id="${property.id}">
                            Quick Apply
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupPropertyInteractions() {
        // Favorite buttons
        document.querySelectorAll('.property-action.favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(e.target.closest('.property-action'));
            });
        });
        
        // Quick apply buttons
        document.querySelectorAll('.quick-apply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showQuickApplyModal(e.target.dataset.propertyId);
            });
        });
        
        // Property card clicks
        document.querySelectorAll('.property-card').forEach(card => {
            card.addEventListener('click', () => {
                const propertyId = card.dataset.propertyId;
                // In real implementation, navigate to property detail page
                console.log('Navigating to property:', propertyId);
            });
        });
    }
    
    toggleFavorite(button) {
        const icon = button.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.className = 'fas fa-heart';
            button.style.color = '#ef4444';
        } else {
            icon.className = 'far fa-heart';
            button.style.color = '';
        }
    }
    
    setupQuickApplyModal() {
        const closeBtns = this.quickApplyModal.querySelectorAll('.close-modal');
        const confirmBtn = this.quickApplyModal.querySelector('.confirm-apply-btn');
        
        const closeModal = () => {
            this.quickApplyModal.classList.add('hidden');
        };
        
        closeBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        confirmBtn.addEventListener('click', () => {
            const propertyId = confirmBtn.dataset.propertyId;
            if (propertyId) {
                this.submitQuickApply(propertyId);
            }
            closeModal();
        });
        
        this.quickApplyModal.addEventListener('click', (e) => {
            if (e.target === this.quickApplyModal) {
                closeModal();
            }
        });
    }
    
    showQuickApplyModal(propertyId) {
        this.quickApplyModal.classList.remove('hidden');
        this.quickApplyModal.querySelector('.confirm-apply-btn').dataset.propertyId = propertyId;
    }
    
    submitQuickApply(propertyId) {
        // Simulate API call
        console.log('Quick apply submitted for property:', propertyId);
        
        // Show success message
        this.showNotification('Application submitted successfully! We\'ll contact you within 24 hours.', 'success');
    }
    
    renderPagination() {
        const totalPages = Math.ceil(this.filteredProperties.length / this.propertiesPerPage);
        
        if (totalPages <= 1) {
            this.pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    ${this.currentPage === 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHTML += `
                    <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += `<span class="pagination-dots">...</span>`;
            }
        }
        
        // Next button
        paginationHTML += `
            <button class="pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}" 
                    ${this.currentPage === totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        this.pagination.innerHTML = paginationHTML;
        
        // Add event listeners
        this.pagination.querySelectorAll('.pagination-btn:not(.disabled)').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentPage = parseInt(btn.dataset.page);
                this.renderProperties();
                window.scrollTo({ top: this.propertiesGrid.offsetTop - 100, behavior: 'smooth' });
            });
        });
    }
    
    saveSearch() {
        const searchId = Date.now().toString();
        this.savedSearches.add(searchId);
        
        const btn = this.saveSearchBtn;
        btn.classList.add('saving');
        btn.innerHTML = '<i class="fas fa-bookmark"></i><span class="text-sm font-semibold">Saved!</span>';
        
        setTimeout(() => {
            btn.classList.remove('saving');
            btn.innerHTML = '<i class="far fa-bookmark"></i><span class="text-sm font-semibold">Save Search</span>';
        }, 2000);
        
        this.saveToLocalStorage();
        
        this.showNotification('Search saved! You\'ll receive updates when new properties match your criteria.', 'success');
    }
    
    loadSavedSearches() {
        const saved = localStorage.getItem('nordicestates_saved_searches');
        if (saved) {
            this.savedSearches = new Set(JSON.parse(saved));
        }
    }
    
    saveToLocalStorage() {
        localStorage.setItem('nordicestates_saved_searches', JSON.stringify(Array.from(this.savedSearches)));
    }
    
    showLoadingState() {
        this.loadingState.classList.remove('hidden');
        this.propertiesGrid.classList.add('hidden');
    }
    
    hideLoadingState() {
        this.loadingState.classList.add('hidden');
        this.propertiesGrid.classList.remove('hidden');
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
    }
    
    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    generateSampleData() {
        const cities = ['amsterdam', 'rotterdam', 'the-hague', 'utrecht', 'eindhoven', 'groningen'];
        const neighborhoods = {
            'amsterdam': ['jordaan', 'de-pijp', 'oud-zuid', 'oost', 'noord', 'west'],
            'rotterdam': ['centrum', 'kralingen', 'kop-van-zuid', 'feijenoord'],
            'the-hague': ['centrum', 'statenkwartier', 'benoordenhout', 'segbroek'],
            'utrecht': ['centrum', 'lombok', 'overvecht', 'wittevrouwen'],
            'eindhoven': ['centrum', 'strijp', 'woensel', 'gestel'],
            'groningen': ['centrum', 'oosterpark', 'helpman', 'korrewegwijk']
        };
        
        const propertyTypes = ['apartment', 'house', 'studio', 'room'];
        const furnishingTypes = ['furnished', 'unfurnished', 'semi-furnished'];
        const amenitiesList = ['elevator', 'balcony', 'garden', 'parking', 'pet-friendly'];
        
        const sampleImages = [
            'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.1&auto=format&fit=crop&w=500&q=80'
        ];
        
        // Generate 100 sample properties
        this.properties = Array.from({ length: 100 }, (_, index) => {
            const city = cities[Math.floor(Math.random() * cities.length)];
            const neighborhood = neighborhoods[city][Math.floor(Math.random() * neighborhoods[city].length)];
            const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
            const furnishing = furnishingTypes[Math.floor(Math.random() * furnishingTypes.length)];
            
            // Generate random amenities (2-4 amenities per property)
            const numAmenities = Math.floor(Math.random() * 3) + 2;
            const amenities = [];
            for (let i = 0; i < numAmenities; i++) {
                const amenity = amenitiesList[Math.floor(Math.random() * amenitiesList.length)];
                if (!amenities.includes(amenity)) {
                    amenities.push(amenity);
                }
            }
            
            const price = type === 'room' ? 
                Math.floor(Math.random() * 600) + 400 : // €400-€1000 for rooms
                type === 'studio' ? 
                    Math.floor(Math.random() * 800) + 600 : // €600-€1400 for studios
                    Math.floor(Math.random() * 2000) + 1000; // €1000-€3000 for apartments/houses
            
            const size = type === 'room' ? 
                Math.floor(Math.random() * 20) + 10 : // 10-30m² for rooms
                type === 'studio' ? 
                    Math.floor(Math.random() * 30) + 30 : // 30-60m² for studios
                    Math.floor(Math.random() * 100) + 60; // 60-160m² for apartments/houses
            
            const bedrooms = type === 'room' ? 1 : 
                type === 'studio' ? 1 : 
                Math.floor(Math.random() * 4) + 1; // 1-5 bedrooms
            
            const bathrooms = Math.max(1, Math.floor(Math.random() * 3) + 1);
            
            return {
                id: `prop-${index + 1}`,
                title: `${this.capitalizeFirst(type)} in ${this.capitalizeFirst(neighborhood)}`,
                description: `Beautiful ${type} located in the heart of ${this.capitalizeFirst(neighborhood)}, ${this.capitalizeFirst(city)}. Features modern amenities and convenient access to public transportation.`,
                price: price,
                size: size,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                type: type,
                furnishing: furnishing,
                city: city,
                neighborhood: neighborhood,
                address: `${Math.floor(Math.random() * 200) + 1} Sample Street`,
                image: sampleImages[Math.floor(Math.random() * sampleImages.length)],
                amenities: amenities,
                availableFrom: 'Immediately',
                listedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
                isNew: Math.random() > 0.7,
                isFeatured: Math.random() > 0.8,
                score: Math.random() // For relevance sorting
            };
        });
        
        console.log('Generated sample properties:', this.properties.length);
    }
}

// Initialize the rental search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RentalSearch();
});
