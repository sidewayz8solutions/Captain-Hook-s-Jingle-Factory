// Captain Hook's Jingle Factory - JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading overlay after page loads
    setTimeout(() => {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
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
                const soundwave = this.closest('.audio-player').querySelectorAll('.soundwave-bar');
                soundbarsBars.forEach(bar => {
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
    const floatingHooks = document.querySelectorAll('.floating-hook');
    
    if (heroSection && captain) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                captain.style.transform = `translateY(${rate * 0.3}px)`;
                
                floatingHooks.forEach((hook, index) => {
                    const hookRate = rate * (0.1 + (index * 0.10));
                    hook.style.transform = `translateY(${hookRate}px) rotate(${scrolled * 0.06}deg)`;
                });
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
    const hangingHooksContainer = document.createElement('div');
    hangingHooksContainer.classList.add('hanging-hooks-container');
    let hooksHTML = '';
    for (let i = 1; i <= 7; i++) {
        hooksHTML += `
            <div class="hanging-hook hanging-hook-top-${i}" data-delay="${i * 150}">
                <div class="hook-chain"></div>
                <img src="hook.png" alt="Hook" class="top-hook" />
            </div>`;
    }
    hangingHooksContainer.innerHTML = hooksHTML;
    document.body.appendChild(hangingHooksContainer);
    
    let hooksShown = false;
    window.addEventListener('scroll', function() {
        const heroSection = document.getElementById('home');
        if (!heroSection) return;

        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight * 0.3;
        
        if (scrollPosition > heroBottom && !hooksShown) {
            hooksShown = true;
            const hooks = document.querySelectorAll('.hanging-hook');
            hooks.forEach(hook => {
                setTimeout(() => hook.classList.add('hook-dropped'), parseInt(hook.dataset.delay));
            });
        } else if (scrollPosition <= heroBottom && hooksShown) {
            hooksShown = false;
            document.querySelectorAll('.hanging-hook').forEach(hook => {
                hook.classList.remove('hook-dropped');
            });
        }
    });
    
    // Enhanced treasure chest contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const contactContent = contactSection.querySelector('.max-w-5xl');
        if (contactContent) {
            const originalFormHTML = `
                <div class="grid md:grid-cols-2 gap-12">
                    <div class="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-yellow-400/20">
                        <h3 class="text-2xl font-cinzel text-yellow-400 mb-6">Send a Message</h3>
                        <form class="space-y-6">
                            <div><input type="text" placeholder="Your Name" class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors" /></div>
                            <div><input type="email" placeholder="Your Email" class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors" /></div>
                            <div><textarea placeholder="Your Message" rows="5" class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"></textarea></div>
                            <button type="submit" class="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-cinzel font-bold uppercase rounded-full hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300">Send Message</button>
                        </form>
                    </div>
                    <div class="space-y-8">
                        <div>
                            <h3 class="text-2xl font-cinzel text-purple-400 mb-6">Contact Info</h3>
                            <div class="space-y-4">
                                <div class="flex items-center space-x-4"><div class="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center"><span class="text-yellow-400 text-2xl">📧</span></div><div><div class="text-sm text-gray-400">Email Port</div><div class="text-yellow-400">ahoy@captainhooksjingles.com</div></div></div>
                                <div class="flex items-center space-x-4"><div class="w-12 h-12 bg-purple-400/10 rounded-full flex items-center justify-center"><span class="text-purple-400 text-2xl">📞</span></div><div><div class="text-sm text-gray-400">Signal Flags</div><div class="text-purple-400">+1 (504) 555-HOOK</div></div></div>
                                <div class="flex items-center space-x-4"><div class="w-12 h-12 bg-green-400/10 rounded-full flex items-center justify-center"><span class="text-green-400 text-2xl">📍</span></div><div><div class="text-sm text-gray-400">Harbor Location</div><div class="text-green-400">French Quarter, New Orleans, LA</div></div></div>
                            </div>
                        </div>
                    </div>
                </div>`;
            
            const treasureChestWrapper = document.createElement('div');
            treasureChestWrapper.classList.add('treasure-chest-wrapper');
            treasureChestWrapper.innerHTML = `
                <div class="treasure-chest-container">
                    <div class="treasure-chest" id="treasureChest">
                        <div class="chest-lid"><div class="chest-lock"></div></div>
                        <div class="chest-base"></div>
                    </div>
                    <div class="chest-label">
                        <span class="text-2xl font-pirata text-yellow-400 glow-text">Click the Chest to Send a Message!</span>
                    </div>
                </div>
                <div class="contact-form-wrapper" id="contactFormWrapper" style="display: none;">${originalFormHTML}</div>`;
            
            contactContent.innerHTML = '';
            contactContent.appendChild(treasureChestWrapper);
            
            const treasureChest = document.getElementById('treasureChest');
            const contactFormWrapper = document.getElementById('contactFormWrapper');
            const chestLabel = document.querySelector('.chest-label');
            
            if (treasureChest && contactFormWrapper && chestLabel) {
                treasureChest.addEventListener('click', function() {
                    this.classList.toggle('open');
                    if (this.classList.contains('open')) {
                        setTimeout(() => {
                            contactFormWrapper.style.display = 'block';
                            contactFormWrapper.classList.add('form-revealed');
                            chestLabel.style.opacity = '0';
                        }, 600);
                        createSparkles(this);
                    } else {
                        contactFormWrapper.classList.remove('form-revealed');
                        setTimeout(() => {
                            contactFormWrapper.style.display = 'none';
                            chestLabel.style.opacity = '1';
                        }, 300);
                    }
                });
            }
        }
    }
    
    function createSparkles(element) {
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random()}s`;
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }
    }

    // Create explosion of hooks and music notes
    function createTreasureExplosion(chest) {
        const container = document.getElementById('chestSparkles');
        
        // Create hooks and music notes
        for (let i = 0; i < 12; i++) {
            const isHook = i % 2 === 0;
            const element = document.createElement('div');
            element.className = isHook ? 'treasure-hook' : 'treasure-note';
            
            if (isHook) {
                const hookImg = document.createElement('img');
                hookImg.src = 'hook.png';
                hookImg.alt = 'Golden Hook';
                hookImg.style.width = '30px';
                hookImg.style.height = '35px';
                hookImg.style.filter = 'sepia(100%) saturate(200%) hue-rotate(30deg) brightness(1.5) drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))';
                element.appendChild(hookImg);
            } else {
                element.innerHTML = '♪';
            }
            
            // Random positioning
            const angle = (i / 12) * 360 + Math.random() * 30;
            const distance = 100 + Math.random() * 50;
            const x = Math.cos(angle * Math.PI / 180) * distance;
            const y = Math.sin(angle * Math.PI / 180) * distance;
            
            element.style.setProperty('--x', `${x}px`);
            element.style.setProperty('--y', `${y}px`);
            element.style.animationDelay = `${i * 0.1}s`;
            
            container.appendChild(element);
            
            // Remove after animation
            setTimeout(() => element.remove(), 2000);
        }
    }

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

// Add treasure chest at bottom of page
function createBottomTreasureChest() {
    const treasureSection = document.createElement('section');
    treasureSection.className = 'treasure-section py-20 bg-gradient-to-b from-purple-900 to-purple-950 relative overflow-hidden';
    treasureSection.innerHTML = `
        <div class="container mx-auto text-center">
            <div class="treasure-chest-bottom" id="bottomTreasureChest">
                <div class="chest-lid-bottom">
                    <div class="chest-lock-bottom"></div>
                </div>
                <div class="chest-base-bottom"></div>
                <div class="chest-sparkles" id="chestSparkles"></div>
            </div>
            <div class="treasure-text mt-8 opacity-0" id="treasureText">
                <h3 class="text-4xl font-pirata text-yellow-400 glow-text">A Treasure Trove of Hooks</h3>
            </div>
        </div>
    `;
    
    document.body.appendChild(treasureSection);
    
    // Add click handler
    const chest = document.getElementById('bottomTreasureChest');
    const text = document.getElementById('treasureText');
    
    chest.addEventListener('click', function() {
        this.classList.add('opened');
        createTreasureExplosion(this);
        
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(-20px)';
        }, 800);
    });
}

// Create explosion of hooks and music notes
function createTreasureExplosion(chest) {
    const container = document.getElementById('chestSparkles');
    
    // Create hooks and music notes
    for (let i = 0; i < 12; i++) {
        const isHook = i % 2 === 0;
        const element = document.createElement('div');
        element.className = isHook ? 'treasure-hook' : 'treasure-note';
        
        if (isHook) {
            const hookImg = document.createElement('img');
            hookImg.src = 'hook.png';
            hookImg.alt = 'Golden Hook';
            hookImg.style.width = '30px';
            hookImg.style.height = '35px';
            hookImg.style.filter = 'sepia(100%) saturate(200%) hue-rotate(30deg) brightness(1.5) drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))';
            element.appendChild(hookImg);
        } else {
            element.innerHTML = '♪';
        }
        
        // Random positioning
        const angle = (i / 12) * 360 + Math.random() * 30;
        const distance = 100 + Math.random() * 50;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        element.style.setProperty('--x', `${x}px`);
        element.style.setProperty('--y', `${y}px`);
        element.style.animationDelay = `${i * 0.1}s`;
        
        container.appendChild(element);
        
        // Remove after animation
        setTimeout(() => element.remove(), 2000);
    }
}

// Initialize bottom treasure chest
document.addEventListener('DOMContentLoaded', createBottomTreasureChest);
