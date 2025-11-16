// === PHASE 7: Agent Team Showcase Functionality ===

class AgentTeamShowcase {
    constructor() {
        this.agents = [];
        this.activeFilters = {
            location: 'all',
            specialty: 'all',
            language: 'all',
            experience: 'all'
        };
        this.visibleAgents = 6;
        this.favoriteAgents = new Set();
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupFilterSystem();
        this.setupAgentMatching();
        this.setupScrollAnimations();
        this.loadFavoriteAgents();
        console.log('👥 Agent Team Showcase initialized');
    }
    
    cacheElements() {
        // Filter elements
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.agentGrid = document.querySelector('.agent-grid');
        this.agentCards = document.querySelectorAll('.agent-card');
        
        // Matching tool elements
        this.matchingSelects = document.querySelectorAll('.matching-select');
        this.findAgentBtn = document.querySelector('.matching-tool button');
        
        // Action elements
        this.favoriteButtons = document.querySelectorAll('.action-btn.favorite');
        this.contactButtons = document.querySelectorAll('.action-btn.contact');
        this.whatsappButtons = document.querySelectorAll('.contact-btn.whatsapp');
        this.callButtons = document.querySelectorAll('.contact-btn.call');
        this.emailButtons = document.querySelectorAll('.contact-btn.email');
        
        // Load more button
        this.loadMoreBtn = document.querySelector('.load-more-btn');
    }
    
    setupEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleFilterClick(btn);
            });
        });
        
        // Favorite buttons
        this.favoriteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleFavorite(e.target.closest('.action-btn'));
            });
        });
        
        // Contact buttons
        this.contactButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showContactModal(e.target.closest('.action-btn'));
            });
        });
        
        // Direct contact methods
        this.whatsappButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.contactViaWhatsApp(e.target.closest('.contact-btn'));
            });
        });
        
        this.callButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.contactViaCall(e.target.closest('.contact-btn'));
            });
        });
        
        this.emailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.contactViaEmail(e.target.closest('.contact-btn'));
            });
        });
        
        // Load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMoreAgents();
            });
        }
        
        // Matching tool
        if (this.findAgentBtn) {
            this.findAgentBtn.addEventListener('click', () => {
                this.findAgentMatch();
            });
        }
    }
    
    setupFilterSystem() {
        // Store all agents
        this.agents = Array.from(this.agentCards);
    }
    
    handleFilterClick(button) {
        const filter = button.dataset.filter;
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Determine filter type and update active filters
        if (['amsterdam', 'rotterdam', 'the-hague', 'utrecht'].includes(filter)) {
            this.activeFilters.location = filter;
            this.activeFilters.specialty = 'all';
            this.activeFilters.language = 'all';
        } else if (['luxury', 'first-time', 'international', 'investment'].includes(filter)) {
            this.activeFilters.location = 'all';
            this.activeFilters.specialty = filter;
            this.activeFilters.language = 'all';
        } else if (['dutch', 'english', 'german'].includes(filter)) {
            this.activeFilters.location = 'all';
            this.activeFilters.specialty = 'all';
            this.activeFilters.language = filter;
        } else {
            // 'all' filter
            this.activeFilters.location = 'all';
            this.activeFilters.specialty = 'all';
            this.activeFilters.language = 'all';
        }
        
        this.applyFilters();
    }
    
    applyFilters() {
        this.agents.forEach(card => {
            const locations = card.dataset.locations.split(',');
            const specialties = card.dataset.specialties.split(',');
            const languages = card.dataset.languages.split(',');
            const experience = card.dataset.experience;
            
            const locationMatch = this.activeFilters.location === 'all' || 
                                locations.includes(this.activeFilters.location);
            const specialtyMatch = this.activeFilters.specialty === 'all' || 
                                 specialties.includes(this.activeFilters.specialty);
            const languageMatch = this.activeFilters.language === 'all' || 
                                languages.includes(this.activeFilters.language);
            const experienceMatch = this.activeFilters.experience === 'all' || 
                                  experience === this.activeFilters.experience;
            
            if (locationMatch && specialtyMatch && languageMatch && experienceMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        this.updateLoadMoreVisibility();
    }
    
    setupAgentMatching() {
        // This would integrate with a backend matching algorithm
        console.log('Agent matching system ready');
    }
    
    findAgentMatch() {
        const propertyType = document.querySelector('.matching-select[value="property-type"]')?.value;
        const location = document.querySelector('.matching-select[value="location"]')?.value;
        
        if (!propertyType || !location) {
            this.showMatchingModal('Please select both property type and location to find your perfect agent match.');
            return;
        }
        
        // Simulate matching algorithm
        const matchedAgents = this.findBestMatches(propertyType, location);
        this.showMatchingResults(matchedAgents);
    }
    
    findBestMatches(propertyType, location) {
        // Simple matching algorithm based on specialties and locations
        return this.agents.filter(card => {
            const specialties = card.dataset.specialties.split(',');
            const locations = card.dataset.locations.split(',');
            
            const specialtyMatch = specialties.some(specialty => 
                this.getSpecialtyWeight(specialty, propertyType) > 0
            );
            const locationMatch = locations.includes(location);
            
            return specialtyMatch && locationMatch;
        }).slice(0, 3); // Return top 3 matches
    }
    
    getSpecialtyWeight(specialty, propertyType) {
        const weights = {
            'luxury': { 'villa': 10, 'house': 8, 'apartment': 6, 'investment': 4 },
            'first-time': { 'apartment': 10, 'house': 8, 'villa': 2, 'investment': 1 },
            'international': { 'villa': 9, 'house': 7, 'apartment': 8, 'investment': 6 },
            'investment': { 'investment': 10, 'apartment': 8, 'house': 6, 'villa': 4 },
            'apartments': { 'apartment': 10, 'house': 3, 'villa': 1, 'investment': 7 },
            'commercial': { 'investment': 10, 'apartment': 5, 'house': 3, 'villa': 2 },
            'family': { 'house': 10, 'villa': 8, 'apartment': 4, 'investment': 2 },
            'historical': { 'villa': 10, 'house': 9, 'apartment': 3, 'investment': 1 }
        };
        
        return weights[specialty]?.[propertyType] || 0;
    }
    
    showMatchingResults(matchedAgents) {
        if (matchedAgents.length === 0) {
            this.showMatchingModal('No perfect matches found. Please try adjusting your criteria or contact our general team for assistance.');
            return;
        }
        
        const agentNames = matchedAgents.map(card => 
            card.querySelector('.agent-name').textContent
        ).join(', ');
        
        this.showMatchingModal(`We found ${matchedAgents.length} perfect agent matches for you: ${agentNames}. We've highlighted them in the agent list below.`);
        
        // Highlight matched agents
        this.highlightMatchedAgents(matchedAgents);
    }
    
    highlightMatchedAgents(matchedAgents) {
        // Remove previous highlights
        this.agents.forEach(card => {
            card.style.boxShadow = '';
            card.style.borderColor = '';
        });
        
        // Add highlight to matched agents
        matchedAgents.forEach(card => {
            card.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.3)';
            card.style.borderColor = '#10b981';
            
            // Scroll to first matched agent
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    showMatchingModal(message) {
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 matching-modal">
                <div class="bg-white rounded-2xl p-8 max-w-md w-full">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-semibold text-gray-800">Agent Matching Results</h3>
                        <button class="close-modal text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <p class="text-gray-600">${message}</p>
                        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-handshake text-emerald-600 text-xl"></i>
                                <div>
                                    <div class="font-semibold text-emerald-800">Perfect Match Guarantee</div>
                                    <div class="text-sm text-emerald-700">We'll find you the ideal agent for your needs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex gap-4">
                        <button class="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors close-modal">
                            Got It
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.matching-modal');
        const closeBtns = modal.querySelectorAll('.close-modal');
        
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    toggleFavorite(button) {
        const agentId = button.dataset.agent;
        
        if (this.favoriteAgents.has(agentId)) {
            this.favoriteAgents.delete(agentId);
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.classList.remove('favorited');
        } else {
            this.favoriteAgents.add(agentId);
            button.innerHTML = '<i class="fas fa-heart"></i>';
            button.classList.add('favorited');
        }
        
        this.saveFavoriteAgents();
    }
    
    saveFavoriteAgents() {
        localStorage.setItem('favoriteAgents', JSON.stringify(Array.from(this.favoriteAgents)));
    }
    
    loadFavoriteAgents() {
        const saved = localStorage.getItem('favoriteAgents');
        if (saved) {
            this.favoriteAgents = new Set(JSON.parse(saved));
            
            // Update UI
            this.favoriteButtons.forEach(btn => {
                const agentId = btn.dataset.agent;
                if (this.favoriteAgents.has(agentId)) {
                    btn.innerHTML = '<i class="fas fa-heart"></i>';
                    btn.classList.add('favorited');
                }
            });
        }
    }
    
    showContactModal(button) {
        const agentCard = button.closest('.agent-card');
        const agentName = agentCard.querySelector('.agent-name').textContent;
        const agentTitle = agentCard.querySelector('.agent-title').textContent;
        
        const modalHTML = `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 contact-modal">
                <div class="bg-white rounded-2xl p-8 max-w-md w-full">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-semibold text-gray-800">Contact ${agentName}</h3>
                        <button class="close-modal text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <p class="text-gray-600">Get in touch with ${agentName}, ${agentTitle.toLowerCase()}</p>
                        
                        <div class="grid grid-cols-3 gap-3">
                            <button class="contact-method-btn whatsapp bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition-colors">
                                <i class="fab fa-whatsapp mr-2"></i>WhatsApp
                            </button>
                            <button class="contact-method-btn call bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                                <i class="fas fa-phone mr-2"></i>Call
                            </button>
                            <button class="contact-method-btn email bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                <i class="fas fa-envelope mr-2"></i>Email
                            </button>
                        </div>
                        
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h4 class="font-semibold text-gray-800 mb-2">Preferred Contact Times</h4>
                            <p class="text-sm text-gray-600">Monday - Friday: 9:00 - 18:00<br>Response time: within 2 hours</p>
                        </div>
                    </div>
                    <div class="mt-6">
                        <button class="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors close-modal">
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.contact-modal');
        const closeBtns = modal.querySelectorAll('.close-modal');
        const contactMethods = modal.querySelectorAll('.contact-method-btn');
        
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });
        
        contactMethods.forEach(btn => {
            btn.addEventListener('click', () => {
                const method = btn.classList[1]; // whatsapp, call, or email
                this.handleContactMethod(method, agentName);
                modal.remove();
            });
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    handleContactMethod(method, agentName) {
        switch (method) {
            case 'whatsapp':
                this.contactViaWhatsApp();
                break;
            case 'call':
                this.contactViaCall();
                break;
            case 'email':
                this.contactViaEmail();
                break;
        }
        
        // Track contact attempt
        console.log(`Contacting ${agentName} via ${method}`);
    }
    
    contactViaWhatsApp(button = null) {
        const phoneNumber = '+31612345678'; // Default number
        const message = 'Hello! I would like to discuss selling my property with NordicEstates.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }
    
    contactViaCall(button = null) {
        const phoneNumber = '+31201234567';
        window.open(`tel:${phoneNumber}`, '_self');
    }
    
    contactViaEmail(button = null) {
        const email = 'agents@nordicestates.nl';
        const subject = 'Property Selling Inquiry - NordicEstates';
        const body = 'Hello, I would like to discuss selling my property. Please contact me at your earliest convenience.';
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(url, '_self');
    }
    
    loadMoreAgents() {
        this.visibleAgents += 3;
        this.updateAgentVisibility();
    }
    
    updateAgentVisibility() {
        const visibleCards = document.querySelectorAll('.agent-card:not(.hidden)');
        visibleCards.forEach((card, index) => {
            if (index < this.visibleAgents) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        this.updateLoadMoreVisibility();
    }
    
    updateLoadMoreVisibility() {
        if (!this.loadMoreBtn) return;
        
        const visibleCards = document.querySelectorAll('.agent-card:not(.hidden)').length;
        
        if (this.visibleAgents >= visibleCards) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            this.loadMoreBtn.style.display = 'inline-flex';
        }
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
    new AgentTeamShowcase();
    console.log('🚀 Agent Team Showcase loaded successfully!');
});

// Export for potential use in other modules
window.AgentTeamShowcase = AgentTeamShowcase;