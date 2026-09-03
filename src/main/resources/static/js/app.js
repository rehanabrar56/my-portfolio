document.addEventListener('DOMContentLoaded', () => {




    /* ================================================================
       REHAN OPENING TITLE CARD
       ================================================================ */

    const rehanIntro = document.getElementById('rehan-intro');

    const prefersReducedMotionIntro =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startHeroSequence = () => {
        document.body.classList.remove('intro-loading');
        runCinematicIntro();
    };

    if (rehanIntro) {

        if (prefersReducedMotionIntro) {

            rehanIntro.classList.add('is-complete');
            startHeroSequence();

        } else {

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    rehanIntro.classList.add('is-visible');
                });
            });

            setTimeout(() => {
                rehanIntro.classList.remove('is-visible');
                rehanIntro.classList.add('is-exiting');
            }, 1450);

            setTimeout(() => {
                rehanIntro.classList.add('is-fading');
            }, 2150);

            setTimeout(() => {
                rehanIntro.classList.add('is-complete');
                startHeroSequence();
            }, 3000);
        }

    } else {
        startHeroSequence();
    }


    /* ================================================================
       CINEMATIC INTRO TIMELINE
       ================================================================ */

    const navbar = document.getElementById('navbar');
    const hero = document.getElementById('hero');
    const portrait = document.querySelector('.hero-portrait');

    const heroRevealItems = hero
        ? hero.querySelectorAll('.hero-content .reveal-item')
        : [];

    const prefersReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const INTRO = {
        hero: 0,
        portrait: 50,
        badge: 650,
        heading: 790,
        divider: 1070,
        description: 1210,
        actions: 1330,
        contact: 1450,
        navigation: 1550,
        unlock: 2350
    };

    const runCinematicIntro = () => {

        if (!navbar || !hero) return;

        if (prefersReducedMotion) {

            document.body.classList.remove('intro-loading');

            navbar.classList.remove('intro-hidden');
            navbar.classList.add('intro-ready');

            hero.classList.remove('intro-start');
            hero.classList.add('intro-ready');

            if (portrait) {
                portrait.classList.add('intro-visible');
            }

            heroRevealItems.forEach(element => {
                element.classList.add('intro-visible');
                element.classList.add('revealed');
            });

            return;
        }

        document.body.classList.add('intro-loading');

        navbar.classList.add('intro-hidden');

        hero.classList.add('intro-start');

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                hero.classList.add('intro-ready');

                if (portrait) {

                    setTimeout(() => {
                        portrait.classList.add('intro-visible');
                    }, INTRO.portrait);
                }

                if (heroRevealItems.length) {

                    setTimeout(() => {
                        heroRevealItems[0]?.classList.add('intro-visible');
                        heroRevealItems[0]?.classList.add('revealed');
                    }, INTRO.badge);

                    setTimeout(() => {
                        heroRevealItems[1]?.classList.add('intro-visible');
                        heroRevealItems[1]?.classList.add('revealed');
                    }, INTRO.heading);

                    setTimeout(() => {
                        heroRevealItems[2]?.classList.add('intro-visible');
                        heroRevealItems[2]?.classList.add('revealed');
                    }, INTRO.divider);

                    setTimeout(() => {
                        heroRevealItems[3]?.classList.add('intro-visible');
                        heroRevealItems[3]?.classList.add('revealed');
                    }, INTRO.description);

                    setTimeout(() => {
                        heroRevealItems[4]?.classList.add('intro-visible');
                        heroRevealItems[4]?.classList.add('revealed');
                    }, INTRO.actions);

                    setTimeout(() => {
                        heroRevealItems[5]?.classList.add('intro-visible');
                        heroRevealItems[5]?.classList.add('revealed');
                    }, INTRO.contact);
                }

                setTimeout(() => {
                    navbar.classList.remove('intro-hidden');
                    navbar.classList.add('intro-ready');
                }, INTRO.navigation);

                setTimeout(() => {
                    document.body.classList.remove('intro-loading');
                }, INTRO.unlock);

            });
        });
    };


    /* ================================================================
       NAVIGATION
       ================================================================ */

    const handleNavbarScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener(
        'scroll',
        handleNavbarScroll,
        { passive: true }
    );

    handleNavbarScroll();


    /* ================================================================
       ACTIVE NAVIGATION
       ================================================================ */

    const sections =
        document.querySelectorAll('section');

    const navLinks =
        document.querySelectorAll('.nav-link');

    const updateActiveNavLink = () => {

        let current = '';

        const scrollPosition =
            window.scrollY + window.innerHeight * 0.35;

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                current =
                    section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {

            link.classList.remove('active');

            const href =
                link.getAttribute('href');

            if (
                href &&
                href === `#${current}`
            ) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener(
        'scroll',
        updateActiveNavLink,
        { passive: true }
    );

    updateActiveNavLink();


    /* ================================================================
       REVEAL ANIMATIONS
       ================================================================ */

    const revealElements =
        document.querySelectorAll('.reveal-item');

    const revealOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealOnScroll =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    if (entry.target.closest('#hero')) {

                        if (
                            !entry.target.classList.contains('intro-visible')
                        ) {
                            return;
                        }
                    }

                    entry.target.classList.add('revealed');

                    observer.unobserve(entry.target);
                });

            },
            revealOptions
        );

    revealElements.forEach(element => {

        if (!element.closest('#hero')) {
            revealOnScroll.observe(element);
        }

    });


    /* ================================================================
       CINEMATIC WORK SECTION
       ================================================================ */

    const projectStories =
        document.querySelectorAll('.project-story');

    const projectImages =
        document.querySelectorAll('.project-image');

    const cinematicScreen =
        document.querySelector('.cinematic-screen');

    const syncImageRatio = (imgEl) => {

        if (!cinematicScreen || !imgEl) return;

        const setRatio = () => {

            if (
                imgEl.naturalWidth &&
                imgEl.naturalHeight
            ) {

                cinematicScreen.style.setProperty(
                    '--img-ratio',
                    `${imgEl.naturalWidth} / ${imgEl.naturalHeight}`
                );
            }
        };

        if (imgEl.complete) {
            setRatio();
        } else {
            imgEl.addEventListener(
                'load',
                setRatio,
                { once: true }
            );
        }
    };


    const activateProject = (index) => {

        const activeIndex = String(index);

        projectStories.forEach(story => {

            story.classList.remove('active-story');

            if (story.dataset.index === activeIndex) {
                story.classList.add('active-story');
            }
        });

        projectImages.forEach(image => {

            image.classList.remove('active');

            if (image.id === `img-${activeIndex}`) {
                image.classList.add('active');
            }
        });

        syncImageRatio(
            document.getElementById(`img-${activeIndex}`)
        );
    };


    if (
        window.innerWidth > 1024 &&
        projectStories.length
    ) {

        const workObserverOptions = {
            root: null,
            rootMargin: '-42% 0px -42% 0px',
            threshold: 0
        };

        const workScrollObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            activateProject(
                                entry.target.dataset.index
                            );
                        }
                    });

                },
                workObserverOptions
            );

        projectStories.forEach(story => {
            workScrollObserver.observe(story);
        });

        activateProject(1);

    } else {

        projectStories.forEach(story => {
            story.classList.add('active-story');
        });
    }


    /* ================================================================
       HERO PORTRAIT PARALLAX
       ================================================================ */

    if (
        hero &&
        portrait &&
        !prefersReducedMotion
    ) {

        let ticking = false;

        const updatePortraitDepth = () => {

            if (
                document.body.classList.contains('intro-loading')
            ) {

                ticking = false;
                return;
            }

            const rect =
                hero.getBoundingClientRect();

            if (
                rect.bottom < 0 ||
                rect.top > window.innerHeight
            ) {

                ticking = false;
                return;
            }

            const progress =
                Math.max(
                    -1,
                    Math.min(
                        1,
                        -rect.top / window.innerHeight
                    )
                );

            const movement =
                progress * -10;

            portrait.style.setProperty(
                '--portrait-parallax',
                `${movement}px`
            );

            portrait.style.transform =
                `translate3d(0, ${movement}px, 0) scale(1)`;

            ticking = false;
        };

        window.addEventListener(
            'scroll',
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updatePortraitDepth
                    );

                    ticking = true;
                }

            },
            { passive: true }
        );
    }


    /* ================================================================
       SMOOTH INTERNAL LINKS
       ================================================================ */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            'click',
            event => {

                const targetId =
                    link.getAttribute('href');

                if (
                    !targetId ||
                    targetId === '#'
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: prefersReducedMotion
                        ? 'auto'
                        : 'smooth',
                    block: 'start'
                });
            }
        );
    });


    /* ================================================================
       ABOUT IMAGE TAP GLOW (MOBILE)
       ================================================================ */

    const aboutImageWrapper =
        document.querySelector('.about-image-wrapper');

    if (aboutImageWrapper) {

        aboutImageWrapper.addEventListener(
            'touchstart',
            () => {
                aboutImageWrapper.classList.add('is-tapped');
            },
            { passive: true }
        );

        aboutImageWrapper.addEventListener(
            'touchend',
            () => {

                setTimeout(() => {
                    aboutImageWrapper.classList.remove('is-tapped');
                }, 600);

            }
        );
    }


    /* ================================================================
           CONTACT FORM SUBMISSION
           ================================================================ */

        const contactForm =
            document.getElementById('contact-form');

        if (contactForm) {

            contactForm.addEventListener(
                'submit',
                async (event) => {

                    event.preventDefault();

                    const submitBtn =
                        contactForm.querySelector(
                            'button[type="submit"]'
                        );

                    const originalBtnText =
                        submitBtn
                            ? submitBtn.innerHTML
                            : '';

                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = 'Sending...';
                    }

                    const formData = new FormData(contactForm);

                    try {

                        const response = await fetch(
                            'https://api.web3forms.com/submit',
                            {
                                method: 'POST',
                                body: formData
                            }
                        );

                        const data = await response.json();

                        if (data.success) {

                            contactForm.reset();

                            if (submitBtn) {
                                submitBtn.innerHTML =
                                    'Message Sent ✓';
                            }

                            setTimeout(() => {

                                if (submitBtn) {
                                    submitBtn.disabled = false;
                                    submitBtn.innerHTML =
                                        originalBtnText;
                                }

                            }, 2500);

                        } else {
                            throw new Error(
                                data.message || 'Something went wrong.'
                            );
                        }

                    } catch (error) {

                        console.error(
                            'Contact form error:',
                            error
                        );

                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML =
                                originalBtnText;
                        }

                        alert(
                            'Something went wrong. Please try again.'
                        );
                    }
                }
            );
        }

    /* ================================================================
       AI NETWORK ACTIVATION SEQUENCE
       ================================================================ */

    const orbitDiagram =
        document.getElementById('orbit-diagram');

    if (orbitDiagram) {

        const orbitSequence = [
            'gemini',
            'n8n',
            'pinecone',
            'mysql',
            'java'
        ];

        const activateOrbitStep = (index) => {

            if (index >= orbitSequence.length) {

                orbitDiagram.classList.add(
                    'orbit-diagram--active'
                );

                return;
            }

            const key =
                orbitSequence[index];

            const line =
                document.getElementById(
                    `line-${key}`
                );

            const node =
                document.getElementById(
                    `node-${key}`
                );

            const pulse =
                document.getElementById(
                    `pulse-${key}`
                );

            if (line) {
                line.classList.add('is-drawn');
            }

            if (node) {
                node.classList.add('is-visible');
            }

            setTimeout(() => {

                if (pulse) {
                    pulse.classList.add('is-active');
                }

            }, 500);

            setTimeout(() => {

                activateOrbitStep(index + 1);

            }, 550);
        };


        const orbitObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            setTimeout(() => {
                                activateOrbitStep(0);
                            }, 400);

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.4
                }
            );

        orbitObserver.observe(orbitDiagram);
    }

});
