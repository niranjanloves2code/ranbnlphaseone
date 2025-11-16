// Contact Hero Section JavaScript - Service Toggle & Preview Management
document.addEventListener('DOMContentLoaded', function() {
    // Service state management
    const serviceState = {
        currentService: 'buy',
        isInitialized: false
    };

    // Initialize service toggle
    function initServiceToggle() {
        const serviceOptions = document.querySelectorAll('.service-option');
        const previewCards = document.querySelectorAll('.service-preview-card');
        const startJourneyBtn = document.querySelector('.start-journey-btn');

        // Set initial active state
        setActiveService('buy');

        // Add click event listeners to service options
        serviceOptions.forEach(option => {
            option.addEventListener('click', function() {
                const service = this.getAttribute('data-service');
                setActiveService(service);
                
                // Emit service change event for form to listen to
                emitServiceChangeEvent(service);
            });
        });

        // Start journey button click handler
        if (startJourneyBtn) {
            startJourneyBtn.addEventListener('click', function() {
                scrollToContactForm();
            });
        }

        serviceState.isInitialized = true;
        console.log('Service Toggle initialized');
    }

    // Set active service and update UI
    function setActiveService(service) {
        // Update service options
        const serviceOptions = document.querySelectorAll('.service-option');
        serviceOptions.forEach(option => {
            if (option.getAttribute('data-service') === service) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        // Update preview cards
        const previewCards = document.querySelectorAll('.service-preview-card');
        previewCards.forEach(card => {
            if (card.getAttribute('data-service') === service) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update state
        serviceState.currentService = service;
        
        console.log('Service changed to:', service);
    }

    // Emit custom event for form to listen to
    function emitServiceChangeEvent(service) {
        const serviceChangeEvent = new CustomEvent('serviceChanged', {
            detail: {
                service: service,
                timestamp: Date.now()
            }
        });
        document.dispatchEvent(serviceChangeEvent);
    }

    // Scroll to contact form smoothly
    function scrollToContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add a slight highlight effect
            contactForm.classList.add('highlight-pulse');
            setTimeout(() => {
                contactForm.classList.remove('highlight-pulse');
            }, 2000);
        }
    }

    // Get current service (for external access)
    function getCurrentService() {
        return serviceState.currentService;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServiceToggle);
    } else {
        initServiceToggle();
    }

    // Public API for other scripts
    window.serviceHero = {
        getCurrentService: getCurrentService,
        setActiveService: setActiveService
    };
});