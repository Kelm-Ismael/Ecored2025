// login.js

// Credenciales de ejemplo (NO usar en producción)
const USERNAME = "admin";
const PASSWORD = "";

// Función para manejar el inicio de sesión
function login(event) {
  event.preventDefault(); // Evita el envío normal del formulario

  const userInput = document.getElementById("username").value;
  const passInput = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (userInput === USERNAME && passInput === PASSWORD) {
    message.textContent = "✅ Inicio de sesión exitoso";
    message.style.color = "green";

    // Redirigir a otra página
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } else {
    message.textContent = "❌ Usuario o contraseña incorrectos";
    message.style.color = "red";
  }
}

// Asociar la función al formulario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", login);
});
