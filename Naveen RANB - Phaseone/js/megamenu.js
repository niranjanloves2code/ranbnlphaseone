// // Enhanced Mega Menu Functionality
// class MegaMenu {
//     constructor() {
//         this.megaMenu = document.getElementById('properties-mega-menu');
//         this.dropdown = this.megaMenu?.querySelector('.absolute');
//         this.isOpen = false;
        
//         this.init();
//     }
    
//     init() {
//         // Mouse events
//         this.megaMenu?.addEventListener('mouseenter', this.openMenu.bind(this));
//         this.megaMenu?.addEventListener('mouseleave', this.closeMenu.bind(this));
        
//         // Touch events for mobile
//         this.megaMenu?.addEventListener('touchstart', this.toggleMenu.bind(this));
        
//         // Keyboard navigation
//         this.megaMenu?.addEventListener('keydown', this.handleKeyboard.bind(this));
//     }
    
//     openMenu() {
//         this.isOpen = true;
//         this.dropdown.classList.remove('opacity-0', 'invisible', 'translate-y-4');
//         this.dropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
//     }
    
//     closeMenu() {
//         this.isOpen = false;
//         this.dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
//         this.dropdown.classList.add('opacity-0', 'invisible', 'translate-y-4');
//     }
    
//     toggleMenu(e) {
//         e.preventDefault();
//         this.isOpen ? this.closeMenu() : this.openMenu();
//     }
    
//     handleKeyboard(e) {
//         if (e.key === 'Enter' || e.key === ' ') {
//             e.preventDefault();
//             this.toggleMenu(e);
//         } else if (e.key === 'Escape' && this.isOpen) {
//             this.closeMenu();
//         }
//     }
// }

// // Enhanced Navigation Scroll Effect
// class NavigationManager {
//     constructor() {
//         this.nav = document.querySelector('nav');
//         this.lastScrollY = window.scrollY;
//         this.init();
//     }
    
//     init() {
//         window.addEventListener('scroll', this.handleScroll.bind(this));
//     }
    
//     handleScroll() {
//         const currentScrollY = window.scrollY;
        
//         // Hide/show nav on scroll
//         if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
//             this.nav.style.transform = 'translateY(-100%)';
//         } else {
//             this.nav.style.transform = 'translateY(0)';
//         }
        
//         // Change background opacity
//         if (currentScrollY > 50) {
//             this.nav.classList.add('bg-white', 'shadow-lg');
//             this.nav.classList.remove('bg-white/95');
//         } else {
//             this.nav.classList.remove('bg-white', 'shadow-lg');
//             this.nav.classList.add('bg-white/95');
//         }
        
//         this.lastScrollY = currentScrollY;
//     }
// }

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize mega menu
//     new MegaMenu();
    
//     // Initialize navigation manager
//     new NavigationManager();
    
//     // Add loading animation to mega menu images
//     const menuItems = document.querySelectorAll('.mega-menu-item');
//     menuItems.forEach((item, index) => {
//         item.style.animationDelay = `${index * 0.1}s`;
//     });
    
//     console.log('🇳🇱 NordicEstates Mega Menu initialized successfully!');
// });

// // Enhanced mobile menu toggle (for future mobile implementation)
// function toggleMobileMenu() {
//     const mobileMenu = document.getElementById('mobile-menu');
//     if (mobileMenu) {
//         mobileMenu.classList.toggle('hidden');
//         mobileMenu.classList.toggle('animate-fade-in');
//     }
// }



// Foundation JavaScript for Buy Page
class MegaMenu {
    constructor() {
        this.megaMenu = document.getElementById('properties-mega-menu');
        this.dropdown = this.megaMenu?.querySelector('.absolute');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // Mouse events
        this.megaMenu?.addEventListener('mouseenter', this.openMenu.bind(this));
        this.megaMenu?.addEventListener('mouseleave', this.closeMenu.bind(this));
        
        // Touch events for mobile
        this.megaMenu?.addEventListener('touchstart', this.toggleMenu.bind(this));
        
        // Keyboard navigation
        this.megaMenu?.addEventListener('keydown', this.handleKeyboard.bind(this));
    }
    
    openMenu() {
        this.isOpen = true;
        this.dropdown.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        this.dropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
    }
    
    closeMenu() {
        this.isOpen = false;
        this.dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
        this.dropdown.classList.add('opacity-0', 'invisible', 'translate-y-4');
    }
    
    toggleMenu(e) {
        e.preventDefault();
        this.isOpen ? this.closeMenu() : this.openMenu();
    }
    
    handleKeyboard(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleMenu(e);
        } else if (e.key === 'Escape' && this.isOpen) {
            this.closeMenu();
        }
    }
}

class NavigationManager {
    constructor() {
        this.nav = document.querySelector('nav');
        this.lastScrollY = window.scrollY;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Hide/show nav on scroll
        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            this.nav.style.transform = 'translateY(-100%)';
        } else {
            this.nav.style.transform = 'translateY(0)';
        }
        
        // Change background opacity
        if (currentScrollY > 50) {
            this.nav.classList.add('bg-white', 'shadow-lg');
            this.nav.classList.remove('bg-white/95');
        } else {
            this.nav.classList.remove('bg-white', 'shadow-lg');
            this.nav.classList.add('bg-white/95');
        }
        
        this.lastScrollY = currentScrollY;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mega menu
    new MegaMenu();
    
    // Initialize navigation manager
    new NavigationManager();
    
    // Add loading animation to mega menu images
    const menuItems = document.querySelectorAll('.mega-menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    console.log('🇳🇱 NordicEstates Buy Page Foundation initialized successfully!');
});

// Mobile menu toggle function
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('animate-fade-in');
    }
}