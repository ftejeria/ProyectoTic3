document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});
const addBtn = document.querySelector('#addBtn');


addBtn.onclick = function () {
 
  const nameInput = document.querySelector("#name-input");

  const periodoInput = document.querySelector("#periodo-input");
  const semestreInput = document.querySelector("#semestre-input");
  const fechaInput = document.getElementById("fecha-input");
  const nombre = nameInput.value;
  const fecha = fechaInput.value;
  const periodo = periodoInput.value;
  const semestre = semestreInput.value;
  nameInput.value = "";
  fechaInput.value = "";
  periodoInput.value = "";
  semestreInput.value = "";


  fetch("http://localhost:5000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      nombre: nombre,
      fecha: fecha,
      periodo: periodo,
      semestre: semestre,
    }),
  })
    .then((response) => response.json())
    .then((data) => insertRowIntoTable(data["data"]));
};

function insertRowIntoTable(data) {
  const table = document.getElementById("table");
  const isTableData = table.querySelector(".no-data");

  let tableHtml = "<tr>";

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === "fecha") {
        data[key] = new Date(data[key]).toLocaleString();
      }
      tableHtml += `<td>${data[key]}</td>`;
    }
  }



  tableHtml += "</tr>";

  if (isTableData) {
    table.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
  location.reload();
}

function loadHTMLTable(data) {
  const table = document.getElementById("tableBody");

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }

  let tableHtml = "";

  data.forEach(function ({ id_exam, nombre, fecha }) {
    tableHtml += "<tr>";
    tableHtml += `<td>${id_exam}</td>`;
    tableHtml += `<td>${nombre}</td>`;
    tableHtml += `<td>${new Date(fecha).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id_exam}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id_exam}>Edit</td>`;
    tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
  
}
