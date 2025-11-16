// JavaScript for Scandinavian Real Estate Website

// Parallax Scrolling Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax-bg');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('bg-white', 'shadow-lg');
        nav.classList.remove('bg-white/90');
    } else {
        nav.classList.remove('bg-white', 'shadow-lg');
        nav.classList.add('bg-white/90');
    }
});

// Smooth Scrolling for Anchor Links
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

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all feature and property cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .property-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Hover Effect Enhancement
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Form Submission Handling
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted!');
});

// Mobile Menu Toggle (can be added later)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu?.classList.toggle('hidden');
}

// Price Formatter
// function formatPrice(price) {
//     return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'EUR'
//     }).format(price);
// }

// Initialize when document is ready
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('NordicEstates website loaded successfully!');
    
//     // Add any initialization code here
//     const prices = document.querySelectorAll('.price');
//     prices.forEach(priceElement => {
//         const price = priceElement.textContent;
//         // You can add price formatting logic here
//     });
// });





