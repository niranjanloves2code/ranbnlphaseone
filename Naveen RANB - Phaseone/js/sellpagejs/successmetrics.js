// === PHASE 5: Success Metrics & Case Studies Functionality ===

class SuccessMetrics {
    constructor() {
        this.caseStudies = [];
        this.activeFilters = {
            type: 'all',
            location: 'all'
        };
        this.visibleCaseStudies = 6;
        
        this.init();
    }
    
    init() {
        this.setupMetricCounters();
        this.setupTrendGraph();
        this.setupHeatmap();
        this.setupCaseStudyFilters();
        this.setupScrollAnimations();
        this.setupLoadMore();
        console.log('📊 Success Metrics section initialized');
    }
    
    setupMetricCounters() {
        const counters = document.querySelectorAll('.stat-counter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000;
        const steps = 60;
        const stepValue = target / steps;
        const stepTime = duration / steps;
        const isPercentage = element.textContent.includes('%');
        
        let currentValue = 0;
        const timer = setInterval(() => {
            currentValue += stepValue;
            if (currentValue >= target) {
                currentValue = target;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                element.textContent = currentValue.toFixed(1) + '%';
            } else {
                element.textContent = Math.floor(currentValue).toLocaleString();
            }
            element.classList.add('animated');
        }, stepTime);
    }
    
    setupTrendGraph() {
        const graphContainer = document.getElementById('market-trend-graph');
        if (!graphContainer) return;
        
        // Sample data for different time periods
        const trendData = {
            '1y': [
                { month: 'Jan', price: 4.8, views: 1800 },
                { month: 'Feb', price: 5.1, views: 2100 },
                { month: 'Mar', price: 5.4, views: 2300 },
                { month: 'Apr', price: 6.2, views: 2500 },
                { month: 'May', price: 6.8, views: 2800 },
                { month: 'Jun', price: 7.2, views: 2450 },
                { month: 'Jul', price: 7.5, views: 2600 },
                { month: 'Aug', price: 7.8, views: 2700 },
                { month: 'Sep', price: 7.6, views: 2550 },
                { month: 'Oct', price: 7.9, views: 2900 },
                { month: 'Nov', price: 8.1, views: 3000 },
                { month: 'Dec', price: 8.3, views: 3200 }
            ],
            '6m': [
                { month: 'Jul', price: 7.5, views: 2600 },
                { month: 'Aug', price: 7.8, views: 2700 },
                { month: 'Sep', price: 7.6, views: 2550 },
                { month: 'Oct', price: 7.9, views: 2900 },
                { month: 'Nov', price: 8.1, views: 3000 },
                { month: 'Dec', price: 8.3, views: 3200 }
            ],
            '3m': [
                { month: 'Oct', price: 7.9, views: 2900 },
                { month: 'Nov', price: 8.1, views: 3000 },
                { month: 'Dec', price: 8.3, views: 3200 }
            ]
        };
        
        // Create SVG graph
        this.renderTrendGraph(graphContainer, trendData['1y']);
        
        // Add filter functionality
        const trendFilters = document.querySelectorAll('.trend-filter');
        trendFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                trendFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                const period = filter.dataset.period;
                this.renderTrendGraph(graphContainer, trendData[period]);
            });
        });
    }
    
    renderTrendGraph(container, data) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        const padding = 40;
        
        // Clear previous graph
        container.innerHTML = '';
        
        // Create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        
        // Calculate scales
        const xScale = (width - padding * 2) / (data.length - 1);
        const maxPrice = Math.max(...data.map(d => d.price));
        const maxViews = Math.max(...data.map(d => d.views));
        
        const yScalePrice = (height - padding * 2) / maxPrice;
        const yScaleViews = (height - padding * 2) / maxViews;
        
        // Create price line
        const pricePoints = data.map((point, i) => {
            const x = padding + i * xScale;
            const y = height - padding - (point.price * yScalePrice);
            return `${x},${y}`;
        }).join(' ');
        
        const priceLine = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        priceLine.setAttribute('points', pricePoints);
        priceLine.setAttribute('fill', 'none');
        priceLine.setAttribute('stroke', '#10b981');
        priceLine.setAttribute('stroke-width', '3');
        priceLine.setAttribute('class', 'graph-line');
        svg.appendChild(priceLine);
        
        // Create views line (dashed)
        const viewPoints = data.map((point, i) => {
            const x = padding + i * xScale;
            const y = height - padding - (point.views / maxViews * (height - padding * 2));
            return `${x},${y}`;
        }).join(' ');
        
        const viewLine = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        viewLine.setAttribute('points', viewPoints);
        viewLine.setAttribute('fill', 'none');
        viewLine.setAttribute('stroke', '#8b5cf6');
        viewLine.setAttribute('stroke-width', '2');
        viewLine.setAttribute('stroke-dasharray', '5,5');
        viewLine.setAttribute('class', 'graph-line');
        svg.appendChild(viewLine);
        
        // Add data points and labels
        data.forEach((point, i) => {
            const x = padding + i * xScale;
            const yPrice = height - padding - (point.price * yScalePrice);
            const yViews = height - padding - (point.views / maxViews * (height - padding * 2));
            
            // Price point
            const pricePoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pricePoint.setAttribute('cx', x);
            pricePoint.setAttribute('cy', yPrice);
            pricePoint.setAttribute('r', '4');
            pricePoint.setAttribute('fill', '#10b981');
            pricePoint.setAttribute('class', 'graph-point');
            pricePoint.setAttribute('data-tooltip', `Price: +${point.price}% above asking`);
            svg.appendChild(pricePoint);
            
            // Views point
            const viewPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            viewPoint.setAttribute('cx', x);
            viewPoint.setAttribute('cy', yViews);
            viewPoint.setAttribute('r', '3');
            viewPoint.setAttribute('fill', '#8b5cf6');
            viewPoint.setAttribute('class', 'graph-point');
            viewPoint.setAttribute('data-tooltip', `Views: ${point.views.toLocaleString()}`);
            svg.appendChild(viewPoint);
            
            // Month labels
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', height - 10);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '12');
            text.setAttribute('fill', '#6b7280');
            text.textContent = point.month;
            svg.appendChild(text);
        });
        
        // Add legend
        const legendGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        const priceLegend = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        priceLegend.setAttribute('x', padding);
        priceLegend.setAttribute('y', 20);
        priceLegend.setAttribute('font-size', '12');
        priceLegend.setAttribute('fill', '#10b981');
        priceLegend.textContent = 'Price Premium %';
        legendGroup.appendChild(priceLegend);
        
        const viewsLegend = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        viewsLegend.setAttribute('x', padding);
        viewsLegend.setAttribute('y', 35);
        viewsLegend.setAttribute('font-size', '12');
        viewsLegend.setAttribute('fill', '#8b5cf6');
        viewsLegend.textContent = 'Funda Views';
        legendGroup.appendChild(viewsLegend);
        
        svg.appendChild(legendGroup);
        
        container.appendChild(svg);
    }
    
    setupHeatmap() {
        const heatmapData = [
            { neighborhood: 'Jordaan', price: 7850, difference: 12.5, status: 'premium' },
            { neighborhood: 'Oud-Zuid', price: 8500, difference: 8.2, status: 'premium' },
            { neighborhood: 'De Pijp', price: 7200, difference: 5.8, status: 'above-average' },
            { neighborhood: 'Centrum', price: 6800, difference: 3.2, status: 'average' },
            { neighborhood: 'Oost', price: 5200, difference: -2.1, status: 'below-average' },
            { neighborhood: 'West', price: 4800, difference: -4.5, status: 'below-average' },
            { neighborhood: 'Noord', price: 4200, difference: -8.2, status: 'below-average' },
            { neighborhood: 'Zuid', price: 6200, difference: 1.8, status: 'average' },
            { neighborhood: 'Oud-West', price: 6500, difference: 2.5, status: 'average' },
            { neighborhood: 'Plantage', price: 7100, difference: 6.2, status: 'above-average' },
            { neighborhood: 'Museumkwartier', price: 8900, difference: 10.8, status: 'premium' },
            { neighborhood: 'Grachtengordel', price: 9200, difference: 15.3, status: 'premium' }
        ];
        
        const heatmapContainer = document.querySelector('.heatmap-container .grid');
        if (!heatmapContainer) return;
        
        heatmapData.forEach(area => {
            const item = document.createElement('div');
            item.className = `heatmap-item ${area.status}`;
            item.innerHTML = `
                <div class="heatmap-price">€${area.price.toLocaleString()}</div>
                <div class="heatmap-label">${area.neighborhood}</div>
                <div class="heatmap-difference ${area.difference >= 0 ? 'positive' : 'negative'}">
                    ${area.difference >= 0 ? '+' : ''}${area.difference}%
                </div>
            `;
            
            item.addEventListener('click', () => {
                this.filterCaseStudies('location', area.neighborhood.toLowerCase().replace(' ', '-'));
            });
            
            heatmapContainer.appendChild(item);
        });
    }
    
    setupCaseStudyFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const caseStudyCards = document.querySelectorAll('.case-study-card');
        
        // Store all case studies
        this.caseStudies = Array.from(caseStudyCards);
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Determine filter type
                if (['apartment', 'house'].includes(filter)) {
                    this.activeFilters.type = filter;
                    this.activeFilters.location = 'all';
                } else if (['jordaan', 'de-pijp', 'oud-zuid'].includes(filter)) {
                    this.activeFilters.type = 'all';
                    this.activeFilters.location = filter;
                } else {
                    this.activeFilters.type = 'all';
                    this.activeFilters.location = 'all';
                }
                
                this.applyFilters();
            });
        });
    }
    
    applyFilters() {
        this.caseStudies.forEach(card => {
            const type = card.dataset.type;
            const location = card.dataset.location;
            
            const typeMatch = this.activeFilters.type === 'all' || this.activeFilters.type === type;
            const locationMatch = this.activeFilters.location === 'all' || this.activeFilters.location === location;
            
            if (typeMatch && locationMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Show/hide load more button based on visible items
        this.updateLoadMoreVisibility();
    }
    
    setupLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (!loadMoreBtn) return;
        
        loadMoreBtn.addEventListener('click', () => {
            this.visibleCaseStudies += 3;
            this.updateCaseStudyVisibility();
        });
    }
    
    updateCaseStudyVisibility() {
        const cards = document.querySelectorAll('.case-study-card:not(.hidden)');
        cards.forEach((card, index) => {
            if (index < this.visibleCaseStudies) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        this.updateLoadMoreVisibility();
    }
    
    updateLoadMoreVisibility() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        const visibleCards = document.querySelectorAll('.case-study-card:not(.hidden)').length;
        
        if (loadMoreBtn) {
            if (this.visibleCaseStudies >= visibleCards) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    }
    
    filterCaseStudies(filterType, value) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        // Update active filters
        if (filterType === 'location') {
            this.activeFilters.location = value;
            this.activeFilters.type = 'all';
            
            // Update button states
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === value) {
                    btn.classList.add('active');
                } else if (['apartment', 'house', 'all'].includes(btn.dataset.filter)) {
                    btn.classList.remove('active');
                }
            });
        }
        
        this.applyFilters();
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
    new SuccessMetrics();
    console.log('🚀 Success Metrics section loaded successfully!');
});

// Export for potential use in other modules
window.SuccessMetrics = SuccessMetrics;