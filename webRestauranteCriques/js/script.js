// Este script es más simple, ya que los enlaces van a otras páginas
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", function (event) {
    // Permitir que el enlace navegue normalmente a la nueva página
    window.location.href = this.getAttribute("href");
  });
});
// Aquí puedes añadir interacciones futuras para la página principal
console.log("Página principal cargada correctamente.");
