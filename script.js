/* ======================================================
   PAUL DELON — Two Accordions · Mobile Tap · Minimal Cursor
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // MINIMAL CURSOR — single dot with glass hover state
    // ========================================================
    const dot = document.getElementById('cursorDot');

    if (dot && window.innerWidth > 768) {
        let mx = 0, my = 0;

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top = my + 'px';
            if (!document.body.classList.contains('cursor-ready')) {
                document.body.classList.add('cursor-ready');
            }
        });

        // Glass hover effect on interactive elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .panel-cta, input, textarea, select')) {
                dot.classList.add('hovering');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .panel-cta, input, textarea, select')) {
                dot.classList.remove('hovering');
            }
        });
    }


    // ========================================================
    // HAMBURGER MENU
    // ========================================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('mainNav');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                menuToggle.focus();
            }
        });
    }


    // ========================================================
    // ACCORDIONS — supports multiple independent accordions
    // ========================================================
    const GALLERY_INTERVAL = 1500;
    const galleryTimers = new Map();
    const isMobile = () => window.innerWidth <= 768;

    document.querySelectorAll('[data-accordion]').forEach(accordion => {
        const panels = accordion.querySelectorAll('.accordion-panel');
        let activePanel = null;

        // --- Create gallery dots (clickable) ---
        panels.forEach(panel => {
            const imgs = panel.querySelectorAll('.gallery-img');
            if (imgs.length <= 1) return;
            const dotsEl = document.createElement('div');
            dotsEl.className = 'gallery-dots';
            dotsEl.setAttribute('aria-hidden', 'true');
            imgs.forEach((_, i) => {
                const d = document.createElement('span');
                d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
                d.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Navigate to this image
                    const allImgs = panel.querySelectorAll('.gallery-img');
                    const allDots = panel.querySelectorAll('.gallery-dot');
                    allImgs.forEach(img => img.classList.remove('active'));
                    allDots.forEach(dot => dot.classList.remove('active'));
                    allImgs[i].classList.add('active');
                    d.classList.add('active');
                });
                dotsEl.appendChild(d);
            });
            panel.appendChild(dotsEl);
        });

        // --- MOBILE: TAP TO TOGGLE (GLOBAL SYNC + SCROLL FRIENDLY) ---
        panels.forEach(panel => {
            panel.addEventListener('click', (e) => {
                if (!isMobile()) return;

                // Stop propagation to prevent document/parent conflicts
                e.stopPropagation();

                // Don't toggle if clicking a CTA link (cta handles itself)
                if (e.target.closest('.panel-cta')) return;

                const isAlreadyExpanded = panel.classList.contains('is-expanded');

                if (isAlreadyExpanded) {
                    // Cierre manual (Toggle OFF)
                    panel.classList.remove('is-expanded');
                    panel.classList.remove('active');
                    stopGallery(panel);

                    // Limpieza síncrona de estados de contenedor
                    document.querySelectorAll('[data-accordion]').forEach(acc => {
                        acc.classList.remove('has-active');
                    });
                    activePanel = null;
                } else {
                    // 1. LIMPIEZA GLOBAL INMEDIATA (Cierra cualquier otro panel en el sitio)
                    document.querySelectorAll('.accordion-panel').forEach(p => {
                        p.classList.remove('is-expanded');
                        p.classList.remove('active');
                        stopGallery(p);
                    });

                    // Quitar estado activo de todos los contenedores de acordeón
                    document.querySelectorAll('[data-accordion]').forEach(acc => {
                        acc.classList.remove('has-active');
                    });

                    // 2. APERTURA SÍNCRONA
                    // Resetear estados internos (imágenes/dots)
                    document.querySelectorAll('.gallery-img').forEach(img => img.classList.remove('active'));
                    document.querySelectorAll('.gallery-dot').forEach(d => d.classList.remove('active'));

                    const imgs = panel.querySelectorAll('.gallery-img');
                    const dots = panel.querySelectorAll('.gallery-dot');
                    if (imgs.length > 0) imgs[0].classList.add('active');
                    if (dots.length > 0) dots[0].classList.add('active');

                    // Activar panel actual
                    panel.classList.add('is-expanded');
                    panel.classList.add('active');
                    accordion.classList.add('has-active');
                    startGallery(panel);
                    activePanel = panel;
                }
            });
        });

        // --- Desktop: gallery rotation on hover ---
        panels.forEach(panel => {
            panel.addEventListener('mouseenter', () => {
                if (isMobile()) return;
                startGallery(panel);
            });
            panel.addEventListener('mouseleave', () => {
                if (isMobile()) return;
                stopGallery(panel);
            });
        });

        // --- Keyboard: focus activates ---
        panels.forEach(panel => {
            panel.addEventListener('focus', () => {
                if (isMobile()) return;
                panels.forEach(p => { p.classList.remove('active'); stopGallery(p); });
                panel.classList.add('active');
                accordion.classList.add('has-active');
                startGallery(panel);
                activePanel = panel;
            });
            panel.addEventListener('blur', (e) => {
                if (!accordion.contains(e.relatedTarget)) {
                    panels.forEach(p => { p.classList.remove('active'); stopGallery(p); });
                    accordion.classList.remove('has-active');
                    activePanel = null;
                }
            });
            panel.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const cta = panel.querySelector('.panel-cta');
                    if (cta) cta.click();
                }
            });
        });

        // --- Entrance animation ---
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reducedMotion) {
            panels.forEach((panel, i) => {
                panel.classList.add('entering');
                setTimeout(() => {
                    panel.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)`;
                    panel.classList.remove('entering');
                    panel.classList.add('entered');
                    setTimeout(() => {
                        panel.style.transition = '';
                        panel.classList.remove('entered');
                    }, 800 + i * 100);
                }, 100);
            });
        }
    });


    // ========================================================
    // GALLERY ROTATION (shared)
    // ========================================================
    function startGallery(panel) {
        // Clear any existing timer for this panel before starting a new one
        stopGallery(panel);

        const imgs = panel.querySelectorAll('.gallery-img');
        const dots = panel.querySelectorAll('.gallery-dot');
        if (imgs.length <= 1) return;

        const timer = setInterval(() => {
            let cur = -1;
            imgs.forEach((img, i) => { if (img.classList.contains('active')) cur = i; });
            const next = (cur + 1) % imgs.length;
            imgs[cur].classList.remove('active');
            imgs[next].classList.add('active');
            if (dots.length) {
                dots[cur].classList.remove('active');
                dots[next].classList.add('active');
            }
        }, GALLERY_INTERVAL);

        galleryTimers.set(panel, timer);
    }

    function stopGallery(panel) {
        const timer = galleryTimers.get(panel);
        if (timer) {
            clearInterval(timer);
            galleryTimers.delete(panel);
        }
        const imgs = panel.querySelectorAll('.gallery-img');
        const dots = panel.querySelectorAll('.gallery-dot');

        // Reset to first image
        imgs.forEach((img, i) => {
            img.classList.toggle('active', i === 0);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === 0);
        });
    }


    // ========================================================
    // SCROLL REVEAL
    // ========================================================
    const revealEls = document.querySelectorAll('.about-section, .contact-section');
    if (revealEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealEls.forEach(el => el.classList.add('reveal'));
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach(el => obs.observe(el));
    }


    // ========================================================
    // SMOOTH SCROLL
    // ========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ========================================================
    // CONTACT FORM
    // ========================================================
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('.form-input[required]');
            let valid = true;
            inputs.forEach(inp => {
                inp.style.borderColor = '';
                if (!inp.value.trim()) { inp.style.borderColor = '#e74c3c'; valid = false; }
                else if (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) {
                    inp.style.borderColor = '#e74c3c'; valid = false;
                }
            });
            if (valid) {
                const btn = form.querySelector('.form-submit');
                const txt = btn.textContent;
                btn.textContent = '¡ENVIADO!';
                btn.style.background = '#30d158'; btn.disabled = true;
                setTimeout(() => {
                    btn.textContent = txt; btn.style.background = ''; btn.disabled = false;
                    form.reset();
                }, 2500);
            }
        });
    }

});
