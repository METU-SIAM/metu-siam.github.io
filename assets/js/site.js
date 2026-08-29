(function () {
  var root = document.documentElement;
  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("nav-toggle");
  var themeToggle = document.getElementById("theme-toggle");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* ignore */
    }
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") || "light";
      setTheme(current === "light" ? "dark" : "light");
    });
    setTheme(root.getAttribute("data-theme") || "light");
  }

  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    header.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var form = document.getElementById("contact-form");
  if (form && form.getAttribute("data-mailto") === "true") {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = form.getAttribute("data-email") || "siam@metu.edu.tr";
      var name = (form.querySelector('[name="name"]') || {}).value || "";
      var from = (form.querySelector('[name="email"]') || {}).value || "";
      var topic = (form.querySelector('[name="subject"]') || {}).value || "Message from the website";
      var body = (form.querySelector('[name="message"]') || {}).value || "";
      var composed =
        (name ? "Name: " + name + "\n" : "") +
        (from ? "Email: " + from + "\n\n" : "") +
        body;
      window.location.href =
        "mailto:" +
        encodeURIComponent(email) +
        "?subject=" +
        encodeURIComponent(topic) +
        "&body=" +
        encodeURIComponent(composed);
    });
  }
})();
