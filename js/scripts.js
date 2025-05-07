document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("menuBody");
  if (tbody) {
    fetch("./data/menu.json")
      .then((res) => res.json())
      .then((data) => {
        let currentCat = null;

        data.sort((a, b) => {
          if (a.category > b.category) {
            return 1;
          }
          if (a.category < b.category) {
            return -1;
          }
          return 0;
        });

        data.forEach((item) => {
          if (item.category !== currentCat) {
            const catRow = document.createElement("tr");
            currentCat = item.category;

            catRow.classList.add("table-secondary");
            catRow.innerHTML = `<td colspan="7" class="fw-bold">${currentCat}</td>`;
            tbody.append(catRow);
          }

          const row = document.createElement("tr");
          row.innerHTML = `
            <td></td> 
            <td><img class="img-fluid table__img" src="images/${
              item.image
            }" alt="${item.name}"></td>
            <td class="table__name">${item.name}</td>
            <td>${item.description}</td>
            <td>${item.allergens}</td>
            <td>${item.calories}</td>
            <td class="table__price"><b>${item.price.toLocaleString()} Ft</b></td>
          `;
          tbody.append(row);
        });
      })
      .catch((err) => console.error("Hiba a menü betöltésekor:", err));
  }

  const galleryBody = document.getElementById("galleryBody");

  if (galleryBody) {
    fetch("./data/menu.json")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const div = document.createElement("div");
          div.classList.add("col-md-4", "col-sm-6");

          const a = document.createElement("a");
          a.href = `images/${item.image}`;
          a.classList.add("glightbox");

          const img = document.createElement("img");
          img.src = `images/${item.image}`;
          img.alt = item.name;
          img.classList.add("img-fluid", "gallery__img");

          a.appendChild(img);
          div.appendChild(a);
          galleryBody.appendChild(div);
        });

        const lightbox = GLightbox({ selector: ".glightbox" });
      })
      .catch((err) => console.error("Hiba a galéria betöltésekor:", err));
  }
});

// A foglalási űrlap beküldésének kezelése
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = readData(form);

  if (!validateForm(formData)) {
    return;
  }

  successMessage(formData);

  form.reset();
}

// A form adatok kiolvasása
const readData = (form) => {
  const name = form.name.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const date = form.date.value;
  const time = form.time.value;
  const guests = form.guests.value;
  const message = form.message.value;

  return { name, email, phone, date, time, guests, message };
};

// A form adatok validálása
const validateForm = (formData) => {
  const { name, email, phone, date, time, guests, message } = formData;
  const nameElement = document.getElementById("nameValidationError");
  const emailElement = document.getElementById("emailValidationError");
  const phoneElement = document.getElementById("phoneValidationError");
  const dateElement = document.getElementById("dateValidationError");
  const timeElement = document.getElementById("timeValidationError");
  const guestsElement = document.getElementById("guestsValidationError");
  const messageElement = document.getElementById("messageValidationError");
  const phoneRegex = /^\+?[0-9]{10,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isValid = true;

  // Hibaüzenetek alaphelyzetbe állítjuk, hogy ne maradjanak meg a régi üzenetek
  nameElement.innerText = "";
  nameElement.style.display = "none";
  emailElement.innerText = "";
  emailElement.style.display = "none";
  phoneElement.innerText = "";
  phoneElement.style.display = "none";
  dateElement.innerText = "";
  dateElement.style.display = "none";
  timeElement.innerText = "";
  timeElement.style.display = "none";
  guestsElement.innerText = "";
  guestsElement.style.display = "none";
  messageElement.innerText = "";
  messageElement.style.display = "none";

  if (!name) {
    nameElement.innerText = "Név megadása kötelező!";
    nameElement.style.display = "inline-block";
    isValid = false;
  } else if (name.trim().length < 10) {
    nameElement.innerText =
      "A névnek legalább 10 karakter hosszúnak kell lennie!";
    nameElement.style.display = "inline-block";
    isValid = false;
  }

  if (!email) {
    emailElement.innerText = "Email cím megadása kötelező!";
    emailElement.style.display = "inline-block";
    isValid = false;
  } else if (!emailRegex.test(email)) {
    emailElement.innerText = "Érvénytelen email cím!";
    emailElement.style.display = "inline-block";
    isValid = false;
  } else if (email.trim().length < 10) {
    emailElement.innerText =
      "Az email címnek legalább 10 karakter hosszúnak kell lennie!";
    emailElement.style.display = "inline-block";
    isValid = false;
  }

  if (!phone) {
    phoneElement.innerText = "Telefonszám megadása kötelező!";
    phoneElement.style.display = "inline-block";
    isValid = false;
  } else if (!phoneRegex.test(phone)) {
    phoneElement.innerText = "Érvénytelen telefonszám!";
    phoneElement.style.display = "inline-block";
    isValid = false;
  } else if (phone.trim().length < 10) {
    phoneElement.innerText =
      "A telefonszámnak legalább 10 karakter hosszúnak kell lennie!";
    phoneElement.style.display = "inline-block";
    isValid = false;
  }

  if (!date) {
    dateElement.innerText = "Dátum megadása kötelező!";
    dateElement.style.display = "inline-block";
    isValid = false;
  }

  if (!time) {
    timeElement.innerText = "Időpont megadása kötelező!";
    timeElement.style.display = "inline-block";
    isValid = false;
  }

  if (!guests) {
    guestsElement.innerText = "Add meg hány fős asztalt szeretnél foglalni!";
    guestsElement.style.display = "inline-block";
    isValid = false;
  }

  if (!message) {
    messageElement.innerText = "Megjegyzés megadása kötelező!";
    messageElement.style.display = "inline-block";
    isValid = false;
  } else if (message.trim().length < 10) {
    messageElement.innerText =
      "A megjegyzésnek legalább 10 karakter hosszúnak kell lennie!";
    messageElement.style.display = "inline-block";
    isValid = false;
  }

  return isValid;
};

const successMessage = (formData) => {
  alert(
    `Kedves ${formData.name}!\n\nA foglalásod sikeresen elküldve!\n\nFoglalási adatok:\nNév: ${formData.name}\nEmail: ${formData.email}\nTelefonszám: ${formData.phone}\nDátum: ${formData.date}\nIdőpont: ${formData.time}\nVendégek száma: ${formData.guests}\nMegjegyzés: ${formData.message}`
  );
};
