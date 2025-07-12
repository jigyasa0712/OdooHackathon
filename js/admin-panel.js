document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const navTabs = document.querySelectorAll('.nav-tab');
    const contentSections = document.querySelectorAll('.content-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and sections
            navTabs.forEach(t => t.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            this.classList.add('active');
            document.getElementById(targetTab + '-section').classList.add('active');
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const activeSection = document.querySelector('.content-section.active');
        const items = activeSection.querySelectorAll('.user-item, .order-item, .listing-item');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Visibility toggle functionality
    const visibilityToggle = document.getElementById('visibilityToggle');
    let isVisible = true;
    
    visibilityToggle.addEventListener('click', function() {
        const contentContainer = document.querySelector('.content-container');
        
        if (isVisible) {
            contentContainer.style.display = 'none';
            this.style.opacity = '0.5';
            isVisible = false;
        } else {
            contentContainer.style.display = 'block';
            this.style.opacity = '1';
            isVisible = true;
        }
    });
    
    // Action button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('action-btn')) {
            const action = e.target.textContent;
            const itemType = e.target.closest('.user-item') ? 'user' : 
                           e.target.closest('.order-item') ? 'order' : 'listing';
            
            // Add your custom action logic here
            console.log(`${action} clicked for ${itemType}`);
            
            // Example: Show confirmation for certain actions
            if (action.toLowerCase().includes('delete') || action.toLowerCase().includes('archive')) {
                if (confirm(`Are you sure you want to ${action.toLowerCase()} this ${itemType}?`)) {
                    // Perform the action
                    e.target.closest(`.${itemType}-item`).style.opacity = '0.5';
                    setTimeout(() => {
                        e.target.closest(`.${itemType}-item`).remove();
                    }, 300);
                }
            }
        }
    });
    
    // Add smooth transitions for dynamic content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList.contains('user-item')) {
                        node.style.opacity = '0';
                        node.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            node.style.transition = 'all 0.3s ease';
                            node.style.opacity = '1';
                            node.style.transform = 'translateY(0)';
                        }, 100);
                    }
                });
            }
        });
    });
    
    observer.observe(document.querySelector('.user-list'), {
        childList: true
    });
});

// Utility functions for external integration
window.AdminPanel = {
    // Add new user to the list
    addUser: function(userData) {
        const userList = document.querySelector('.user-list');
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
            <div class="user-avatar">
                <img src="${userData.avatar || '/placeholder.svg?height=60&width=60'}" alt="User Avatar">
            </div>
            <div class="user-details">
                <h3>${userData.name}</h3>
                <p>${userData.email}</p>
                <span class="user-status ${userData.status}">${userData.status}</span>
            </div>
            <div class="user-actions">
                <button class="action-btn primary">Actions 1</button>
                <button class="action-btn secondary">Action 2</button>
            </div>
        `;
        userList.appendChild(userItem);
    },
    
    // Switch to specific tab
    switchTab: function(tabName) {
        const tab = document.querySelector(`[data-tab="${tabName}"]`);
        if (tab) {
            tab.click();
        }
    },
    
    // Update search results
    search: function(term) {
        const searchInput = document.querySelector('.search-input');
        searchInput.value = term;
        searchInput.dispatchEvent(new Event('input'));
    }
};