document.addEventListener("DOMContentLoaded", () => {
  fetch("./data/menu.json")
    .then((res) => res.json())
    .then((data) => {
      const tbody = document.getElementById("menuBody");
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
});
