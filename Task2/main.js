/* =========================================================
   YR_TECH - MAIN JAVASCRIPT
   Professional Interactive UI
   ========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initTheme();
    initNavbar();
    initSmoothScroll();
    initScrollSpy();
    initBackToTop();
    initContactForm();
    initNewsletter();
    initAnimations();
    initLazyImages();
    initButtonEffects();
    initCarousel();
    initOffcanvas();
    initKeyboardAccessibility();

});


/* =========================================================
   02. DARK / LIGHT MODE
   ========================================================= */

function initTheme() {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    const savedTheme = localStorage.getItem("yrtech-theme");

    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else {

        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        document.documentElement.setAttribute(
            "data-theme",
            prefersDark ? "dark" : "light"
        );
    }

    updateThemeIcon();

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );

        localStorage.setItem(
            "yrtech-theme",
            newTheme
        );

        updateThemeIcon();

        themeToggle.classList.add("theme-changing");

        setTimeout(() => {
            themeToggle.classList.remove("theme-changing");
        }, 400);

    });


    function updateThemeIcon() {

        if (!icon) return;

        const theme =
            document.documentElement.getAttribute("data-theme");

        if (theme === "dark") {

            icon.classList.remove("bi-moon-fill");
            icon.classList.add("bi-sun-fill");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Light Mode"
            );

        } else {

            icon.classList.remove("bi-sun-fill");
            icon.classList.add("bi-moon-fill");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Dark Mode"
            );
        }
    }
}


/* =========================================================
   03. NAVBAR
   ========================================================= */

function initNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener(
        "scroll",
        () => {

            const currentScroll = window.scrollY;

            if (currentScroll > 40) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }

            if (
                currentScroll > lastScroll &&
                currentScroll > 300
            ) {
                navbar.classList.add("navbar-hidden");
            } else {
                navbar.classList.remove("navbar-hidden");
            }

            lastScroll = currentScroll;

        },
        { passive: true }
    );


    /* Close mobile menu after clicking */

    const navLinks =
        document.querySelectorAll(".navbar .nav-link");

    const navbarCollapse =
        document.getElementById("mainNavbar");

    if (!navbarCollapse) return;

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (
                window.innerWidth < 992 &&
                navbarCollapse.classList.contains("show")
            ) {

                const collapse =
                    bootstrap.Collapse.getInstance(
                        navbarCollapse
                    );

                if (collapse) {
                    collapse.hide();
                }

            }

        });

    });

}


/* =========================================================
   04. SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        );

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbar =
                document.querySelector(".navbar");

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                10;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            history.pushState(
                null,
                "",
                targetId
            );

        });

    });

}


/* =========================================================
   05. ACTIVE NAVIGATION / SCROLL SPY
   ========================================================= */

function initScrollSpy() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".navbar .nav-link"
        );

    if (!sections.length || !navLinks.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const id =
                        entry.target.getAttribute("id");

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${id}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

    sections.forEach(section => {
        observer.observe(section);
    });

}


/* =========================================================
   06. BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");

    if (!button) return;

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {
                button.classList.add("show");
            } else {
                button.classList.remove("show");
            }

        },
        { passive: true }
    );


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   07. CONTACT FORM
   ========================================================= */

function initContactForm() {

    const form =
        document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", event => {

        event.preventDefault();

        if (!form.checkValidity()) {

            form.classList.add("was-validated");

            return;
        }

        const submitButton =
            form.querySelector(
                'button[type="submit"]'
            );

        if (!submitButton) return;

        const originalContent =
            submitButton.innerHTML;

        submitButton.disabled = true;

        submitButton.innerHTML = `
            <span class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"></span>
            Sending...
        `;


        /*
         * Front-end demo.
         *
         * Replace this section later with:
         *
         * fetch("/Contact/Send", {
         *     method: "POST",
         *     body: new FormData(form)
         * })
         *
         * when connecting ASP.NET Core MVC backend.
         */

        setTimeout(() => {

            showNotification(
                "Your message has been sent successfully!",
                "success"
            );

            form.reset();

            form.classList.remove(
                "was-validated"
            );

            submitButton.disabled = false;

            submitButton.innerHTML =
                originalContent;

        }, 1200);

    });

}


/* =========================================================
   08. NEWSLETTER
   ========================================================= */

function initNewsletter() {

    const form =
        document.getElementById(
            "newsletterForm"
        );

    if (!form) return;

    form.addEventListener("submit", event => {

        event.preventDefault();

        const input =
            form.querySelector(
                'input[type="email"]'
            );

        const button =
            form.querySelector("button");

        if (!input || !button) return;

        if (!input.checkValidity()) {

            input.reportValidity();

            return;
        }

        const originalIcon =
            button.innerHTML;

        button.disabled = true;

        button.innerHTML = `
            <span class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"></span>
        `;


        setTimeout(() => {

            showNotification(
                "Successfully subscribed to YR_Tech!",
                "success"
            );

            input.value = "";

            button.disabled = false;

            button.innerHTML =
                originalIcon;

        }, 1000);

    });

}


/* =========================================================
   09. NOTIFICATION SYSTEM
   ========================================================= */

function showNotification(message, type = "success") {

    const existing =
        document.querySelector(
            ".yr-notification"
        );

    if (existing) {
        existing.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        `yr-notification yr-notification-${type}`;

    const icon =
        type === "success"
            ? "fa-circle-check"
            : "fa-circle-exclamation";


    notification.innerHTML = `
        <div class="yr-notification-icon">
            <i class="fa-solid ${icon}"></i>
        </div>

        <div class="yr-notification-content">
            <strong>
                ${type === "success"
                    ? "Success"
                    : "Attention"}
            </strong>

            <span>${message}</span>
        </div>

        <button
            type="button"
            class="yr-notification-close"
            aria-label="Close notification">

            <i class="fa-solid fa-xmark"></i>

        </button>
    `;


    document.body.appendChild(notification);


    requestAnimationFrame(() => {
        notification.classList.add("show");
    });


    const closeButton =
        notification.querySelector(
            ".yr-notification-close"
        );

    closeButton.addEventListener(
        "click",
        () => removeNotification()
    );


    const timeout =
        setTimeout(
            removeNotification,
            4500
        );


    function removeNotification() {

        clearTimeout(timeout);

        notification.classList.remove("show");

        setTimeout(() => {

            if (notification.parentNode) {
                notification.remove();
            }

        }, 350);

    }

}


/* =========================================================
   10. SCROLL REVEAL ANIMATIONS
   ========================================================= */

function initAnimations() {

    const animatedElements =
        document.querySelectorAll(`
            .service-card,
            .why-card,
            .work-item,
            .about-content,
            .about-image-wrapper,
            .contact-info,
            .contact-form-wrapper,
            .section-heading,
            .cta-box
        `);

    if (!animatedElements.length) return;


    animatedElements.forEach(element => {

        element.classList.add(
            "scroll-reveal"
        );

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "revealed"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    animatedElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   11. LAZY IMAGE LOADING
   ========================================================= */

function initLazyImages() {

    const images =
        document.querySelectorAll(
            'img[loading="lazy"]'
        );

    if (!images.length) return;


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;

                        const image =
                            entry.target;

                        image.classList.add(
                            "image-loading"
                        );


                        image.addEventListener(
                            "load",
                            () => {

                                image.classList.remove(
                                    "image-loading"
                                );

                                image.classList.add(
                                    "image-loaded"
                                );

                            },
                            { once: true }
                        );


                        observer.unobserve(image);

                    });

                }
            );

        images.forEach(image => {
            observer.observe(image);
        });

    }

}


/* =========================================================
   12. BUTTON INTERACTIONS
   ========================================================= */

function initButtonEffects() {

    const buttons =
        document.querySelectorAll(
            ".btn"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {

                button.classList.add(
                    "btn-hover"
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.classList.remove(
                    "btn-hover"
                );

            }
        );


        button.addEventListener(
            "mousedown",
            () => {

                button.classList.add(
                    "btn-pressed"
                );

            }
        );


        button.addEventListener(
            "mouseup",
            () => {

                button.classList.remove(
                    "btn-pressed"
                );

            }
        );

    });

}


/* =========================================================
   13. CAROUSEL
   ========================================================= */

function initCarousel() {

    const carousel =
        document.getElementById(
            "heroCarousel"
        );

    if (!carousel || typeof bootstrap === "undefined")
        return;


    const instance =
        bootstrap.Carousel.getOrCreateInstance(
            carousel,
            {
                interval: 5500,
                ride: "carousel",
                pause: "hover",
                touch: true,
                wrap: true
            }
        );


    carousel.addEventListener(
        "slide.bs.carousel",
        () => {

            carousel.classList.add(
                "carousel-changing"
            );

        }
    );


    carousel.addEventListener(
        "slid.bs.carousel",
        () => {

            carousel.classList.remove(
                "carousel-changing"
            );

        }
    );


    /*
     * Pause carousel when browser tab
     * is not visible.
     */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {
                instance.pause();
            } else {
                instance.cycle();
            }

        }
    );

}


/* =========================================================
   14. OFFCANVAS
   ========================================================= */

function initOffcanvas() {

    const canvas =
        document.getElementById(
            "aboutCanvas"
        );

    if (!canvas || typeof bootstrap === "undefined")
        return;


    canvas.addEventListener(
        "show.bs.offcanvas",
        () => {

            document.body.classList.add(
                "offcanvas-opening"
            );

        }
    );


    canvas.addEventListener(
        "shown.bs.offcanvas",
        () => {

            document.body.classList.remove(
                "offcanvas-opening"
            );

        }
    );


    canvas.addEventListener(
        "hidden.bs.offcanvas",
        () => {

            document.body.classList.remove(
                "offcanvas-opening"
            );

        }
    );

}


/* =========================================================
   15. KEYBOARD ACCESSIBILITY
   ========================================================= */

function initKeyboardAccessibility() {

    document.addEventListener(
        "keydown",
        event => {

            /*
             * ESC closes mobile navbar
             */

            if (event.key === "Escape") {

                const navbarCollapse =
                    document.getElementById(
                        "mainNavbar"
                    );

                if (
                    navbarCollapse &&
                    navbarCollapse.classList.contains(
                        "show"
                    )
                ) {

                    const collapse =
                        bootstrap.Collapse.getInstance(
                            navbarCollapse
                        );

                    if (collapse) {
                        collapse.hide();
                    }

                }

            }

        }
    );

}


/* =========================================================
   16. PERFORMANCE HELPERS
   ========================================================= */

function debounce(
    callback,
    delay = 150
) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(
            () => callback(...args),
            delay
        );

    };

}


/* =========================================================
   17. WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    debounce(() => {

        document.body.classList.add(
            "is-resizing"
        );

        clearTimeout(
            window.yrResizeTimer
        );

        window.yrResizeTimer =
            setTimeout(() => {

                document.body.classList.remove(
                    "is-resizing"
                );

            }, 250);

    }, 100)
);


/* =========================================================
   18. PREVENT BROKEN IMAGE ICONS
   ========================================================= */

document.addEventListener(
    "error",
    event => {

        if (
            event.target &&
            event.target.tagName === "IMG"
        ) {

            event.target.classList.add(
                "image-error"
            );

        }

    },
    true
);


/* =========================================================
   19. PAGE LOAD
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

        /*
         * Remove loading state after
         * all initial animations.
         */

        setTimeout(() => {

            document.body.classList.remove(
                "page-loading"
            );

        }, 500);

    }
);


/* =========================================================
   20. CONSOLE BRANDING
   ========================================================= */

console.log(
    "%cYR_Tech",
    `
        font-size: 24px;
        font-weight: 800;
        letter-spacing: 2px;
    `
);

console.log(
    "%cSmart Technology Solutions",
    `
        font-size: 13px;
        font-weight: 600;
    `
);