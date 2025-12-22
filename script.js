/* ==========================================
   m2ea Labs - Main JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initSmoothScroll();
    initMobileMenu();
    initContentProtection();
});

/* ==========================================
   Content Protection
   ========================================== */
function initContentProtection() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable copy
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable cut
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable paste
    document.addEventListener('paste', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('drop', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable image dragging
    document.querySelectorAll('img').forEach(function(img) {
        img.setAttribute('draggable', 'false');
    });

    // Disable keyboard shortcuts (Ctrl+C, Ctrl+U, Ctrl+S, F12, etc.)
    document.addEventListener('keydown', function(e) {
        // Ctrl key combinations
        if (e.ctrlKey) {
            // Ctrl+C (copy), Ctrl+X (cut), Ctrl+V (paste)
            if (e.key === 'c' || e.key === 'C' || 
                e.key === 'x' || e.key === 'X' || 
                e.key === 'v' || e.key === 'V') {
                e.preventDefault();
                return false;
            }
            // Ctrl+U (view source)
            if (e.key === 'u' || e.key === 'U') {
                e.preventDefault();
                return false;
            }
            // Ctrl+S (save page)
            if (e.key === 's' || e.key === 'S') {
                e.preventDefault();
                return false;
            }
            // Ctrl+A (select all)
            if (e.key === 'a' || e.key === 'A') {
                e.preventDefault();
                return false;
            }
            // Ctrl+P (print)
            if (e.key === 'p' || e.key === 'P') {
                e.preventDefault();
                return false;
            }
            // Ctrl+Shift+I (developer tools)
            if (e.shiftKey && (e.key === 'i' || e.key === 'I')) {
                e.preventDefault();
                return false;
            }
            // Ctrl+Shift+J (console)
            if (e.shiftKey && (e.key === 'j' || e.key === 'J')) {
                e.preventDefault();
                return false;
            }
            // Ctrl+Shift+C (inspect element)
            if (e.shiftKey && (e.key === 'c' || e.key === 'C')) {
                e.preventDefault();
                return false;
            }
        }

        // F12 (developer tools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // PrintScreen
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            return false;
        }
    });

    // Additional CSS-based protection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
}

/* ==========================================
   Navbar Scroll Effect
   ========================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Check initial state
}

/* ==========================================
   Scroll Animations (Intersection Observer)
   ========================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/* ==========================================
   Smooth Scrolling for Anchor Links
   ========================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if target doesn't exist
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

/* ==========================================
   Mobile Menu
   ========================================== */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', function() {
        const isOpen = navLinks.classList.contains('mobile-open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

function openMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!navLinks || !menuBtn) return;

    navLinks.classList.add('mobile-open');
    menuBtn.classList.add('active');
    
    // Add mobile menu styles dynamically
    navLinks.style.cssText = `
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(250, 249, 247, 0.98);
        backdrop-filter: blur(20px);
        padding: 2rem;
        gap: 1.5rem;
        border-bottom: 1px solid var(--color-border);
        animation: fadeDown 0.3s ease;
    `;

    // Add animation keyframes if not already added
    if (!document.getElementById('mobile-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-styles';
        style.textContent = `
            @keyframes fadeDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!navLinks || !menuBtn) return;

    navLinks.classList.remove('mobile-open');
    menuBtn.classList.remove('active');
    
    // Reset styles for desktop
    if (window.innerWidth > 768) {
        navLinks.style.cssText = '';
    } else {
        navLinks.style.cssText = 'display: none;';
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;

    if (window.innerWidth > 768) {
        navLinks.style.cssText = '';
        navLinks.classList.remove('mobile-open');
    } else if (!navLinks.classList.contains('mobile-open')) {
        navLinks.style.cssText = 'display: none;';
    }
});

/* ==========================================
   Utility Functions
   ========================================== */

// Debounce function for performance
function debounce(func, wait = 10) {
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
