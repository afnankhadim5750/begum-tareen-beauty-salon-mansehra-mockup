// Begum Tareen Beauty Salon — mobile menu, nav highlight, reveal on scroll, FAQ.
(function () {
  "use strict";

  // --- Mobile menu: instant toggle (no transition on open/close) ---
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.hasAttribute("hidden");
      if (open) {
        menu.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
      } else {
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hasAttribute("hidden")) {
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.focus();
      }
    });
  }

  // --- Active nav link via IntersectionObserver ---
  var navLinks = document.querySelectorAll(".main-nav a");
  var sections = ["bridal", "lashes", "hair", "skin-nails", "academy", "visit"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

  // --- Reveal on scroll ---
  document.documentElement.classList.add("js");
  var revealEls = document.querySelectorAll(
    ".salon-grid, .bridal-feature, .bridal-gallery, .prep-grid, .makeup-grid, " +
    ".lashes-grid, .hair-grid, .skin-grid, .mehndi-grid, .academy-grid, " +
    ".why-grid, .good-list, .accordion, .visit-grid, .trust-grid"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  // Safety net: never leave content hidden if the observer misbehaves.
  setTimeout(function () {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }, 1200);
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }
})();
