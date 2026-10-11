// Footer year
document.getElementById("y").textContent = new Date().getFullYear();

// Tab effect: clicking a menu item shows only that section with a fade-in
(function () {
  var panels = document.querySelectorAll(".panel");
  var links = document.querySelectorAll('nav a[href^="#"]');
  var ids = Array.prototype.map.call(panels, function (p) { return p.id; });

  function show(id, scroll) {
    if (id === "home" || ids.indexOf(id) === -1) id = "about";   // "Home" = first panel
    panels.forEach(function (p) { p.classList.toggle("active", p.id === id); });
    links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + id); });
    if (scroll) {
      var el = document.getElementById(id);
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 64, behavior: "smooth" });
    }
  }

  // every in-page link (menu + hero buttons)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href").slice(1);
      if (!id) return;
      e.preventDefault();
      if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }   // back-to-top
      history.pushState(null, "", "#" + id);
      show(id, true);
    });
  });

  window.addEventListener("popstate", function () { show(location.hash.slice(1), false); });
  show(location.hash.slice(1), false);   // open the section from the URL, or Home
})();

// Countdown to the conference (04 Aug 2027)
(function () {
  var d = Math.ceil((new Date(2027, 7, 4) - new Date()) / 86400000);
  document.getElementById("cd").textContent = d > 0 ? d : (d > -3 ? "Live" : "Done");
})();

// Mobile menu
(function () {
  var nav = document.querySelector("nav"), btn = document.querySelector(".menu-btn");
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); });
  });
})();

// Back-to-top button
(function () {
  var t = document.getElementById("top");
  window.addEventListener("scroll", function () { t.classList.toggle("show", window.pageYOffset > 400); });
})();
