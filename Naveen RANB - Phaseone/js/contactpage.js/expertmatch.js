// Expert Matching Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize expert matching section
  initExpertMatching();
  initContactMethods();
  initScrollAnimations();
});

// Expert Matching System
function initExpertMatching() {
  const expertContainer = document.getElementById('expert-cards-container');
  const loadingElement = document.getElementById('expert-loading');
  const confidenceFill = document.getElementById('confidence-fill');
  const confidenceScore = document.getElementById('confidence-score');
  
  // Simulate expert data fetching and matching
  setTimeout(() => {
    // Hide loading state
    loadingElement.style.opacity = '0';
    
    setTimeout(() => {
      loadingElement.style.display = 'none';
      
      // Generate expert cards based on form data (simulated)
      const experts = generateExpertRecommendations();
      renderExpertCards(experts, expertContainer);
      
      // Animate confidence score
      animateConfidenceScore(85, confidenceFill, confidenceScore);
    }, 300);
  }, 2000);
}

// Generate expert recommendations based on form data
function generateExpertRecommendations() {
  // In a real implementation, this would use actual form data
  // For demo purposes, we'll generate sample experts
  return [
    {
      id: 1,
      name: "Elin Johansson",
      title: "Senior Real Estate Advisor",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      specialties: ["Luxury Homes", "Waterfront Properties", "Architectural"],
      experience: "8 years",
      matchScore: 95,
      status: "online",
      description: "Specializing in premium waterfront properties with a focus on sustainable architecture."
    },
    {
      id: 2,
      name: "Anders Bergman",
      title: "Commercial Property Specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      specialties: ["Commercial", "Investment", "Office Spaces"],
      experience: "12 years",
      matchScore: 88,
      status: "online",
      description: "Expert in commercial real estate investments and portfolio management."
    },
    {
      id: 3,
      name: "Sofia Lindgren",
      title: "Residential Sales Expert",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      specialties: ["Family Homes", "First-time Buyers", "Relocation"],
      experience: "6 years",
      matchScore: 82,
      status: "offline",
      description: "Dedicated to helping families find their perfect home with personalized service."
    }
  ];
}

// Render expert cards to the container
function renderExpertCards(experts, container) {
  container.innerHTML = '';
  
  experts.forEach((expert, index) => {
    const card = document.createElement('div');
    card.className = 'expert-card';
    card.innerHTML = `
      <div class="expert-image" style="background-image: url('${expert.image}')">
        <span class="expert-status ${expert.status === 'online' ? 'status-online' : 'status-offline'}">
          ${expert.status === 'online' ? 'Online Now' : 'Available Soon'}
        </span>
      </div>
      <div class="p-6">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h4 class="font-semibold text-gray-800 text-lg">${expert.name}</h4>
            <p class="text-emerald-600 text-sm">${expert.title}</p>
          </div>
          <span class="match-score">
            <i class="fas fa-bolt mr-1"></i>
            ${expert.matchScore}%
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-4">${expert.description}</p>
        <div class="expert-specialties">
          ${expert.specialties.map(specialty => 
            `<span class="specialty-tag">${specialty}</span>`
          ).join('')}
        </div>
        <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <span class="text-gray-500 text-sm">
            <i class="fas fa-award mr-1"></i>
            ${expert.experience} experience
          </span>
          <button class="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors contact-expert-btn" data-expert-id="${expert.id}">
            Contact ${expert.name.split(' ')[0]}
          </button>
        </div>
      </div>
    `;
    
    container.appendChild(card);
    
    // Animate card entrance with staggered delay
    setTimeout(() => {
      card.classList.add('visible');
    }, 200 * index);
  });
  
  // Add event listeners to contact buttons
  document.querySelectorAll('.contact-expert-btn').forEach(button => {
    button.addEventListener('click', function() {
      const expertId = this.getAttribute('data-expert-id');
      initiateExpertContact(expertId);
    });
  });
}

// Animate confidence score
function animateConfidenceScore(targetScore, fillElement, scoreElement) {
  let currentScore = 0;
  const increment = targetScore / 50; // Adjust speed of animation
  
  const timer = setInterval(() => {
    currentScore += increment;
    if (currentScore >= targetScore) {
      currentScore = targetScore;
      clearInterval(timer);
    }
    
    fillElement.style.width = `${currentScore}%`;
    scoreElement.textContent = `${Math.round(currentScore)}%`;
  }, 30);
}

// Contact Methods Functionality
function initContactMethods() {
  // Add click handlers to contact method cards
  document.querySelectorAll('.contact-method-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't trigger if clicking on a button (let button handle its own click)
      if (!e.target.closest('.action-btn')) {
        const method = this.getAttribute('data-method');
        highlightContactMethod(method);
      }
    });
  });
  
  // Add click handlers to action buttons
  document.querySelectorAll('.action-btn.primary').forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.contact-method-card');
      const method = card.getAttribute('data-method');
      initiateContact(method, 'primary');
    });
  });
  
  document.querySelectorAll('.action-btn.secondary').forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.contact-method-card');
      const method = card.getAttribute('data-method');
      initiateContact(method, 'secondary');
    });
  });
  
  // Department contact buttons
  document.querySelectorAll('.department-cta').forEach(button => {
    button.addEventListener('click', function() {
      const departmentCard = this.closest('.department-card');
      const departmentName = departmentCard.querySelector('.department-title').textContent;
      initiateDepartmentContact(departmentName);
    });
  });
  
  // Emergency contact button
  document.querySelector('.emergency-contact button').addEventListener('click', function() {
    initiateEmergencyContact();
  });
}

// Highlight selected contact method
function highlightContactMethod(method) {
  // Remove highlight from all cards
  document.querySelectorAll('.contact-method-card').forEach(card => {
    card.style.borderColor = '#e5e7eb';
  });
  
  // Highlight selected card
  const selectedCard = document.querySelector(`.contact-method-card[data-method="${method}"]`);
  if (selectedCard) {
    selectedCard.style.borderColor = '#10b981';
    
    // Scroll to bring into view if needed
    selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Initiate contact based on method
function initiateContact(method, actionType) {
  switch(method) {
    case 'phone':
      if (actionType === 'primary') {
        // In a real implementation, this would initiate a phone call
        console.log('Initiating phone call to main office');
        showNotification('Connecting you to our expert team...', 'info');
      } else {
        // Schedule a call
        showNotification('Opening call scheduler...', 'info');
      }
      break;
      
    case 'video':
      if (actionType === 'primary') {
        // Schedule video consultation
        showNotification('Opening video consultation scheduler...', 'info');
      } else {
        // Show more info about video consultations
        showNotification('Video consultations allow face-to-face meetings from anywhere', 'info');
      }
      break;
      
    case 'chat':
      // Start live chat
      simulateLiveChat();
      break;
      
    case 'office':
      if (actionType === 'primary') {
        // Book office visit
        showNotification('Opening office visit booking system...', 'info');
      } else {
        // Get directions
        showNotification('Opening directions to our Amsterdam office...', 'info');
      }
      break;
  }
}

// Initiate department contact
function initiateDepartmentContact(departmentName) {
  showNotification(`Connecting you to our ${departmentName} team...`, 'info');
  
  // In a real implementation, this would route to the appropriate contact form or number
  setTimeout(() => {
    showNotification(`You're now being connected to ${departmentName}`, 'success');
  }, 1500);
}

// Initiate emergency contact
function initiateEmergencyContact() {
  showNotification('Connecting to emergency support line...', 'warning');
  
  // In a real implementation, this would initiate a phone call
  // For demo purposes, we'll show a confirmation
  setTimeout(() => {
    showNotification('Emergency support agent will be with you shortly', 'warning');
  }, 1000);
}

// Initiate expert contact
function initiateExpertContact(expertId) {
  // In a real implementation, this would use the actual expert ID
  showNotification('Connecting you with your selected expert...', 'info');
  
  setTimeout(() => {
    showNotification('Expert notified and will contact you shortly', 'success');
  }, 1500);
}

// Simulate live chat functionality
function simulateLiveChat() {
  showNotification('Starting live chat with our experts...', 'info');
  
  // Simulate chat connection
  setTimeout(() => {
    const chatWindow = document.createElement('div');
    chatWindow.className = 'fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50';
    chatWindow.innerHTML = `
      <div class="bg-emerald-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h4 class="font-semibold">Live Chat</h4>
          <p class="text-emerald-100 text-sm">Connected to Sofia</p>
        </div>
        <button class="text-white close-chat">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="p-4 h-64 overflow-y-auto chat-messages">
        <div class="flex items-start mb-4">
          <div class="bg-emerald-100 text-emerald-800 p-3 rounded-lg max-w-xs">
            <p class="text-sm">Hello! I'm Sofia, how can I help you with your real estate needs today?</p>
          </div>
        </div>
      </div>
      <div class="p-4 border-t border-gray-200">
        <div class="flex">
          <input type="text" placeholder="Type your message..." class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
          <button class="bg-emerald-500 text-white px-4 rounded-r-lg hover:bg-emerald-600 transition-colors send-message">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(chatWindow);
    
    // Add event listeners for chat
    chatWindow.querySelector('.close-chat').addEventListener('click', function() {
      document.body.removeChild(chatWindow);
    });
    
    chatWindow.querySelector('.send-message').addEventListener('click', function() {
      const input = chatWindow.querySelector('input');
      const message = input.value.trim();
      
      if (message) {
        const messagesContainer = chatWindow.querySelector('.chat-messages');
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'flex items-start mb-4 justify-end';
        userMessage.innerHTML = `
          <div class="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs">
            <p class="text-sm">${message}</p>
          </div>
        `;
        messagesContainer.appendChild(userMessage);
        
        // Clear input
        input.value = '';
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simulate response after a delay
        setTimeout(() => {
          const agentMessage = document.createElement('div');
          agentMessage.className = 'flex items-start mb-4';
          agentMessage.innerHTML = `
            <div class="bg-emerald-100 text-emerald-800 p-3 rounded-lg max-w-xs">
              <p class="text-sm">Thank you for your message. I'll help you with that right away!</p>
            </div>
          `;
          messagesContainer.appendChild(agentMessage);
          
          // Scroll to bottom
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
      }
    });
    
    // Also send on Enter key
    chatWindow.querySelector('input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        chatWindow.querySelector('.send-message').click();
      }
    });
  }, 1000);
}

// Scroll animations
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
    type === 'info' ? 'bg-blue-500 text-white' : 
    type === 'success' ? 'bg-emerald-500 text-white' : 
    type === 'warning' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
  }`;
  
  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fas ${
        type === 'info' ? 'fa-info-circle' : 
        type === 'success' ? 'fa-check-circle' : 
        type === 'warning' ? 'fa-exclamation-triangle' : 'fa-bell'
      } mr-2"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}