// Captain Hook's Jingle Factory - JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading overlay after page loads
    setTimeout(() => {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
        // Removed pop-in and glow burst animations per user request
    }, 1500);

    // Navigation scroll effect
    const mainNav = document.getElementById('mainNav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }

        // Hide/show nav on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            mainNav.style.transform = 'translateY(-100%)';
        } else {
            mainNav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;

        // Back to top button visibility
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (currentScrollY > 300) {
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            } else {
                backToTop.classList.add('opacity-0', 'invisible');
                backToTop.classList.remove('opacity-100', 'visible');
            }
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            
            if (menuOpen) {
                mobileMenu.classList.add('mobile-menu-open');
                mobileMenuBtn.classList.add('menu-open');
            } else {
                mobileMenu.classList.remove('mobile-menu-open');
                mobileMenuBtn.classList.remove('menu-open');
            }
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 120;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (menuOpen) {
                    mobileMenu.classList.remove('mobile-menu-open');
                    mobileMenuBtn.classList.remove('menu-open');
                    menuOpen = false;
                }
            }
        });
    });

    // Back to top button functionality
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Audio player mock functionality
    const playButtons = document.querySelectorAll('.audio-player button');
    playButtons.forEach(button => {
        let playing = false;
        
        button.addEventListener('click', function() {
            playing = !playing;
            
            if (playing) {
                // Change play to pause icon
                this.innerHTML = `
                    <svg class="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                    </svg>
                `;
                
                // Animate soundwave bars
                const soundwaveBars = this.closest('.audio-player').querySelectorAll('.soundwave-bar');
                soundwaveBars.forEach(bar => {
                    bar.style.animationPlayState = 'running';
                });
            } else {
                // Change pause to play icon
                this.innerHTML = `
                    <svg class="w-6 h-6 text-gray-900" fill="currentColor" viewBox="2 8 24 32">
                        <path d="M8 5v14l11-7z"></path>
                    </svg>
                `;
                
                // Pause soundwave animation
                const soundwaveBars = this.closest('.audio-player').querySelectorAll('.soundwave-bar');
                soundwaveBars.forEach(bar => {
                    bar.style.animationPlayState = 'paused';
                });
            }
        });
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            
            if (valid) {
                // Show success message
                const button = this.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.textContent = 'Message Sent!';
                button.classList.add('bg-green-500');
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('bg-green-500');
                }, 3000);
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.getElementById('home');
    const captain = document.querySelector('.captain-image');
    
    if (heroSection && captain) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.3;
            if (scrolled < window.innerHeight) {
                captain.style.transform = `translateY(${rate * 0.3}px)`;
            }
        });
    }

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize soundwave bars animation state
    const soundwaveBars = document.querySelectorAll('.soundwave-bar');
    soundwaveBars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Press 'T' to go to top
        if (e.key === 't' || e.key === 'T') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Press 'M' to toggle mobile menu
        if ((e.key === 'm' || e.key === 'M') && mobileMenuBtn) {
            mobileMenuBtn.click();
        }
    });

    // Add loading animation to buttons
    const ctaButtons = document.querySelectorAll('button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // Initialize AOS-like animations
    const initAnimations = () => {
        const elements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    // Run on scroll and resize
    window.addEventListener('scroll', initAnimations);
    window.addEventListener('resize', initAnimations);
    
    // Initial check
    initAnimations();

    // Enhanced features: Hanging hooks animation
    // Prefer the user's absolute image path for all hanging hooks, with safe fallbacks
    const HANGING_HOOK_SOURCES = [
        'file:///Users/sidewayz8/Desktop/Captn/public/hook.png',
        'public/hook.png',
        './public/hook.png',
        'hook.png'
    ];
    // Create the container but keep it visually collapsed at the very top; we'll only drop hooks after hero is off-screen
    const hangingHooksContainer = document.createElement('div');
    hangingHooksContainer.classList.add('hanging-hooks-container');
    document.body.appendChild(hangingHooksContainer);
    
    // Build hooks only when needed (after hero)
    function ensureHooksBuilt() {
        if (hangingHooksContainer.childElementCount > 0) return;
        let hooksHTML = '';
        for (let i = 1; i <= 7; i++) {
            hooksHTML += `
                <div class="hanging-hook hanging-hook-top-${i}" data-delay="${i * 150}">
                    <div class="hook-chain"></div>
                    <img src="public/hook.png" alt="Hook" class="top-hook" />
                </div>`;
        }
        hangingHooksContainer.innerHTML = hooksHTML;
        document.querySelectorAll('.hanging-hooks-container .top-hook').forEach(img => {
            setHookSrcWithFallback(img, [...HANGING_HOOK_SOURCES]);
        });
    }
    // Ensure all hanging hook images point to the requested asset path (with fallbacks)
    const setHookSrcWithFallback = (img, sources) => {
        if (!sources || sources.length === 0) return;
        const [first, ...rest] = sources;
        const testImg = new Image();
        testImg.onload = () => { img.src = first; };
        testImg.onerror = () => setHookSrcWithFallback(img, rest);
        testImg.src = first;
    };
    let hooksShown = false;
    window.addEventListener('scroll', function() {
        const heroSection = document.getElementById('home');
        if (!heroSection) return;

        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight * 0.3; // trigger earlier for better visibility

        if (scrollPosition > heroBottom && !hooksShown) {
            hooksShown = true;
            ensureHooksBuilt();
            const hooks = document.querySelectorAll('.hanging-hook');
            hooks.forEach((hook, index) => {
                // Stagger the animation timing for each hook
                const delay = parseInt(hook.dataset.delay) + (index * 200);
                setTimeout(() => hook.classList.add('hook-dropped'), delay);
            });
        } else if (scrollPosition <= heroBottom - 100 && hooksShown) { // hide earlier
            hooksShown = false;
            document.querySelectorAll('.hanging-hook').forEach(hook => {
                hook.classList.remove('hook-dropped');
            });
        }
    });
    

    // Message in a Bottle functionality
    function initMessageInBottle() {
        const messageTextarea = document.getElementById('messageTextarea');
        const charCount = document.getElementById('charCount');
        const sendMessageBtn = document.getElementById('sendMessageBtn');

        if (messageTextarea && charCount) {
            // Character counter
            messageTextarea.addEventListener('input', function() {
                const remaining = 500 - this.value.length;
                charCount.textContent = `${this.value.length}/500`;

                if (remaining < 50) {
                    charCount.style.color = remaining < 0 ? '#ef4444' : '#f59e0b';
                } else {
                    charCount.style.color = '#9ca3af';
                }
            });

            // Initial count
            charCount.textContent = '0/500';
        }

        if (sendMessageBtn) {
            sendMessageBtn.addEventListener('click', function() {
                const message = messageTextarea ? messageTextarea.value.trim() : '';

                if (!message) {
                    alert('⚓ Ahoy! Please write a message before sending!');
                    return;
                }

                if (message.length > 500) {
                    alert('⚓ Shiver me timbers! Your message is too long! Please keep it under 500 characters.');
                    return;
                }

                // Show success message
                const originalText = this.textContent;
                this.textContent = 'Message Sent!';
                this.classList.add('bg-green-500');
                this.disabled = true;

                // Clear the message
                if (messageTextarea) {
                    messageTextarea.value = '';
                    charCount.textContent = '0/500';
                    charCount.style.color = '#9ca3af';
                }

                // Reset button after 3 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('bg-green-500');
                    this.disabled = false;
                }, 3000);

                // Log the message (in a real app, this would be sent to a server)
                console.log('📧 Message in a bottle sent:', message);
            });
        }
    }

    // Initialize message in a bottle functionality
    initMessageInBottle();

    // (Removed duplicate createTreasureExplosion - global version is used)

    console.log('⚓ Captain Hook\'s Jingle Factory - All systems ready!');
});

// Utility function for throttling
function throttle(func, wait) {
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

// Add some pirate Easter eggs
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'shake 0.5s';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('⚓ Ahoy! You\'ve found the secret treasure! Use code PIRATE20 for 20% off your first jingle!');
        }, 500);
    }
});

// CSS for shake animation and loading states
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    button.loading {
        position: relative;
        pointer-events: none;
    }
    
    button.loading::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        margin: auto;
        border: 2px solid transparent;
        border-radius: 50%;
        border-top-color: currentColor;
        animation: spin 0.6s linear infinite;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    @keyframes spin {
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(style);

