// === NEIGHBORHOOD GUIDE FUNCTIONALITY ===

class NeighborhoodGuide {
    constructor() {
        this.neighborhoodData = {
            amsterdam: {
                oost: {
                    name: "Oost",
                    fullName: "Amsterdam Oost",
                    description: "Family-friendly area with beautiful parks, excellent schools, and a relaxed atmosphere. Known for its diverse community and green spaces.",
                    avgRent: { min: 1300, max: 1800 },
                    transportScore: 4.0,
                    expatScore: "Mixed",
                    vibe: "Family-Oriented",
                    features: [
                        "Oosterpark & Flevopark",
                        "International schools",
                        "Family-sized apartments", 
                        "Metro & tram connections",
                        "Diverse dining options",
                        "Cultural centers"
                    ],
                    bestFor: ["Families", "Professionals", "Long-term living"],
                    images: [
                        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
                    ],
                    transport: {
                        metro: ["Line 53", "Line 54"],
                        tram: ["Lines 3, 7, 19"],
                        bus: ["Multiple lines"],
                        bike: "Excellent cycling infrastructure"
                    },
                    amenities: {
                        schools: 8,
                        parks: 6,
                        supermarkets: 12,
                        restaurants: 45
                    }
                },
                noord: {
                    name: "Noord", 
                    fullName: "Amsterdam Noord",
                    description: "Creative and upcoming area across the IJ river, known for its modern architecture, artist communities, and innovative developments.",
                    avgRent: { min: 1100, max: 1600 },
                    transportScore: 3.8,
                    expatScore: "Creative",
                    vibe: "Innovative & Artistic",
                    features: [
                        "Free ferry to Central Station",
                        "Artist studios & galleries",
                        "Modern waterfront apartments",
                        "NDSM-werf cultural area",
                        "Innovative architecture",
                        "Green spaces & parks"
                    ],
                    bestFor: ["Young Professionals", "Artists", "Innovators"],
                    images: [
                        "https://images.unsplash.com/photo-1580744824261-5a47ee3d4d63?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
                    ],
                    transport: {
                        ferry: ["Free ferries to Central"],
                        metro: ["Line 52 (North-South)"],
                        bus: ["Multiple lines"],
                        bike: "Good cycling connections"
                    },
                    amenities: {
                        schools: 4,
                        parks: 5,
                        supermarkets: 8,
                        restaurants: 35
                    }
                },
                zuid: {
                    name: "Zuid",
                    fullName: "Amsterdam Zuid",
                    description: "Prestigious area known for luxury shopping, museums, international schools, and high-end residential properties.",
                    avgRent: { min: 1800, max: 3000 },
                    transportScore: 4.5,
                    expatScore: "International",
                    vibe: "Luxury & Prestige",
                    features: [
                        "PC Hooftstraat luxury shopping",
                        "Museum Quarter nearby",
                        "Top international schools",
                        "Excellent public transport",
                        "Business district access",
                        "High-end restaurants"
                    ],
                    bestFor: ["Executives", "Diplomats", "Luxury seekers"],
                    images: [
                        "https://images.unsplash.com/photo-1512476446317-0ebaa0f2050f?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
                    ],
                    transport: {
                        tram: ["Lines 2, 3, 5, 12, 24"],
                        metro: ["Line 52", "Line 51"],
                        train: ["Zuid Station"],
                        bike: "Excellent cycling infrastructure"
                    },
                    amenities: {
                        schools: 6,
                        parks: 4,
                        supermarkets: 10,
                        restaurants: 60
                    }
                }
            },
            rotterdam: {
                centrum: {
                    name: "Centrum",
                    fullName: "Rotterdam Centrum", 
                    description: "The vibrant heart of Rotterdam featuring iconic modern architecture, excellent transportation, and diverse urban living.",
                    avgRent: { min: 1200, max: 2000 },
                    transportScore: 4.7,
                    expatScore: "Mixed",
                    vibe: "Urban & Dynamic",
                    features: [
                        "Cube Houses & modern architecture",
                        "Central Station transportation hub",
                        "Shopping districts",
                        "Diverse restaurants & cafes",
                        "Cultural venues",
                        "Business centers"
                    ],
                    bestFor: ["City lovers", "Professionals", "Students"],
                    images: [
                        "https://images.unsplash.com/photo-1599661044176-beecc48ed9e1?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
                    ],
                    transport: {
                        metro: ["All lines converge here"],
                        tram: ["Multiple lines"],
                        train: ["Central Station hub"],
                        bike: "Excellent cycling city"
                    },
                    amenities: {
                        schools: 5,
                        parks: 3,
                        supermarkets: 15,
                        restaurants: 80
                    }
                },
                feijenoord: {
                    name: "Feijenoord",
                    fullName: "Rotterdam Feijenoord",
                    description: "Diverse and developing area known for its cultural diversity, affordable housing, and strong community spirit.",
                    avgRent: { min: 800, max: 1200 },
                    transportScore: 3.5,
                    expatScore: "Diverse", 
                    vibe: "Community & Affordable",
                    features: [
                        "Affordable housing options",
                        "Feyenoord Stadium area",
                        "Local markets & shops",
                        "Tram connections to center",
                        "Cultural diversity",
                        "Community initiatives"
                    ],
                    bestFor: ["Budget-conscious", "Students", "Families"],
                    images: [
                        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
                    ],
                    transport: {
                        tram: ["Lines 2, 4, 7"],
                        bus: ["Multiple lines"],
                        metro: ["Line D nearby"],
                        bike: "Good cycling connections"
                    },
                    amenities: {
                        schools: 4,
                        parks: 4,
                        supermarkets: 8,
                        restaurants: 25
                    }
                }
            },
            "the-hague": {
                "centrum-hague": {
                    name: "Centrum",
                    fullName: "The Hague Centrum",
                    description: "International diplomatic heart with government buildings, international organizations, and upscale urban living.",
                    avgRent: { min: 1300, max: 2200 },
                    transportScore: 4.3,
                    expatScore: "International",
                    vibe: "Diplomatic & Prestigious", 
                    features: [
                        "International courts & embassies",
                        "Government district",
                        "Luxury shopping streets",
                        "Central Station access",
                        "Cultural institutions",
                        "High-end dining"
                    ],
                    bestFor: ["Diplomats", "Professionals", "Luxury living"],
                    images: [
                        "https://images.unsplash.com/photo-1592409065737-253c365b6e6c?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
                    ],
                    transport: {
                        tram: ["Multiple lines"],
                        bus: ["City network"],
                        train: ["Central Station"],
                        bike: "Good cycling infrastructure"
                    },
                    amenities: {
                        schools: 6,
                        parks: 3,
                        supermarkets: 12,
                        restaurants: 55
                    }
                },
                segbroek: {
                    name: "Segbroek",
                    fullName: "The Hague Segbroek",
                    description: "Family-friendly residential area characterized by green spaces, good schools, and a strong sense of community.",
                    avgRent: { min: 950, max: 1400 },
                    transportScore: 3.8,
                    expatScore: "Family",
                    vibe: "Residential & Green", 
                    features: [
                        "Green parks & playgrounds",
                        "Family-sized homes",
                        "Good local schools",
                        "Bus connections to center",
                        "Community centers",
                        "Local shopping streets"
                    ],
                    bestFor: ["Families", "Long-term residents", "Quiet living"],
                    images: [
                        "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
                    ],
                    transport: {
                        bus: ["Multiple lines to center"],
                        tram: ["Line 2 nearby"],
                        bike: "Good cycling routes",
                        car: "Easy parking compared to center"
                    },
                    amenities: {
                        schools: 5,
                        parks: 6,
                        supermarkets: 7,
                        restaurants: 20
                    }
                }
            },
            utrecht: {
                overvecht: {
                    name: "Overvecht",
                    fullName: "Utrecht Overvecht", 
                    description: "Affordable area popular with students and young professionals, offering good transportation and university proximity.",
                    avgRent: { min: 750, max: 1100 },
                    transportScore: 4.0,
                    expatScore: "Student",
                    vibe: "Student & Affordable",
                    features: [
                        "Close to university campuses",
                        "Affordable housing options",
                        "Direct train to city center",
                        "Student-friendly amenities",
                        "Sports facilities",
                        "Local markets"
                    ],
                    bestFor: ["Students", "Young Professionals", "Budget-conscious"],
                    images: [
                        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
                    ],
                    transport: {
                        train: ["Overvecht Station"],
                        bus: ["Multiple university lines"],
                        bike: "Excellent cycling to university",
                        tram: ["Line 20 nearby"]
                    },
                    amenities: {
                        schools: 3,
                        parks: 4,
                        supermarkets: 6,
                        restaurants: 18
                    }
                },
                lombok: {
                    name: "Lombok",
                    fullName: "Utrecht Lombok",
                    description: "Cultural melting pot known for its diverse community, international markets, and central yet affordable location.",
                    avgRent: { min: 1000, max: 1500 },
                    transportScore: 4.2,
                    expatScore: "Diverse",
                    vibe: "Cultural & Central", 
                    features: [
                        "Multicultural community",
                        "International food markets",
                        "Walking distance to center",
                        "Mix of old and new housing",
                        "Cultural events",
                        "Diverse dining options"
                    ],
                    bestFor: ["Culture lovers", "Food enthusiasts", "Urban dwellers"],
                    images: [
                        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1592409065737-253c365b6e6c?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
                    ],
                    transport: {
                        walk: "15 minutes to center",
                        bike: "Excellent cycling city",
                        bus: ["Multiple lines"],
                        train: ["10 minutes to station"]
                    },
                    amenities: {
                        schools: 4,
                        parks: 3,
                        supermarkets: 5,
                        restaurants: 30
                    }
                }
            }
        };

        this.currentCity = 'amsterdam';
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.showCity('amsterdam');
        console.log('🏘️ Neighborhood Guide initialized');
    }

    cacheElements() {
        this.cityTabs = document.querySelectorAll('.city-tab');
        this.cityContents = document.querySelectorAll('.city-content');
        this.neighborhoodCards = document.querySelectorAll('.neighborhood-card');
        this.neighborhoodModal = document.getElementById('neighborhood-modal');
        this.modalTitle = document.getElementById('modal-neighborhood-title');
        this.modalContent = document.getElementById('neighborhood-modal-content');
        this.closeModalBtn = document.querySelector('.close-neighborhood');
    }

    setupEventListeners() {
        // City tab clicks
        this.cityTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const city = tab.dataset.city;
                this.showCity(city);
            });
        });

        // Neighborhood card clicks
        this.neighborhoodCards.forEach(card => {
            card.addEventListener('click', () => {
                const neighborhood = card.dataset.neighborhood;
                this.showNeighborhoodDetail(neighborhood);
            });
        });

        // Modal close
        this.closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });

        this.neighborhoodModal.addEventListener('click', (e) => {
            if (e.target === this.neighborhoodModal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    showCity(city) {
        // Update active tab
        this.cityTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.city === city) {
                tab.classList.add('active');
            }
        });

        // Update active content
        this.cityContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${city}-content`) {
                content.classList.add('active');
            }
        });

        this.currentCity = city;
        
        // Scroll to top of section
        document.getElementById('neighborhood-guide').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    showNeighborhoodDetail(neighborhoodKey) {
        const neighborhood = this.neighborhoodData[this.currentCity][neighborhoodKey];
        
        if (!neighborhood) return;

        this.modalTitle.textContent = neighborhood.fullName;
        
        this.modalContent.innerHTML = this.createNeighborhoodDetailHTML(neighborhood);
        
        this.neighborhoodModal.classList.remove('hidden');
    }

    createNeighborhoodDetailHTML(neighborhood) {
        return `
            <div class="space-y-6">
                <!-- Header -->
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <img src="${neighborhood.images[0]}" alt="${neighborhood.name}" class="w-full h-48 object-cover rounded-lg">
                    </div>
                    <div>
                        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <h4 class="font-semibold text-emerald-800 mb-2">Quick Facts</h4>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span>Average Rent:</span>
                                    <span class="font-semibold">€${neighborhood.avgRent.min}-€${neighborhood.avgRent.max}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Transport Score:</span>
                                    <span class="font-semibold">${neighborhood.transportScore}/5</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Community Vibe:</span>
                                    <span class="font-semibold">${neighborhood.vibe}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Description -->
                <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">About ${neighborhood.name}</h4>
                    <p class="text-gray-600 leading-relaxed">${neighborhood.description}</p>
                </div>

                <!-- Key Features -->
                <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Key Features</h4>
                    <div class="grid md:grid-cols-2 gap-4">
                        ${neighborhood.features.map(feature => `
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-check text-emerald-600"></i>
                                <span class="text-gray-600">${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Transportation -->
                <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Transportation</h4>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h5 class="font-semibold text-gray-700 mb-2">Public Transport</h5>
                            ${Object.entries(neighborhood.transport).map(([type, lines]) => `
                                <div class="flex items-center space-x-3 mb-2">
                                    <i class="fas fa-${this.getTransportIcon(type)} text-emerald-600 w-4"></i>
                                    <span class="text-sm text-gray-600 capitalize">${type}:</span>
                                    <span class="text-sm font-medium">${Array.isArray(lines) ? lines.join(', ') : lines}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div>
                            <h5 class="font-semibold text-gray-700 mb-2">Amenities Nearby</h5>
                            <div class="space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Schools:</span>
                                    <span class="font-semibold">${neighborhood.amenities.schools}+</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Parks:</span>
                                    <span class="font-semibold">${neighborhood.amenities.parks}+</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Supermarkets:</span>
                                    <span class="font-semibold">${neighborhood.amenities.supermarkets}+</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Restaurants:</span>
                                    <span class="font-semibold">${neighborhood.amenities.restaurants}+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Best For -->
                <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Best For</h4>
                    <div class="flex flex-wrap gap-2">
                        ${neighborhood.bestFor.map(type => `
                            <span class="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                                ${type}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- CTA -->
                <div class="bg-gray-50 rounded-lg p-6 text-center">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Ready to explore ${neighborhood.name}?</h4>
                    <p class="text-gray-600 mb-4">Browse available properties in this neighborhood</p>
                    <button class="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors" onclick="neighborhoodGuide.exploreProperties('${this.currentCity}', '${neighborhood.name}')">
                        <i class="fas fa-search mr-2"></i>
                        Browse Properties in ${neighborhood.name}
                    </button>
                </div>
            </div>
        `;
    }

    getTransportIcon(transportType) {
        const icons = {
            metro: 'subway',
            tram: 'train',
            bus: 'bus',
            train: 'train',
            ferry: 'ship',
            bike: 'bicycle',
            walk: 'walking',
            car: 'car'
        };
        return icons[transportType] || 'map-marker-alt';
    }

    exploreProperties(city, neighborhood) {
        this.closeModal();
        this.showNotification(`Searching for properties in ${neighborhood}, ${city}...`, 'info');
        
        // Simulate property search
        setTimeout(() => {
            // In real implementation, this would redirect to property search with filters
            console.log(`Searching properties in ${neighborhood}, ${city}`);
        }, 1000);
    }

    closeModal() {
        this.neighborhoodModal.classList.add('hidden');
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

// Initialize the neighborhood guide when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.neighborhoodGuide = new NeighborhoodGuide();
});

// Utility functions for neighborhood data
const NeighborhoodUtils = {
    // Calculate commute time to city center
    calculateCommute: (neighborhood, city) => {
        const baseTimes = {
            amsterdam: {
                oost: '15-20 minutes',
                noord: '10-15 minutes',
                zuid: '10-15 minutes'
            },
            rotterdam: {
                centrum: '0-5 minutes',
                feijenoord: '15-20 minutes'
            },
            "the-hague": {
                "centrum-hague": '0-5 minutes',
                segbroek: '15-20 minutes'
            },
            utrecht: {
                overvecht: '10-15 minutes',
                lombok: '15-20 minutes'
            }
        };
        return baseTimes[city]?.[neighborhood] || 'Varies';
    },

    // Get neighborhood recommendations based on profile
    getRecommendations: (profile) => {
        const { budget, lifestyle, commute, family } = profile;
        
        let recommendations = [];
        
        if (budget === 'high' && lifestyle === 'luxury') {
            recommendations.push('Amsterdam Zuid', 'The Hague Centrum');
        }
        
        if (budget === 'medium' && family) {
            recommendations.push('Amsterdam Oost', 'The Hague Segbroek');
        }
        
        if (budget === 'low' && lifestyle === 'student') {
            recommendations.push('Utrecht Overvecht', 'Rotterdam Feijenoord');
        }
        
        return recommendations;
    }
};