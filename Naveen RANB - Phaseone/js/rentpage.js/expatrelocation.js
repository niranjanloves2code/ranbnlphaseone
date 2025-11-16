        // Expat Services JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Package Selection
    const packageSelectors = document.querySelectorAll('.package-selector');
    packageSelectors.forEach(selector => {
        selector.addEventListener('click', function() {
            // Remove selected class from all buttons
            packageSelectors.forEach(btn => {
                btn.classList.remove('selected', 'bg-emerald-500', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-800');
            });
            
            // Add selected class to clicked button
            this.classList.remove('bg-gray-100', 'text-gray-800');
            this.classList.add('selected', 'bg-emerald-500', 'text-white');
            
            // Update calculator dropdown to match selected package
            const packageType = this.getAttribute('data-package');
            const packageCalculator = document.getElementById('package-calculator');
            
            switch(packageType) {
                case 'basic':
                    packageCalculator.value = '299';
                    break;
                case 'standard':
                    packageCalculator.value = '599';
                    break;
                case 'premium':
                    packageCalculator.value = '999';
                    break;
            }
            
            // Update calculator
            updateCostCalculator();
        });
    });
    
    // Cost Calculator
    const packageCalculator = document.getElementById('package-calculator');
    const checkboxes = document.querySelectorAll('.calculator-checkbox');
    const packageCostEl = document.getElementById('package-cost');
    const additionalCostEl = document.getElementById('additional-cost');
    const totalCostEl = document.getElementById('total-cost');
    
    packageCalculator.addEventListener('change', updateCostCalculator);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCostCalculator);
    });
    
    function updateCostCalculator() {
        // Get package cost
        const packageCost = parseInt(packageCalculator.value);
        
        // Calculate additional services cost
        let additionalCost = 0;
        if (document.getElementById('school-service').checked) additionalCost += 150;
        if (document.getElementById('healthcare-service').checked) additionalCost += 100;
        if (document.getElementById('language-service').checked) additionalCost += 75;
        
        // Calculate total cost
        const totalCost = packageCost + additionalCost;
        
        // Update display
        packageCostEl.textContent = `€${packageCost}`;
        additionalCostEl.textContent = `€${additionalCost}`;
        totalCostEl.textContent = `€${totalCost}`;
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in-up elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
    
    // Form submission handling
    const consultationButtons = document.querySelectorAll('button:contains("Book Free Consultation")');
    consultationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Here you would typically open a modal or redirect to a booking page
            alert('Thank you for your interest! Our relocation specialist will contact you within 24 hours to schedule your free consultation.');
        });
    });
    
    // Download guide button
    const downloadButtons = document.querySelectorAll('button:contains("Download Relocation Guide")');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simulate download
            alert('Your relocation guide download will begin shortly. Check your downloads folder!');
            // In a real implementation, you would trigger an actual file download
        });
    });
    
    // Family size impact on cost (enhanced calculator)
    const familySizeSelect = document.querySelector('select:first-of-type');
    familySizeSelect.addEventListener('change', function() {
        // Adjust costs based on family size
        const familySize = parseInt(this.value);
        let familyMultiplier = 1;
        
        switch(familySize) {
            case 1: // Single
                familyMultiplier = 1;
                break;
            case 2: // Couple
                familyMultiplier = 1.2;
                break;
            case 3: // Family (3-4)
                familyMultiplier = 1.5;
                break;
            case 5: // Large Family (5+)
                familyMultiplier = 1.8;
                break;
        }
        
        // Update calculator with family size consideration
        updateCostCalculator();
    });
    
    // Initialize calculator on page load
    updateCostCalculator();
    
    // Add hover effects to service cards programmatically
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.1)';
            this.style.borderColor = '#10b981';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
            this.style.borderColor = '#e5e7eb';
        });
    });
    
    // Package card interactions
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'scale(1.03)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    
    // Utility cost breakdown hover effects
    const costItems = document.querySelectorAll('.cost-breakdown-item');
    costItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = '#f9fafb';
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Timeline item animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('footer .flex');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && isValidEmail(email)) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Mobile menu toggle (if needed in future)
    let mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden fixed top-4 right-4 z-50 bg-emerald-500 text-white p-2 rounded-lg';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Add responsive behavior for smaller screens
    function handleResize() {
        if (window.innerWidth < 768) {
            // Mobile-specific adjustments can go here
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});

// Additional utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formatCurrency, isValidEmail };
}