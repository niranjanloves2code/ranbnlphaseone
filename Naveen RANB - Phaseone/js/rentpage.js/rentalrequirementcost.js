// === ENHANCED RENTAL REQUIREMENTS & COSTS CALCULATOR ===

class SmartRentalCalculator {
    constructor() {
        // Dutch city data with realistic estimates
        this.cityData = {
            amsterdam: {
                name: "Amsterdam",
                utilities: 220,
                taxes: 650,
                avgAgencyFee: 1800,
                costOfLiving: "High",
                avgRent: { studio: 1200, "1-bedroom": 1500, "2-bedroom": 1800, "3-bedroom": 2200, house: 2500 }
            },
            rotterdam: {
                name: "Rotterdam", 
                utilities: 190,
                taxes: 580,
                avgAgencyFee: 1500,
                costOfLiving: "Medium-High",
                avgRent: { studio: 900, "1-bedroom": 1200, "2-bedroom": 1400, "3-bedroom": 1700, house: 2000 }
            },
            "the-hague": {
                name: "The Hague",
                utilities: 180,
                taxes: 560,
                avgAgencyFee: 1400,
                costOfLiving: "Medium",
                avgRent: { studio: 850, "1-bedroom": 1100, "2-bedroom": 1300, "3-bedroom": 1600, house: 1900 }
            },
            utrecht: {
                name: "Utrecht",
                utilities: 200,
                taxes: 590,
                avgAgencyFee: 1600,
                costOfLiving: "Medium-High", 
                avgRent: { studio: 950, "1-bedroom": 1250, "2-bedroom": 1500, "3-bedroom": 1800, house: 2100 }
            },
            eindhoven: {
                name: "Eindhoven",
                utilities: 170,
                taxes: 520,
                avgAgencyFee: 1200,
                costOfLiving: "Medium",
                avgRent: { studio: 800, "1-bedroom": 1000, "2-bedroom": 1200, "3-bedroom": 1500, house: 1800 }
            },
            groningen: {
                name: "Groningen",
                utilities: 160,
                taxes: 480,
                avgAgencyFee: 1000,
                costOfLiving: "Low-Medium",
                avgRent: { studio: 650, "1-bedroom": 800, "2-bedroom": 1000, "3-bedroom": 1300, house: 1600 }
            },
            other: {
                name: "Other City",
                utilities: 175,
                taxes: 550,
                avgAgencyFee: 1300,
                costOfLiving: "Varies",
                avgRent: { studio: 750, "1-bedroom": 950, "2-bedroom": 1150, "3-bedroom": 1400, house: 1700 }
            }
        };

        // Employment type requirements
        this.employmentData = {
            employed: {
                name: "Employed",
                incomeMultiplier: 4,
                requirements: [
                    "Permanent employment contract",
                    "3 recent pay slips",
                    "Employer declaration letter",
                    "Minimum 12-month contract duration"
                ],
                documents: [
                    "Employment Contract",
                    "Recent Pay Slips (3 months)",
                    "Employer Declaration",
                    "Work Permit (if non-EU)"
                ]
            },
            "self-employed": {
                name: "Self-Employed",
                incomeMultiplier: 4.5,
                requirements: [
                    "2+ years of financial statements",
                    "Business registration (KVK)",
                    "Tax returns (2 years)",
                    "Consistent income proof"
                ],
                documents: [
                    "Business Registration (KVK)",
                    "Tax Returns (2 years)",
                    "Financial Statements",
                    "Bank Statements (6 months)",
                    "Accountant Declaration"
                ]
            },
            student: {
                name: "Student",
                incomeMultiplier: 3.5,
                requirements: [
                    "Student registration proof",
                    "Sufficient funding/scholarship",
                    "Guarantor often required",
                    "University enrollment confirmation"
                ],
                documents: [
                    "Student ID/Registration",
                    "Proof of Funding",
                    "Guarantor Information",
                    "University Enrollment"
                ]
            },
            freelancer: {
                name: "Freelancer",
                incomeMultiplier: 4.2,
                requirements: [
                    "Multiple client contracts",
                    "6+ months of bank statements",
                    "ZZP registration proof",
                    "Diverse income sources preferred"
                ],
                documents: [
                    "Client Contracts",
                    "Bank Statements (6 months)",
                    "ZZP Registration",
                    "Income Diversity Proof"
                ]
            },
            retired: {
                name: "Retired",
                incomeMultiplier: 3.8,
                requirements: [
                    "Pension statements",
                    "Social security proof",
                    "Investment income documentation",
                    "Retirement fund details"
                ],
                documents: [
                    "Pension Statements",
                    "Social Security Proof",
                    "Investment Documentation",
                    "Retirement Fund Details"
                ]
            }
        };

        this.currentProfile = {
            location: 'amsterdam',
            employment: 'employed',
            propertyType: '2-bedroom'
        };

        this.costs = {
            monthlyRent: 1200,
            securityDeposit: 2400,
            agencyFees: 0,
            utilities: 200,
            municipalTaxes: 600,
            movingCosts: 500
        };

        this.income = {
            monthlyIncome: 4500,
            monthlyRent: 1200
        };

        this.documents = {
            completed: 0,
            total: 4
        };

        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.updateAllCalculations();
        console.log('🧠 Smart Rental Calculator initialized');
    }

    cacheElements() {
        // Profile selectors
        this.locationSelect = document.getElementById('location-select');
        this.employmentSelect = document.getElementById('employment-select');
        this.propertySelect = document.getElementById('property-select');
        this.quickStats = document.getElementById('quick-stats');

        // Income inputs
        this.monthlyRentInput = document.getElementById('monthly-rent');
        this.monthlyIncomeInput = document.getElementById('monthly-income');
        this.incomeResult = document.getElementById('income-result');
        this.incomeRatio = document.getElementById('income-ratio');
        this.incomeStatus = document.getElementById('income-status');

        // Dynamic content areas
        this.dynamicRequirements = document.getElementById('dynamic-requirements');
        this.dynamicDocuments = document.getElementById('dynamic-documents');
        this.documentContext = document.getElementById('document-context');
        this.profileContext = document.getElementById('profile-context');
        this.requirementsTitle = document.getElementById('requirements-title');

        // Costs display
        this.costRent = document.getElementById('cost-rent');
        this.costDeposit = document.getElementById('cost-deposit');
        this.costAgency = document.getElementById('cost-agency');
        this.costUtilities = document.getElementById('cost-utilities');
        this.costTaxes = document.getElementById('cost-taxes');
        this.costMoving = document.getElementById('cost-moving');
        this.totalMonthly = document.getElementById('total-monthly');
        this.totalInitial = document.getElementById('total-initial');

        // Location-based elements
        this.locationSubtitle = document.getElementById('location-subtitle');
        this.utilitiesNote = document.getElementById('utilities-note');
        this.taxesNote = document.getElementById('taxes-note');
        this.agencyNote = document.getElementById('agency-note');
        this.depositNote = document.getElementById('deposit-note');
        this.utilitiesBadge = document.getElementById('utilities-badge');
        this.taxesBadge = document.getElementById('taxes-badge');

        // Affordability
        this.affordabilityFill = document.getElementById('affordability-fill');
        this.affordabilityStatus = document.getElementById('affordability-status');
        this.affordabilityTip = document.getElementById('affordability-tip');

        // Scenario elements
        this.scenarioButtons = document.querySelectorAll('.scenario-cta');
        this.savingsCheaper = document.getElementById('savings-cheaper');
        this.savingsRotterdam = document.getElementById('savings-rotterdam');
        this.incomeBenefit = document.getElementById('income-benefit');

        // Modals and buttons
        this.eligibilityModal = document.getElementById('eligibility-modal');
        this.eligibilityContent = document.getElementById('eligibility-content');
        this.checkEligibilityBtn = document.getElementById('check-eligibility');
        this.startApplicationBtn = document.getElementById('start-application');
        this.closeModalBtns = document.querySelectorAll('.close-eligibility');
    }

    setupEventListeners() {
        // Profile changes
        this.locationSelect.addEventListener('change', () => this.handleProfileChange());
        this.employmentSelect.addEventListener('change', () => this.handleProfileChange());
        this.propertySelect.addEventListener('change', () => this.handleProfileChange());

        // Income calculation
        this.monthlyRentInput.addEventListener('input', () => {
            this.updateIncomeCalculation();
            this.updateCosts();
        });
        
        this.monthlyIncomeInput.addEventListener('input', () => {
            this.updateIncomeCalculation();
        });

        // Scenario buttons
        this.scenarioButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const scenario = e.currentTarget.dataset.scenario;
                this.runScenario(scenario);
            });
        });

        // Eligibility check
        this.checkEligibilityBtn.addEventListener('click', () => {
            this.checkEligibility();
        });

        // Modal interactions
        this.startApplicationBtn.addEventListener('click', () => {
            this.startApplication();
        });

        this.closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        this.eligibilityModal.addEventListener('click', (e) => {
            if (e.target === this.eligibilityModal) {
                this.closeModals();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }

    handleProfileChange() {
        this.currentProfile = {
            location: this.locationSelect.value,
            employment: this.employmentSelect.value,
            propertyType: this.propertySelect.value
        };

        this.updateProfileBasedCalculations();
        this.updateDynamicContent();
        this.updateQuickStats();
        this.updateScenarioCalculations();
    }

    updateProfileBasedCalculations() {
        const city = this.cityData[this.currentProfile.location];
        const employment = this.employmentData[this.currentProfile.employment];
        
        // Update rent based on property type and location
        const avgRent = city.avgRent[this.currentProfile.propertyType];
        this.monthlyRentInput.value = avgRent;
        this.income.monthlyRent = avgRent;

        // Update costs based on location
        this.costs.utilities = city.utilities;
        this.costs.municipalTaxes = city.taxes;
        this.costs.agencyFees = city.avgAgencyFee;

        // Update UI labels
        this.locationSubtitle.textContent = `${city.name} Estimates`;
        this.utilitiesBadge.textContent = `${city.name} Avg.`;
        this.taxesBadge.textContent = 'City Estimate';

        this.updateIncomeCalculation();
        this.updateCosts();
    }

    updateDynamicContent() {
        const employment = this.employmentData[this.currentProfile.employment];
        const city = this.cityData[this.currentProfile.location];

        // Update requirements section
        this.requirementsTitle.textContent = `${employment.name} Requirements`;
        this.dynamicRequirements.innerHTML = employment.requirements.map(req => `
            <div class="requirement-item">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>${req.split(':')[0]}</strong>
                    <p>${req.split(':')[1] || req}</p>
                </div>
            </div>
        `).join('');

        // Update document checklist
        this.dynamicDocuments.innerHTML = employment.documents.map(doc => `
            <label class="document-item">
                <input type="checkbox" class="document-checkbox">
                <span class="document-checkmark"></span>
                <div class="document-info">
                    <span class="document-name">${doc}</span>
                    <span class="document-status">Required for ${employment.name.toLowerCase()} applicants</span>
                </div>
                <i class="fas fa-info-circle document-help" title="Required document for ${employment.name.toLowerCase()}"></i>
            </label>
        `).join('');

        // Update document context
        this.profileContext.textContent = `${employment.name} in ${city.name}`;

        // Update document progress
        this.setupDocumentTracking();
    }

    updateQuickStats() {
        const city = this.cityData[this.currentProfile.location];
        const employment = this.employmentData[this.currentProfile.employment];
        
        this.quickStats.innerHTML = `
            <div class="quick-stat">
                <span class="stat-value">${city.costOfLiving}</span>
                <span class="stat-label">Cost of Living</span>
            </div>
            <div class="quick-stat">
                <span class="stat-value">${employment.incomeMultiplier}x</span>
                <span class="stat-label">Income Required</span>
            </div>
            <div class="quick-stat">
                <span class="stat-value">${this.costs.agencyFees ? 'Yes' : 'No'}</span>
                <span class="stat-label">Agency Fees</span>
            </div>
            <div class="quick-stat">
                <span class="stat-value">${employment.documents.length}</span>
                <span class="stat-label">Documents</span>
            </div>
        `;
    }

    updateScenarioCalculations() {
        const currentCity = this.cityData[this.currentProfile.location];
        const rotterdam = this.cityData.rotterdam;
        
        // Calculate savings for different scenarios
        const currentRent = this.income.monthlyRent;
        const cheaperRent = currentRent * 0.8; // 20% cheaper
        const rotterdamRent = rotterdam.avgRent[this.currentProfile.propertyType];
        
        this.savingsCheaper.textContent = `€${Math.round(currentRent - cheaperRent)}/month`;
        this.savingsRotterdam.textContent = `-${Math.round((1 - rotterdamRent/currentRent) * 100)}%`;
        this.incomeBenefit.textContent = `+€${Math.round(currentRent * 0.25)} budget`;
    }

    setupDocumentTracking() {
        const checkboxes = this.dynamicDocuments.querySelectorAll('.document-checkbox');
        this.documents.total = checkboxes.length;
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateDocumentProgress();
            });
        });
        
        this.updateDocumentProgress();
    }

    updateDocumentProgress() {
        const checkboxes = this.dynamicDocuments.querySelectorAll('.document-checkbox');
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        this.documents.completed = checkedCount;
        
        const progress = (checkedCount / this.documents.total) * 100;
        document.getElementById('document-progress').textContent = `${Math.round(progress)}%`;
        document.getElementById('document-progress-fill').style.width = `${progress}%`;
    }

    updateIncomeCalculation() {
        const monthlyRent = parseFloat(this.monthlyRentInput.value) || 0;
        const monthlyIncome = parseFloat(this.monthlyIncomeInput.value) || 0;
        
        this.income.monthlyRent = monthlyRent;
        this.income.monthlyIncome = monthlyIncome;
        
        const employment = this.employmentData[this.currentProfile.employment];
        const requiredMultiplier = employment.incomeMultiplier;
        const ratio = monthlyRent > 0 ? (monthlyIncome / monthlyRent).toFixed(2) : 0;
        
        this.incomeRatio.textContent = `${ratio}x`;
        
        // Update income status based on employment requirements
        if (ratio >= requiredMultiplier) {
            this.incomeStatus.innerHTML = `<i class="fas fa-check-circle"></i><span>Meets ${employment.name} Requirements</span>`;
            this.incomeStatus.className = 'result-status';
        } else if (ratio >= requiredMultiplier * 0.8) {
            this.incomeStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>Close to ${employment.name} Requirements</span>`;
            this.incomeStatus.className = 'result-status bg-warning';
        } else {
            this.incomeStatus.innerHTML = `<i class="fas fa-times-circle"></i><span>Below ${employment.name} Requirements</span>`;
            this.incomeStatus.className = 'result-status bg-danger';
        }
        
        this.updateAffordability(ratio, requiredMultiplier);
    }

    updateCosts() {
        const monthlyRent = this.income.monthlyRent;
        const city = this.cityData[this.currentProfile.location];
        
        // Update costs
        this.costs.monthlyRent = monthlyRent;
        this.costs.securityDeposit = monthlyRent * 2;
        this.costs.utilities = city.utilities;
        this.costs.municipalTaxes = city.taxes;
        this.costs.agencyFees = city.avgAgencyFee;
        
        // Update display
        this.costRent.textContent = this.formatCurrency(monthlyRent);
        this.costDeposit.textContent = this.formatCurrency(this.costs.securityDeposit);
        this.costAgency.textContent = this.formatCurrency(this.costs.agencyFees);
        this.costUtilities.textContent = this.formatCurrency(this.costs.utilities);
        this.costTaxes.textContent = this.formatCurrency(this.costs.municipalTaxes);
        this.costMoving.textContent = this.formatCurrency(this.costs.movingCosts);
        
        // Update totals
        const monthlyTotal = monthlyRent + this.costs.utilities + (this.costs.municipalTaxes / 12);
        const initialTotal = this.costs.securityDeposit + this.costs.agencyFees + this.costs.movingCosts;
        
        this.totalMonthly.textContent = this.formatCurrency(monthlyTotal);
        this.totalInitial.textContent = this.formatCurrency(initialTotal);
    }

    updateAffordability(incomeRatio, requiredMultiplier) {
        const city = this.cityData[this.currentProfile.location];
        let affordabilityLevel, affordabilityText, statusIcon, tipText;
        
        const affordabilityScore = (incomeRatio / requiredMultiplier) * 100;
        
        if (affordabilityScore >= 100) {
            affordabilityLevel = 80 + Math.min(20, (affordabilityScore - 100) / 2);
            affordabilityText = 'Comfortably Affordable';
            statusIcon = 'fa-check-circle';
            tipText = `Your income meets ${city.name}'s requirements for ${this.currentProfile.propertyType} properties`;
        } else if (affordabilityScore >= 80) {
            affordabilityLevel = 50 + (affordabilityScore - 80);
            affordabilityText = 'Moderately Affordable';
            statusIcon = 'fa-exclamation-circle';
            tipText = `Close to requirements - consider a smaller property or different location`;
        } else if (affordabilityScore >= 60) {
            affordabilityLevel = 30 + (affordabilityScore - 60);
            affordabilityText = 'Potentially Strained';
            statusIcon = 'fa-exclamation-triangle';
            tipText = `Below standard requirements - guarantor or additional documentation may be needed`;
        } else {
            affordabilityLevel = Math.max(10, affordabilityScore / 2);
            affordabilityText = 'Likely Unaffordable';
            statusIcon = 'fa-times-circle';
            tipText = `Consider more affordable areas like ${this.getAffordableAlternative(city.name)}`;
        }
        
        this.affordabilityFill.style.width = `${Math.min(100, affordabilityLevel)}%`;
        this.affordabilityStatus.innerHTML = `<i class="fas ${statusIcon}"></i><span>${affordabilityText}</span>`;
        this.affordabilityTip.innerHTML = `<i class="fas fa-lightbulb"></i><span>${tipText}</span>`;
    }

    getAffordableAlternative(currentCity) {
        const alternatives = {
            'amsterdam': 'Rotterdam or Utrecht',
            'rotterdam': 'The Hague or Eindhoven', 
            'the-hague': 'Eindhoven or Groningen',
            'utrecht': 'Rotterdam or The Hague',
            'eindhoven': 'Groningen',
            'groningen': 'Nearby smaller cities',
            'other': 'Consider different city options'
        };
        return alternatives[currentCity.toLowerCase()] || 'different areas';
    }

    runScenario(scenario) {
        switch(scenario) {
            case 'cheaper':
                // 20% cheaper rent
                const cheaperRent = this.income.monthlyRent * 0.8;
                this.monthlyRentInput.value = cheaperRent;
                this.showNotification('Exploring more budget-friendly options', 'info');
                break;
                
            case 'different-city':
                // Switch to Rotterdam for comparison
                this.locationSelect.value = 'rotterdam';
                this.handleProfileChange();
                this.showNotification('Comparing costs in Rotterdam', 'info');
                break;
                
            case 'income-increase':
                // 25% higher income
                const higherIncome = this.income.monthlyIncome * 1.25;
                this.monthlyIncomeInput.value = higherIncome;
                this.showNotification('Exploring options with higher income', 'info');
                break;
        }
        
        this.updateIncomeCalculation();
        this.updateCosts();
    }

    checkEligibility() {
        const incomeRatio = this.income.monthlyIncome / this.income.monthlyRent;
        const employment = this.employmentData[this.currentProfile.employment];
        const documentProgress = (this.documents.completed / this.documents.total) * 100;
        const city = this.cityData[this.currentProfile.location];
        
        let eligibilityHTML = '';
        const meetsIncome = incomeRatio >= employment.incomeMultiplier;
        const documentsReady = documentProgress >= 80;

        if (meetsIncome && documentsReady) {
            eligibilityHTML = `
                <div class="text-center space-y-4">
                    <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                        <i class="fas fa-check text-3xl text-emerald-600"></i>
                    </div>
                    <h4 class="text-xl font-semibold text-gray-800">High Eligibility in ${city.name}</h4>
                    <p class="text-gray-600">Your profile strongly matches ${city.name} rental requirements for ${this.currentProfile.propertyType} properties.</p>
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div class="text-center p-4 bg-emerald-50 rounded-lg">
                            <div class="text-2xl font-bold text-emerald-600">${incomeRatio.toFixed(1)}x</div>
                            <div class="text-sm text-gray-600">Income Ratio</div>
                        </div>
                        <div class="text-center p-4 bg-emerald-50 rounded-lg">
                            <div class="text-2xl font-bold text-emerald-600">${Math.round(documentProgress)}%</div>
                            <div class="text-sm text-gray-600">Documents Ready</div>
                        </div>
                    </div>
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-star text-blue-600"></i>
                            <span class="text-sm text-blue-800">You're well-positioned for properties in ${city.name}</span>
                        </div>
                    </div>
                </div>
            `;
        } else if (meetsIncome || documentsReady) {
            eligibilityHTML = `
                <div class="text-center space-y-4">
                    <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                        <i class="fas fa-exclamation text-3xl text-yellow-600"></i>
                    </div>
                    <h4 class="text-xl font-semibold text-gray-800">Moderate Eligibility</h4>
                    <p class="text-gray-600">You may need additional preparation for ${city.name} rental market.</p>
                    <div class="space-y-3 text-left">
                        <div class="flex items-center space-x-3 ${meetsIncome ? 'text-emerald-600' : 'text-yellow-600'}">
                            <i class="fas ${meetsIncome ? 'fa-check' : 'fa-exclamation'}"></i>
                            <span>Income requirement: ${meetsIncome ? 'Met' : `Need ${employment.incomeMultiplier}x (currently ${incomeRatio.toFixed(1)}x)`}</span>
                        </div>
                        <div class="flex items-center space-x-3 ${documentsReady ? 'text-emerald-600' : 'text-yellow-600'}">
                            <i class="fas ${documentsReady ? 'fa-check' : 'fa-exclamation'}"></i>
                            <span>Documentation: ${Math.round(documentProgress)}% complete</span>
                        </div>
                    </div>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-lightbulb text-yellow-600"></i>
                            <span class="text-sm text-yellow-800">Consider properties in ${this.getAffordableAlternative(city.name)} for better chances</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            eligibilityHTML = `
                <div class="text-center space-y-4">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <i class="fas fa-times text-3xl text-red-600"></i>
                    </div>
                    <h4 class="text-xl font-semibold text-gray-800">Limited Eligibility</h4>
                    <p class="text-gray-600">You may need to consider alternative options or provide additional guarantees.</p>
                    <div class="space-y-3 text-left">
                        <div class="flex items-center space-x-3 text-red-600">
                            <i class="fas fa-times"></i>
                            <span>Income below requirements (${incomeRatio.toFixed(1)}x vs required ${employment.incomeMultiplier}x)</span>
                        </div>
                        <div class="flex items-center space-x-3 text-yellow-600">
                            <i class="fas fa-exclamation"></i>
                            <span>Documents incomplete (${Math.round(documentProgress)}% ready)</span>
                        </div>
                    </div>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-map-marker-alt text-red-600"></i>
                            <span class="text-sm text-red-800">Consider ${this.getAffordableAlternative(city.name)} or shared accommodation</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        this.eligibilityContent.innerHTML = eligibilityHTML;
        this.eligibilityModal.classList.remove('hidden');
    }

    startApplication() {
        this.showNotification('Starting your smart rental application...', 'success');
        this.closeModals();
        
        // Simulate application start with profile data
        setTimeout(() => {
            console.log('Starting application with profile:', this.currentProfile);
            console.log('Income:', this.income);
            console.log('Costs:', this.costs);
        }, 1000);
    }

    closeModals() {
        this.eligibilityModal.classList.add('hidden');
    }

    updateAllCalculations() {
        this.updateProfileBasedCalculations();
        this.updateDynamicContent();
        this.updateQuickStats();
        this.updateScenarioCalculations();
        this.setupDocumentTracking();
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    showNotification(message, type = 'info') {
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
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
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
}

// Initialize the smart rental calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SmartRentalCalculator();
});

// Dutch rental market utility functions
const DutchRentalUtils = {
    // Get city recommendations based on budget
    getCityRecommendations: (monthlyBudget, propertyType) => {
        const cities = ['amsterdam', 'rotterdam', 'the-hague', 'utrecht', 'eindhoven', 'groningen'];
        const cityData = new SmartRentalCalculator().cityData;
        
        return cities.filter(city => {
            const avgRent = cityData[city].avgRent[propertyType];
            return avgRent <= monthlyBudget;
        }).sort((a, b) => {
            return cityData[a].avgRent[propertyType] - cityData[b].avgRent[propertyType];
        });
    },
    
    // Calculate time to save for initial costs
    calculateSavingsTime: (initialCosts, monthlySavings) => {
        if (monthlySavings <= 0) return 'Not feasible with current savings';
        const months = Math.ceil(initialCosts / monthlySavings);
        return months <= 12 ? `${months} months` : `${Math.round(months/12)} years`;
    }
};