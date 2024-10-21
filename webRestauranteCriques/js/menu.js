// Variables para gestionar el pedido actual y el total
let currentOrder = [];
let total = 0;

// Referencias a los elementos HTML
const orderList = document.getElementById("order-list");
const totalAmount = document.getElementById("total-amount");
const submitOrderBtn = document.getElementById("submit-order");
const clearOrderBtn = document.getElementById("clear-order");

// Función para añadir un plato al pedido
document.querySelectorAll(".add-to-order").forEach((button) => {
  button.addEventListener("click", (event) => {
    const itemName = event.target.getAttribute("data-name");
    const itemPrice = parseInt(event.target.getAttribute("data-price"));

    // Añadir el plato a la lista del pedido
    currentOrder.push({ name: itemName, price: itemPrice });

    // Actualizar la vista del pedido
    const listItem = document.createElement("li");
    listItem.textContent = `${itemName} - ₡${itemPrice}`;
    orderList.appendChild(listItem);

    // Actualizar el total
    total += itemPrice;
    totalAmount.textContent = total;
  });
});

// Función para enviar el pedido
submitOrderBtn.addEventListener("click", () => {
  if (currentOrder.length === 0) {
    alert("No has seleccionado ningún plato.");
  } else {
    const orderDetails = currentOrder
      .map((item) => `${item.name} (₡${item.price})`)
      .join(", ");
    alert(`Tu pedido ha sido enviado:\n${orderDetails}\nTotal: ₡${total}`);
    console.log("Pedido enviado:", currentOrder);
    clearOrder(); // Limpiar el pedido después de enviarlo
  }
});

// Función para limpiar el pedido
clearOrderBtn.addEventListener("click", clearOrder);

function clearOrder() {
  currentOrder = [];
  total = 0;
  orderList.innerHTML = ""; // Vaciar la lista visual
  totalAmount.textContent = total; // Restablecer el total a 0
}
