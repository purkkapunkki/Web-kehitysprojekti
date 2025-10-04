const toggleButton = document.querySelector(".toggle-button");
const mainMenu = document.querySelector(".main-menu");

toggleButton.addEventListener("click", function () {
  // Toggles the active class
  mainMenu.classList.toggle("active");
  if (mainMenu.classList.contains("active")) {
    // Adds the close (x) icon
    toggleButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  } else {
    // Adds the hamburger icon
    toggleButton.innerHTML = '<i class="fa-solid fa-bars">';
  }
});
