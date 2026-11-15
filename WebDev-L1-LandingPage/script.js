(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("#nav-links");
  const header = document.querySelector("header");

  if (!menuButton || !navMenu || !header) return;

  const mobileQuery = window.matchMedia("(max-width: 768px)");

  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  function openMenu() {
      if (!mobileQuery.matches) return;

      document.body.classList.add("menu-open");
      navMenu.classList.add("is-open");
      menuButton.classList.add("is-open");
      overlay.classList.add("is-visible");

      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Close navigation menu");
      navMenu.removeAttribute("inert");
  }

  function closeMenu() {
      document.body.classList.remove("menu-open");
      navMenu.classList.remove("is-open");
      menuButton.classList.remove("is-open");
      overlay.classList.remove("is-visible");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");

      if (mobileQuery.matches) {
          navMenu.setAttribute("inert", "");
      } else {
          navMenu.removeAttribute("inert");
      }
  }

  function toggleMenu() {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      if (isOpen) {
          closeMenu();
      } else {
          openMenu();
      }
  }

  menuButton.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
  });

  mobileQuery.addEventListener("change", () => {
      closeMenu();
  });

  if (mobileQuery.matches) {
      navMenu.setAttribute("inert", "");
  }
})();
