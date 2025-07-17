document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const rawPassword = document.getElementById("password").value.trim();

  if (rawPassword.length < 8) {
    alert("Mot de passe trop court. Minimum 8 caractères.");
    return;
  }

  // Hachage avec bcrypt
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(rawPassword, salt);

  // Afficher le résultat dans la page
  document.getElementById("result").innerHTML =
    "✅ Inscription réussie !<br>Nom d'utilisateur : <b>" +
    username +
    "</b><br>Mot de passe haché : <br><textarea style='width:100%;height:100px'>" +
    hashedPassword +
    "</textarea>";

  // Tu peux ensuite envoyer ces données à un backend (Firebase, Node, etc.)
});
