// ========================================
// CALL MODAL FUNCTIONS
// ========================================

function openCallModal() {
    const modal = document.getElementById('callModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCallModal() {
    const modal = document.getElementById('callModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCallModal();
        closeAutoPopup();
    }
});

// ========================================
// AUTO POPUP (5-SECOND DELAY)
// ========================================

function openAutoPopup() {
    const popup = document.getElementById('autoPopup');
    if (popup && !sessionStorage.getItem('autoPopupShown')) {
        popup.classList.add('active');
        sessionStorage.setItem('autoPopupShown', 'true');
    }
}

function closeAutoPopup() {
    const popup = document.getElementById('autoPopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Show popup after 5 seconds
window.addEventListener('load', () => {
    setTimeout(() => {
        openAutoPopup();
    }, 5000);
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && mobileToggle) {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Toggle mobile menu styles
        if (navMenu.classList.contains('active')) {
            navMenu.style.display = 'flex';
            navMenu.style.position = 'fixed';
            navMenu.style.top = '80px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(11, 11, 11, 0.98)';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '2rem';
            navMenu.style.backdropFilter = 'blur(10px)';
            navMenu.style.borderTop = '1px solid rgba(255, 106, 0, 0.2)';
            navMenu.style.zIndex = '999';
        } else {
            navMenu.style.display = '';
            navMenu.style.position = '';
            navMenu.style.top = '';
            navMenu.style.left = '';
            navMenu.style.right = '';
            navMenu.style.background = '';
            navMenu.style.flexDirection = '';
            navMenu.style.padding = '';
            navMenu.style.backdropFilter = '';
            navMenu.style.borderTop = '';
        }
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements on page load
function initScrollAnimations() {
    // Statement items
    const statementItems = document.querySelectorAll('.statement-item');
    statementItems.forEach(item => {
        observer.observe(item);
    });
    
    // Assistance cards
    const assistanceCards = document.querySelectorAll('.assistance-card');
    assistanceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Why items
    const whyItems = document.querySelectorAll('.why-item');
    whyItems.forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });
    
    // Grid items
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        observer.observe(item);
    });
    
    // Any other fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in:not(.statement-block):not(.why-item)');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href !== '#') {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

let lastScroll = 0;
const navbar = document.querySelector('.nav-bar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// ACCORDION FUNCTIONALITY (FOR FAQ PAGE)
// ========================================

function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            const accordionBody = accordionItem.querySelector('.accordion-body');
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const body = item.querySelector('.accordion-body');
                if (body) {
                    body.style.maxHeight = null;
                }
            });
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
                if (accordionBody) {
                    accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
                }
            }
        });
    });
}

// ========================================
// FORM VALIDATION (FOR CONTACT PAGE)
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            // Reset errors
            document.querySelectorAll('.error-message').forEach(error => {
                error.remove();
            });
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate phone
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (phone.value.trim() && !phoneRegex.test(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Please enter a message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#E53935';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    
    input.style.borderColor = '#E53935';
    input.parentElement.appendChild(errorDiv);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #FF6A00, #E53935);
        color: white;
        padding: 1.5rem 3rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(255, 106, 0, 0.5);
        z-index: 10000;
        animation: slideDown 0.3s ease;
    `;
    successDiv.textContent = 'Thank you! We\'ll get back to you soon.';
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 3000);
}

// ========================================
// PHONE NUMBER CLICK TRACKING
// ========================================

function initPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Analytics tracking would go here
            console.log('Phone call initiated');
        });
    });
}

// ========================================
// CHATBOT UI (PLACEHOLDER)
// ========================================

function initChatbot() {
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotWidget = document.getElementById('chatbotWidget');
    
    if (chatbotBtn && chatbotWidget) {
        chatbotBtn.addEventListener('click', () => {
            chatbotWidget.classList.toggle('active');
        });
        
        const closeChat = chatbotWidget.querySelector('.close-chat');
        if (closeChat) {
            closeChat.addEventListener('click', () => {
                chatbotWidget.classList.remove('active');
            });
        }
    }
}

// ========================================
// LAZY LOADING IMAGES
// ========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// COPY TO CLIPBOARD (FOR PHONE NUMBERS)
// ========================================

function initCopyButtons() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.dataset.copy;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = '#10B981';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 2000);
            });
        });
    });
}

// ========================================
// INITIALIZE ALL
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initAccordions();
    initContactForm();
    initPhoneTracking();
    initChatbot();
    initLazyLoading();
    initCopyButtons();
    
    // Add slideDown and slideUp animations to document
    if (!document.querySelector('#dynamicAnimations')) {
        const style = document.createElement('style');
        style.id = 'dynamicAnimations';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get current year for copyright
function updateCopyrightYear() {
    const copyrightElement = document.querySelector('.footer-copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} Wifi Provider In Your Area. All rights reserved.`;
    }
}

updateCopyrightYear();
