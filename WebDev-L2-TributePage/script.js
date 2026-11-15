
(() => {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#nav-menu");

  if (!navbar || !toggle || !menu) return;

  document.documentElement.classList.add("js");

  const mobileQuery = window.matchMedia("(max-width: 600px)");

  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  overlay.setAttribute("aria-hidden", "true");

  document.body.appendChild(overlay);

  const closeMenu = () => {
    navbar.classList.remove("is-open");
    overlay.classList.remove("is-visible");

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("menu-open");

    menu.inert = mobileQuery.matches;
  };

  const openMenu = () => {
    navbar.classList.add("is-open");
    overlay.classList.add("is-visible");

    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");

    document.body.classList.add("menu-open");

    menu.inert = false;
  };


  menu.inert = mobileQuery.matches;


  toggle.addEventListener("click", () => {
    const isOpen =
      toggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });


  overlay.addEventListener("click", closeMenu);


  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });


  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });


  mobileQuery.addEventListener("change", (event) => {
    closeMenu();
    menu.inert = event.matches;
  });

})();
