
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");

    const isOpen = hamburger.classList.contains("active");
    hamburger.setAttribute("aria-expanded", isOpen);
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
    });
});
