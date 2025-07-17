function hideAllForms() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("adminForm").style.display = "none";
  document.getElementById("contactForm").style.display = "none";
}

function showLogin() {
  hideAllForms();
  document.getElementById("loginForm").style.display = "block";
}

function showAdminLoginRegister() {
  hideAllForms();
  document.getElementById("adminForm").style.display = "block";
}

function showContactAdmin() {
  hideAllForms();
  document.getElementById("contactForm").style.display = "block";
}
