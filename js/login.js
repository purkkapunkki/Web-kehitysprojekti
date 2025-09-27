 // Näytetään logout-viesti, kun käyttäjä on kirjautunut ulos
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("loggedout") === "true") {
      document.getElementById("logoutMessage").textContent = "Olet kirjautunut ulos onnistuneesti.";
    }

    // Login demo
    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Kirjautuminen onnistui (demo).");
      //alku testi että sisään kirjautuminen toimii
      window.location.href = "menu.html"; // Ohjataan käyttäjä menu.html-sivulle 
      // mutta toisaalta pitäisi olla sitten 
      // se non hidden/ signed in sivu....
    });