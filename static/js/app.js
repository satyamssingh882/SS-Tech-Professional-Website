// ==========================================
// SS TECH - MOBILE MENU
// ==========================================

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

if (menu && nav) {

    menu.setAttribute("aria-label", "Open menu");
    menu.setAttribute("aria-expanded", "false");

    menu.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("open");

        menu.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menu.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        menu.textContent = isOpen ? "✕" : "☰";
    });


    // Close menu when clicking a navigation link
    document.querySelectorAll("#nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            menu.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-label", "Open menu");
            menu.textContent = "☰";

        });

    });

}


// ==========================================
// SS TECH - LIGHT / DARK MODE
// ==========================================

const themeButton = document.getElementById("theme");

function applyTheme(theme) {

    document.body.classList.toggle(
        "dark",
        theme === "dark"
    );

    if (themeButton) {

        themeButton.textContent =
            theme === "dark" ? "☀" : "☾";

        themeButton.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }
}


// ==========================================
// LOAD SAVED THEME
// ==========================================

const savedTheme =
    localStorage.getItem("ss-theme") || "light";

applyTheme(savedTheme);


// ==========================================
// THEME BUTTON
// ==========================================

if (themeButton) {

    themeButton.addEventListener("click", () => {

        const newTheme =
            document.body.classList.contains("dark")
                ? "light"
                : "dark";

        localStorage.setItem(
            "ss-theme",
            newTheme
        );

        applyTheme(newTheme);

    });
}


// ==========================================
// SS TECH - ENGLISH / HINDI
// ==========================================

const languageButtons =
    document.querySelectorAll(".lang");

function setLanguage(language) {

    document.documentElement.lang =
        language === "hi" ? "hi" : "en";


    document
        .querySelectorAll("[data-en][data-hi]")
        .forEach(element => {

            const translation =
                element.dataset[language];

            if (translation) {
                element.textContent = translation;
            }

        });


    languageButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.lang === language
        );

    });


    localStorage.setItem(
        "ss-lang",
        language
    );
}


// ==========================================
// LOAD SAVED LANGUAGE
// ==========================================

const savedLanguage =
    localStorage.getItem("ss-lang") || "en";

setLanguage(savedLanguage);


// ==========================================
// LANGUAGE BUTTONS
// ==========================================

languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        setLanguage(
            button.dataset.lang
        );

    });

});


// ==========================================
// SS TECH - ACTIVE NAVIGATION
// ==========================================

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        '#nav a[href^="#"]'
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                `#${entry.target.id}`
                            );

                        });

                    }

                });

            },

            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }

        );


    sections.forEach(section => {
        observer.observe(section);
    });

}