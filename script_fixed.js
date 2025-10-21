// Captain Hook's Jingle Factory - JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Intro video overlay logic: play with audio, no button
    const introOverlay = document.getElementById('intro-overlay');
    const introVideo = document.getElementById('intro-video');

    if (introOverlay && introVideo) {
        const hideIntro = () => {
            introOverlay.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => { try { introOverlay.remove(); } catch (e) {} }, 800);
        };

        introVideo.addEventListener('ended', hideIntro);
        introVideo.addEventListener('loadedmetadata', () => {
            const dur = introVideo.duration;
            setTimeout(hideIntro, (isFinite(dur) && dur > 0) ? Math.ceil(dur * 1000) + 200 : 10000);
        });

        const resumeWithAudio = () => {
            introVideo.muted = false;
            introVideo.play().catch(() => {});
            window.removeEventListener('pointerdown', resumeWithAudio);
            window.removeEventListener('touchstart', resumeWithAudio);
            window.removeEventListener('click', resumeWithAudio);
            window.removeEventListener('keydown', resumeWithAudio);
        };

        const tryPlayWithSound = () => {
            introVideo.muted = false;
            introVideo.play().catch(() => {
                // Autoplay with audio blocked: wait for any user interaction (no button)
                window.addEventListener('pointerdown', resumeWithAudio, { once: true });
                window.addEventListener('touchstart', resumeWithAudio, { once: true });
                window.addEventListener('click', resumeWithAudio, { once: true });
                window.addEventListener('keydown', resumeWithAudio, { once: true });
            });
        };

        if (introVideo.readyState >= 2) { tryPlayWithSound(); }
        else { introVideo.addEventListener('canplay', tryPlayWithSound, { once: true }); }
    }

    // (Deprecated) legacy overlay variables are left unused
    const loadingOverlay = document.querySelector('.loading-overlay');
    const fairyContainer = document.querySelector('.fairy-container');
    const dustContainer = document.querySelector('.fairy-dust-container');

    // Old dust logic no-ops if elements are absent
    if (fairyContainer && dustContainer) {
        const createFairyDust = () => {
            const rect = fairyContainer.getBoundingClientRect();
            const dust = document.createElement('div');
            dust.className = 'fairy-dust';
            dust.style.left = rect.left + rect.width / 2 + 'px';
            dust.style.top = rect.top + rect.height / 2 + 'px';
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            dust.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            dustContainer.appendChild(dust);
            setTimeout(() => dust.remove(), 2000);
        };
        const dustInterval = setInterval(createFairyDust, 40);
        setTimeout(() => { clearInterval(dustInterval); if (loadingOverlay) loadingOverlay.classList.add('hidden'); }, 4500);
    }
    // Background music with persistent golden hook mute button
    (function setupBackgroundMusic() {
        const MUSIC_SRC = 'public/pirate_theme.mp3'; // TODO: add this file to public/
        const LS_MUTED = 'bgMusicMuted';
        const LS_TIME = 'bgMusicTime';
        const VOLUME = 0.22; // not too loud

        function createOrGetAudio() {
            let audio = document.getElementById('bg-music');
            if (!audio) {
                audio = document.createElement('audio');
                audio.id = 'bg-music';
                audio.src = MUSIC_SRC;
                audio.loop = true;
                audio.preload = 'auto';
                audio.crossOrigin = 'anonymous';
                document.body.appendChild(audio);
            }
            audio.volume = VOLUME;
            return audio;
        }

        function createOrGetButton() {
            let btn = document.getElementById('bg-mute-btn');
            if (!btn) {
                btn = document.createElement('button');
                btn.id = 'bg-mute-btn';
                btn.type = 'button';
                btn.title = 'Toggle music';
                btn.className = 'fixed bottom-4 right-4 z-[9980] w-14 h-14 rounded-full shadow-xl ring-2 ring-yellow-300 bg-gradient-to-br from-yellow-300 to-amber-500 hover:scale-105 transition-transform duration-200 flex items-center justify-center';
                const img = document.createElement('img');
                img.src = 'public/hook.png';
                img.alt = 'Mute/Unmute';
                img.className = 'w-8 h-8 drop-shadow-lg';
                img.onerror = () => { img.src = 'hook.png'; };
                btn.appendChild(img);
                document.body.appendChild(btn);
            }
            return btn;
        }

        function setMutedUI(btn, muted) {
            btn.style.opacity = muted ? '0.6' : '1';
            btn.style.filter = muted ? 'grayscale(20%)' : 'none';
        }

        function startPlayback(audio) {
            const muted = localStorage.getItem(LS_MUTED) === 'true';
            audio.muted = muted;

            const savedTime = parseFloat(localStorage.getItem(LS_TIME) || '0');
            const setTime = () => {
                if (!isNaN(savedTime) && isFinite(savedTime) && audio.duration && isFinite(audio.duration) && audio.duration > 0) {
                    audio.currentTime = savedTime % audio.duration;
                }
            };
            if (audio.readyState >= 1) setTime(); else audio.addEventListener('loadedmetadata', setTime, { once: true });

            const tryPlay = () => audio.play().catch(() => {
                // Autoplay with audio may be blocked until interaction
                const resume = () => { audio.muted = (localStorage.getItem(LS_MUTED) === 'true'); audio.play().catch(()=>{}); cleanup(); };
                const cleanup = () => {
                    window.removeEventListener('pointerdown', resume);
                    window.removeEventListener('touchstart', resume);
                    window.removeEventListener('click', resume);
                    window.removeEventListener('keydown', resume);
                };
                window.addEventListener('pointerdown', resume, { once: true });
                window.addEventListener('touchstart', resume, { once: true });
                window.addEventListener('click', resume, { once: true });
                window.addEventListener('keydown', resume, { once: true });
            });

            tryPlay();

            // Persist playback time periodically
            setInterval(() => {
                try { localStorage.setItem(LS_TIME, String(audio.currentTime || 0)); } catch {}
            }, 4000);
        }

        function initBgMusic() {
            const audio = createOrGetAudio();
            const btn = createOrGetButton();
            setMutedUI(btn, localStorage.getItem(LS_MUTED) === 'true');

            btn.addEventListener('click', () => {
                const newMuted = !(localStorage.getItem(LS_MUTED) === 'true');
                localStorage.setItem(LS_MUTED, String(newMuted));
                audio.muted = newMuted;
                if (!newMuted) { audio.play().catch(()=>{}); }
                setMutedUI(btn, newMuted);
            });

            startPlayback(audio);

            // If audio fails to load, dim the button
            audio.addEventListener('error', () => setMutedUI(btn, true));
        }

        // Delay start if intro overlay is present (to avoid audio clash)
        if (document.getElementById('intro-overlay')) {
            const observer = new MutationObserver(() => {
                if (!document.getElementById('intro-overlay')) {
                    observer.disconnect();
                    initBgMusic();
                }
            });
            observer.observe(document.body, { childList: true });
        } else {
            initBgMusic();
        }
    })();


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
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuOpen = !menuOpen;

            if (menuOpen) {
                mobileMenu.classList.add('mobile-menu-open');
                mobileMenuBtn.classList.add('menu-open');
            } else {
                mobileMenu.classList.remove('mobile-menu-open');
                mobileMenuBtn.classList.remove('menu-open');
            }
        });

        // Close mobile menu when clicking on navigation links
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuOpen) {
                    mobileMenu.classList.remove('mobile-menu-open');
                    mobileMenuBtn.classList.remove('menu-open');
                    menuOpen = false;
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('mobile-menu-open');
                mobileMenuBtn.classList.remove('menu-open');
                menuOpen = false;
            }
        });
    }

    // Smooth scroll for internal navigation links only (starting with #)
    const internalNavLinks = document.querySelectorAll('a[href^="#"]');
    internalNavLinks.forEach(link => {
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

    // Handle external navigation links (not starting with #)
    const externalNavLinks = document.querySelectorAll('nav a[href]:not([href^="#"]):not([href^="javascript:"])');
    externalNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow normal navigation to proceed
            // Just close mobile menu if open
            if (menuOpen && mobileMenu && mobileMenuBtn) {
                mobileMenu.classList.remove('mobile-menu-open');
                mobileMenuBtn.classList.remove('menu-open');
                menuOpen = false;
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

    // Audio player functionality for colorful buttons
    const audioPlayButtons = document.querySelectorAll('.audio-play-btn');
    let currentlyPlaying = null;

    audioPlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.getAttribute('aria-disabled') === 'true') {
                return;
            }
            const audioIndex = this.getAttribute('data-audio-index');
            const audioPlayer = this.closest('.audio-player');
            const audioElement = audioPlayer ? audioPlayer.querySelector('audio,video') : null;
            const soundwaveBars = audioPlayer ? audioPlayer.querySelectorAll('.soundwave-bar') : [];
            const sourceEl = audioElement ? audioElement.querySelector('source') : null;
            if (!audioElement || !sourceEl || !sourceEl.getAttribute('src')) {
                if (audioPlayer) {
                    audioPlayer.classList.add('ring-2','ring-yellow-400');
                    setTimeout(() => audioPlayer.classList.remove('ring-2','ring-yellow-400'), 800);
                }
                return;
            }

            // Check if audio can be loaded (for Dropbox URL issues)
            if (audioElement.readyState === 0 && audioElement.networkState === 2) {
                // Audio is trying to load but failing - likely a Dropbox URL issue
                if (audioPlayer) {
                    audioPlayer.classList.add('ring-2','ring-red-500');
                    setTimeout(() => audioPlayer.classList.remove('ring-2','ring-red-500'), 1200);

                    // Show a temporary message
                    const title = audioPlayer.querySelector('h3');
                    if (title) {
                        const originalText = title.textContent;
                        title.textContent = '⚠️ Audio Loading Issue - Check Console';
                        setTimeout(() => {
                            title.textContent = originalText;
                        }, 3000);
                    }
                }
                console.warn('Audio loading failed - Dropbox URLs may not work for streaming. Consider hosting audio files locally.');
                return;
            }

            // Stop any currently playing audio
            if (currentlyPlaying && currentlyPlaying !== audioElement) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;

                // Reset the previous button to play icon
                const prevButton = document.querySelector(`[data-audio-index="${currentlyPlaying.dataset.index}"]`);
                if (prevButton) {
                    prevButton.innerHTML = `
                        <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"></path>
                        </svg>
                    `;
                }

                // Stop previous soundwave animation
                const prevSoundwaves = document.querySelectorAll('.soundwave-bar');
                prevSoundwaves.forEach(bar => {
                    bar.style.animationPlayState = 'paused';
                });
            }

            if (audioElement.paused) {
                // Try to play audio (handle promise for autoplay/CORS errors)
                const playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        currentlyPlaying = audioElement;
                        audioElement.dataset.index = audioIndex;
                        // Change to pause icon
                        this.innerHTML = `
                            <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                            </svg>
                        `;
                        // Start soundwave animation
                        soundwaveBars.forEach(bar => {
                            bar.style.animationPlayState = 'running';
                        });
                    }).catch((err) => {
                        // Playback failed; provide subtle feedback and revert icon
                        if (audioPlayer) {
                            audioPlayer.classList.add('ring-2','ring-red-500');
                            setTimeout(() => audioPlayer.classList.remove('ring-2','ring-red-500'), 900);
                        }
                        this.innerHTML = `
                            <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"></path>
                            </svg>
                        `;
                        console.error('Audio play failed:', err);
                    });
                } else {
                    // Fallback (very old browsers)
                    currentlyPlaying = audioElement;
                    audioElement.dataset.index = audioIndex;
                    this.innerHTML = `
                        <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                        </svg>
                    `;
                    soundwaveBars.forEach(bar => {
                        bar.style.animationPlayState = 'running';
                    });
                }

            } else {
                // Pause audio
                audioElement.pause();
                currentlyPlaying = null;

                // Change to play icon
                this.innerHTML = `
                    <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                    </svg>
                `;

                // Stop soundwave animation
                soundwaveBars.forEach(bar => {
                    bar.style.animationPlayState = 'paused';
                });
            }

            // Reset button when audio ends
            audioElement.addEventListener('ended', () => {
                this.innerHTML = `
                    <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                    </svg>
                `;
                soundwaveBars.forEach(bar => {
                    bar.style.animationPlayState = 'paused';
                });
                currentlyPlaying = null;
            });
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

    // Initialize hanging hooks system
    setTimeout(() => {
        initHookSystem();
    }, 500);
});

   // Enhanced Hook System Script
let hooksContainer = null;
let hooksShown = false;
let navVisible = true;
let hookLastScrollY = 0;

// Initialize the hook system
function initHookSystem() {
    console.log('Initializing hook system...');
    createHooksContainer();
    ensureHooksBuilt();
    setupScrollListener();
    console.log('Hook system initialized');
}

// Create the container initially hidden above the screen
function createHooksContainer() {
    if (hooksContainer) return;

    hooksContainer = document.createElement('div');
    hooksContainer.className = 'hanging-hooks-container';

    document.body.appendChild(hooksContainer);
}

// Build hooks immediately but keep container hidden
function ensureHooksBuilt() {
    if (!hooksContainer) return;

    console.log('Building hooks...');

    // Clear existing hooks
    hooksContainer.innerHTML = '';

    // Create 7 hooks with staggered positioning
    const hookPositions = ['10%', '25%', '40%', '50%', '60%', '75%', '90%'];

    hookPositions.forEach((position, index) => {
        const hookElement = document.createElement('div');
        hookElement.className = `hanging-hook hanging-hook-top-${index + 1}`;
        hookElement.style.left = position;

        // Create the hook image element
        const hookImage = document.createElement('img');
        hookImage.className = 'top-hook';
        hookImage.src = 'public/hook.png';
        hookImage.alt = 'Pirate Hook';

        // Fallback to root hook image if public folder fails
        hookImage.onerror = function() {
            console.log('Hook image failed to load from public folder, trying root');
            this.src = 'hook.png';
        };

        hookImage.onload = function() {
            console.log(`Hook ${index + 1} image loaded successfully`);
        };

        hookElement.appendChild(hookImage);
        hooksContainer.appendChild(hookElement);
    });

    console.log('Hooks built:', hooksContainer.children.length);
}

// Setup scroll listener for hook behavior
function setupScrollListener() {
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Handle scroll events to show/hide hooks and nav
function handleScroll() {
    const currentScrollY = window.scrollY;
    const nav = document.querySelector('nav') || document.querySelector('.nav') || document.querySelector('.navbar');
    const hero = document.querySelector('.hero') || document.querySelector('#hero') || document.querySelector('.hero-section');

    // Determine if we've scrolled past hero
    let pastHero = false;
    if (hero) {
        const heroHeight = hero.offsetHeight;
        pastHero = currentScrollY > heroHeight * 0.8; // Trigger at 80% of hero height
    } else {
        pastHero = currentScrollY > 600; // Fallback threshold
    }

    // Determine nav visibility based on scroll direction
    const scrollingDown = currentScrollY > hookLastScrollY;
    const shouldHideNav = scrollingDown && pastHero && currentScrollY > 100;

    // Update nav visibility
    if (nav) {
        if (shouldHideNav && navVisible) {
            nav.style.transform = 'translateY(-100%)';
            navVisible = false;
        } else if (!shouldHideNav && !navVisible) {
            nav.style.transform = 'translateY(0)';
            navVisible = true;
        }
    }

    // Handle hook visibility and positioning
    if (pastHero && !hooksShown) {
        showHooks();
    } else if (!pastHero && hooksShown) {
        hideHooks();
    }

    // Update hook attachment state
    if (hooksShown) {
        updateHookAttachment();
    }

    hookLastScrollY = currentScrollY;
}

// Show hooks with pop-out animation
function showHooks() {
    if (!hooksContainer || hooksShown) return;

    console.log('Showing hooks...');
    hooksShown = true;

    // Add visible state to container
    hooksContainer.classList.add('hooks-visible');

    // Add pop-out animation to each hook with stagger
    const hooks = hooksContainer.querySelectorAll('.hanging-hook');
    console.log('Found hooks to animate:', hooks.length);
    hooks.forEach((hook, index) => {
        setTimeout(() => {
            hook.classList.add('hook-popped-out');
            console.log(`Hook ${index + 1} popped out`);
        }, index * 100); // Staggered appearance
    });
}

// Hide hooks
function hideHooks() {
    if (!hooksContainer || !hooksShown) return;

    hooksShown = false;

    // Remove all hook states
    hooksContainer.classList.remove('hooks-visible', 'hooks-attached');

    const hooks = hooksContainer.querySelectorAll('.hanging-hook');
    hooks.forEach(hook => {
        hook.classList.remove('hook-popped-out');
    });
}

// Update hook attachment to nav
function updateHookAttachment() {
    if (!hooksContainer || !hooksShown) return;

    if (navVisible) {
        // Hooks attach to bottom of nav
        hooksContainer.classList.add('hooks-attached');
        hooksContainer.classList.remove('hooks-visible');
    } else {
        // Hooks dangle from top of screen
        hooksContainer.classList.add('hooks-visible');
        hooksContainer.classList.remove('hooks-attached');
    }
}

// Initialize when DOM is ready (already called above)
// document.addEventListener('DOMContentLoaded', initHookSystem);


// Export functions for external use
window.hookSystem = {
    init: initHookSystem,
    show: showHooks,
    hide: hideHooks,
    rebuild: ensureHooksBuilt
};


    // Message in a Bottle functionality
    function initMessageInBottle() {
        const messageForm = document.getElementById('messageBottleForm');
        const messageTextarea = document.getElementById('messageTextarea');
        const charCount = document.getElementById('charCount');
        const sendMessageBtn = document.getElementById('sendMessageBtn');
        const senderName = document.getElementById('senderName');
        const senderEmail = document.getElementById('senderEmail');

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

        if (messageForm) {
            messageForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const name = senderName ? senderName.value.trim() : '';
                const email = senderEmail ? senderEmail.value.trim() : '';
                const message = messageTextarea ? messageTextarea.value.trim() : '';

                if (!name || !email || !message) {
                    alert('Please fill in all fields before sending your message!');
                    return;
                }

                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address!');
                    return;
                }

                // Add loading state
                sendMessageBtn.classList.add('loading');
                sendMessageBtn.textContent = 'Sending...';

                // Simulate sending (replace with actual form submission)
                setTimeout(() => {
                    alert(`Ahoy ${name}! Your message has been cast into the digital seas! We'll reply to ${email} soon!`);
                    messageForm.reset();
                    charCount.textContent = '0/500';
                    charCount.style.color = '#9ca3af';

                    sendMessageBtn.classList.remove('loading');
                    sendMessageBtn.textContent = 'Send Message';
                }, 2000);
            });
        }
    }

    // Initialize message in bottle functionality
    initMessageInBottle();

    // Initialize contact page functionality if on contact page
    initContactPage();

    // (Removed duplicate createTreasureExplosion - global version is used)

    // Contact page specific functionality
    function initContactPage() {
        // Only run on contact page
        if (!window.location.pathname.includes('contact.html')) return;

        const messageForm = document.getElementById('messageBottleForm');
        const messageTextarea = document.getElementById('messageTextarea');
        const charCount = document.getElementById('charCount');
        const sendMessageBtn = document.getElementById('sendMessageBtn');

        if (messageForm && messageTextarea && charCount && sendMessageBtn) {
            // Character count functionality
            messageTextarea.addEventListener('input', function() {
                const currentLength = this.value.length;
                charCount.textContent = `${currentLength}/500`;

                if (currentLength > 450) {
                    charCount.style.color = '#ef4444'; // red
                } else if (currentLength > 350) {
                    charCount.style.color = '#f59e0b'; // yellow
                } else {
                    charCount.style.color = '#9ca3af'; // gray
                }
            });

            // Form submission
            messageForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const name = document.getElementById('senderName').value.trim();
                const email = document.getElementById('senderEmail').value.trim();
                const message = messageTextarea.value.trim();

                if (!name || !email || !message) {
                    alert('Please fill in all fields before sending your message!');
                    return;
                }

                // Add loading state
                sendMessageBtn.classList.add('loading');
                sendMessageBtn.textContent = 'Sending...';

                // Simulate sending (replace with actual form submission)
                setTimeout(() => {
                    alert(`Ahoy ${name}! Your message has been cast into the digital seas! We'll reply to ${email} soon!`);
                    messageForm.reset();
                    charCount.textContent = '0/500';
                    charCount.style.color = '#9ca3af';

                    sendMessageBtn.classList.remove('loading');
                    sendMessageBtn.textContent = 'Send Message';
                }, 2000);
            });
        }
    }

    console.log('⚓ Captain Hook\'s Jingle Factory - All systems ready!');
;

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
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
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
document.head.appendChild(shakeStyle);

// Mardi Gras Fairy Dust Cursor Trail
class FairyDustCursor {
    constructor() {
        this.container = null;
        this.customCursor = null;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.particles = [];
        this.colors = ['purple', 'gold', 'green'];
        this.sizes = ['small', 'medium', 'large'];
        this.isTouch = 'ontouchstart' in window;

        this.init();
    }

    init() {
        if (this.isTouch) return; // Skip on touch devices

        this.createContainer();
        this.createCustomCursor();
        this.bindEvents();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'fairy-dust-container';
        document.body.appendChild(this.container);
    }

    createCustomCursor() {
        this.customCursor = document.createElement('div');
        this.customCursor.className = 'custom-cursor';
        document.body.appendChild(this.customCursor);
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseenter', () => this.showCursor());
        document.addEventListener('mouseleave', () => this.hideCursor());
    }

    handleMouseMove(e) {
        const x = e.clientX;
        const y = e.clientY;

        // Update custom cursor position
        if (this.customCursor) {
            this.customCursor.style.left = x + 'px';
            this.customCursor.style.top = y + 'px';
        }

        // Calculate movement speed for particle intensity
        const deltaX = x - this.lastMouseX;
        const deltaY = y - this.lastMouseY;
        const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Create particles based on movement speed
        if (speed > 2) {
            this.createParticle(x, y);

            // Create extra particles for fast movement
            if (speed > 8) {
                this.createParticle(x + Math.random() * 10 - 5, y + Math.random() * 10 - 5);
            }

            // Occasional sparkle
            if (Math.random() < 0.3) {
                this.createSparkle(x, y);
            }
        }

        this.lastMouseX = x;
        this.lastMouseY = y;
    }

    createParticle(x, y) {
        const particle = document.createElement('div');

        // Random properties
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const size = this.sizes[Math.floor(Math.random() * this.sizes.length)];

        // Add random offset for natural spread
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        particle.className = 'fairy-dust-particle fairy-dust-' + color + ' fairy-dust-' + size;
        particle.style.left = (x + offsetX) + 'px';
        particle.style.top = (y + offsetY) + 'px';

        // Add random horizontal drift
        const driftX = (Math.random() - 0.5) * 30;
        const driftY = Math.random() * -20 - 10;

        particle.style.setProperty('--drift-x', driftX + 'px');
        particle.style.setProperty('--drift-y', driftY + 'px');

        // Custom animation with drift
        particle.style.animation =
            'fairyDustFloat 2s ease-out forwards, fairyDustDrift 2s ease-out forwards';

        this.container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }

    createSparkle(x, y) {
        const sparkle = document.createElement('div');

        const color = this.colors[Math.floor(Math.random() * this.colors.length)];

        // Add random offset
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;

        sparkle.className = 'fairy-sparkle sparkle-' + color;
        sparkle.style.left = (x + offsetX) + 'px';
        sparkle.style.top = (y + offsetY) + 'px';

        this.container.appendChild(sparkle);

        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }

    showCursor() {
        if (this.customCursor) {
            this.customCursor.style.opacity = '1';
        }
    }

    hideCursor() {
        if (this.customCursor) {
            this.customCursor.style.opacity = '0';
        }
    }

    destroy() {
        if (this.container) {
            this.container.remove();
        }
        if (this.customCursor) {
            this.customCursor.remove();
        }
        document.body.style.cursor = 'auto';
    }
}

// Add drift animation dynamically
const style = document.createElement('style');
style.textContent =
    '@keyframes fairyDustDrift {' +
        '0% {' +
            'transform: translateX(0) translateY(0);' +
        '}' +
        '100% {' +
            'transform: translateX(var(--drift-x, 0)) translateY(var(--drift-y, -30px));' +
        '}' +
    '}';
document.head.appendChild(style);

// Initialize when DOM is ready
let fairyDustCursor = null;

function initFairyDustCursor() {
    if (!fairyDustCursor) {
        fairyDustCursor = new FairyDustCursor();
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFairyDustCursor);
} else {
    initFairyDustCursor();
}

// Export for external use
window.fairyDustCursor = {
    init: initFairyDustCursor,
    destroy: () => {
        if (fairyDustCursor) {
            fairyDustCursor.destroy();
            fairyDustCursor = null;
        }
    }
};

