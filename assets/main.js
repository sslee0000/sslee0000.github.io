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

// Language toggle — Korean by default; English via data-lang="en".
// Initial language is applied inline in <head> to avoid flash.
(function () {
  var btn = document.getElementById("lang-toggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var root = document.documentElement;
    var en = root.dataset.lang === "en";
    if (en) {
      delete root.dataset.lang;
      root.lang = "ko";
      localStorage.setItem("lang", "ko");
    } else {
      root.dataset.lang = "en";
      root.lang = "en";
      localStorage.setItem("lang", "en");
    }
  });
})();

// Scroll reveal — subtle fade-up; no-op if IntersectionObserver missing.
(function () {
  if (!("IntersectionObserver" in window)) return;
  var targets = document.querySelectorAll(".card, .entry-card, .cv-section, .pubs li");
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  targets.forEach(function (t) {
    t.classList.add("reveal");
    io.observe(t);
  });
})();
