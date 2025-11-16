// === PHASE 8: Seller Resources & FAQ Functionality ===

class SellerResources {
    constructor() {
        this.downloadedResources = new Set();
        this.faqSearchIndex = [];
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupFAQSearch();
        this.setupResourceDownloads();
        this.setupForms();
        this.setupScrollAnimations();
        this.loadDownloadProgress();
        console.log('📚 Seller Resources section initialized');
    }
    
    cacheElements() {
        // FAQ elements
        this.faqSearch = document.querySelector('.faq-search');
        this.quickAnswerBtns = document.querySelectorAll('.quick-answer-btn');
        this.faqItems = document.querySelectorAll('.faq-item');
        this.faqQuestions = document.querySelectorAll('.faq-question');
        
        // Resource elements
        this.downloadBtns = document.querySelectorAll('.download-btn');
        this.resourceCards = document.querySelectorAll('.resource-card');
        this.downloadCount = document.getElementById('download-count');
        this.downloadProgress = document.getElementById('download-progress');
        
        // Form elements
        this.expertForm = document.querySelector('.expert-form');
        this.newsletterForm = document.querySelector('.newsletter-form');
    }
    
    setupEventListeners() {
        // FAQ accordion
        this.faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                this.toggleFAQ(question);
            });
        });
        
        // Quick answer buttons
        this.quickAnswerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.searchFAQ(btn.dataset.search);
            });
        });
        
        // Download buttons
        this.downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleDownload(e.target.closest('.download-btn'));
            });
        });
    }
    
    setupFAQSearch() {
        // Build search index
        this.faqItems.forEach(item => {
            const question = item.querySelector('h4').textContent;
            const answer = item.querySelector('.faq-answer').textContent;
            const category = item.dataset.category;
            
            this.faqSearchIndex.push({
                element: item,
                question: question.toLowerCase(),
                answer: answer.toLowerCase(),
                category: category,
                keywords: this.extractKeywords(question + ' ' + answer)
            });
        });
        
        // Search functionality
        if (this.faqSearch) {
            this.faqSearch.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
            
            this.faqSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(e.target.value);
                }
            });
        }
    }
    
    extractKeywords(text) {
        const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
        const words = text.toLowerCase().split(/\W+/);
        return words.filter(word => 
            word.length > 2 && !stopWords.has(word)
        );
    }
    
    performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all FAQ items
            this.faqItems.forEach(item => {
                item.classList.remove('hidden');
                this.removeHighlights(item);
            });
            return;
        }
        
        let hasResults = false;
        
        this.faqSearchIndex.forEach(item => {
            const questionMatch = item.question.includes(searchTerm);
            const answerMatch = item.answer.includes(searchTerm);
            const keywordMatch = item.keywords.some(keyword => 
                keyword.includes(searchTerm)
            );
            
            if (questionMatch || answerMatch || keywordMatch) {
                item.element.classList.remove('hidden');
                this.highlightText(item.element, searchTerm);
                hasResults = true;
                
                // Auto-expand matching items
                if (!item.element.classList.contains('active')) {
                    this.expandFAQ(item.element);
                }
            } else {
                item.element.classList.add('hidden');
                this.removeHighlights(item.element);
            }
        });
        
        this.showSearchResults(hasResults, searchTerm);
    }
    
    highlightText(element, searchTerm) {
        this.removeHighlights(element);
        
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            const text = node.nodeValue;
            const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
            const newText = text.replace(regex, '<mark class="highlight">$1</mark>');
            
            if (newText !== text) {
                const span = document.createElement('span');
                span.innerHTML = newText;
                node.parentNode.replaceChild(span, node);
            }
        }
    }
    
    removeHighlights(element) {
        const highlights = element.querySelectorAll('mark.highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }
    
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    showSearchResults(hasResults, searchTerm) {
        // Remove existing result messages
        const existingMessage = document.querySelector('.search-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (!hasResults && searchTerm) {
            const message = document.createElement('div');
            message.className = 'search-results-message bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4';
            message.innerHTML = `
                <div class="flex items-center space-x-3">
                    <i class="fas fa-search text-yellow-600"></i>
                    <div>
                        <h5 class="font-semibold text-yellow-800">No results found</h5>
                        <p class="text-sm text-yellow-700">Try different keywords or contact our experts for specific questions.</p>
                    </div>
                </div>
            `;
            document.querySelector('.faq-accordion').prepend(message);
        }
    }
    
    searchFAQ(term) {
        if (this.faqSearch) {
            this.faqSearch.value = term;
            this.performSearch(term);
        }
    }
    
    toggleFAQ(question) {
        const faqItem = question.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        const arrow = faqItem.querySelector('.faq-arrow');
        
        // Close all other FAQ items
        this.faqItems.forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').classList.remove('open');
                item.querySelector('.faq-arrow').style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current item
        const isOpening = !faqItem.classList.contains('active');
        
        if (isOpening) {
            faqItem.classList.add('active');
            answer.classList.add('open');
            arrow.style.transform = 'rotate(180deg)';
            
            // Scroll to ensure full visibility
            setTimeout(() => {
                faqItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        } else {
            faqItem.classList.remove('active');
            answer.classList.remove('open');
            arrow.style.transform = 'rotate(0deg)';
        }
    }
    
    expandFAQ(faqItem) {
        const answer = faqItem.querySelector('.faq-answer');
        const arrow = faqItem.querySelector('.faq-arrow');
        
        faqItem.classList.add('active');
        answer.classList.add('open');
        arrow.style.transform = 'rotate(180deg)';
    }
    
    setupResourceDownloads() {
        // Initialize download tracking
        this.updateDownloadProgress();
    }
    
    handleDownload(button) {
        const resourceId = button.dataset.resource;
        const resourceCard = button.closest('.resource-card');
        const progressBar = resourceCard.querySelector('.progress-fill');
        
        if (this.downloadedResources.has(resourceId)) {
            this.showDownloadMessage('You have already downloaded this resource.', 'info');
            return;
        }
        
        // Show downloading state
        button.classList.add('downloading');
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        button.disabled = true;
        
        // Simulate download progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.completeDownload(button, resourceId, resourceCard);
            }
            progressBar.style.width = `${progress}%`;
        }, 200);
    }
    
    completeDownload(button, resourceId, resourceCard) {
        // Update button state
        button.classList.remove('downloading');
        button.classList.add('completed');
        button.innerHTML = '<i class="fas fa-check"></i> Downloaded';
        button.disabled = false;
        
        // Add to downloaded resources
        this.downloadedResources.add(resourceId);
        
        // Update progress
        this.updateDownloadProgress();
        
        // Show success animation
        resourceCard.classList.add('download-complete');
        setTimeout(() => {
            resourceCard.classList.remove('download-complete');
        }, 600);
        
        // Save to localStorage
        this.saveDownloadProgress();
        
        // Show success message
        this.showDownloadMessage('Resource downloaded successfully!', 'success');
        
        // In a real implementation, this would trigger actual file download
        console.log(`Downloading resource: ${resourceId}`);
    }
    
    updateDownloadProgress() {
        const totalResources = this.downloadBtns.length;
        const downloadedCount = this.downloadedResources.size;
        const percentage = (downloadedCount / totalResources) * 100;
        
        if (this.downloadCount) {
            this.downloadCount.textContent = `${downloadedCount}/${totalResources}`;
        }
        
        if (this.downloadProgress) {
            this.downloadProgress.style.width = `${percentage}%`;
        }
    }
    
    saveDownloadProgress() {
        localStorage.setItem('downloadedResources', JSON.stringify(Array.from(this.downloadedResources)));
    }
    
    loadDownloadProgress() {
        const saved = localStorage.getItem('downloadedResources');
        if (saved) {
            this.downloadedResources = new Set(JSON.parse(saved));
            
            // Update UI
            this.downloadBtns.forEach(btn => {
                const resourceId = btn.dataset.resource;
                if (this.downloadedResources.has(resourceId)) {
                    btn.classList.add('completed');
                    btn.innerHTML = '<i class="fas fa-check"></i> Downloaded';
                    btn.closest('.resource-card').querySelector('.progress-fill').style.width = '100%';
                }
            });
            
            this.updateDownloadProgress();
        }
    }
    
    showDownloadMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.download-message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `download-message ${
            type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 
            type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
        } border rounded-lg p-4 mt-4`;
        
        messageDiv.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.querySelector('.resource-grid').parentNode.appendChild(messageDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    setupForms() {
        // Expert consultation form
        if (this.expertForm) {
            this.expertForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleExpertFormSubmit(e.target);
            });
        }
        
        // Newsletter form
        if (this.newsletterForm) {
            this.newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(e.target);
            });
        }
    }
    
    handleExpertFormSubmit(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            this.showFormMessage(form, 'Your question has been sent to our experts! We\'ll contact you within 24 hours.', 'success');
            
            // Reset form
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // In real implementation, send data to backend
            console.log('Expert form submitted:', Object.fromEntries(formData));
        }, 2000);
    }
    
    handleNewsletterSubmit(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            this.showFormMessage(form, 'Thank you for subscribing! You\'ll receive your first market update soon.', 'success');
            
            // Reset form
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // In real implementation, send data to backend
            console.log('Newsletter subscription:', Object.fromEntries(formData));
        }, 1500);
    }
    
    showFormMessage(form, message, type = 'success') {
        // Remove existing messages
        const existingMessages = form.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${
            type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 
            'bg-red-50 border-red-200 text-red-800'
        } border rounded-lg p-4 mt-4`;
        
        messageDiv.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span class="text-sm">${message}</span>
            </div>
        `;
        
        form.appendChild(messageDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SellerResources();
    console.log('🚀 Seller Resources section loaded successfully!');
});

// Export for potential use in other modules
window.SellerResources = SellerResources;