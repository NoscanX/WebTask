document
  .getElementById("burger__button")
  .addEventListener("click", function () {
    document.getElementById("menu").classList.toggle("active");
    document.getElementById("navbar__backdrop").classList.toggle("active");
  });

document
  .getElementById("navbar__backdrop")
  .addEventListener("click", function () {
    closeMenu();
  });

document.querySelectorAll(".navbar__dropdown a").forEach((link) => {
  link.addEventListener("click", function () {
    closeMenu();
  });
});

function closeMenu() {
  document.getElementById("menu").classList.remove("active");
  document.getElementById("navbar__backdrop").classList.remove("active");
}
