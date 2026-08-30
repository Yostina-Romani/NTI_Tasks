javascript
/* =========================================================
   YR_TECH - MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. DARK / LIGHT MODE
   ========================================================= */

function changetheme() {

    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");

    body.classList.toggle("dark-mode");

    const isDark =
        body.classList.contains("dark-mode");

    /* Change icon */

    if (themeIcon) {

        themeIcon.className =
            isDark
                ? "bi bi-sun-fill"
                : "bi bi-moon-fill";

    }

    /* Save theme */

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );
}


/* =========================================================
   02. LOAD SAVED THEME
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const savedTheme =
        localStorage.getItem("theme");

    const themeIcon =
        document.getElementById("themeIcon");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeIcon) {

            themeIcon.className =
                "bi bi-sun-fill";

        }

    }

});


/* =========================================================
   03. GET STARTED BUTTON
   ========================================================= */

function changeButtonText() {

    const btn =
        document.getElementById("btn-get-start");

    if (!btn) return;

    btn.innerHTML =
        'Welcome! 🎉';

    /* Prevent repeated clicking */

    btn.disabled = true;

    /* Re-enable after animation */

    setTimeout(() => {

        btn.disabled = false;

    }, 1200);

}


/* =========================================================
   04. NAVBAR SCROLL EFFECT
   ========================================================= */

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   05. ACTIVE NAVIGATION LINK
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });

});


/* =========================================================
   06. BACK TO TOP
   ========================================================= */

const backToTop =
    document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   07. SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   08. BUTTON HOVER EFFECT
   ========================================================= */

document.querySelectorAll(".btn-primary-custom").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform =
            "translateY(-4px)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform =
            "translateY(0)";

    });

});


/* =========================================================
   09. AUTO CLOSE MOBILE OFFCANVAS
   ========================================================= */

document.querySelectorAll(
    ".offcanvas .nav-link"
).forEach(link => {

    link.addEventListener("click", () => {

        const offcanvasElement =
            document.querySelector(".offcanvas.show");

        if (!offcanvasElement) return;

        const offcanvas =
            bootstrap.Offcanvas.getInstance(
                offcanvasElement
            );

        if (offcanvas) {

            offcanvas.hide();

        }

    });

});


/* =========================================================
   10. CONTACT FORM
   ========================================================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const button =
            contactForm.querySelector(
                'button[type="submit"]'
            );

        if (!button) return;

        const originalText =
            button.innerHTML;

        button.innerHTML =
            '<i class="bi bi-check-circle"></i> Message Sent!';

        button.disabled = true;

        setTimeout(() => {

            button.innerHTML =
                originalText;

            button.disabled = false;

            contactForm.reset();

        }, 2500);

    });

}


/* =========================================================
   11. NEWSLETTER FORM
   ========================================================= */

const newsletterForm =
    document.querySelector(".newsletter-form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const input =
            newsletterForm.querySelector("input");

        const button =
            newsletterForm.querySelector("button");

        if (!input || !button) return;

        if (input.value.trim() === "") {

            input.focus();

            return;

        }

        button.innerHTML =
            '<i class="bi bi-check-lg"></i>';

        input.value = "";

        setTimeout(() => {

            button.innerHTML =
                '<i class="bi bi-arrow-right"></i>';

        }, 2000);

    });

}


/* =========================================================
   12. REVEAL ANIMATION
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".service-card, .why-card, .work-item, .about-content"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});
