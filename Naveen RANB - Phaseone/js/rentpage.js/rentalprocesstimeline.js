// === DUTCH RENTAL PROCESS TIMELINE FUNCTIONALITY ===

class RentalProcessTimeline {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 6;
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.updateProgress();
        console.log('📋 Rental Process Timeline initialized');
    }
    
    cacheElements() {
        this.progressSteps = document.querySelectorAll('.progress-step');
        this.processSteps = document.querySelectorAll('.process-step');
        this.progressFill = document.getElementById('progress-fill');
        this.prevBtn = document.getElementById('prev-step');
        this.nextBtn = document.getElementById('next-step');
        
        // Interactive elements
        this.uploadArea = document.getElementById('upload-area');
        this.documentUpload = document.getElementById('document-upload');
        this.uploadedFiles = document.getElementById('uploaded-files');
        this.monthlyRentInput = document.getElementById('monthly-rent');
        this.monthlyIncomeInput = document.getElementById('monthly-income');
        this.incomeResult = document.getElementById('income-result');
        this.depositRentInput = document.getElementById('deposit-rent');
        this.depositMonthsSelect = document.getElementById('deposit-months');
    }
    
    setupEventListeners() {
        // Progress step clicks
        this.progressSteps.forEach(step => {
            step.addEventListener('click', () => {
                const stepNumber = parseInt(step.dataset.step);
                this.goToStep(stepNumber);
            });
        });
        
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => {
            this.previousStep();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextStep();
        });
        
        // Document upload functionality
        this.setupDocumentUpload();
        
        // Income calculator
        this.setupIncomeCalculator();
        
        // Deposit calculator
        this.setupDepositCalculator();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousStep();
            } else if (e.key === 'ArrowRight') {
                this.nextStep();
            }
        });
    }
    
    setupDocumentUpload() {
        // Click to upload
        this.uploadArea.addEventListener('click', () => {
            this.documentUpload.click();
        });
        
        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });
        
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });
        
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            this.handleFileUpload(e.dataTransfer.files);
        });
        
        // File input change
        this.documentUpload.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });
    }
    
    handleFileUpload(files) {
        if (files.length > 0) {
            this.uploadedFiles.classList.remove('hidden');
            const fileList = this.uploadedFiles.querySelector('.file-list');
            fileList.innerHTML = '';
            
            Array.from(files).forEach(file => {
                const fileItem = this.createFileItem(file);
                fileList.appendChild(fileItem);
            });
            
            this.showNotification(`${files.length} file(s) uploaded successfully`, 'success');
        }
    }
    
    createFileItem(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const fileIcons = {
            pdf: 'file-pdf',
            doc: 'file-word',
            docx: 'file-word',
            jpg: 'file-image',
            jpeg: 'file-image',
            png: 'file-image'
        };
        
        const fileIcon = fileIcons[fileExtension] || 'file';
        
        fileItem.innerHTML = `
            <div class="file-info">
                <i class="fas fa-${fileIcon} file-icon"></i>
                <span class="file-name">${file.name}</span>
            </div>
            <button class="file-remove">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        fileItem.querySelector('.file-remove').addEventListener('click', () => {
            fileItem.remove();
            if (this.uploadedFiles.querySelector('.file-list').children.length === 0) {
                this.uploadedFiles.classList.add('hidden');
            }
        });
        
        return fileItem;
    }
    
    setupIncomeCalculator() {
        const calculateIncome = () => {
            const rent = parseFloat(this.monthlyRentInput.value) || 0;
            const income = parseFloat(this.monthlyIncomeInput.value) || 0;
            const ratio = rent > 0 ? (income / rent).toFixed(2) : 0;
            
            let resultHTML = '';
            
            if (ratio >= 4) {
                resultHTML = `
                    <div class="result-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="result-content">
                        <div class="result-title">Income Requirement Met</div>
                        <div class="result-description">Your income is ${ratio}x the monthly rent</div>
                    </div>
                `;
            } else {
                resultHTML = `
                    <div class="result-icon">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <div class="result-content">
                        <div class="result-title">Income Requirement Not Met</div>
                        <div class="result-description">Your income is ${ratio}x the monthly rent (minimum 4x required)</div>
                    </div>
                `;
            }
            
            this.incomeResult.innerHTML = resultHTML;
        };
        
        this.monthlyRentInput.addEventListener('input', calculateIncome);
        this.monthlyIncomeInput.addEventListener('input', calculateIncome);
        
        // Initial calculation
        calculateIncome();
    }
    
    setupDepositCalculator() {
        const calculateDeposit = () => {
            const rent = parseFloat(this.depositRentInput.value) || 0;
            const months = parseFloat(this.depositMonthsSelect.value) || 2;
            const deposit = rent * months;
            
            const resultElement = document.querySelector('#step-5 .calculator-result');
            if (resultElement) {
                resultElement.querySelector('.result-description').textContent = 
                    `€${deposit.toLocaleString()} (${months} month${months > 1 ? 's' : ''}' rent)`;
            }
        };
        
        this.depositRentInput.addEventListener('input', calculateDeposit);
        this.depositMonthsSelect.addEventListener('change', calculateDeposit);
        
        // Initial calculation
        calculateDeposit();
    }
    
    goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
            this.currentStep = stepNumber;
            this.updateProgress();
            this.updateStepDisplay();
        }
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateProgress();
            this.updateStepDisplay();
        }
    }
    
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateProgress();
            this.updateStepDisplay();
        }
    }
    
    updateProgress() {
        // Update progress bar
        const progressPercentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
        
        // Update progress steps
        this.progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            
            step.classList.remove('active', 'completed');
            
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
            } else if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            }
        });
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentStep === 1;
        this.nextBtn.disabled = this.currentStep === this.totalSteps;
        this.nextBtn.textContent = this.currentStep === this.totalSteps ? 'Complete Process' : 'Next Step';
    }
    
    updateStepDisplay() {
        this.processSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
                step.style.display = 'block';
                
                // Add entrance animation
                step.style.animation = 'fadeInUp 0.6s ease';
            } else {
                step.classList.remove('active');
                step.style.display = 'none';
            }
        });
        
        // Scroll to top of step
        window.scrollTo({
            top: document.getElementById('rental-process').offsetTop - 100,
            behavior: 'smooth'
        });
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
}

// Initialize the rental process timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RentalProcessTimeline();
    
    // Add keyboard navigation hints
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
            e.preventDefault();
            document.querySelector('#prev-step').click();
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
            e.preventDefault();
            document.querySelector('#next-step').click();
        }
    });
});

// Utility functions for the rental process
const RentalProcessUtils = {
    // Validate income against Dutch 4x rent rule
    validateIncome: (monthlyRent, monthlyIncome) => {
        return monthlyIncome >= monthlyRent * 4;
    },
    
    // Calculate required deposit
    calculateDeposit: (monthlyRent, depositMonths = 2) => {
        return monthlyRent * depositMonths;
    },
    
    // Format currency for display
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    },
    
    // Get Dutch rental process tips
    getProcessTips: (step) => {
        const tips = {
            1: "Schedule multiple viewings to compare properties",
            2: "Have your documents ready before starting the application",
            3: "The 4x rent rule is standard but some landlords may accept 3x",
            4: "Read the contract carefully, especially about notice periods",
            5: "Your deposit should be held in a protected account",
            6: "Take photos during the move-in inspection"
        };
        return tips[step] || "Take your time and don't rush the process";
    }
};