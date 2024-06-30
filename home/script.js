// script.js
const menuToggle = document.getElementById("mobile-menu");
const nav = document.querySelector(".navbar ul");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
});