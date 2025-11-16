// Tenant Resources JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle active class
            this.classList.toggle('active');
            
            // Toggle answer visibility with animation
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                answer.style.maxHeight = '0';
                setTimeout(() => {
                    answer.classList.add('hidden');
                }, 300);
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
            
            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this && otherQuestion.classList.contains('active')) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    otherAnswer.style.maxHeight = '0';
                    setTimeout(() => {
                        otherAnswer.classList.add('hidden');
                    }, 300);
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                    otherQuestion.classList.remove('active');
                }
            });
        });
    });
    
    // Rent Increase Calculator
    const rentCalculator = {
        init() {
            this.currentRentInput = document.getElementById('current-rent');
            this.increasePercentageInput = document.getElementById('increase-percentage');
            this.newRentDisplay = document.getElementById('new-rent');
            this.yearlyIncreaseDisplay = document.getElementById('yearly-increase');
            this.calculateButton = document.getElementById('calculate-rent');
            
            this.bindEvents();
            this.calculate();
        },
        
        bindEvents() {
            this.currentRentInput.addEventListener('input', () => this.calculate());
            this.increasePercentageInput.addEventListener('input', () => this.calculate());
            this.calculateButton.addEventListener('click', () => this.calculate());
        },
        
        calculate() {
            const currentRent = parseFloat(this.currentRentInput.value) || 0;
            const increasePercentage = parseFloat(this.increasePercentageInput.value) || 0;
            
            const increaseAmount = currentRent * (increasePercentage / 100);
            const newRent = currentRent + increaseAmount;
            const yearlyIncrease = increaseAmount * 12;
            
            this.newRentDisplay.textContent = this.formatCurrency(newRent);
            this.yearlyIncreaseDisplay.textContent = this.formatCurrency(yearlyIncrease);
            
            // Add visual feedback
            this.highlightResult();
        },
        
        formatCurrency(amount) {
            return new Intl.NumberFormat('nl-NL', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount);
        },
        
        highlightResult() {
            this.newRentDisplay.parentElement.classList.add('highlight');
            setTimeout(() => {
                this.newRentDisplay.parentElement.classList.remove('highlight');
            }, 1000);
        }
    };
    
    // Document Storage System
    const documentStorage = {
        init() {
            this.uploadArea = document.querySelector('.document-storage');
            this.fileInput = document.createElement('input');
            this.fileInput.type = 'file';
            this.fileInput.multiple = true;
            this.fileInput.accept = '.pdf,.doc,.docx,.xlsx,.jpg,.png';
            this.fileInput.style.display = 'none';
            
            document.body.appendChild(this.fileInput);
            this.bindEvents();
        },
        
        bindEvents() {
            this.uploadArea.addEventListener('click', () => this.fileInput.click());
            this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
            this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
            this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        },
        
        handleDragOver(e) {
            e.preventDefault();
            this.uploadArea.classList.add('drag-over');
        },
        
        handleDragLeave(e) {
            e.preventDefault();
            this.uploadArea.classList.remove('drag-over');
        },
        
        handleDrop(e) {
            e.preventDefault();
            this.uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            this.processFiles(files);
        },
        
        handleFileSelect(e) {
            const files = e.target.files;
            this.processFiles(files);
        },
        
        processFiles(files) {
            if (files.length > 0) {
                // Simulate file processing
                this.showUploadProgress();
                
                setTimeout(() => {
                    this.hideUploadProgress();
                    this.showSuccessMessage(`Successfully uploaded ${files.length} file(s)`);
                    // In real implementation, upload to server and update UI
                }, 2000);
            }
        },
        
        showUploadProgress() {
            // Add progress indicator
            const progressHtml = `
                <div class="upload-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <p class="text-sm text-gray-600 mt-2">Uploading files...</p>
                </div>
            `;
            this.uploadArea.innerHTML = progressHtml;
            
            // Animate progress bar
            setTimeout(() => {
                const progressFill = this.uploadArea.querySelector('.progress-fill');
                progressFill.style.width = '100%';
            }, 100);
        },
        
        hideUploadProgress() {
            // Restore original content
            this.uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt text-gray-400 text-2xl mb-2"></i>
                <p class="text-sm text-gray-500">Drag & drop files or <button class="text-emerald-600 font-medium">browse</button></p>
                <p class="text-xs text-gray-400 mt-1">Max file size: 10MB</p>
            `;
            this.bindEvents(); // Re-bind events
        },
        
        showSuccessMessage(message) {
            const toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
    };
    
    // Form Handling
    const formHandler = {
        init() {
            this.bindFormSubmissions();
        },
        
        bindFormSubmissions() {
            // Maintenance Request Form
            const maintenanceForm = document.querySelector('.tool-card:nth-child(2) form');
            if (maintenanceForm) {
                maintenanceForm.addEventListener('submit', (e) => this.handleMaintenanceSubmit(e));
            }
            
            // Expert Question Form
            const expertForm = document.querySelector('.support-feature-card form');
            if (expertForm) {
                expertForm.addEventListener('submit', (e) => this.handleExpertSubmit(e));
            }
            
            // Subscription Form
            const subscriptionForm = document.querySelector('.subscription-card form');
            if (subscriptionForm) {
                subscriptionForm.addEventListener('submit', (e) => this.handleSubscriptionSubmit(e));
            }
        },
        
        handleMaintenanceSubmit(e) {
            e.preventDefault();
            this.showLoadingState(e.target);
            
            // Simulate API call
            setTimeout(() => {
                this.hideLoadingState(e.target);
                this.showSuccessMessage('Maintenance request submitted! Our team will contact you within 24 hours.');
                e.target.reset();
            }, 1500);
        },
        
        handleExpertSubmit(e) {
            e.preventDefault();
            this.showLoadingState(e.target);
            
            setTimeout(() => {
                this.hideLoadingState(e.target);
                this.showSuccessMessage('Your question has been sent to our rental experts. You will receive a response within 24 hours.');
                e.target.reset();
            }, 1500);
        },
        
        handleSubscriptionSubmit(e) {
            e.preventDefault();
            this.showLoadingState(e.target);
            
            setTimeout(() => {
                this.hideLoadingState(e.target);
                this.showSuccessMessage('Thank you for subscribing to our market updates! You will receive your first newsletter soon.');
                e.target.reset();
            }, 1500);
        },
        
        showLoadingState(form) {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
            submitButton.disabled = true;
            form.loadingState = { submitButton, originalText };
        },
        
        hideLoadingState(form) {
            if (form.loadingState) {
                form.loadingState.submitButton.innerHTML = form.loadingState.originalText;
                form.loadingState.submitButton.disabled = false;
            }
        },
        
        showSuccessMessage(message) {
            const toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
            toast.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-check-circle mr-2"></i>
                    <span>${message}</span>
                </div>
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('animate-fade-out');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    };
    
    // Resource Download Manager
    const resourceManager = {
        init() {
            this.bindDownloadButtons();
            this.bindPreviewButtons();
        },
        
        bindDownloadButtons() {
            const downloadButtons = document.querySelectorAll('.resource-item .bg-emerald-500');
            downloadButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const resourceTitle = button.closest('.resource-item').querySelector('h4').textContent;
                    this.simulateDownload(resourceTitle);
                });
            });
        },
        
        bindPreviewButtons() {
            const previewButtons = document.querySelectorAll('.resource-item .bg-gray-100');
            previewButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const resourceTitle = button.closest('.resource-item').querySelector('h4').textContent;
                    this.showPreview(resourceTitle);
                });
            });
        },
        
        simulateDownload(title) {
            // Show download progress
            const progressToast = document.createElement('div');
            progressToast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            progressToast.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-download mr-2"></i>
                    <span>Downloading "${title}"...</span>
                </div>
                <div class="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div class="download-progress bg-white h-2 rounded-full" style="width: 0%"></div>
                </div>
            `;
            document.body.appendChild(progressToast);
            
            // Simulate download progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                const progressBar = progressToast.querySelector('.download-progress');
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        progressToast.remove();
                        this.showSuccessMessage(`"${title}" downloaded successfully!`);
                    }, 500);
                }
            }, 100);
        },
        
        showPreview(title) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-semibold">Preview: ${title}</h3>
                        <button class="close-preview text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="preview-content">
                        <div class="bg-gray-100 rounded-lg p-8 text-center">
                            <i class="fas fa-file-pdf text-4xl text-red-500 mb-4"></i>
                            <p class="text-gray-600">Preview of "${title}"</p>
                            <p class="text-sm text-gray-500 mt-2">In a real implementation, this would show an actual document preview.</p>
                        </div>
                    </div>
                    <div class="mt-6 flex justify-end space-x-3">
                        <button class="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                            <i class="fas fa-download mr-2"></i>Download Full PDF
                        </button>
                        <button class="close-preview bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Close modal functionality
            modal.querySelectorAll('.close-preview').forEach(button => {
                button.addEventListener('click', () => modal.remove());
            });
            
            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        },
        
        showSuccessMessage(message) {
            const toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
            toast.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-check-circle mr-2"></i>
                    <span>${message}</span>
                </div>
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('animate-fade-out');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    };
    
    // Moving Date Planner
    const movingPlanner = {
        init() {
            this.movingDateInput = document.querySelector('input[type="date"]');
            if (this.movingDateInput) {
                this.setMinDate();
                this.bindEvents();
            }
        },
        
        setMinDate() {
            const today = new Date().toISOString().split('T')[0];
            this.movingDateInput.min = today;
            
            // Set default date to 30 days from now
            const defaultDate = new Date();
            defaultDate.setDate(defaultDate.getDate() + 30);
            this.movingDateInput.value = defaultDate.toISOString().split('T')[0];
        },
        
        bindEvents() {
            this.movingDateInput.addEventListener('change', () => this.updateTimeline());
            this.updateTimeline(); // Initial update
        },
        
        updateTimeline() {
            const selectedDate = new Date(this.movingDateInput.value);
            const today = new Date();
            const daysUntilMove = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24));
            const weeksUntilMove = Math.ceil(daysUntilMove / 7);
            
            const timelineItems = document.querySelectorAll('.bg-white.rounded-lg.border li');
            
            timelineItems.forEach((item, index) => {
                const icon = item.querySelector('i');
                const text = item.querySelector('span');
                
                // Reset all icons
                icon.className = 'far fa-circle text-gray-400 mr-2';
                
                // Update based on timeline
                if (weeksUntilMove <= 1 && index >= 3) {
                    // Last week - urgent
                    icon.className = 'fas fa-exclamation-circle text-red-500 mr-2';
                    item.classList.add('urgent');
                } else if (weeksUntilMove <= 2 && index >= 2) {
                    // Two weeks - in progress
                    icon.className = 'fas fa-clock text-yellow-500 mr-2';
                    item.classList.remove('urgent');
                } else if (weeksUntilMove <= 4 && index >= 1) {
                    // Four weeks - completed
                    icon.className = 'fas fa-check-circle text-emerald-500 mr-2';
                    item.classList.remove('urgent');
                } else if (weeksUntilMove > 4 && index === 0) {
                    // More than 4 weeks - planning
                    icon.className = 'fas fa-check-circle text-emerald-500 mr-2';
                    item.classList.remove('urgent');
                }
            });
            
            // Update save to calendar button text
            const saveButton = document.querySelector('.tool-card:last-child button');
            if (saveButton) {
                saveButton.innerHTML = `<i class="fas fa-calendar-plus mr-2"></i>Save (${daysUntilMove} days until move)`;
            }
        }
    };
    
    // Emergency Contact System
    const emergencyContacts = {
        init() {
            this.bindContactClicks();
        },
        
        bindContactClicks() {
            const contactItems = document.querySelectorAll('.emergency-contact li, .non-emergency-contact li');
            
            contactItems.forEach(contact => {
                contact.style.cursor = 'pointer';
                contact.addEventListener('click', () => {
                    const phoneNumber = contact.textContent.split(':')[1].trim();
                    this.handleContactClick(phoneNumber, contact.closest('.emergency-contact') ? 'emergency' : 'non-emergency');
                });
            });
        },
        
        handleContactClick(phoneNumber, type) {
            if (type === 'emergency') {
                this.showEmergencyConfirmation(phoneNumber);
            } else {
                this.showContactOptions(phoneNumber);
            }
        },
        
        showEmergencyConfirmation(phoneNumber) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
                    <div class="text-red-500 text-4xl mb-4">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Emergency Call</h3>
                    <p class="text-gray-600 mb-4">You are about to call: <strong>${phoneNumber}</strong></p>
                    <p class="text-sm text-gray-500 mb-6">This number is for emergencies only.</p>
                    <div class="flex space-x-3">
                        <button class="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors call-emergency">
                            Call Now
                        </button>
                        <button class="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors cancel-call">
                            Cancel
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.call-emergency').addEventListener('click', () => {
                // In a real implementation, this would initiate a phone call
                alert(`In a real implementation, this would call ${phoneNumber}`);
                modal.remove();
            });
            
            modal.querySelector('.cancel-call').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        },
        
        showContactOptions(phoneNumber) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Contact Options</h3>
                    <p class="text-gray-600 mb-6">How would you like to contact <strong>${phoneNumber}</strong>?</p>
                    <div class="space-y-3">
                        <button class="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors call-contact">
                            <i class="fas fa-phone mr-2"></i>Call
                        </button>
                        <button class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors message-contact">
                            <i class="fas fa-comment mr-2"></i>Send Message
                        </button>
                        <button class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors cancel-contact">
                            Cancel
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.call-contact').addEventListener('click', () => {
                alert(`In a real implementation, this would call ${phoneNumber}`);
                modal.remove();
            });
            
            modal.querySelector('.message-contact').addEventListener('click', () => {
                alert(`In a real implementation, this would open messaging for ${phoneNumber}`);
                modal.remove();
            });
            
            modal.querySelector('.cancel-contact').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
    };
    
    // Community Forum Integration
    const communityForum = {
        init() {
            this.bindForumActions();
        },
        
        bindForumActions() {
            const joinButton = document.querySelector('button:contains("Join Community Forum")');
            if (joinButton) {
                joinButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showForumRegistration();
                });
            }
            
            // Make discussion items clickable
            const discussions = document.querySelectorAll('.community-discussion');
            discussions.forEach(discussion => {
                discussion.addEventListener('click', () => {
                    const title = discussion.querySelector('span').textContent;
                    this.showDiscussionPreview(title);
                });
            });
        },
        
        showForumRegistration() {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl p-6 max-w-md w-full">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-semibold text-gray-800">Join Our Community</h3>
                        <button class="close-forum text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <p class="text-gray-600">Connect with other tenants, share experiences, and get advice from our community.</p>
                        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-users text-emerald-600 text-xl"></i>
                                <div>
                                    <div class="font-semibold text-emerald-800">5,000+ Members</div>
                                    <div class="text-sm text-emerald-700">Active community of tenants and experts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex gap-4">
                        <button class="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors register-forum">
                            Register Now
                        </button>
                        <button class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors close-forum">
                            Later
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.register-forum').addEventListener('click', () => {
                alert('Redirecting to community forum registration...');
                modal.remove();
            });
            
            modal.querySelectorAll('.close-forum').forEach(button => {
                button.addEventListener('click', () => modal.remove());
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        },
        
        showDiscussionPreview(title) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-semibold text-gray-800">${title}</h3>
                        <button class="close-discussion text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="space-y-6">
                        <div class="bg-slate-50 rounded-lg p-4">
                            <p class="text-gray-600">This is a preview of the community discussion. Join our forum to read the full conversation and participate.</p>
                        </div>
                        <div class="text-center py-8">
                            <i class="fas fa-users text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">Join our community to access this discussion</p>
                        </div>
                    </div>
                    <div class="mt-6 flex justify-center">
                        <button class="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors join-from-preview">
                            Join Community Forum
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.join-from-preview').addEventListener('click', () => {
                modal.remove();
                this.showForumRegistration();
            });
            
            modal.querySelector('.close-discussion').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
    };
    
    // Animation Controller
    const animationController = {
        init() {
            this.setupIntersectionObserver();
            this.addScrollAnimations();
        },
        
        setupIntersectionObserver() {
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
            
            document.querySelectorAll('.tenant-resources-section .fade-in-up').forEach(el => {
                observer.observe(el);
            });
        },
        
        addScrollAnimations() {
            // Add parallax effect to section header
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.tenant-resources-section');
                if (parallax) {
                    const rate = scrolled * -0.5;
                    parallax.style.transform = `translateY(${rate}px)`;
                }
            });
        }
    };
    
    // Initialize all components
    function initTenantResources() {
        rentCalculator.init();
        documentStorage.init();
        formHandler.init();
        resourceManager.init();
        movingPlanner.init();
        emergencyContacts.init();
        communityForum.init();
        animationController.init();
        
        console.log('Tenant Resources section initialized successfully');
    }
    
    // Start initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTenantResources);
    } else {
        initTenantResources();
    }
    
    // Export for potential module use
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            rentCalculator,
            documentStorage,
            formHandler,
            resourceManager,
            movingPlanner,
            emergencyContacts,
            communityForum,
            animationController
        };
    }
});