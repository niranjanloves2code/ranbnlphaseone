// Office Experience Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Office Experience Section
    function initOfficeExperience() {
        initInteractiveMap();
        initVirtualTour();
        initAppointmentBooking();
        initTrustElements();
        initScrollAnimations();
        
        console.log('Office Experience section initialized');
    }

    // Interactive Map Functionality
    function initInteractiveMap() {
        const mapContainer = document.getElementById('map-container');
        
        if (!mapContainer) return;

        // Simple map implementation (would integrate with Google Maps/Leaflet in production)
        const mapHTML = `
            <div class="relative h-full bg-slate-100 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50"></div>
                
                <!-- Simplified Map Representation -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div class="relative">
                        <!-- Water -->
                        <div class="w-64 h-48 bg-blue-100 rounded-lg shadow-inner"></div>
                        
                        <!-- Land -->
                        <div class="absolute top-4 left-4 w-56 h-40 bg-emerald-50 rounded shadow-sm"></div>
                        
                        <!-- Roads -->
                        <div class="absolute top-1/2 left-0 w-full h-2 bg-gray-300 transform -translate-y-1/2"></div>
                        <div class="absolute top-0 left-1/2 w-2 h-full bg-gray-300 transform -translate-x-1/2"></div>
                        
                        <!-- Location Marker -->
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div class="relative">
                                <div class="w-8 h-8 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
                                <div class="absolute top-0 left-0 w-8 h-8 border-2 border-red-500 rounded-full animate-ping"></div>
                            </div>
                        </div>
                        
                        <!-- Location Label -->
                        <div class="absolute top-1/2 left-1/2 transform translate-x-8 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-lg border border-gray-200">
                            <div class="font-semibold text-gray-800">NordicEstates</div>
                            <div class="text-xs text-gray-600">Keizersgracht 123</div>
                        </div>
                    </div>
                </div>

                <!-- Map Controls -->
                <div class="absolute bottom-4 right-4 flex space-x-2">
                    <button class="bg-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors" onclick="zoomIn()">
                        <i class="fas fa-plus text-gray-600 text-sm"></i>
                    </button>
                    <button class="bg-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors" onclick="zoomOut()">
                        <i class="fas fa-minus text-gray-600 text-sm"></i>
                    </button>
                </div>

                <!-- Location Actions -->
                <div class="absolute top-4 left-4 flex space-x-2">
                    <button class="bg-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors" onclick="getDirections()">
                        <i class="fas fa-directions text-emerald-600"></i>
                        <span class="text-sm font-semibold text-gray-700">Directions</span>
                    </button>
                </div>
            </div>
        `;

        // Add loading delay for realistic map loading
        setTimeout(() => {
            mapContainer.innerHTML = mapHTML;
            mapContainer.classList.remove('map-loading');
        }, 1500);
    }

    // Virtual Tour Functionality
    function initVirtualTour() {
        const virtualTourBtn = document.querySelector('.virtual-tour-container button');
        
        if (virtualTourBtn) {
            virtualTourBtn.addEventListener('click', function() {
                // Show virtual tour modal or redirect to 360° tour
                showVirtualTourModal();
            });
        }
    }

    function showVirtualTourModal() {
        // Create modal for virtual tour
        const modalHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 virtual-tour-modal">
                <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    <div class="flex justify-between items-center p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-800">Virtual Office Tour</h3>
                        <button class="text-gray-400 hover:text-gray-600 transition-colors close-tour">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                    <div class="p-8">
                        <div class="bg-gradient-to-br from-blue-100 to-indigo-100 h-96 rounded-xl flex items-center justify-center mb-6">
                            <div class="text-center">
                                <i class="fas fa-vr-cardboard text-6xl text-blue-600 mb-4"></i>
                                <h4 class="text-2xl font-light text-gray-800 mb-2">Virtual Tour Experience</h4>
                                <p class="text-gray-600 mb-4">This would be a full 360° interactive tour in production</p>
                                <div class="flex space-x-4 justify-center">
                                    <button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                        <i class="fas fa-play mr-2"></i>
                                        Start Tour
                                    </button>
                                    <button class="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                                        <i class="fas fa-download mr-2"></i>
                                        Download App
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-4">
                            <div class="text-center p-4 bg-slate-50 rounded-lg">
                                <i class="fas fa-expand text-blue-600 text-2xl mb-2"></i>
                                <div class="font-semibold text-gray-800">Full Screen</div>
                            </div>
                            <div class="text-center p-4 bg-slate-50 rounded-lg">
                                <i class="fas fa-mobile-alt text-blue-600 text-2xl mb-2"></i>
                                <div class="font-semibold text-gray-800">Mobile Friendly</div>
                            </div>
                            <div class="text-center p-4 bg-slate-50 rounded-lg">
                                <i class="fas fa-vr-cardboard text-blue-600 text-2xl mb-2"></i>
                                <div class="font-semibold text-gray-800">VR Ready</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add event listener to close button
        const closeBtn = document.querySelector('.close-tour');
        const modal = document.querySelector('.virtual-tour-modal');
        
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });

        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Appointment Booking System
    function initAppointmentBooking() {
        const bookButtons = document.querySelectorAll('.appointment-booking button');
        
        bookButtons.forEach(button => {
            button.addEventListener('click', function() {
                const appointmentType = this.closest('.flex').querySelector('.font-semibold').textContent;
                showAppointmentModal(appointmentType);
            });
        });
    }

    function showAppointmentModal(type) {
        const modalHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 appointment-modal">
                <div class="bg-white rounded-2xl max-w-md w-full">
                    <div class="flex justify-between items-center p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-800">Book ${type}</h3>
                        <button class="text-gray-400 hover:text-gray-600 transition-colors close-appointment">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                    <div class="p-6">
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                            <input type="date" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Select Time</label>
                            <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                                <option>09:00 AM</option>
                                <option>10:00 AM</option>
                                <option>11:00 AM</option>
                                <option>02:00 PM</option>
                                <option>03:00 PM</option>
                                <option>04:00 PM</option>
                            </select>
                        </div>
                        <button class="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                            Confirm Appointment
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const closeBtn = document.querySelector('.close-appointment');
        const modal = document.querySelector('.appointment-modal');
        
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Trust Elements Interactions
    function initTrustElements() {
        // Add hover effects to testimonials
        const testimonials = document.querySelectorAll('.trust-social-proof .bg-white');
        
        testimonials.forEach(testimonial => {
            testimonial.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            testimonial.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        const fadeElements = document.querySelectorAll('.office-experience-section [class*="fade-in"]');
        fadeElements.forEach(el => observer.observe(el));
    }

    // Map Control Functions (called from inline onclick)
    window.zoomIn = function() {
        console.log('Zoom in - would integrate with map API');
        // Integration with Google Maps/Leaflet would go here
    };

    window.zoomOut = function() {
        console.log('Zoom out - would integrate with map API');
        // Integration with Google Maps/Leaflet would go here
    };

    window.getDirections = function() {
        // Open directions in Google Maps
        window.open('https://www.google.com/maps/dir//Keizersgracht+123,+Amsterdam', '_blank');
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOfficeExperience);
    } else {
        initOfficeExperience();
    }
});