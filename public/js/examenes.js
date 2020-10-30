document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});
const addBtn = document.querySelector('#addBtn');

document.querySelector('table tbody').addEventListener('click', function(event) {
  if (event.target.className === "delete-row-btn") {
      deleteRowById(event.target.dataset.id);
  }
  if (event.target.className === "edit-row-btn") {
      handleEditRow(event.target.dataset.id);
  }
});

function deleteRowById(id) {
  fetch('http://localhost:5000/delete/' + id, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          location.reload();
      }
  });
}

const updateBtn = document.querySelector('#update-row-btn');

addBtn.onclick = function () {
 
  const nameInput = document.querySelector("#name-input");

  const periodoInput = document.querySelector("#periodo-input");
  const semestreInput = document.querySelector("#semestre-input");
  const fechaInput = document.getElementById("fecha-input");
  const salonInput = document.getElementById("salon-input");
  const horarioInput = document.getElementById("horario-input");
  const nombre = nameInput.value;
  const fecha = fechaInput.value;
  const periodo = periodoInput.value;
  const semestre = semestreInput.value;
  const salon= salonInput.value;
  const horario = horarioInput.value;
  nameInput.value = "";
  fechaInput.value = "";
  periodoInput.value = "";
  semestreInput.value = "";
  salonInput.value = "";
  horarioInput.value = "";


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
      salon : salon,
      horario : horario
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
    table.innerHTML = "<tr><td class='no-data' colspan='9'>No Data</td></tr>";
    return;
  }

  let tableHtml = "";

  data.forEach(function ({ id_exam, nombre, fecha,periodo,semestre, salon,horario}) {
    fecha =new Date(fecha).getDate() + "/" +new Date(fecha).getMonth() + "/"+ new Date(fecha).getFullYear()
    tableHtml += "<tr>";
    tableHtml += `<td>${id_exam}</td>`;
    tableHtml += `<td>${nombre}</td>`;
    tableHtml += `<td>${fecha}</td>`;
    tableHtml += `<td>${periodo}</td>`;
    tableHtml += `<td>${semestre}</td>`;
    tableHtml += `<td>${salon}</td>`;
    tableHtml += `<td>${horario}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id_exam}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id_exam}>Edit</td>`;
    tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
  
}

function handleEditRow(id) {
  const updateSection = document.querySelector('#update-row');
  updateSection.hidden = false;
  document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function() {
  const updateNameInput = document.querySelector('#update-name-input');


  console.log(updateNameInput);

  fetch('http://localhost:5000/update', {
      method: 'PATCH',
      headers: {
          'Content-type' : 'application/json'
      },
      body: JSON.stringify({
          id: updateNameInput.dataset.id,
          name: updateNameInput.value
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          location.reload();
      }
  })
}
