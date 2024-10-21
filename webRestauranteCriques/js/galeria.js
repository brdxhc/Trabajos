// Función para abrir una imagen en una ventana modal
document.querySelectorAll(".gallery-img").forEach((image) => {
  image.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const img = document.createElement("img");
    img.src = image.src;
    modal.appendChild(img);

    // Añadir la modal al cuerpo del documento
    document.body.appendChild(modal);

    // Cerrar la modal al hacer clic
    modal.addEventListener("click", () => {
      document.body.removeChild(modal);
    });
  });
});
