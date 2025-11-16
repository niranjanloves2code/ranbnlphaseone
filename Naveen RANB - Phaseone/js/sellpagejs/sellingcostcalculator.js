// === PHASE 6: Dutch Selling Costs Calculator Functionality ===

class SellingCostsCalculator {
    constructor() {
        this.costData = {
            propertyPrice: 485000,
            sellerType: 'owner',
            location: 'amsterdam',
            agentFee: 1.5,
            services: {
                staging: true,
                'virtual-tour': true,
                'energy-label': false,
                'legal-assistance': false
            },
            fixedCosts: {
                notary: 1850,
                mortgageCancellation: 350,
                transferTax: 0
            },
            serviceCosts: {
                staging: 2500,
                'virtual-tour': 750,
                'energy-label': 300,
                'legal-assistance': 1200
            }
        };
        
        this.pieChart = null;
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupPieChart();
        this.calculateCosts();
        this.setupScrollAnimations();
        console.log('💰 Selling Costs Calculator initialized');
    }
    
    cacheElements() {
        // Input elements
        this.propertyPriceSlider = document.getElementById('property-price');
        this.priceDisplay = document.getElementById('price-display');
        this.locationSelect = document.querySelector('.location-select');
        this.sellerTypeBtns = document.querySelectorAll('.seller-type-btn');
        this.agentFeeSlider = document.getElementById('agent-fee');
        this.agentFeeDisplay = document.getElementById('agent-fee-display');
        this.serviceCheckboxes = document.querySelectorAll('.service-checkbox');
        this.transferTaxDisplay = document.getElementById('transfer-tax-display');
        
        // Output elements
        this.netProceeds = document.getElementById('net-proceeds');
        this.totalCosts = document.getElementById('total-costs');
        this.totalCostsPercentage = document.getElementById('total-costs-percentage');
        this.netPercentage = document.getElementById('net-percentage');
        this.breakEvenPrice = document.getElementById('break-even-price');
        this.transferTaxInfo = document.getElementById('transfer-tax-info');
        
        // Action buttons
        this.downloadReportBtn = document.querySelector('.download-report-btn');
        this.expertConsultationBtn = document.querySelector('.expert-consultation-btn');
        
        // Chart canvas
        this.pieChartCanvas = document.getElementById('cost-pie-chart');
        this.costLegend = document.getElementById('cost-legend');
    }
    
    setupEventListeners() {
        // Property price slider
        this.propertyPriceSlider.addEventListener('input', (e) => {
            this.costData.propertyPrice = parseInt(e.target.value);
            this.updatePriceDisplay();
            this.calculateCosts();
        });
        
        // Location selection
        this.locationSelect.addEventListener('change', (e) => {
            this.costData.location = e.target.value;
            this.calculateCosts();
        });
        
        // Seller type selection
        this.sellerTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.sellerTypeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.costData.sellerType = btn.dataset.type;
                this.updateTransferTax();
                this.calculateCosts();
            });
        });
        
        // Agent fee slider
        this.agentFeeSlider.addEventListener('input', (e) => {
            this.costData.agentFee = parseFloat(e.target.value);
            this.agentFeeDisplay.textContent = `${this.costData.agentFee}%`;
            this.calculateCosts();
        });
        
        // Service checkboxes
        this.serviceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const service = e.target.dataset.service;
                this.costData.services[service] = e.target.checked;
                this.calculateCosts();
            });
        });
        
        // Action buttons
        this.downloadReportBtn.addEventListener('click', () => {
            this.downloadCostReport();
        });
        
        this.expertConsultationBtn.addEventListener('click', () => {
            this.requestExpertConsultation();
        });
    }
    
    setupPieChart() {
        if (!this.pieChartCanvas) return;
        
        const ctx = this.pieChartCanvas.getContext('2d');
        this.pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#10b981', // Agent fees - Emerald
                        '#8b5cf6', // Notary - Purple
                        '#f59e0b', // Services - Amber
                        '#ef4444', // Transfer tax - Red
                        '#6b7280'  // Other - Gray
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '65%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: €${value.toLocaleString('nl-NL')} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    calculateCosts() {
        // Calculate agent fees
        const agentFees = (this.costData.propertyPrice * this.costData.agentFee) / 100;
        
        // Calculate service costs
        let serviceCosts = 0;
        Object.keys(this.costData.services).forEach(service => {
            if (this.costData.services[service]) {
                serviceCosts += this.costData.serviceCosts[service];
            }
        });
        
        // Update transfer tax based on seller type
        this.updateTransferTax();
        
        // Calculate total costs
        const totalCosts = agentFees + 
                          this.costData.fixedCosts.notary + 
                          this.costData.fixedCosts.mortgageCancellation + 
                          this.costData.fixedCosts.transferTax + 
                          serviceCosts;
        
        // Calculate net proceeds
        const netProceeds = this.costData.propertyPrice - totalCosts;
        const netPercentage = (netProceeds / this.costData.propertyPrice * 100);
        const totalCostsPercentage = (totalCosts / this.costData.propertyPrice * 100);
        
        // Calculate break-even price (simplified - would normally include purchase price)
        const breakEvenPrice = this.costData.propertyPrice * 0.97; // Example calculation
        
        // Update displays
        this.updateDisplays(netProceeds, totalCosts, totalCostsPercentage, netPercentage, breakEvenPrice);
        
        // Update pie chart
        this.updatePieChart(agentFees, serviceCosts, totalCosts);
        
        // Update cost legend
        this.updateCostLegend(agentFees, serviceCosts, totalCosts);
    }
    
    updateTransferTax() {
        if (this.costData.sellerType === 'investor') {
            this.costData.fixedCosts.transferTax = this.costData.propertyPrice * 0.02;
            this.transferTaxInfo.textContent = '2% (Investor rate)';
        } else {
            this.costData.fixedCosts.transferTax = 0;
            this.transferTaxInfo.textContent = '0% (Owner-occupier exempt)';
        }
        this.transferTaxDisplay.textContent = `€${this.costData.fixedCosts.transferTax.toLocaleString('nl-NL')}`;
    }
    
    updatePriceDisplay() {
        this.priceDisplay.textContent = `€${this.costData.propertyPrice.toLocaleString('nl-NL')}`;
        this.priceDisplay.classList.add('currency-animate');
        setTimeout(() => {
            this.priceDisplay.classList.remove('currency-animate');
        }, 500);
    }
    
    updateDisplays(netProceeds, totalCosts, totalCostsPercentage, netPercentage, breakEvenPrice) {
        // Animate number changes
        this.animateNumber(this.netProceeds, netProceeds, '€');
        this.animateNumber(this.totalCosts, totalCosts, '€');
        this.animateNumber(this.totalCostsPercentage, totalCostsPercentage, '', 1);
        this.animateNumber(this.netPercentage, netPercentage, '', 1);
        this.animateNumber(this.breakEvenPrice, breakEvenPrice, '€');
    }
    
    animateNumber(element, targetValue, prefix = '', decimals = 0) {
        const currentValue = this.parseNumber(element.textContent, prefix);
        const duration = 800;
        const steps = 30;
        const stepValue = (targetValue - currentValue) / steps;
        const stepTime = duration / steps;
        
        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const value = currentValue + (stepValue * currentStep);
            
            if (currentStep >= steps) {
                element.textContent = prefix + this.formatNumber(targetValue, decimals);
                clearInterval(timer);
            } else {
                element.textContent = prefix + this.formatNumber(value, decimals);
            }
        }, stepTime);
    }
    
    parseNumber(text, prefix) {
        const numberText = text.replace(prefix, '').replace(/[^\d,-]/g, '').replace(',', '');
        return parseFloat(numberText) || 0;
    }
    
    formatNumber(number, decimals = 0) {
        return number.toLocaleString('nl-NL', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }
    
    updatePieChart(agentFees, serviceCosts, totalCosts) {
        if (!this.pieChart) return;
        
        const data = [
            agentFees, // Agent fees
            this.costData.fixedCosts.notary, // Notary costs
            serviceCosts, // Additional services
            this.costData.fixedCosts.transferTax, // Transfer tax
            this.costData.fixedCosts.mortgageCancellation // Other costs
        ];
        
        const labels = [
            'Estate Agent Fees',
            'Notary Costs',
            'Additional Services',
            'Transfer Tax',
            'Mortgage Cancellation'
        ];
        
        this.pieChart.data.labels = labels;
        this.pieChart.data.datasets[0].data = data;
        this.pieChart.update();
    }
    
    updateCostLegend(agentFees, serviceCosts, totalCosts) {
        if (!this.costLegend) return;
        
        const costItems = [
            {
                label: 'Estate Agent Fees',
                value: agentFees,
                color: '#10b981',
                percentage: (agentFees / totalCosts * 100).toFixed(1)
            },
            {
                label: 'Notary Costs',
                value: this.costData.fixedCosts.notary,
                color: '#8b5cf6',
                percentage: (this.costData.fixedCosts.notary / totalCosts * 100).toFixed(1)
            },
            {
                label: 'Additional Services',
                value: serviceCosts,
                color: '#f59e0b',
                percentage: (serviceCosts / totalCosts * 100).toFixed(1)
            }
        ];
        
        // Only show transfer tax if applicable
        if (this.costData.fixedCosts.transferTax > 0) {
            costItems.push({
                label: 'Transfer Tax',
                value: this.costData.fixedCosts.transferTax,
                color: '#ef4444',
                percentage: (this.costData.fixedCosts.transferTax / totalCosts * 100).toFixed(1)
            });
        }
        
        // Add mortgage cancellation
        costItems.push({
            label: 'Mortgage Cancellation',
            value: this.costData.fixedCosts.mortgageCancellation,
            color: '#6b7280',
            percentage: (this.costData.fixedCosts.mortgageCancellation / totalCosts * 100).toFixed(1)
        });
        
        this.costLegend.innerHTML = costItems.map(item => `
            <div class="cost-legend-item">
                <div class="flex items-center">
                    <div class="legend-color" style="background-color: ${item.color}"></div>
                    <span class="legend-label">${item.label}</span>
                </div>
                <div class="legend-value">
                    €${this.formatNumber(item.value)} (${item.percentage}%)
                </div>
            </div>
        `).join('');
    }
    
    downloadCostReport() {
        const btn = this.downloadReportBtn;
        const originalHTML = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating Report...';
        btn.disabled = true;
        
        // Simulate report generation
        setTimeout(() => {
            // Create report content
            const reportContent = this.generateReportContent();
            
            // In a real implementation, this would generate a PDF
            // For demo purposes, we'll create a downloadable text file
            this.downloadTextFile(reportContent, 'NordicEstates-Cost-Breakdown.txt');
            
            // Show success state
            btn.innerHTML = '<i class="fas fa-check mr-2"></i>Report Downloaded!';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    }
    
    generateReportContent() {
        const totalCosts = parseFloat(this.totalCosts.textContent.replace('€', '').replace('.', '').replace(',', '.'));
        const netProceeds = parseFloat(this.netProceeds.textContent.replace('€', '').replace('.', '').replace(',', '.'));
        
        return `
NORDICESTATES - SELLING COST BREAKDOWN REPORT
=============================================

Property Details:
-----------------
Expected Selling Price: ${this.priceDisplay.textContent}
Property Location: ${this.locationSelect.options[this.locationSelect.selectedIndex].text}
Seller Type: ${this.costData.sellerType === 'owner' ? 'Owner-Occupier' : 'Investor'}

Cost Breakdown:
---------------
Estate Agent Fees (${this.costData.agentFee}%): €${(this.costData.propertyPrice * this.costData.agentFee / 100).toLocaleString('nl-NL')}
Notary Costs: €${this.costData.fixedCosts.notary.toLocaleString('nl-NL')}
Mortgage Cancellation: €${this.costData.fixedCosts.mortgageCancellation.toLocaleString('nl-NL')}
Transfer Tax: €${this.costData.fixedCosts.transferTax.toLocaleString('nl-NL')}

Additional Services:
-------------------
${Object.keys(this.costData.services)
    .filter(service => this.costData.services[service])
    .map(service => {
        const serviceName = service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return `${serviceName}: €${this.costData.serviceCosts[service].toLocaleString('nl-NL')}`;
    })
    .join('\n') || 'None selected'}

Summary:
--------
Total Selling Costs: ${this.totalCosts.textContent} (${this.totalCostsPercentage.textContent} of selling price)
Estimated Net Proceeds: ${this.netProceeds.textContent} (${this.netPercentage.textContent} of selling price)
Break-even Price: ${this.breakEvenPrice.textContent}

Generated on: ${new Date().toLocaleDateString('nl-NL')}
This report is for estimation purposes only.
        `.trim();
    }
    
    downloadTextFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    requestExpertConsultation() {
        const btn = this.expertConsultationBtn;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Connecting...';
        
        // Simulate API call
        setTimeout(() => {
            // In real implementation, this would open a consultation modal
            this.showConsultationModal();
            
            btn.innerHTML = originalHTML;
        }, 1000);
    }
    
    showConsultationModal() {
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 consultation-modal">
                <div class="bg-white rounded-2xl p-8 max-w-md w-full">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-semibold text-gray-800">Expert Consultation</h3>
                        <button class="close-modal text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <p class="text-gray-600">Let us connect you with one of our selling experts to discuss your specific situation and get personalized advice.</p>
                        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-user-tie text-emerald-600 text-xl"></i>
                                <div>
                                    <div class="font-semibold text-emerald-800">Specialized Advice</div>
                                    <div class="text-sm text-emerald-700">Get insights tailored to your property and goals</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex gap-4">
                        <button class="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                            Schedule Call
                        </button>
                        <button class="flex-1 border border-emerald-600 text-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
                            Send Email
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.consultation-modal');
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SellingCostsCalculator();
    console.log('🚀 Selling Costs Calculator loaded successfully!');
});

// Export for potential use in other modules
window.SellingCostsCalculator = SellingCostsCalculator;