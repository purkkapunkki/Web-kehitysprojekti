document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = "main.html";
});

function updateLoginIcon(isLoggedIn) {
  const loginIcon = document.getElementById("login-icon");

  if (isLoggedIn) {
    loginIcon.className = "fa-solid fa-xl fa-arrow-right-from-bracket";
  }
}
