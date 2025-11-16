// About Team Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Team card animations
    const teamCards = document.querySelectorAll('.team-card');
    const departmentCards = document.querySelectorAll('.department-card');
    
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(teamCards).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.15}s`;
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });

    teamCards.forEach(card => {
        teamObserver.observe(card);
    });

    departmentCards.forEach(card => {
        teamObserver.observe(card);
    });

    // Team member modal functionality
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            showTeamMemberModal(memberId);
        });
    });

    // Social link handling
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering team card click
            // In real implementation, this would open the social platform
            const platform = this.querySelector('i').className.split(' ')[1];
            alert(`Opening ${platform} profile...`);
        });
    });

    // Department card interactions
    departmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            const title = this.querySelector('.department-title').textContent;
            showDepartmentDetails(title);
        });
    });

    // Team stats counter animation
    const teamStats = document.querySelectorAll('.team-stats .stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const value = entry.target.textContent;
                if (value.includes('+')) {
                    const numValue = parseInt(value);
                    animateCounter(entry.target, 0, numValue, 2000);
                } else if (value.includes('%')) {
                    const numValue = parseInt(value);
                    animateCounter(entry.target, 0, numValue, 2000, '%');
                } else {
                    const numValue = parseInt(value);
                    animateCounter(entry.target, 0, numValue, 2000);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    teamStats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Helper function for counter animation
    function animateCounter(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Modal functions
    function showTeamMemberModal(memberId) {
        // In a real implementation, this would show detailed member information
        const memberData = {
            'erik': {
                name: 'Erik Johansson',
                role: 'Founder & CEO',
                bio: 'Swedish-born real estate expert with over 15 years of experience in the Dutch property market. Erik founded NordicEstates with a vision to bring Scandinavian transparency and design principles to real estate.',
                email: 'erik@nordicestates.nl',
                phone: '+31 20 123 4567',
                specialties: ['Strategic Planning', 'Market Analysis', 'Client Relations']
            },
            'sophie': {
                name: 'Sophie van der Berg',
                role: 'COO',
                bio: 'Operations specialist with 8 years of experience in streamlining real estate processes. Sophie ensures every client receives exceptional service from start to finish.',
                email: 'sophie@nordicestates.nl',
                phone: '+31 20 123 4568',
                specialties: ['Process Optimization', 'Team Management', 'Quality Assurance']
            },
            'mikael': {
                name: 'Mikael Andersen',
                role: 'Head of Design',
                bio: 'Danish architect with a passion for Scandinavian design. Mikael helps clients transform properties into beautiful, functional living spaces.',
                email: 'mikael@nordicestates.nl',
                phone: '+31 20 123 4569',
                specialties: ['Interior Design', 'Architecture', 'Sustainable Design']
            }
        };

        const member = memberData[memberId];
        if (member) {
            // Create modal HTML
            const modalHTML = `
                <div class="team-modal active">
                    <div class="team-modal-content">
                        <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
                            <div class="flex justify-between items-center">
                                <h3 class="text-2xl font-semibold">${member.name}</h3>
                                <button class="close-modal text-white text-2xl">&times;</button>
                            </div>
                            <p class="text-emerald-100">${member.role}</p>
                        </div>
                        <div class="p-6">
                            <div class="grid md:grid-cols-3 gap-6 mb-6">
                                <div class="md:col-span-2">
                                    <h4 class="text-lg font-semibold mb-3">About</h4>
                                    <p class="text-gray-600 leading-relaxed">${member.bio}</p>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold mb-3">Contact</h4>
                                    <div class="space-y-2">
                                        <div class="flex items-center text-gray-600">
                                            <i class="fas fa-envelope mr-3 text-emerald-600"></i>
                                            <span>${member.email}</span>
                                        </div>
                                        <div class="flex items-center text-gray-600">
                                            <i class="fas fa-phone mr-3 text-emerald-600"></i>
                                            <span>${member.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold mb-3">Specialties</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${member.specialties.map(specialty => 
                                        `<span class="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">${specialty}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Add modal to page
            document.body.insertAdjacentHTML('beforeend', modalHTML);

            // Add event listener to close modal
            const modal = document.querySelector('.team-modal');
            const closeBtn = modal.querySelector('.close-modal');
            
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
    }

    function showDepartmentDetails(departmentName) {
        alert(`Department details for ${departmentName} would appear here in a full implementation.`);
    }

    console.log('About Team section initialized');
});