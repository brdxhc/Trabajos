document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.getElementById("calendar-body");
  const currentMonth = document.getElementById("currentMonth");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");
  const clearSelectionBtn = document.getElementById("clearSelection");
  const makeReservationBtn = document.getElementById("makeReservation");
  const cancelReservationBtn = document.getElementById("cancelReservation");
  const reservationTypeSelect = document.getElementById("reservationType");
  const detailsForm = document.getElementById("detailsForm");
  const finalizeReservationBtn = document.getElementById("finalizeReservation");
  const checkAvailabilityBtn = document.getElementById("checkAvailability");
  const availabilityMessage = document.getElementById("availabilityMessage");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const idNumberInput = document.getElementById("idNumber");
  const emailInput = document.getElementById("email");
  const extraRequestsInput = document.getElementById("extraRequests");
  const backToHomeBtn = document.createElement("a");

  backToHomeBtn.href = "../index.html";
  backToHomeBtn.textContent = "← Volver a Inicio";
  backToHomeBtn.classList.add("back-to-home");
  document.body.insertBefore(backToHomeBtn, document.body.firstChild);

  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonthIndex = date.getMonth();
  let selectedDays = [];
  let bookedDates = {};
  let reservationDetails = null;

  generateCalendar(currentMonthIndex, currentYear);

  function generateCalendar(month, year) {
    calendarBody.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    currentMonth.textContent = new Date(year, month).toLocaleDateString(
      "es-ES",
      {
        year: "numeric",
        month: "long",
      }
    );

    let row = document.createElement("tr");
    for (let i = 0; i < firstDay; i++) {
      row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= lastDay; day++) {
      if (row.children.length === 7) {
        calendarBody.appendChild(row);
        row = document.createElement("tr");
      }
      const cell = document.createElement("td");
      cell.textContent = day;
      const dateStr = `${day}/${month + 1}/${year}`;

      if (bookedDates[dateStr] && bookedDates[dateStr] >= 2) {
        cell.classList.add("unavailable");
        cell.style.backgroundColor = "#e74c3c";
        cell.style.color = "white";
      } else {
        cell.classList.add("available");
        cell.style.backgroundColor = "#27ae60";
        cell.addEventListener("click", () =>
          toggleDaySelection(cell, day, month, year)
        );
      }

      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }

  function toggleDaySelection(cell, day, month, year) {
    const dateStr = `${day}/${month + 1}/${year}`;
    if (selectedDays.includes(dateStr)) {
      selectedDays = selectedDays.filter(
        (selectedDay) => selectedDay !== dateStr
      );
      cell.style.backgroundColor = "#27ae60";
    } else {
      if (bookedDates[dateStr] && bookedDates[dateStr] >= 2) {
        alert("Esta fecha ya no está disponible.");
      } else {
        selectedDays.push(dateStr);
        cell.style.backgroundColor = "#3498db";
      }
    }
  }

  prevMonthBtn.addEventListener("click", () => {
    currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    generateCalendar(currentMonthIndex, currentYear);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonthIndex = (currentMonthIndex + 1) % 12;
    generateCalendar(currentMonthIndex, currentYear);
  });

  makeReservationBtn.addEventListener("click", function () {
    if (selectedDays.length === 0) {
      alert("No has seleccionado ningún día para hacer una reserva.");
    } else {
      detailsForm.style.display = "block";
    }
  });

  finalizeReservationBtn.addEventListener("click", function () {
    if (
      firstNameInput.value &&
      lastNameInput.value &&
      idNumberInput.value &&
      emailInput.value
    ) {
      reservationDetails = {
        fechas: [...selectedDays],
        tipo: reservationTypeSelect.value,
        nombre: firstNameInput.value,
        apellido: lastNameInput.value,
        cedula: idNumberInput.value,
        correo: emailInput.value,
        solicitudesExtras: extraRequestsInput.value,
      };

      alert(
        `Reserva Confirmada:\nNombre: ${reservationDetails.nombre} ${
          reservationDetails.apellido
        }\nTipo de Reserva: ${
          reservationDetails.tipo
        }\nFechas: ${reservationDetails.fechas.join(
          ", "
        )}\nCorreo de Confirmación enviado a: ${reservationDetails.correo}`
      );
    } else {
      alert("Por favor, complete todos los campos obligatorios.");
    }
  });

  cancelReservationBtn.addEventListener("click", function () {
    if (!reservationDetails) {
      alert("No tienes ninguna reserva activa para cancelar.");
    } else {
      if (confirm("¿Estás seguro de que deseas cancelar tu reserva?")) {
        alert("Tu reserva ha sido cancelada.");
        reservationDetails.fechas.forEach((date) => {
          if (bookedDates[date]) {
            bookedDates[date]--;
            if (bookedDates[date] === 0) {
              delete bookedDates[date];
            }
          }
        });

        reservationDetails = null;
        selectedDays = [];
        generateCalendar(currentMonthIndex, currentYear);
        detailsForm.style.display = "none";
      }
    }
  });

  clearSelectionBtn.addEventListener("click", function () {
    document.querySelectorAll("#calendar td.available").forEach((cell) => {
      cell.style.backgroundColor = "#27ae60";
    });
    selectedDays = [];
  });

  backToHomeBtn.addEventListener("click", function () {
    window.location.href = "../index.html";
  });

  function calculatePrice(days) {
    const pricePerNight = 100;
    const pricePerGuest = 20;

    if (reservationTypeSelect.value === "cabanas") {
      return days * pricePerNight;
    } else if (reservationTypeSelect.value === "restaurante") {
      return numGuestsInput.value * pricePerGuest;
    }

    return 0;
  }

  function displayReservationDetails() {
    let reservationSummary = `
      Reserva Confirmada:
      Nombre: ${reservationDetails.nombre} ${reservationDetails.apellido}
      Cédula: ${reservationDetails.cedula}
      Correo Electrónico: ${reservationDetails.correo}
      Tipo de Reserva: ${reservationDetails.tipo}
      Fechas Reservadas: ${reservationDetails.fechas.join(", ")}
      Solicitudes Extras: ${reservationDetails.solicitudesExtras}
    `;

    alert(reservationSummary);
  }
});
