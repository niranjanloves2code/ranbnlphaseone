// === PHASE 5: Advanced Mortgage Calculator System ===

class MortgageCalculator {
    constructor() {
        this.calculatorData = {
            propertyPrice: 850000,
            downPayment: 150000,
            interestRate: 3.8,
            loanTerm: 30,
            hasNHG: true,
            isAnnuity: true,
            hasTransferTax: false
        };
        
        this.results = {};
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.calculateMortgage();
        console.log('💰 Mortgage Calculator initialized');
    }
    
    cacheElements() {
        // Sliders
        this.sliders = {
            propertyPrice: document.getElementById('property-price-slider'),
            downPayment: document.getElementById('down-payment-slider'),
            interestRate: document.getElementById('interest-rate-slider')
        };
        
        // Value displays
        this.valueDisplays = {
            propertyPrice: document.getElementById('property-price-value'),
            downPayment: document.getElementById('down-payment-value'),
            downPaymentPercentage: document.getElementById('down-payment-percentage'),
            interestRate: document.getElementById('interest-rate-value')
        };
        
        // Loan term buttons
        this.loanTermBtns = document.querySelectorAll('.loan-term-btn');
        
        // Feature toggles
        this.featureToggles = {
            nhg: document.getElementById('nhg-toggle'),
            annuity: document.getElementById('annuity-toggle'),
            transferTax: document.getElementById('transfer-tax-toggle')
        };
        
        // Action buttons
        this.actionBtns = {
            reset: document.querySelector('.reset-calculator-btn'),
            calculate: document.querySelector('.calculate-mortgage-btn')
        };
        
        // Results elements
        this.resultsElements = {
            monthlyPayment: document.getElementById('monthly-payment'),
            mortgageAmount: document.getElementById('mortgage-amount'),
            totalInterest: document.getElementById('total-interest'),
            totalPayment: document.getElementById('total-payment'),
            nhgBenefit: document.getElementById('nhg-benefit'),
            transferTax: document.getElementById('transfer-tax'),
            notaryCosts: document.getElementById('notary-costs'),
            principalPayment: document.getElementById('principal-payment'),
            interestPayment: document.getElementById('interest-payment'),
            firstYearsInterest: document.getElementById('first-years-interest'),
            incomeMultiple: document.getElementById('income-multiple'),
            requiredIncome: document.getElementById('required-income'),
            affordabilityStatus: document.getElementById('affordability-status')
        };
        
        // Amortization chart
        this.amortizationChart = document.getElementById('amortization-chart');
    }
    
    setupEventListeners() {
        // Slider events
        Object.keys(this.sliders).forEach(key => {
            this.sliders[key].addEventListener('input', (e) => {
                this.handleSliderChange(key, e.target.value);
            });
        });
        
        // Loan term buttons
        this.loanTermBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleLoanTermChange(e.target.dataset.years);
            });
        });
        
        // Feature toggles
        Object.keys(this.featureToggles).forEach(key => {
            this.featureToggles[key].addEventListener('change', (e) => {
                this.handleFeatureToggle(key, e.target.checked);
            });
        });
        
        // Action buttons
        this.actionBtns.reset.addEventListener('click', () => {
            this.resetCalculator();
        });
        
        this.actionBtns.calculate.addEventListener('click', () => {
            this.calculateMortgage();
        });
        
        // Initialize slider progress
        this.updateSliderProgress();
    }
    
    handleSliderChange(type, value) {
        const numericValue = parseFloat(value);
        
        switch (type) {
            case 'propertyPrice':
                this.calculatorData.propertyPrice = numericValue;
                this.updateDownPaymentLimits();
                break;
            case 'downPayment':
                this.calculatorData.downPayment = numericValue;
                break;
            case 'interestRate':
                this.calculatorData.interestRate = numericValue;
                break;
        }
        
        this.updateDisplayValues();
        this.debouncedCalculate();
    }
    
    handleLoanTermChange(years) {
        this.calculatorData.loanTerm = parseInt(years);
        
        // Update active button
        this.loanTermBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.years === years);
        });
        
        this.debouncedCalculate();
    }
    
    handleFeatureToggle(feature, isChecked) {
        switch (feature) {
            case 'nhg':
                this.calculatorData.hasNHG = isChecked;
                break;
            case 'annuity':
                this.calculatorData.isAnnuity = isChecked;
                break;
            case 'transferTax':
                this.calculatorData.hasTransferTax = isChecked;
                break;
        }
        
        this.debouncedCalculate();
    }
    
    updateDownPaymentLimits() {
        const maxDownPayment = Math.min(this.calculatorData.propertyPrice * 0.5, 500000);
        this.sliders.downPayment.max = maxDownPayment;
        
        // Adjust current down payment if it exceeds new limit
        if (this.calculatorData.downPayment > maxDownPayment) {
            this.calculatorData.downPayment = maxDownPayment;
            this.sliders.downPayment.value = maxDownPayment;
        }
    }
    
    updateDisplayValues() {
        // Update value displays
        this.valueDisplays.propertyPrice.textContent = this.formatCurrency(this.calculatorData.propertyPrice);
        this.valueDisplays.downPayment.textContent = this.formatCurrency(this.calculatorData.downPayment);
        this.valueDisplays.interestRate.textContent = `${this.calculatorData.interestRate}%`;
        
        // Update down payment percentage
        const percentage = (this.calculatorData.downPayment / this.calculatorData.propertyPrice * 100).toFixed(1);
        this.valueDisplays.downPaymentPercentage.textContent = `${percentage}% of property price`;
        
        // Update slider progress
        this.updateSliderProgress();
    }
    
    updateSliderProgress() {
        // Calculate and set CSS custom properties for slider progress
        const propertyProgress = (this.calculatorData.propertyPrice - 150000) / (2500000 - 150000) * 100;
        const downPaymentProgress = (this.calculatorData.downPayment - 0) / (500000 - 0) * 100;
        const interestProgress = (this.calculatorData.interestRate - 1) / (6 - 1) * 100;
        
        this.sliders.propertyPrice.style.setProperty('--slider-progress', `${propertyProgress}%`);
        this.sliders.downPayment.style.setProperty('--slider-progress', `${downPaymentProgress}%`);
        this.sliders.interestRate.style.setProperty('--slider-progress', `${interestProgress}%`);
    }
    
    calculateMortgage() {
        this.showLoadingState();
        
        // Calculate basic values
        const mortgageAmount = this.calculatorData.propertyPrice - this.calculatorData.downPayment;
        const effectiveInterestRate = this.calculatorData.hasNHG ? 
            Math.max(this.calculatorData.interestRate - 0.6, 1.0) : this.calculatorData.interestRate;
        
        // Calculate monthly payment
        const monthlyPayment = this.calculateMonthlyPayment(
            mortgageAmount, 
            effectiveInterestRate, 
            this.calculatorData.loanTerm
        );
        
        // Calculate totals
        const totalPayments = monthlyPayment * this.calculatorData.loanTerm * 12;
        const totalInterest = totalPayments - mortgageAmount;
        
        // Calculate Dutch-specific costs
        const transferTax = this.calculatorData.hasTransferTax ? this.calculatorData.propertyPrice * 0.02 : 0;
        const notaryCosts = 2500; // Fixed estimate
        
        // Calculate payment breakdown (first month)
        const monthlyInterestRate = effectiveInterestRate / 100 / 12;
        const interestPayment = mortgageAmount * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        // Calculate first 5 years interest
        const firstYearsInterest = this.calculateFirstYearsInterest(
            mortgageAmount, 
            effectiveInterestRate, 
            this.calculatorData.loanTerm,
            5
        );
        
        // Calculate affordability
        const requiredIncome = this.calculateRequiredIncome(monthlyPayment);
        const incomeMultiple = requiredIncome / 12 / monthlyPayment;
        const affordabilityStatus = this.checkAffordability(monthlyPayment, requiredIncome);
        
        // NHG benefit calculation
        const nhgBenefit = this.calculatorData.hasNHG ? 
            this.calculateNHGBenefit(mortgageAmount, this.calculatorData.interestRate) : 0;
        
        // Store results
        this.results = {
            monthlyPayment,
            mortgageAmount,
            totalInterest,
            totalPayments,
            transferTax,
            notaryCosts,
            interestPayment,
            principalPayment,
            firstYearsInterest,
            requiredIncome,
            incomeMultiple,
            affordabilityStatus,
            nhgBenefit,
            effectiveInterestRate
        };
        
        // Update UI
        this.updateResultsDisplay();
        this.generateAmortizationChart();
        
        this.hideLoadingState();
    }
    
    calculateMonthlyPayment(principal, annualRate, years) {
        if (principal <= 0) return 0;
        
        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;
        
        if (monthlyRate === 0) {
            return principal / numberOfPayments;
        }
        
        if (this.calculatorData.isAnnuity) {
            // Annuity formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
            const rateFactor = Math.pow(1 + monthlyRate, numberOfPayments);
            return principal * monthlyRate * rateFactor / (rateFactor - 1);
        } else {
            // Linear mortgage (less common in Netherlands)
            const monthlyPrincipal = principal / numberOfPayments;
            const firstMonthInterest = principal * monthlyRate;
            return monthlyPrincipal + firstMonthInterest;
        }
    }
    
    calculateFirstYearsInterest(principal, annualRate, totalYears, firstYears) {
        let remainingPrincipal = principal;
        const monthlyRate = annualRate / 100 / 12;
        const monthlyPayment = this.calculateMonthlyPayment(principal, annualRate, totalYears);
        let totalInterest = 0;
        
        for (let month = 1; month <= firstYears * 12; month++) {
            const interestPayment = remainingPrincipal * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            
            totalInterest += interestPayment;
            remainingPrincipal -= principalPayment;
            
            if (remainingPrincipal <= 0) break;
        }
        
        return totalInterest;
    }
    
    calculateNHGBenefit(mortgageAmount, baseRate) {
        if (mortgageAmount > 435000) return 0; // NHG limit for 2024
        
        const baseMonthly = this.calculateMonthlyPayment(mortgageAmount, baseRate, this.calculatorData.loanTerm);
        const nhgMonthly = this.calculateMonthlyPayment(mortgageAmount, Math.max(baseRate - 0.6, 1.0), this.calculatorData.loanTerm);
        
        return baseMonthly - nhgMonthly;
    }
    
    calculateRequiredIncome(monthlyPayment) {
        // Dutch mortgage norm: monthly payment should not exceed 30% of gross monthly income
        const requiredMonthlyIncome = monthlyPayment / 0.3;
        return requiredMonthlyIncome * 12; // Annual income
    }
    
    checkAffordability(monthlyPayment, requiredIncome) {
        const monthlyIncome = requiredIncome / 12;
        const paymentRatio = monthlyPayment / monthlyIncome;
        
        if (paymentRatio <= 0.25) {
            return '✅ Excellent affordability';
        } else if (paymentRatio <= 0.3) {
            return '✅ Within Dutch norms';
        } else if (paymentRatio <= 0.35) {
            return '⚠️ Slightly above norms';
        } else {
            return '❌ Above recommended limits';
        }
    }
    
    updateResultsDisplay() {
        // Add value change animation
        Object.keys(this.resultsElements).forEach(key => {
            if (this.resultsElements[key]) {
                this.resultsElements[key].classList.add('value-change');
                setTimeout(() => {
                    this.resultsElements[key].classList.remove('value-change');
                }, 600);
            }
        });
        
        // Update main results
        this.resultsElements.monthlyPayment.textContent = this.formatCurrency(this.results.monthlyPayment);
        this.resultsElements.mortgageAmount.textContent = this.formatCurrency(this.results.mortgageAmount);
        this.resultsElements.totalInterest.textContent = this.formatCurrency(this.results.totalInterest);
        this.resultsElements.totalPayment.textContent = this.formatCurrency(this.results.totalPayments);
        this.resultsElements.nhgBenefit.textContent = `-${this.formatCurrency(this.results.nhgBenefit)}/m`;
        this.resultsElements.transferTax.textContent = this.formatCurrency(this.results.transferTax);
        this.resultsElements.notaryCosts.textContent = this.formatCurrency(this.results.notaryCosts);
        
        // Update payment breakdown
        this.resultsElements.principalPayment.textContent = this.formatCurrency(this.results.principalPayment);
        this.resultsElements.interestPayment.textContent = this.formatCurrency(this.results.interestPayment);
        this.resultsElements.firstYearsInterest.textContent = this.formatCurrency(this.results.firstYearsInterest);
        
        // Update affordability
        this.resultsElements.incomeMultiple.textContent = this.results.incomeMultiple.toFixed(1) + 'x';
        this.resultsElements.requiredIncome.textContent = this.formatCurrency(this.results.requiredIncome);
        this.resultsElements.affordabilityStatus.textContent = this.results.affordabilityStatus;
        
        // Update affordability status color
        const status = this.resultsElements.affordabilityStatus;
        status.className = 'text-xs font-semibold mt-2 ';
        if (this.results.affordabilityStatus.includes('✅')) {
            status.classList.add('text-emerald-600');
        } else if (this.results.affordabilityStatus.includes('⚠️')) {
            status.classList.add('text-orange-500');
        } else {
            status.classList.add('text-red-600');
        }
    }
    
    generateAmortizationChart() {
        this.amortizationChart.innerHTML = '';
        
        const yearsToShow = 5;
        const monthlyRate = this.results.effectiveInterestRate / 100 / 12;
        let remainingPrincipal = this.results.mortgageAmount;
        const monthlyPayment = this.results.monthlyPayment;
        
        for (let year = 1; year <= yearsToShow; year++) {
            let yearInterest = 0;
            let yearPrincipal = 0;
            
            // Calculate yearly totals
            for (let month = 1; month <= 12; month++) {
                if (remainingPrincipal <= 0) break;
                
                const interestPayment = remainingPrincipal * monthlyRate;
                const principalPayment = monthlyPayment - interestPayment;
                
                yearInterest += interestPayment;
                yearPrincipal += principalPayment;
                remainingPrincipal -= principalPayment;
            }
            
            const totalPaid = yearInterest + yearPrincipal;
            const interestPercentage = (yearInterest / totalPaid) * 100;
            
            const yearElement = document.createElement('div');
            yearElement.className = 'amortization-year';
            yearElement.innerHTML = `
                <div class="flex justify-between w-full mb-2">
                    <span class="text-sm font-semibold text-gray-700">Year ${year}</span>
                    <span class="text-sm text-gray-600">${this.formatCurrency(totalPaid)}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div class="amortization-bar h-2 rounded-full" style="width: ${interestPercentage}%"></div>
                </div>
                <div class="flex justify-between w-full text-xs text-gray-500">
                    <span>Interest: ${this.formatCurrency(yearInterest)}</span>
                    <span>Principal: ${this.formatCurrency(yearPrincipal)}</span>
                </div>
            `;
            
            this.amortizationChart.appendChild(yearElement);
        }
    }
    
    resetCalculator() {
        // Reset to default values
        this.calculatorData = {
            propertyPrice: 850000,
            downPayment: 150000,
            interestRate: 3.8,
            loanTerm: 30,
            hasNHG: true,
            isAnnuity: true,
            hasTransferTax: false
        };
        
        // Update sliders
        this.sliders.propertyPrice.value = 850000;
        this.sliders.downPayment.value = 150000;
        this.sliders.interestRate.value = 3.8;
        
        // Update loan term buttons
        this.loanTermBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.years === '30');
        });
        
        // Update feature toggles
        this.featureToggles.nhg.checked = true;
        this.featureToggles.annuity.checked = true;
        this.featureToggles.transferTax.checked = false;
        
        // Update displays and recalculate
        this.updateDisplayValues();
        this.calculateMortgage();
        
        // Show reset confirmation
        this.showResetConfirmation();
    }
    
    showResetConfirmation() {
        const btn = this.actionBtns.reset;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check mr-2"></i>Reset Complete!';
        btn.style.backgroundColor = '#059669';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = '';
        }, 2000);
    }
    
    showLoadingState() {
        document.getElementById('mortgage-calculator').classList.add('calculator-loading');
    }
    
    hideLoadingState() {
        document.getElementById('mortgage-calculator').classList.remove('calculator-loading');
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    debounce(func, wait = 500) {
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
    
    // Make debounced calculate available
    debouncedCalculate = this.debounce(this.calculateMortgage.bind(this), 300);
}

// Update the main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing components
    new MegaMenu();
    new NavigationManager();
    window.propertyFilterSystem = new PropertyFilterSystem();
    new BuyingProcessTimeline();
    new NeighborhoodCarousel();
    
    // Initialize mortgage calculator
    new MortgageCalculator();
    
    console.log('🚀 NordicEstates Buy Page with Mortgage Calculator initialized!');
});