document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = "main.html";
});

function updateLoginStatus(isLoggedIn) {
  const loginIcon = document.getElementById("login-icon");
  const loginText = document.getElementById("login-text");
  const userProfile = document.getElementById("user-profile");

  if (isLoggedIn) {
    loginIcon.className = "fa-solid fa-xl fa-arrow-right-from-bracket";
    loginText.textContent = "Kirjaudu ulos";
    userProfile.style.display = "block";
  } else {
    userProfile.style.display = "none";
  }
}
