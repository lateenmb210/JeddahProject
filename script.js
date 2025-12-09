// ===========================
// Navigation & Smooth Scrolling
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScroll();
    updateActiveNavLink();
});

// Initialize navigation menu toggle for mobile
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scroll function
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize smooth scroll for all navigation links
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll(
        '.landmark-card, .weather-card, .feature-card, .need-card, .audience-card, .stat-card'
    );
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ===========================
// Interactive Elements
// ===========================

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.landmark-card, .weather-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ===========================
// Scroll to Top Button (Optional Enhancement)
// ===========================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.id = 'scrollToTop';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        background-color: #0066cc;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    button.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#0052a3';
        this.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#0066cc';
        this.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ===========================
// Lazy Loading for Images (if needed)
// ===========================

function lazyLoadImages() {
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

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===========================
// Analytics Tracking (Optional)
// ===========================

function trackSectionView(sectionName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'section_view', {
            'section_name': sectionName
        });
    }
}

// Track section views
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            trackSectionView(section.id);
        }
    });
});

// ===========================
// Utility Functions
// ===========================

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('ar-SA', options);
}

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

// Throttle function for performance
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

// ===========================
// Mobile Menu Responsive Behavior
// ===========================

function handleResponsiveMenu() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const navMenu = document.getElementById('navMenu');

    if (mediaQuery.matches) {
        // Mobile view
        navMenu.style.display = 'none';
    } else {
        // Desktop view
        navMenu.style.display = 'flex';
    }
}

window.addEventListener('resize', debounce(handleResponsiveMenu, 250));
document.addEventListener('DOMContentLoaded', handleResponsiveMenu);

// ===========================
// Keyboard Navigation
// ===========================

document.addEventListener('keydown', function(e) {
    // Scroll to sections with keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                smoothScroll('#home');
                break;
            case '2':
                smoothScroll('#about');
                break;
            case '3':
                smoothScroll('#landmarks');
                break;
        }
    }
});

// ===========================
// Print Styles Enhancement
// ===========================

window.addEventListener('beforeprint', function() {
    document.body.style.backgroundColor = 'white';
});

// ===========================
// Accessibility Enhancements
// ===========================

// Add focus visible styles for keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid #0066cc';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// ===========================
// Performance Monitoring
// ===========================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // منع إعادة تحميل الصفحة

        // التحقق البسيط من الحقول
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !phone || !email || !message) {
            contactStatus.style.color = '#b91c1c';
            contactStatus.textContent = 'يرجى تعبئة جميع الحقول قبل الإرسال.';
            return;
        }

        // هنا يمكن لاحقًا ربطه ببريد/خدمة خارجية لو احتجتِ
        contactStatus.style.color = '#15803d';
        contactStatus.textContent = 'تم إرسال رسالتك بنجاح! شكرًا لتواصلك معنا 🌟';

        contactForm.reset();
    });
}


console.log('اكتشف جدة - Website Loaded Successfully! 🎉');
