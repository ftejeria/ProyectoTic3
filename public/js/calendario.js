let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let data2;
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => showCalendar(currentMonth, currentYear, data["data"]));
});



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

let monthAndYear = document.getElementById("monthAndYear");

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear, data2);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear, data2);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear, data2);
}

function addEvent(date, month, year, materia, data) {
  var celId = date + (parseInt(month) + 1).toString() + year;
  if (year == currentYear && month + 1 == currentMonth + 1) {
    let eventDay = document.getElementById(celId);
    var event = document.createTextNode(materia);
    var h = document.createElement("button");
    h.className = "btn materia";
    h.id = materia;
    h.style =
      "margin-left:1px;margin-top:1px;background-color:#004e91;color:white";
    h.addEventListener("click", (event) => {
      informar(h.id, data);
    });
    h.appendChild(event);
    eventDay.appendChild(h);
  }
}

function showCalendar(month, year, data) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
  data2 = data;
  let tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML =
    '<div style=" color:rgba(194, 113, 0, 1);" >' +
    months[month] +
    " " +
    year +
    '<button class="btn btn-outline-primary botones" id="previous" onclick="previous()" style="margin-left:37%; background-color: #004e91; color:white;">' +
    "Mes anterior" +
    "</button>" +
    '<button class="btn btn-outline-primary  "id="next"onclick="next()" style="background-color: #004e91; color:white;"> ' +
    "Proximo mes" +
    " </button>";
  selectYear.value = year;
  selectMonth.value = month;
  +"</div>";

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
        var celId = date.toString() + (month + 1).toString() + year.toString();
        cell.setAttribute("id", celId);
        let cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.style.backgroundColor = "#bfbfbf";
        } // color today's date
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
        cell.innerHTML += "<br>";
      }
    }

    tbl.appendChild(row); // appending each row into calendar body.
  }
  for (let index = 0; index < data.length; index++) {
    fecha = new Date(data[index].fecha);

    addEvent(
      fecha.getDate(),
      fecha.getMonth(),
      fecha.getFullYear(),
      data[index].nombre,
      data
    );
  }
}

var mouseTarget = document.getElementsByClassName("btn materia");

//for (let index = 0; index < 5; index++) {

//mouseTarget[index].addEventListener("click", (event) => {

//   informar(mouseTarget[index].id);

//});
//}

console.log(2);
function informar(boton, data) {
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

  for (let i = 0; i < data.length; i++) {
    if (boton == data[i].nombre) {
      document.getElementById("materia").innerHTML = data[i].nombre;
      document.getElementById("Salon").innerHTML = "Salon : " + data[i].salon;
      document.getElementById("Fecha").innerHTML =
        "Fecha : " + data[i].fecha.toString().substring(0, 10);
      document.getElementById("Semestre").innerHTML =
        "Semestre : " + data[i].semestre;
      document.getElementById("Horario").innerHTML =
        "Horario : " + data[i].horario;
      document.getElementById("Periodo").innerHTML =
        "Periodo : " + data[i].periodo;
    }
  }
}

const searchBtn = document.getElementById("botonFiltrar");

function filtrar() {
  let dataFiltrada = [];
  const nombreInput = document.querySelector("#search-input-nombre");
  const periodoInput = document.getElementById("periodo-input");

  const carreraInput = document.getElementById("carrera-input");
  const semestreInput = document.getElementById("semestre-input");
  const periodo = periodoInput.value;

  const semestre = semestreInput.value;
  const carrera = carreraInput.value;
  const nombre = nombreInput.value;
  carreraInput.value = "Selecione...";
  periodoInput.value = "Selecione...";
  semestreInput.value = "Selecione...";
  nombreInput.value = "";

  console.log(periodo, nombre, semestre, carrera);
  for (let index = 0; index < data2.length; index++) {
    if (nombre != "" && nombre != data2[index]["nombre"]) {
      console.log("1");
      continue;
    }
    if (semestre != "Selecione..." && semestre != data2[index]["semestre"]) {
      console.log("2");
      continue;
    }
    if (periodo !="Selecione..." && periodo != data2[index]["periodo"]) {
      console.log("3");
      continue;
    }
    if (carrera != "Selecione..." && carrera != data2[index]["carrera"]) {
      console.log("4");
      continue;
    }

    dataFiltrada.push(data2[index]);
  }

  showCalendar(currentMonth, currentYear, dataFiltrada);
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


function limpiar (){
  fetch("http://localhost:5000/getAll")
  .then((response) => response.json())
  .then((data) => showCalendar(currentMonth, currentYear, data["data"]));
}
