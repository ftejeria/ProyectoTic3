let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:5000/getAll')
  .then(response => response.json())
  .then(data => loadHTMLTable(data['data']));
  
});



function loadHTMLTable(data) {
  console.log("hola")
  const table = document.querySelector('tableBody');

  if (data.length === 0) {
      table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
      return;
  }

  let tableHtml = "";

  data.forEach(function ({id_exam, nombre, fecha}) {
      tableHtml += "<tr>";
      tableHtml += `<td>${id_exam}</td>`;
      tableHtml += `<td>${nombre}</td>`;
      tableHtml += `<td>${new Date(fecha).toLocaleString()}</td>`;
      tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
      tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
      tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let materias = [
  { nombre: "Calculo", Fecha: "21/10/2020", Salon: "E103" },
  { nombre: "Analisis", Fecha: "21/10/2020", Salon: "E103" },
];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function addEvent(date, month, year, materia) {
  var celId = date + (parseInt(month) - 1).toString() + year;
  let eventDay = document.getElementById(celId);
  var event = document.createTextNode(materia);
  var h = document.createElement("button");
  h.className = "btn materia";
  h.id = materia;
  h.style = "margin-left:1px;";
  h.appendChild(event);
  eventDay.appendChild(h);
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML =
    months[month] +
    " " +
    year +
    '<button class="btn btn-outline-primary botones" id="previous" onclick="previous()" style="margin-left:37%">' +
    "Mes anterior" +
    "</button>" +
    '<button class="btn btn-outline-primary "id="next"onclick="next()">' +
    "Proximo mes" +
    " </button>";
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");
    row.setAttribute("class", "rowC");

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        cell.setAttribute("class", "cell");
        var celId = date.toString() + month.toString() + year.toString();
        cell.setAttribute("id", celId);
        let cellText = document.createTextNode("");
        cell.innerHTML += "<br>";
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        cell.setAttribute("class", "cell");
        var celId = date.toString() + month.toString() + year.toString();
        cell.setAttribute("id", celId);
        let cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("bg-info");
        } // color today's date
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
        cell.innerHTML += "<br>";
      }
    }

    tbl.appendChild(row); // appending each row into calendar body.
  }
  for (let index = 0; index < materias.length; index++) {
    addEvent(
      materias[index].Fecha.split("/")[0],
      materias[index].Fecha.split("/")[1],
      materias[index].Fecha.split("/")[2],
      materias[index].nombre
    );
  }
}

const mouseTarget = document.getElementsByClassName("btn materia");

function informar(boton) {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById(boton);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal

  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  for (let i = 0; i < materias.length; i++) {
    if (boton == materias[i].nombre) {
      document.getElementById("materia").innerHTML = materias[i].nombre;
      document.getElementById("Salon").innerHTML =
        "Salon :" + materias[i].Salon;
      document.getElementById("Fecha").innerHTML =
        "Fecha :" + materias[i].Fecha;
    }
  }
}

for (let index = 0; index < mouseTarget.length; index++) {
  mouseTarget[index].addEventListener("click", (event) => {
     
       informar(mouseTarget[index].id);
     
  });
}

function moveCalendar() {
  document.getElementById("slicingCalendar").style = "margin-left: 160px ";
  document.getElementById("Barra").style = "margin-left: 170px ";
}
function returnCalendar() {
  document.getElementById("slicingCalendar").style = "margin-left: 0px ";
  document.getElementById("Barra").style = "margin-left: 15px ";
}

document.getElementById("slicing").addEventListener("mouseenter", (e) => {
  moveCalendar();
});
document.getElementById("slicing").addEventListener("mouseleave", (e) => {
  returnCalendar();
});

