/* =========================================================
   YR_TECH — MAIN JAVASCRIPT
   Premium Version
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
                         ELEMENTS
    ====================================================== */

    const body = document.body;

    const themeToggle =
        document.getElementById("themeToggle");

    const navbar =
        document.querySelector(".navbar");

    const backToTop =
        document.getElementById("backToTop");

    const contactForm =
        document.getElementById("contactForm");

    const newsletterForm =
        document.getElementById("newsletterForm");

    const currentYear =
        document.getElementById("currentYear");



    /* =====================================================
                         DARK MODE
    ====================================================== */

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        body.classList.add("dark-mode");

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;


        if (body.classList.contains("dark-mode")) {

            icon.className =
                "fa-solid fa-sun";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Light Mode"
            );

        } else {

            icon.className =
                "fa-solid fa-moon";

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


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                body.classList.toggle(
                    "dark-mode"
                );


                const isDark =
                    body.classList.contains(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );


                updateThemeIcon();

            }
        );

    }



    /* =====================================================
                     NAVBAR SCROLL
    ====================================================== */

    function handleNavbar() {

        if (!navbar) return;


        if (window.scrollY > 30) {

            navbar.style.boxShadow =
                "0 10px 40px rgba(15,23,42,.08)";

        } else {

            navbar.style.boxShadow =
                "none";

        }

    }


    window.addEventListener(
        "scroll",
        handleNavbar
    );


    handleNavbar();



    /* =====================================================
                      NAVIGATION
    ====================================================== */

    const navLinks =
        document.querySelectorAll(
            '.navbar-nav .nav-link[href^="#"]'
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });


                /*

                    Close Bootstrap mobile menu

                */

                const collapse =
                    document.getElementById(
                        "mainNavbar"
                    );


                if (
                    collapse &&
                    collapse.classList.contains(
                        "show"
                    )
                ) {

                    const bsCollapse =
                        bootstrap.Collapse
                            .getInstance(
                                collapse
                            );


                    if (bsCollapse) {

                        bsCollapse.hide();

                    }

                }

            }
        );

    });



    /* =====================================================
                    ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    function updateActiveLink() {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;


            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );


    updateActiveLink();



    /* =====================================================
                      BACK TO TOP
    ====================================================== */

    function updateBackToTop() {

        if (!backToTop) return;


        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop
    );


    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }



    /* =====================================================
                       CONTACT FORM
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    );


                const email =
                    document.getElementById(
                        "email"
                    );


                const subject =
                    document.getElementById(
                        "subject"
                    );


                const message =
                    document.getElementById(
                        "message"
                    );


                if (
                    !name.value.trim()
                ) {

                    alert(
                        "Please enter your name."
                    );

                    name.focus();

                    return;

                }


                if (
                    !email.value.trim()
                ) {

                    alert(
                        "Please enter your email."
                    );

                    email.focus();

                    return;

                }


                if (
                    !subject.value.trim()
                ) {

                    alert(
                        "Please enter a subject."
                    );

                    subject.focus();

                    return;

                }


                if (
                    !message.value.trim()
                ) {

                    alert(
                        "Please enter your message."
                    );

                    message.focus();

                    return;

                }


                alert(
                    "Thank you! Your message has been received."
                );


                contactForm.reset();

            }
        );

    }



    /* =====================================================
                      NEWSLETTER
    ====================================================== */

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const input =
                    newsletterForm.querySelector(
                        "input"
                    );


                if (!input) return;


                const email =
                    input.value.trim();


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        email
                    )
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    input.focus();

                    return;

                }


                alert(
                    "Thank you for subscribing!"
                );


                newsletterForm.reset();

            }
        );

    }



    /* =====================================================
                     SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .service-card,
            .why-card,
            .process-card,
            .about-content,
            .about-visual,
            .contact-info,
            .contact-form-wrapper
            `
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                entry.target.style.opacity =
                                    "1";


                                entry.target.style.transform =
                                    "translateY(0)";


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                element.style.opacity =
                    "0";


                element.style.transform =
                    "translateY(25px)";


                element.style.transition =
                    "opacity .7s ease, transform .7s ease";


                observer.observe(
                    element
                );

            }
        );

    }



    /* =====================================================
                         YEAR
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
                     KEYBOARD ACCESSIBILITY
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                const openOffcanvas =
                    document.querySelector(
                        ".offcanvas.show"
                    );


                if (openOffcanvas) {

                    const instance =
                        bootstrap.Offcanvas
                            .getInstance(
                                openOffcanvas
                            );


                    if (instance) {

                        instance.hide();

                    }

                }

            }

        }
    );


    /* =====================================================
                         READY
    ====================================================== */

    console.log(
        "YR_Tech Premium Website initialized successfully."
    );

});