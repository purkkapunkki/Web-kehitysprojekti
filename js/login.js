document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = "main.html";
});

function updateLoginStatus(isLoggedIn) {
  const loginIcon = document.getElementById("login-icon");
  const loginText = document.getElementById("login-text");

  if (isLoggedIn) {
    loginIcon.className = "fa-solid fa-xl fa-arrow-right-from-bracket";
    loginText.textContent = "Kirjaudu ulos";
  }
}
