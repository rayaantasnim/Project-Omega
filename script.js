        document.addEventListener('DOMContentLoaded', () => {
            // Register GSAP ScrollTrigger Plugin
            gsap.registerPlugin(ScrollTrigger);

            /* ----------------------------------------------------------------------
             * 1. MOBILE NAVIGATION CONTROLLER WITH CLOSE BUTTON DISMISSAL
             * ---------------------------------------------------------------------- */
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            const navCloseBtn = document.getElementById('navCloseBtn');
            const navOverlay = document.getElementById('navOverlay');
            const navItems = document.querySelectorAll('.nav-item');

            function openMenu() {
                hamburgerBtn.classList.add('active');
                navOverlay.classList.add('active');
                
                // Animate nav items in cleanly
                gsap.fromTo(navItems, 
                    { opacity: 0, y: 30 }, 
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
                );
                document.body.style.overflow = 'hidden';
            }

            function closeMenu() {
                hamburgerBtn.classList.remove('active');
                
                // Reverse animation on close
                gsap.to(navItems, {
                    opacity: 0,
                    y: -15,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: 'power2.in',
                    onComplete: () => {
                        navOverlay.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
            }

            hamburgerBtn.addEventListener('click', () => {
                if (navOverlay.classList.contains('active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            // Dedicated Close Button Trigger
            if (navCloseBtn) {
                navCloseBtn.addEventListener('click', closeMenu);
            }

            // Close menu on clicking any navigation link
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (navOverlay.classList.contains('active')) {
                        closeMenu();
                    }
                });
            });

            /* ----------------------------------------------------------------------
             * 2. GSAP SCROLLTRIGGER ANIMATIONS
             * ---------------------------------------------------------------------- */
            
            // Hero Animation Sequence
            const heroTl = gsap.timeline();
            heroTl.from('.hero-content .badge', { opacity: 0, y: -20, duration: 0.8, ease: 'power2.out' })
                  .from('.hero-content h1', { opacity: 0, y: 30, duration: 1, ease: 'power2.out' }, '-=0.5')
                  .from('.hero-text-block', { opacity: 0, y: 30, duration: 1, ease: 'power2.out' }, '-=0.7')
                  .from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '-=0.7')
                  .from('.hero-img-container', { opacity: 0, scale: 0.95, duration: 1.2, ease: 'power2.out' }, '-=1');

            // Generic Fade-Up Reveal Configuration for Headers
            const revealElements = [
                { selector: '.models-section .badge-blue', delay: 0 },
                { selector: '.models-section .section-title', delay: 0.1 },
                { selector: '.models-section .section-subtitle', delay: 0.2 },
                { selector: '.characteristics-section .badge', delay: 0 },
                { selector: '.characteristics-section .section-title', delay: 0.1 },
                { selector: '.characteristics-section .section-subtitle', delay: 0.2 }
            ];

            revealElements.forEach(item => {
                const el = document.querySelector(item.selector);
                if (el) {
                    gsap.from(el, {
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            once: true
                        },
                        opacity: 0,
                        y: 30,
                        duration: 1,
                        delay: item.delay,
                        ease: 'power2.out'
                    });
                }
            });

            // Model Rows Vertical Staggered Reveal Sequence
            const modelRows = document.querySelectorAll('.model-card-row');
            modelRows.forEach((row, index) => {
                gsap.from(row, {
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 80%',
                        once: true
                    },
                    opacity: 0,
                    y: 40,
                    duration: 1.2,
                    delay: index * 0.1,
                    ease: 'power2.out'
                });
            });

            // Characteristics Rows Alternate Reveal
            const charRows = document.querySelectorAll('.char-row');
            charRows.forEach((row, index) => {
                const content = row.querySelector('.char-content');
                const media = row.querySelector('.char-media');

                gsap.from(content, {
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 75%',
                        once: true
                    },
                    opacity: 0,
                    x: index % 2 === 0 ? -40 : 40,
                    duration: 1.2,
                    ease: 'power2.out'
                });

                gsap.from(media, {
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 75%',
                        once: true
                    },
                    opacity: 0,
                    x: index % 2 === 0 ? 40 : -40,
                    duration: 1.2,
                    ease: 'power2.out'
                });
            });

            // Conclusion Section Reveal
            gsap.from('.conclusion-content', {
                scrollTrigger: {
                    trigger: '.conclusion-section',
                    start: 'top 75%',
                    once: true
                },
                opacity: 0,
                y: 40,
                duration: 1.2,
                ease: 'power2.out'
            });

            gsap.from('.conclusion-media', {
                scrollTrigger: {
                    trigger: '.conclusion-section',
                    start: 'top 75%',
                    once: true
                },
                opacity: 0,
                scale: 0.95,
                duration: 1.2,
                delay: 0.2,
                ease: 'power2.out'
            });

            /* ----------------------------------------------------------------------
             * 3. NAVBAR SCROLL ELEVATION EFFECT
             * ---------------------------------------------------------------------- */
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                    navbar.style.padding = '0.85rem 0';
                } else {
                    navbar.style.boxShadow = 'none';
                    navbar.style.padding = '1.25rem 0';
                }
            });
        });
