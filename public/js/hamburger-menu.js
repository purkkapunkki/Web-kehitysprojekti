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

function updateLoginStatus(isLoggedIn) {
  const loginMenuItem = document.getElementById("login-menu-item");
  const logoutMenuItem = document.getElementById("logout-menu-item");
  const userProfile = document.getElementById("user-profile");

  if (isLoggedIn) {
    loginMenuItem.classList.add("hidden");
    logoutMenuItem.classList.remove("hidden");
    userProfile.classList.remove("hidden");
  } else {
    loginMenuItem.classList.remove("hidden");
    logoutMenuItem.classList.add("hidden");
    userProfile.classList.add("hidden");
  }
}
