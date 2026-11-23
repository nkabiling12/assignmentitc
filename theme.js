(function () {
    var root = document.documentElement;
    var KEY = "cs-site-theme";
    var saved = null;

    try { saved = localStorage.getItem(KEY); } catch (e) {}

    var prefersLight = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;
    root.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));

    function init() {
        var btn = document.getElementById("themeToggle");
        if (!btn) return;

        function update() {
            var isLight = root.getAttribute("data-theme") === "light";
            var label = isLight ? "Switch to dark mode" : "Switch to light mode";
            btn.setAttribute("aria-label", label);
            btn.setAttribute("title", label);
        }

        btn.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
            root.setAttribute("data-theme", next);
            try { localStorage.setItem(KEY, next); } catch (e) {}
            update();
        });

        update();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
