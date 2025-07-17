document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Inscription réussie (fictive)");
});

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Connexion réussie (fictive)");
});

document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const pwd = e.target.querySelector("input").value;
  if (pwd === "admin123") {
    alert("Bienvenue dans l'espace admin !");
    // Tu peux rediriger ici
    // window.location.href = "admin.html";
  } else {
    alert("Mot de passe incorrect !");
  }
});
