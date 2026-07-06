// Theme toggle — persists to localStorage; initial theme is applied inline in <head>.
(function () {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var root = document.documentElement;
    var light = root.dataset.theme === "light";
    if (light) {
      delete root.dataset.theme;
      localStorage.setItem("theme", "dark");
    } else {
      root.dataset.theme = "light";
      localStorage.setItem("theme", "light");
    }
  });
})();

// Scroll reveal — subtle fade-up on sections/cards; no-op if IntersectionObserver missing.
(function () {
  if (!("IntersectionObserver" in window)) return;
  var targets = document.querySelectorAll(".section h2, .card, .timeline > li, .pubs li, .about-text, .about-facts");
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach(function (t) {
    t.classList.add("reveal");
    io.observe(t);
  });
})();
