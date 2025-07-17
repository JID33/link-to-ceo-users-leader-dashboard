document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullname = document.getElementById('fullname').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirm = document.getElementById('confirm').value;

      if (password !== confirm) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      localStorage.setItem('user', JSON.stringify({ fullname, email, password: hashedPassword }));
      alert("Inscription réussie !");
      window.location.href = "login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const user = JSON.parse(localStorage.getItem('user'));

      if (user && user.email === email) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          alert("Connexion réussie !");
          localStorage.setItem("isAdmin", true);
          window.location.href = "admin.html";
        } else {
          alert("Mot de passe incorrect !");
        }
      } else {
        alert("Utilisateur non trouvé.");
      }
    });
  }
});
