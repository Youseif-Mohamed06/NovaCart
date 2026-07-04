(function () {
    const KEY = "novacart-theme";

    function getTheme() {
        try {
            return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
        } catch {
            return "light";
        }
    }

    function applyTheme(theme) {
        const root = document.documentElement;
        if (theme === "dark") {
            root.setAttribute("data-theme", "dark");
        } else {
            root.removeAttribute("data-theme");
        }
        updateToggle(theme);
    }

    function updateToggle(theme) {
        const button = document.getElementById("theme_toggle");
        if (!button) return;
        const isDark = theme === "dark";
        button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        button.setAttribute("aria-pressed", String(isDark));
        button.classList.toggle("is-dark", isDark);
    }

    function toggleTheme() {
        const nextTheme = getTheme() === "dark" ? "light" : "dark";
        try {
            localStorage.setItem(KEY, nextTheme);
        } catch {
            /* ignore storage errors */
        }
        document.documentElement.classList.add("theme-transition");
        applyTheme(nextTheme);
        window.setTimeout(() => {
            document.documentElement.classList.remove("theme-transition");
        }, 300);
    }

    function init() {
        applyTheme(getTheme());
        document.getElementById("theme_toggle")?.addEventListener("click", toggleTheme);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
