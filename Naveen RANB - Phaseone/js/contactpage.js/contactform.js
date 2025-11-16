// Contact Form Section JavaScript - Intelligent Multi-step Form
document.addEventListener('DOMContentLoaded', function() {
    // Form state management
    const formState = {
        currentStep: 1,
        totalSteps: 4,
        serviceType: 'buy', // Will be updated from service toggle
        formData: {},
        validationErrors: {},
        isInitialized: false
    };

    // Enhanced form configuration for all services
    const formConfig = {
        buy: {
            steps: {
                1: {
                    title: "What are you looking for?",
                    fields: [
                        {
                            type: 'select',
                            name: 'property_type',
                            label: 'Property Type',
                            required: true,
                            options: [
                                { value: '', label: 'Select property type' },
                                { value: 'apartment', label: 'Apartment' },
                                { value: 'house', label: 'House' },
                                { value: 'studio', label: 'Studio' },
                                { value: 'penthouse', label: 'Penthouse' },
                                { value: 'other', label: 'Other' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'budget_range',
                            label: 'Budget Range',
                            required: true,
                            options: [
                                { value: '', label: 'Select budget range' },
                                { value: '200-400k', label: '€200,000 - €400,000' },
                                { value: '400-600k', label: '€400,000 - €600,000' },
                                { value: '600-800k', label: '€600,000 - €800,000' },
                                { value: '800k-1m', label: '€800,000 - €1,000,000' },
                                { value: '1m-plus', label: '€1,000,000+' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'timeline',
                            label: 'When do you plan to buy?',
                            required: true,
                            options: [
                                { value: '', label: 'Select timeline' },
                                { value: 'immediate', label: 'Immediately' },
                                { value: '3months', label: 'Within 3 months' },
                                { value: '6months', label: 'Within 6 months' },
                                { value: '1year', label: 'Within 1 year' },
                                { value: 'exploring', label: 'Just exploring' }
                            ]
                        }
                    ]
                },
                2: {
                    title: "Location & Property Details",
                    fields: [
                        {
                            type: 'select',
                            name: 'location',
                            label: 'Preferred Location',
                            required: true,
                            options: [
                                { value: '', label: 'Select location' },
                                { value: 'amsterdam', label: 'Amsterdam' },
                                { value: 'rotterdam', label: 'Rotterdam' },
                                { value: 'the-hague', label: 'The Hague' },
                                { value: 'utrecht', label: 'Utrecht' },
                                { value: 'eindhoven', label: 'Eindhoven' },
                                { value: 'flexible', label: 'Flexible' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'bedrooms',
                            label: 'Number of Bedrooms',
                            required: false,
                            options: [
                                { value: '', label: 'Any' },
                                { value: '1', label: '1' },
                                { value: '2', label: '2' },
                                { value: '3', label: '3' },
                                { value: '4', label: '4' },
                                { value: '5plus', label: '5+' }
                            ]
                        },
                        {
                            type: 'textarea',
                            name: 'specific_requirements',
                            label: 'Specific Requirements',
                            required: false,
                            placeholder: 'e.g., garden, parking, near schools, modern kitchen, etc.'
                        }
                    ]
                },
                3: {
                    title: "Your Preferences & Lifestyle",
                    fields: [
                        {
                            type: 'select',
                            name: 'property_condition',
                            label: 'Preferred Property Condition',
                            required: false,
                            options: [
                                { value: '', label: 'Any condition' },
                                { value: 'new', label: 'New construction' },
                                { value: 'excellent', label: 'Excellent - move-in ready' },
                                { value: 'good', label: 'Good - minor updates needed' },
                                { value: 'fixer', label: 'Fixer-upper - renovation project' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'outdoor_space',
                            label: 'Outdoor Space',
                            required: false,
                            options: [
                                { value: '', label: 'Not important' },
                                { value: 'balcony', label: 'Balcony' },
                                { value: 'terrace', label: 'Terrace' },
                                { value: 'garden', label: 'Garden' },
                                { value: 'rooftop', label: 'Rooftop terrace' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'parking',
                            label: 'Parking Requirements',
                            required: false,
                            options: [
                                { value: '', label: 'Not needed' },
                                { value: 'street', label: 'Street parking' },
                                { value: 'off-street', label: 'Off-street parking' },
                                { value: 'garage', label: 'Private garage' },
                                { value: 'multiple', label: 'Multiple spaces' }
                            ]
                        }
                    ]
                },
                4: {
                    title: "Your Contact Information",
                    fields: [
                        {
                            type: 'text',
                            name: 'full_name',
                            label: 'Full Name',
                            required: true,
                            placeholder: 'Enter your full name'
                        },
                        {
                            type: 'email',
                            name: 'email',
                            label: 'Email Address',
                            required: true,
                            placeholder: 'your.email@example.com'
                        },
                        {
                            type: 'tel',
                            name: 'phone',
                            label: 'Phone Number',
                            required: false,
                            placeholder: '+31 6 12345678'
                        },
                        {
                            type: 'textarea',
                            name: 'additional_notes',
                            label: 'Additional Notes (Optional)',
                            required: false,
                            placeholder: 'Any other information you\'d like to share with our experts...'
                        }
                    ]
                }
            }
        },
        sell: {
            steps: {
                1: {
                    title: "Tell us about your property",
                    fields: [
                        {
                            type: 'select',
                            name: 'property_type',
                            label: 'Property Type',
                            required: true,
                            options: [
                                { value: '', label: 'Select property type' },
                                { value: 'apartment', label: 'Apartment' },
                                { value: 'house', label: 'House' },
                                { value: 'studio', label: 'Studio' },
                                { value: 'commercial', label: 'Commercial' },
                                { value: 'other', label: 'Other' }
                            ]
                        },
                        {
                            type: 'text',
                            name: 'property_address',
                            label: 'Property Address',
                            required: true,
                            placeholder: 'Enter full address'
                        },
                        {
                            type: 'select',
                            name: 'timeline',
                            label: 'When do you want to sell?',
                            required: true,
                            options: [
                                { value: '', label: 'Select timeline' },
                                { value: 'immediate', label: 'Immediately' },
                                { value: '1month', label: 'Within 1 month' },
                                { value: '3months', label: 'Within 3 months' },
                                { value: '6months', label: 'Within 6 months' },
                                { value: 'flexible', label: 'Flexible' }
                            ]
                        }
                    ]
                },
                2: {
                    title: "Property details",
                    fields: [
                        {
                            type: 'number',
                            name: 'property_size',
                            label: 'Property Size (m²)',
                            required: false,
                            placeholder: 'e.g., 85'
                        },
                        {
                            type: 'select',
                            name: 'bedrooms',
                            label: 'Number of Bedrooms',
                            required: false,
                            options: [
                                { value: '', label: 'Select' },
                                { value: '1', label: '1' },
                                { value: '2', label: '2' },
                                { value: '3', label: '3' },
                                { value: '4', label: '4' },
                                { value: '5plus', label: '5+' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'condition',
                            label: 'Property Condition',
                            required: false,
                            options: [
                                { value: '', label: 'Select condition' },
                                { value: 'excellent', label: 'Excellent' },
                                { value: 'good', label: 'Good' },
                                { value: 'needs-work', label: 'Needs some work' },
                                { value: 'renovation', label: 'Needs renovation' }
                            ]
                        }
                    ]
                },
                3: {
                    title: "Selling Preferences",
                    fields: [
                        {
                            type: 'select',
                            name: 'selling_reason',
                            label: 'Reason for Selling',
                            required: false,
                            options: [
                                { value: '', label: 'Select reason' },
                                { value: 'upgrading', label: 'Upgrading to larger home' },
                                { value: 'downsizing', label: 'Downsizing' },
                                { value: 'relocating', label: 'Relocating' },
                                { value: 'investment', label: 'Investment property' },
                                { value: 'other', label: 'Other reason' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'price_expectation',
                            label: 'Price Expectation',
                            required: false,
                            options: [
                                { value: '', label: 'Select expectation' },
                                { value: 'market', label: 'Market value' },
                                { value: 'above', label: 'Above market value' },
                                { value: 'quick-sale', label: 'Quick sale price' },
                                { value: 'flexible', label: 'Flexible' }
                            ]
                        },
                        {
                            type: 'textarea',
                            name: 'property_features',
                            label: 'Special Features',
                            required: false,
                            placeholder: 'e.g., recently renovated, energy efficient, unique architecture...'
                        }
                    ]
                },
                4: {
                    title: "Your Contact Information",
                    fields: [
                        {
                            type: 'text',
                            name: 'full_name',
                            label: 'Full Name',
                            required: true,
                            placeholder: 'Enter your full name'
                        },
                        {
                            type: 'email',
                            name: 'email',
                            label: 'Email Address',
                            required: true,
                            placeholder: 'your.email@example.com'
                        },
                        {
                            type: 'tel',
                            name: 'phone',
                            label: 'Phone Number',
                            required: false,
                            placeholder: '+31 6 12345678'
                        },
                        {
                            type: 'select',
                            name: 'preferred_contact',
                            label: 'Preferred Contact Method',
                            required: false,
                            options: [
                                { value: '', label: 'Select method' },
                                { value: 'email', label: 'Email' },
                                { value: 'phone', label: 'Phone' },
                                { value: 'whatsapp', label: 'WhatsApp' },
                                { value: 'video-call', label: 'Video Call' }
                            ]
                        }
                    ]
                }
            }
        },
        rent: {
            steps: {
                1: {
                    title: "What are your rental needs?",
                    fields: [
                        {
                            type: 'select',
                            name: 'rental_type',
                            label: 'Rental Type',
                            required: true,
                            options: [
                                { value: '', label: 'Select rental type' },
                                { value: 'long-term', label: 'Long-term rental' },
                                { value: 'short-term', label: 'Short-term rental' },
                                { value: 'furnished', label: 'Furnished rental' },
                                { value: 'unfurnished', label: 'Unfurnished rental' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'budget_range',
                            label: 'Monthly Budget',
                            required: true,
                            options: [
                                { value: '', label: 'Select budget range' },
                                { value: '800-1200', label: '€800 - €1,200' },
                                { value: '1200-2000', label: '€1,200 - €2,000' },
                                { value: '2000-3000', label: '€2,000 - €3,000' },
                                { value: '3000-plus', label: '€3,000+' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'move_in_date',
                            label: 'When do you want to move in?',
                            required: true,
                            options: [
                                { value: '', label: 'Select move-in date' },
                                { value: 'immediate', label: 'Immediately' },
                                { value: '2weeks', label: 'Within 2 weeks' },
                                { value: '1month', label: 'Within 1 month' },
                                { value: '2months', label: 'Within 2 months' },
                                { value: 'flexible', label: 'Flexible' }
                            ]
                        }
                    ]
                },
                2: {
                    title: "Location & Property Preferences",
                    fields: [
                        {
                            type: 'select',
                            name: 'location',
                            label: 'Preferred Location',
                            required: true,
                            options: [
                                { value: '', label: 'Select location' },
                                { value: 'amsterdam', label: 'Amsterdam' },
                                { value: 'rotterdam', label: 'Rotterdam' },
                                { value: 'the-hague', label: 'The Hague' },
                                { value: 'utrecht', label: 'Utrecht' },
                                { value: 'flexible', label: 'Flexible' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'bedrooms',
                            label: 'Number of Bedrooms',
                            required: false,
                            options: [
                                { value: '', label: 'Any' },
                                { value: 'studio', label: 'Studio' },
                                { value: '1', label: '1' },
                                { value: '2', label: '2' },
                                { value: '3', label: '3' },
                                { value: '4plus', label: '4+' }
                            ]
                        },
                        {
                            type: 'textarea',
                            name: 'tenant_profile',
                            label: 'Tell us about yourself',
                            required: false,
                            placeholder: 'e.g., working professional, student, family, pets, etc.'
                        }
                    ]
                },
                3: {
                    title: "Lifestyle & Amenities",
                    fields: [
                        {
                            type: 'select',
                            name: 'furnishing',
                            label: 'Furnishing Preference',
                            required: false,
                            options: [
                                { value: '', label: 'No preference' },
                                { value: 'furnished', label: 'Fully furnished' },
                                { value: 'unfurnished', label: 'Unfurnished' },
                                { value: 'partially', label: 'Partially furnished' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'amenities',
                            label: 'Important Amenities',
                            required: false,
                            options: [
                                { value: '', label: 'Select amenities' },
                                { value: 'elevator', label: 'Elevator' },
                                { value: 'balcony', label: 'Balcony/Terrace' },
                                { value: 'parking', label: 'Parking' },
                                { value: 'laundry', label: 'Laundry facilities' },
                                { value: 'gym', label: 'Gym' }
                            ]
                        },
                        {
                            type: 'select',
                            name: 'pet_friendly',
                            label: 'Pets',
                            required: false,
                            options: [
                                { value: '', label: 'No pets' },
                                { value: 'cat', label: 'Cat(s)' },
                                { value: 'dog', label: 'Dog(s)' },
                                { value: 'other', label: 'Other pets' }
                            ]
                        }
                    ]
                },
                4: {
                    title: "Your Contact Information",
                    fields: [
                        {
                            type: 'text',
                            name: 'full_name',
                            label: 'Full Name',
                            required: true,
                            placeholder: 'Enter your full name'
                        },
                        {
                            type: 'email',
                            name: 'email',
                            label: 'Email Address',
                            required: true,
                            placeholder: 'your.email@example.com'
                        },
                        {
                            type: 'tel',
                            name: 'phone',
                            label: 'Phone Number',
                            required: false,
                            placeholder: '+31 6 12345678'
                        },
                        {
                            type: 'select',
                            name: 'availability',
                            label: 'Best time to contact',
                            required: false,
                            options: [
                                { value: '', label: 'Any time' },
                                { value: 'morning', label: 'Morning (9AM-12PM)' },
                                { value: 'afternoon', label: 'Afternoon (12PM-5PM)' },
                                { value: 'evening', label: 'Evening (5PM-8PM)' },
                                { value: 'weekend', label: 'Weekend' }
                            ]
                        }
                    ]
                }
            }
        }
    };

    // Initialize contact form
    function initContactForm() {
        // Get initial service type from hero section
        updateServiceTypeFromHero();
        
        // Listen for service change events from hero section
        document.addEventListener('serviceChanged', handleServiceChange);

        // Render initial form step
        renderFormStep(1);

        // Initialize navigation
        initNavigation();

        // Initialize quick contact options
        initQuickContact();

        // Initialize form validation
        initFormValidation();

        formState.isInitialized = true;
        console.log('Contact Form initialized for service:', formState.serviceType);
    }

    // Handle service change events from hero section
    function handleServiceChange(event) {
        const newService = event.detail.service;
        console.log('Form received service change:', newService);
        
        // Update service type
        formState.serviceType = newService;
        
        // Reset to first step when service changes
        formState.currentStep = 1;
        
        // Re-render form with new service configuration
        renderFormStep(1);
        
        // Show service change notification
        showServiceChangeNotification(newService);
    }

    // Update service type from hero section
    function updateServiceTypeFromHero() {
        const activeService = document.querySelector('.service-option.active');
        if (activeService) {
            formState.serviceType = activeService.getAttribute('data-service');
        }
    }

    // Show service change notification
    function showServiceChangeNotification(service) {
        const serviceNames = {
            'buy': 'Buying',
            'sell': 'Selling', 
            'rent': 'Renting'
        };
        
        const notification = document.createElement('div');
        notification.className = 'bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 animate-pulse';
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-sync-alt text-emerald-500 mr-3"></i>
                <div>
                    <div class="font-semibold text-emerald-800">Switched to ${serviceNames[service]} Service</div>
                    <div class="text-emerald-700 text-sm">Form updated with relevant questions</div>
                </div>
            </div>
        `;
        
        const formContent = document.getElementById('form-content');
        const firstChild = formContent.firstChild;
        formContent.insertBefore(notification, firstChild);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Render form step based on current step and service
    function renderFormStep(step) {
        const formContent = document.getElementById('form-content');
        const config = formConfig[formState.serviceType].steps[step];
        
        if (!config) {
            console.error('No configuration found for step:', step, 'for service:', formState.serviceType);
            return;
        }

        // Add loading state
        formContent.classList.add('loading');
        
        setTimeout(() => {
            const formHTML = `
                <div class="service-indicator">
                    <h3 class="text-2xl font-light text-gray-800 mb-2">${config.title}</h3>
                    <p class="text-gray-600">We'll use this information to match you with the perfect expert</p>
                </div>
                
                <div class="form-fields">
                    ${config.fields.map(field => renderFormField(field)).join('')}
                </div>
            `;

            formContent.innerHTML = formHTML;
            formContent.classList.remove('loading');

            // Update progress
            updateProgress(step);

            // Initialize field interactions
            initFieldInteractions();

        }, 300);
    }

    // Render individual form field
    function renderFormField(field) {
        const baseClasses = "form-input";
        const value = formState.formData[field.name] || '';
        
        switch (field.type) {
            case 'select':
                return `
                    <div class="form-group" data-field="${field.name}">
                        <label class="form-label ${field.required ? 'required' : ''}">${field.label}</label>
                        <select 
                            name="${field.name}" 
                            class="${baseClasses} form-select"
                            ${field.required ? 'required' : ''}
                        >
                            ${field.options.map(opt => `
                                <option value="${opt.value}" ${value === opt.value ? 'selected' : ''}>
                                    ${opt.label}
                                </option>
                            `).join('')}
                        </select>
                        <div class="validation-message" data-for="${field.name}"></div>
                    </div>
                `;
            
            case 'textarea':
                return `
                    <div class="form-group" data-field="${field.name}">
                        <label class="form-label ${field.required ? 'required' : ''}">${field.label}</label>
                        <textarea 
                            name="${field.name}" 
                            class="${baseClasses} form-textarea"
                            placeholder="${field.placeholder || ''}"
                            rows="4"
                            ${field.required ? 'required' : ''}
                        >${value}</textarea>
                        <div class="validation-message" data-for="${field.name}"></div>
                    </div>
                `;
            
            default:
                return `
                    <div class="form-group" data-field="${field.name}">
                        <label class="form-label ${field.required ? 'required' : ''}">${field.label}</label>
                        <input 
                            type="${field.type}" 
                            name="${field.name}" 
                            class="${baseClasses}"
                            value="${value}"
                            placeholder="${field.placeholder || ''}"
                            ${field.required ? 'required' : ''}
                        >
                        <div class="validation-message" data-for="${field.name}"></div>
                    </div>
                `;
        }
    }

    // Update progress indicator
    function updateProgress(step) {
        // Update step counter
        const stepCounter = document.querySelector('.step-counter');
        if (stepCounter) {
            stepCounter.textContent = `Step ${step} of ${formState.totalSteps}`;
        }

        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        const progressPercentage = (step / formState.totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;

        // Update step states
        const steps = document.querySelectorAll('.step');
        steps.forEach((stepEl, index) => {
            const stepNumber = parseInt(stepEl.getAttribute('data-step'));
            
            stepEl.classList.remove('active', 'completed');
            
            if (stepNumber === step) {
                stepEl.classList.add('active');
            } else if (stepNumber < step) {
                stepEl.classList.add('completed');
            }
        });

        // Update navigation buttons
        updateNavigationButtons(step);
    }

    // Update navigation buttons state
    function updateNavigationButtons(step) {
        const prevBtn = document.querySelector('.nav-prev');
        const nextBtn = document.querySelector('.nav-next');
        const skipBtn = document.querySelector('.nav-skip');

        // Previous button
        prevBtn.disabled = step === 1;

        // Next button text
        if (step === formState.totalSteps) {
            nextBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Submit';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right ml-2"></i>';
        }

        // Skip button visibility
        skipBtn.style.display = step < formState.totalSteps ? 'block' : 'none';
    }

    // Initialize navigation
    function initNavigation() {
        const prevBtn = document.querySelector('.nav-prev');
        const nextBtn = document.querySelector('.nav-next');
        const skipBtn = document.querySelector('.nav-skip');

        prevBtn.addEventListener('click', goToPreviousStep);
        nextBtn.addEventListener('click', goToNextStep);
        skipBtn.addEventListener('click', skipCurrentStep);
    }

    // Navigation functions
    function goToPreviousStep() {
        if (formState.currentStep > 1) {
            formState.currentStep--;
            renderFormStep(formState.currentStep);
        }
    }

    function goToNextStep() {
        if (validateCurrentStep()) {
            if (formState.currentStep < formState.totalSteps) {
                formState.currentStep++;
                renderFormStep(formState.currentStep);
            } else {
                submitForm();
            }
        } else {
            showValidationError();
        }
    }

    function skipCurrentStep() {
        if (formState.currentStep < formState.totalSteps) {
            formState.currentStep++;
            renderFormStep(formState.currentStep);
        }
    }

    // Show validation error message
    function showValidationError() {
        const formContent = document.getElementById('form-content');
        const errorElement = document.createElement('div');
        errorElement.className = 'bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-pulse';
        errorElement.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-exclamation-circle text-red-500 mr-3"></i>
                <div>
                    <div class="font-semibold text-red-800">Please check your information</div>
                    <div class="text-red-700 text-sm">Some required fields need your attention.</div>
                </div>
            </div>
        `;
        
        const firstChild = formContent.firstChild;
        formContent.insertBefore(errorElement, firstChild);
        
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.remove();
            }
        }, 5000);
    }

    // Form validation
    function initFormValidation() {
        document.addEventListener('input', (e) => {
            if (e.target.matches('.form-input, .form-select, .form-textarea')) {
                validateField(e.target);
            }
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const validationMessage = document.querySelector(`.validation-message[data-for="${fieldName}"]`);
        
        if (!validationMessage) return true;

        field.classList.remove('error', 'success');
        validationMessage.classList.remove('show', 'error', 'success');

        if (field.hasAttribute('required') && !value) {
            field.classList.add('error');
            validationMessage.textContent = 'This field is required';
            validationMessage.classList.add('show', 'error');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                validationMessage.textContent = 'Please enter a valid email address';
                validationMessage.classList.add('show', 'error');
                return false;
            }
        }

        if (value) {
            field.classList.add('success');
        }

        return true;
    }

    function validateCurrentStep() {
        const currentFields = document.querySelectorAll('.form-group[data-field]');
        let isValid = true;

        currentFields.forEach(fieldGroup => {
            const field = fieldGroup.querySelector('input, select, textarea');
            if (field && !validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Field interactions
    function initFieldInteractions() {
        document.addEventListener('input', (e) => {
            if (e.target.matches('.form-input, .form-select, .form-textarea')) {
                formState.formData[e.target.name] = e.target.value;
            }
        });
    }

    // Quick contact options
    function initQuickContact() {
        const quickOptions = document.querySelectorAll('.quick-option');
        
        quickOptions.forEach(option => {
            option.addEventListener('click', function() {
                const type = this.querySelector('h4').textContent.toLowerCase();
                handleQuickContact(type);
            });
        });
    }

    function handleQuickContact(type) {
        const actions = {
            'call now': () => window.location.href = 'tel:+31201234567',
            'live chat': () => alert('Live chat would open here'),
            'video call': () => alert('Video call scheduling would open here')
        };

        if (actions[type]) {
            actions[type]();
        }
    }

    // Form submission
    function submitForm() {
        const formContainer = document.querySelector('.form-container');
        const submitBtn = document.querySelector('.nav-next');

        formContainer.classList.add('loading');
        submitBtn.innerHTML = '<div class="loading-spinner"></div> Submitting...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showSuccessMessage();
            formContainer.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Submit';
            submitBtn.disabled = false;
        }, 2000);
    }

    function showSuccessMessage() {
        const formContent = document.getElementById('form-content');
        
        formContent.innerHTML = `
            <div class="text-center py-12">
                <div class="success-icon bg-emerald-100 text-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-check text-2xl"></i>
                </div>
                <h3 class="text-2xl font-light text-gray-800 mb-4">Thank You!</h3>
                <p class="text-gray-600 mb-6 max-w-md mx-auto">
                    We've received your information and are matching you with the perfect real estate expert. 
                    You'll hear from us within 2 hours.
                </p>
                <button class="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all transform hover:scale-105" onclick="window.location.href='index.html'">
                    Return to Homepage
                </button>
            </div>
        `;

        document.querySelector('.form-navigation').style.display = 'none';
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }
});