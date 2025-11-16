// About Hero Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animated Counter
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Initialize counters when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.value-counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateValue(counter, 0, target, 2000);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.about-hero-section');
    if (heroSection) {
        observer.observe(heroSection);
    }

    // Smooth scrolling for CTA buttons
    const meetTeamBtn = document.querySelector('.meet-team-btn');
    const storyBtn = document.querySelector('.story-btn');

    if (meetTeamBtn) {
        meetTeamBtn.addEventListener('click', () => {
            // Will link to team section in Phase 2
            alert('Team section coming in Phase 2!');
        });
    }

    if (storyBtn) {
        storyBtn.addEventListener('click', () => {
            document.getElementById('our-story').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Trust badge animations
    const trustBadges = document.querySelectorAll('.trust-badge');
    trustBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.1}s`;
    });

    // Parallax effect for background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.about-hero-section');
        if (parallax) {
            const rate = scrolled * -0.5;
            parallax.style.transform = `translateY(${rate}px)`;
        }
    });

    console.log('About Hero section initialized');
});

// About Story Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.animationDelay = `${Array.from(timelineItems).indexOf(entry.target) * 0.2}s`;
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Interactive timeline dots
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = '0 0 0 6px rgba(16, 185, 129, 0.3)';
        });
        
        dot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 0 3px #10b981';
        });
        
        dot.addEventListener('click', function() {
            const timelineItem = this.closest('.timeline-item');
            timelineItem.querySelector('.timeline-content').classList.toggle('expanded');
        });
    });

    // Timeline content expansion
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    timelineContents.forEach(content => {
        content.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            if (this.classList.contains('expanded')) {
                this.style.maxHeight = 'none';
            } else {
                this.style.maxHeight = 'initial';
            }
        });
    });

    // Stats counter for timeline
    const timelineStats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current) + '+';
                    }
                }, 40);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    timelineStats.forEach(stat => {
        statsObserver.observe(stat);
    });

    console.log('About Story section initialized');
});

// About Values Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Value cards animations
    const valueCards = document.querySelectorAll('.value-card');
    
    const valuesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(valueCards).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.2}s`;
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });

    valueCards.forEach(card => {
        valuesObserver.observe(card);
    });

    // Interactive value cards
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
        
        // Click to highlight
        card.addEventListener('click', function() {
            valueCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Add pulse animation
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Feature list animations
    const features = document.querySelectorAll('.feature');
    
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.1}s`;
        feature.classList.add('fade-in-up');
    });

    // Philosophy card interaction
    const philosophyCard = document.querySelector('.philosophy-card');
    if (philosophyCard) {
        philosophyCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        philosophyCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // Value icons hover effects
    const valueIcons = document.querySelectorAll('.value-icon');
    
    valueIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });

    // Scroll to values section
    const valuesSection = document.getElementById('our-values');
    if (valuesSection) {
        // Add scroll indicator if needed
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'fixed bottom-8 right-8 bg-emerald-500 text-white p-3 rounded-full shadow-lg cursor-pointer z-40';
        scrollIndicator.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollIndicator.style.display = 'none';
        
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.body.appendChild(scrollIndicator);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollIndicator.style.display = 'block';
            } else {
                scrollIndicator.style.display = 'none';
            }
        });
    }

    console.log('About Values section initialized');
});