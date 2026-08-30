/* =========================================================
   YR_TECH — MAIN JAVASCRIPT
   Dark Mode + Navbar + Scroll + Back To Top
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       01. DARK MODE
       ===================================================== */

    const themeToggle = document.querySelector(".theme-toggle");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (document.body.classList.contains("dark-mode")) {

            // Moon -> Sun
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            themeToggle.setAttribute("aria-label", "Switch to light mode");
            themeToggle.setAttribute("title", "Light Mode");

        } else {

            // Sun -> Moon
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            themeToggle.setAttribute("aria-label", "Switch to dark mode");
            themeToggle.setAttribute("title", "Dark Mode");
        }
    }

    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            // Save theme
            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );

            // Update icon
            updateThemeIcon();
        });
    }


    /* =====================================================
       02. NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    function handleNavbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 20) {

            navbar.style.boxShadow =
                "0 8px 30px rgba(15, 23, 42, 0.08)";

        } else {

            navbar.style.boxShadow = "none";
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);

    handleNavbarScroll();


    /* =====================================================
       03. ACTIVE NAVBAR LINK
       ===================================================== */

    const navLinks = document.querySelectorAll(
        '.navbar-nav .nav-link[href^="#"]'
    );

    const sections = document.querySelectorAll("section[id]");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    /* =====================================================
       04. SMOOTH SCROLL
       ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                !targetId.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });


            /* Close Bootstrap mobile menu */

            const navbarCollapse =
                document.querySelector(".navbar-collapse");

            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show")
            ) {

                const toggler =
                    document.querySelector(".navbar-toggler");

                if (toggler) {
                    toggler.click();
                }
            }
        });
    });


    /* =====================================================
       05. BACK TO TOP
       ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");
        }
    }

    window.addEventListener(
        "scroll",
        handleBackToTop
    );

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =====================================================
       06. CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name =
                    contactForm.querySelector(
                        'input[name="name"]'
                    );

                const email =
                    contactForm.querySelector(
                        'input[name="email"]'
                    );

                const message =
                    contactForm.querySelector(
                        "textarea"
                    );


                /* Basic validation */

                if (
                    name &&
                    name.value.trim() === ""
                ) {
                    alert("Please enter your name.");
                    name.focus();
                    return;
                }


                if (
                    email &&
                    email.value.trim() === ""
                ) {
                    alert("Please enter your email.");
                    email.focus();
                    return;
                }


                if (
                    message &&
                    message.value.trim() === ""
                ) {
                    alert("Please enter your message.");
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
       07. NEWSLETTER FORM
       ===================================================== */

    const newsletterForm =
        document.querySelector(".newsletter-form");

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const input =
                    newsletterForm.querySelector(
                        "input"
                    );

                if (!input) return;

                const email =
                    input.value.trim();

                if (email === "") {

                    alert(
                        "Please enter your email address."
                    );

                    input.focus();

                    return;
                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

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
       08. SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, .why-card, .work-item, .about-content, .about-image-wrapper"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity = "1";
                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(function (element) {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            observer.observe(element);
        });
    }


    /* =====================================================
       09. PREVENT EMPTY LINKS
       ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                }
            );
        });


    /* =====================================================
       10. YEAR IN FOOTER
       ===================================================== */

    const yearElement =
        document.querySelector(
            "[data-current-year]"
        );

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       11. INITIALIZE
       ===================================================== */

    console.log(
        "YR_TECH website initialized successfully."
    );

});