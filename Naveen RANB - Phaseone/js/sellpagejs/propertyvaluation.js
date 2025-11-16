// === SELL PAGE: Phase 2 Property Valuation Wizard ===

class PropertyValuationWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {
            propertyType: 'apartment',
            yearBuilt: '',
            size: '',
            energyLabel: '',
            city: '',
            neighborhood: '',
            bedrooms: '2',
            bathrooms: '1',
            parking: 'street',
            amenities: [],
            condition: 'good',
            wozValue: null
        };
        
        this.marketData = {
            amsterdam: {
                jordaan: { pricePerM2: 7850, averageDays: 28 },
                'de-pijp': { pricePerM2: 7200, averageDays: 32 },
                'oud-zuid': { pricePerM2: 8500, averageDays: 25 }
            },
            rotterdam: {
                'kop-van-zuid': { pricePerM2: 5200, averageDays: 35 },
                kralingen: { pricePerM2: 4800, averageDays: 38 }
            },
            'the-hague': {
                statenkwartier: { pricePerM2: 5800, averageDays: 30 },
                centrum: { pricePerM2: 5100, averageDays: 34 }
            },
            utrecht: {
                centrum: { pricePerM2: 6100, averageDays: 29 },
                museumkwartier: { pricePerM2: 5700, averageDays: 31 }
            }
        };
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.loadSavedProgress();
        console.log('💰 Property Valuation Wizard initialized');
    }
    
    cacheElements() {
        // Progress elements
        this.progressText = document.querySelector('.valuation-progress');
        this.progressBar = document.querySelector('.valuation-progress-bar');
        
        // Step containers
        this.steps = document.querySelectorAll('.valuation-step');
        
        // Form elements
        this.propertyTypeBtns = document.querySelectorAll('.property-type-btn');
        this.yearBuiltSelect = document.querySelector('.year-built-select');
        this.sizeInput = document.querySelector('.property-size-input');
        this.energyLabelBtns = document.querySelectorAll('.energy-label-btn');
        this.citySelect = document.querySelector('.city-select');
        this.neighborhoodOptions = document.querySelectorAll('.neighborhood-option');
        this.bedroomsSelect = document.querySelector('.bedrooms-select');
        this.bathroomsSelect = document.querySelector('.bathrooms-select');
        this.parkingSelect = document.querySelector('.parking-select');
        this.amenityCheckboxes = document.querySelectorAll('.amenity-checkbox');
        this.conditionBtns = document.querySelectorAll('.condition-btn');
        
        // Navigation buttons
        this.nextBtns = document.querySelectorAll('.next-step-btn');
        this.prevBtns = document.querySelectorAll('.prev-step-btn');
        this.saveProgressBtn = document.querySelector('.save-progress-btn');
        this.restartBtn = document.querySelector('.restart-valuation-btn');
        this.emailReportBtn = document.querySelector('.email-report-btn');
        this.expertConsultationBtn = document.querySelector('.expert-consultation-btn');
        this.addWozBtn = document.querySelector('.add-woz-btn');
    }
    
    setupEventListeners() {
        // Property type selection
        this.propertyTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handlePropertyTypeSelect(btn.dataset.type);
            });
        });
        
        // Energy label selection
        this.energyLabelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleEnergyLabelSelect(btn.dataset.label);
            });
        });
        
        // City selection with neighborhood update
        this.citySelect.addEventListener('change', (e) => {
            this.handleCitySelect(e.target.value);
        });
        
        // Neighborhood selection
        this.neighborhoodOptions.forEach(option => {
            const btn = option.querySelector('button');
            if (btn) {
                btn.addEventListener('click', () => {
                    this.handleNeighborhoodSelect(btn.dataset.neighborhood);
                });
            }
        });

        // Updated Code for neighborhood 

        // Function to show neighborhoods based on selected city
function showNeighborhoods(city) {
    // Hide all neighborhood options
    document.querySelectorAll('.neighborhood-option').forEach(option => {
        option.classList.add('hidden');
    });
    
    // Show neighborhoods for selected city
    document.querySelectorAll(`.neighborhood-option.${city.toLowerCase()}`).forEach(option => {
        option.classList.remove('hidden');
    });
}

// Call this function when city is selected
// Example: showNeighborhoods('rotterdam');
        
        // Condition selection
        this.conditionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleConditionSelect(btn.dataset.condition);
            });
        });
        
        // Form inputs
        this.yearBuiltSelect.addEventListener('change', (e) => {
            this.formData.yearBuilt = e.target.value;
            this.saveProgress();
        });
        
        this.sizeInput.addEventListener('input', (e) => {
            this.formData.size = e.target.value;
            this.saveProgress();
        });
        
        this.bedroomsSelect.addEventListener('change', (e) => {
            this.formData.bedrooms = e.target.value;
            this.saveProgress();
        });
        
        this.bathroomsSelect.addEventListener('change', (e) => {
            this.formData.bathrooms = e.target.value;
            this.saveProgress();
        });
        
        this.parkingSelect.addEventListener('change', (e) => {
            this.formData.parking = e.target.value;
            this.saveProgress();
        });
        
        // Amenity checkboxes
        this.amenityCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleAmenityChange(e.target.value, e.target.checked);
            });
        });
        
        // Navigation
        this.nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.nextStep();
            });
        });
        
        this.prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.previousStep();
            });
        });
        
        // Actions
        this.saveProgressBtn.addEventListener('click', () => {
            this.saveProgress(true);
        });
        
        this.restartBtn?.addEventListener('click', () => {
            this.restartValuation();
        });
        
        this.emailReportBtn?.addEventListener('click', () => {
            this.handleEmailReport();
        });
        
        this.expertConsultationBtn?.addEventListener('click', () => {
            this.handleExpertConsultation();
        });
        
        this.addWozBtn?.addEventListener('click', () => {
            this.handleAddWozValue();
        });
        
        // Auto-save on input change
        this.setupAutoSave();
    }
    
    setupAutoSave() {
        const inputs = [this.yearBuiltSelect, this.sizeInput, this.bedroomsSelect, this.bathroomsSelect, this.parkingSelect];
        
        inputs.forEach(input => {
            if (input) {
                input.addEventListener('change', () => {
                    this.saveProgress();
                });
            }
        });
    }
    
    handlePropertyTypeSelect(type) {
        this.formData.propertyType = type;
        
        // Update UI
        this.propertyTypeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });
        
        this.saveProgress();
    }
    
    handleEnergyLabelSelect(label) {
        this.formData.energyLabel = label;
        
        // Update UI
        this.energyLabelBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.label === label);
        });
        
        this.saveProgress();
    }
    
    handleCitySelect(city) {
        this.formData.city = city;
        this.formData.neighborhood = ''; // Reset neighborhood
        
        // Show/hide neighborhoods based on city
        this.neighborhoodOptions.forEach(option => {
            if (city && option.classList.contains(city)) {
                option.classList.remove('hidden');
            } else {
                option.classList.add('hidden');
            }
        });
        
        // Clear neighborhood selection
        this.neighborhoodOptions.forEach(option => {
            const btn = option.querySelector('button');
            if (btn) btn.classList.remove('active');
        });
        
        this.saveProgress();
    }
    
    handleNeighborhoodSelect(neighborhood) {
        this.formData.neighborhood = neighborhood;
        
        // Update UI
        this.neighborhoodOptions.forEach(option => {
            const btn = option.querySelector('button');
            if (btn) {
                btn.classList.toggle('active', btn.dataset.neighborhood === neighborhood);
            }
        });
        
        this.saveProgress();
    }
    
    handleConditionSelect(condition) {
        this.formData.condition = condition;
        
        // Update UI
        this.conditionBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.condition === condition);
        });
        
        this.saveProgress();
    }
    
    handleAmenityChange(amenity, isChecked) {
        if (isChecked) {
            this.formData.amenities.push(amenity);
        } else {
            this.formData.amenities = this.formData.amenities.filter(a => a !== amenity);
        }
        
        this.saveProgress();
    }
    
    nextStep() {
        if (this.validateCurrentStep()) {
            this.currentStep++;
            this.updateProgress();
            this.showStep(this.currentStep);
            
            // If moving to results step, calculate valuation
            if (this.currentStep === 4) {
                this.calculateValuation();
            }
        }
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateProgress();
            this.showStep(this.currentStep);
        }
    }
    
    showStep(stepNumber) {
        // Hide all steps
        this.steps.forEach(step => {
            step.classList.remove('active');
            step.classList.add('hidden');
        });
        
        // Show current step
        const currentStep = document.querySelector(`[data-step="${stepNumber}"]`);
        if (currentStep) {
            currentStep.classList.remove('hidden');
            setTimeout(() => {
                currentStep.classList.add('active');
            }, 50);
        }
    }
    
    validateCurrentStep() {
        const currentStep = this.currentStep;
        let isValid = true;
        
        switch (currentStep) {
            case 1:
                if (!this.formData.size || this.formData.size < 20) {
                    this.showValidationError(this.sizeInput, 'Please enter a valid living area');
                    isValid = false;
                }
                if (!this.formData.yearBuilt) {
                    this.showValidationError(this.yearBuiltSelect, 'Please select construction year');
                    isValid = false;
                }
                break;
                
            case 2:
                if (!this.formData.city) {
                    this.showValidationError(this.citySelect, 'Please select a city');
                    isValid = false;
                }
                if (!this.formData.neighborhood) {
                    // Show general error for neighborhood
                    const neighborhoodMap = document.querySelector('.neighborhood-map');
                    this.showValidationError(neighborhoodMap, 'Please select a neighborhood');
                    isValid = false;
                }
                break;
        }
        
        return isValid;
    }
    
    showValidationError(element, message) {
        // Remove existing error
        this.clearValidationErrors();
        
        // Add error styling
        element.classList.add('validation-error');
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Insert after element
        element.parentNode.appendChild(errorDiv);
        
        // Scroll to error
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    clearValidationErrors() {
        // Remove error styling
        document.querySelectorAll('.validation-error').forEach(el => {
            el.classList.remove('validation-error');
        });
        
        // Remove error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.remove();
        });
    }
    
    updateProgress() {
        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        
        // Update progress text
        if (this.progressText) {
            this.progressText.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
        }
        
        // Update progress bar
        if (this.progressBar) {
            this.progressBar.style.width = `${progressPercentage}%`;
        }
    }
    
    calculateValuation() {
        // Base calculation using Dutch market algorithms
        let basePrice = 0;
        
        // Calculate based on location and size
        if (this.formData.city && this.formData.neighborhood && this.formData.size) {
            const cityData = this.marketData[this.formData.city];
            if (cityData && cityData[this.formData.neighborhood]) {
                const neighborhoodData = cityData[this.formData.neighborhood];
                basePrice = neighborhoodData.pricePerM2 * parseInt(this.formData.size);
            }
        }
        
        // Apply adjustments based on property features
        basePrice = this.applyFeatureAdjustments(basePrice);
        
        // Apply condition multiplier
        basePrice = this.applyConditionMultiplier(basePrice);
        
        // Apply energy label adjustment
        basePrice = this.applyEnergyLabelAdjustment(basePrice);
        
        // Round to nearest 5,000
        const roundedPrice = Math.round(basePrice / 5000) * 5000;
        
        // Update UI with results
        this.displayValuationResults(roundedPrice);
    }
    
    applyFeatureAdjustments(basePrice) {
        let adjustedPrice = basePrice;
        
        // Bedrooms adjustment
        const bedroomValue = {
            '1': -0.05,  // 5% less for 1 bedroom
            '2': 0,      // Base for 2 bedrooms
            '3': 0.08,   // 8% more for 3 bedrooms
            '4': 0.15,   // 15% more for 4 bedrooms
            '5': 0.25    // 25% more for 5+ bedrooms
        };
        
        if (bedroomValue[this.formData.bedrooms]) {
            adjustedPrice *= (1 + bedroomValue[this.formData.bedrooms]);
        }
        
        // Bathrooms adjustment
        if (this.formData.bathrooms === '2') adjustedPrice *= 1.03;
        if (this.formData.bathrooms === '3') adjustedPrice *= 1.06;
        
        // Parking adjustment
        const parkingValue = {
            'private': 1.04,
            'garage': 1.08
        };
        
        if (parkingValue[this.formData.parking]) {
            adjustedPrice *= parkingValue[this.formData.parking];
        }
        
        // Amenities adjustment
        this.formData.amenities.forEach(amenity => {
            switch (amenity) {
                case 'balcony': adjustedPrice *= 1.02; break;
                case 'garden': adjustedPrice *= 1.05; break;
                case 'elevator': adjustedPrice *= 1.03; break;
                case 'fireplace': adjustedPrice *= 1.01; break;
            }
        });
        
        return adjustedPrice;
    }
    
    applyConditionMultiplier(basePrice) {
        const conditionMultipliers = {
            'excellent': 1.10,  // 10% premium
            'good': 1.00,       // Base
            'needs-work': 0.85  // 15% discount
        };
        
        return basePrice * (conditionMultipliers[this.formData.condition] || 1.00);
    }
    
    applyEnergyLabelAdjustment(basePrice) {
        const energyMultipliers = {
            'A': 1.08,
            'B': 1.04,
            'C': 1.02,
            'D': 1.00,
            'E': 0.98,
            'F': 0.95,
            'G': 0.90
        };
        
        return basePrice * (energyMultipliers[this.formData.energyLabel] || 1.00);
    }
    
    displayValuationResults(price) {
        const valuationElement = document.querySelector('.valuation-result');
        if (valuationElement) {
            // Animate the number counting up
            this.animateValue(valuationElement, 0, price, 2000);
        }
        
        // Calculate range (typically ±5% for realistic asking price)
        const askingMin = Math.round(price * 0.95 / 5000) * 5000;
        const askingMax = Math.round(price * 1.05 / 5000) * 5000;
        
        // Expected selling price range (typically -2% to +3%)
        const sellingMin = Math.round(price * 0.95 / 5000) * 5000;
        const sellingMax = Math.round(price * 1.03 / 5000) * 5000;
        
        // Update range displays (you would select these elements and update them)
        console.log('Valuation calculated:', {
            estimated: price,
            askingRange: [askingMin, askingMax],
            sellingRange: [sellingMin, sellingMax]
        });
    }
    
    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = `€${value.toLocaleString('nl-NL')}`;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    saveProgress(showFeedback = false) {
        // Save to localStorage
        localStorage.setItem('valuationWizardData', JSON.stringify({
            formData: this.formData,
            currentStep: this.currentStep
        }));
        
        if (showFeedback) {
            this.showSaveFeedback();
        }
    }
    
    loadSavedProgress() {
        const saved = localStorage.getItem('valuationWizardData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.formData = { ...this.formData, ...data.formData };
                this.currentStep = data.currentStep || 1;
                
                // Update UI with saved data
                this.updateUIFromSavedData();
                this.updateProgress();
                this.showStep(this.currentStep);
                
            } catch (error) {
                console.error('Error loading saved progress:', error);
            }
        }
    }
    
    updateUIFromSavedData() {
        // Update property type
        this.propertyTypeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === this.formData.propertyType);
        });
        
        // Update other form elements similarly...
        // This would update all form elements based on saved data
    }
    
    showSaveFeedback() {
        const btn = this.saveProgressBtn;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check mr-1"></i>Saved!';
        btn.classList.add('saving');
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('saving');
        }, 2000);
    }
    
    restartValuation() {
        // Reset form data
        this.formData = {
            propertyType: 'apartment',
            yearBuilt: '',
            size: '',
            energyLabel: '',
            city: '',
            neighborhood: '',
            bedrooms: '2',
            bathrooms: '1',
            parking: 'street',
            amenities: [],
            condition: 'good',
            wozValue: null
        };
        
        // Reset to first step
        this.currentStep = 1;
        this.updateProgress();
        this.showStep(1);
        
        // Clear saved progress
        localStorage.removeItem('valuationWizardData');
        
        // Reset UI
        this.resetUI();
    }
    
    resetUI() {
        // Reset all form elements to default state
        this.propertyTypeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === 'apartment');
        });
        
        this.yearBuiltSelect.value = '';
        this.sizeInput.value = '';
        
        this.energyLabelBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        this.citySelect.value = '';
        this.neighborhoodOptions.forEach(option => {
            option.classList.add('hidden');
            const btn = option.querySelector('button');
            if (btn) btn.classList.remove('active');
        });
        
        this.bedroomsSelect.value = '2';
        this.bathroomsSelect.value = '1';
        this.parkingSelect.value = 'street';
        
        this.amenityCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        this.conditionBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.condition === 'good');
        });
        
        this.clearValidationErrors();
    }
    
    handleEmailReport() {
        const btn = this.emailReportBtn;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check mr-2"></i>Report Sent!';
            
            // In real implementation, this would send the report via email
            this.generatePDFReport();
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 3000);
        }, 2000);
    }
    
    handleExpertConsultation() {
        // Scroll to contact section or open consultation modal
        console.log('Initiating expert consultation...');
        
        // In real implementation, this would open a scheduling modal
        alert('Expert consultation feature would open a scheduling interface');
    }
    
    handleAddWozValue() {
        // Open WOZ value input modal
        const wozValue = prompt('Enter your WOZ value (€):');
        if (wozValue && !isNaN(wozValue)) {
            this.formData.wozValue = parseFloat(wozValue);
            this.saveProgress();
            
            // Update UI to show WOZ value is added
            this.addWozBtn.textContent = 'WOZ Value Added';
            this.addWozBtn.style.backgroundColor = '#10b981';
            this.addWozBtn.style.color = 'white';
        }
    }
    
    generatePDFReport() {
        // In real implementation, this would generate a PDF report
        console.log('Generating PDF report with valuation data:', this.formData);
        
        // For demo purposes, create a simple text report
        const reportContent = `
            NORDICESTATES VALUATION REPORT
            ==============================
            
            Property Details:
            - Type: ${this.formData.propertyType}
            - Size: ${this.formData.size} m²
            - Location: ${this.formData.city}, ${this.formData.neighborhood}
            - Bedrooms: ${this.formData.bedrooms}
            - Bathrooms: ${this.formData.bathrooms}
            - Condition: ${this.formData.condition}
            
            Estimated Market Value: €${this.calculateValuation()}
            
            This report is generated based on current market data and should be used as a guide.
        `;
        
        // In real implementation, this would create and download a PDF
        console.log('Report content:', reportContent);
    }
}

// Initialize Valuation Wizard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing components
    if (window.SellHeroSection) {
        new SellHeroSection();
    }
    
    // Initialize valuation wizard
    new PropertyValuationWizard();
    
    console.log('🚀 Sell Page Phase 2 initialized successfully!');
});

// Export for potential use in other modules
window.PropertyValuationWizard = PropertyValuationWizard;