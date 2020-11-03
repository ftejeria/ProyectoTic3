document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});
const addBtn = document.querySelector("#addBtn");

document
  .querySelector("table tbody")
  .addEventListener("click", function (event) {
    if (event.target.className === "delete-row-btn") {
      deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
      handleEditRow(event.target.dataset.id);
    }
  });

function deleteRowById(id) {
  fetch("http://localhost:5000/delete/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
}

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
  const salon = salonInput.value;
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
      salon: salon,
      horario: horario,
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

  data.forEach(function ({
    id_exam,
    nombre,
    fecha,
    periodo,
    semestre,
    salon,
    horario,
  }) {
    fecha =
      new Date(fecha).getDate() +
      "/" +
      new Date(fecha).getMonth() +
      "/" +
      new Date(fecha).getFullYear();
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

function buscarNombre() {
  var input, filter, table, tr, td, i, txtValue,txtValue2,txtValue3;
  input = document.getElementById("myInputNombre");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().startsWith(filter)) {
        tr[i].style.display = "";

      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function buscarSemestre(){
  var input, filter, table, tr, td, i, txtValue,txtValue2,txtValue3;
  input = document.getElementById("myInputNombre");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  input2 = document.getElementById("myInputSemestre");
  filter2 = input2.value.toUpperCase();
  if (input2.value != "") {
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue2 = td.textContent || td.innerText;
        if (txtValue2.toUpperCase().startsWith(filter2) ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


}

function buscarPeriodo(){
  var input, filter, table, tr, td, i, txtValue,txtValue2,txtValue3;
  input = document.getElementById("myInputNombre");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  input3 = document.getElementById("myInputPeriodo");
  filter3 = input3.value.toUpperCase();

  if (input3.value != "") {
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
        txtValue3 = td.textContent || td.innerText;
        if (txtValue3.toUpperCase()==filter3 ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      
    }
  }

}

function buscar (){

  var input, filter, table, tr, td, i, txtValue,txtValue2,txtValue3;
  input = document.getElementById("myInputNombre");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  input2 = document.getElementById("myInputSemestre");
  filter2 = input2.value.toUpperCase();
  input3 = document.getElementById("myInputPeriodo");
  filter3 = input3.value.toUpperCase();



  if (input.value != "" && input2.value != "" && input3.value != "" ){
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      td2 = tr[i].getElementsByTagName("td")[3];
      td3 = tr[i].getElementsByTagName("td")[4];
      if(td && td2 && td3){
        txtValue = td.textContent || td.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        txtValue3 = td3.textContent || td3.innerText;

        if (txtValue3.toUpperCase()==filter3 && txtValue2.toUpperCase()==filter2 && txtValue.toUpperCase().startsWith(filter) ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
      
    }

  }
  else if (input.value == "" && input2.value == "" && input3.value == "" ) {
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
        
    }
  }

}


