var details = [];
var index = 0;
var userindex = 0;
var flightid = 0;
var allflight = [];

window.addEventListener("load", (event) => {
  console.log("Hello");
  var NodesString = "";
  var i = 0;
  fetch("http://localhost:2233/getflight", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      details = data;
      NodesString += `<option value="Select Your Flight" id="flight-0" >Select Your Flight</option>`;
      data.forEach((elem, id) => {
        i++;
        NodesString += addTopics(`${elem.location} to ${elem.destination} ${elem.Flighttime}`, id);
      });
      console.log(NodesString);
      var UlElement = document.getElementById("topic-box");
      UlElement.insertAdjacentHTML("beforeend", NodesString);

      function addTopics(flight, id) {
        let box = `<option value="${flight}" id="flight-${id}" >${flight}</option>`;
        return box;
      }

      document.getElementById("topic-box").addEventListener('change', (e) => {
        index = document.getElementById("topic-box").selectedIndex;
        console.log(details);

        document.getElementById("pnr").innerText = details[index - 1].pnr;
        document.getElementById("charges").innerText = details[index - 1].charges;
        document.getElementById("date").innerText = details[index - 1].Date;
        flightid = details[index - 1]._id;
        localStorage.setItem("pnr", details[index - 1].pnr);
        localStorage.setItem("charges", details[index - 1].charges);
        localStorage.setItem("date", details[index - 1].Date);
        localStorage.setItem("flight", flightid);  // Ensure flight ID is stored
      });

    });
});

document.getElementById("search").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("fehfjwjh");
  window.location.href = "login.html";
  document.getElementById("flight").innerText = details[index];
});

async function getValues() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const flight = localStorage.getItem("flight");  // Retrieve flight ID from localStorage

  fetch("http://localhost:2233/signup", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name,
      phoneNumber: phone,
      email,
      age,
      flight  // Include flight ID in request body
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      userindex = data.save._id;
      localStorage.setItem("user", data.save._id);
      window.location.href = "seta.html";
    })
    .catch(function (res) {
      console.log(res);
    });

  console.log(localStorage.getItem("flight"));
}


function getallticket() {
  // Implementation for getting all tickets
}

function createSeats(container, start, end) {
  allflights = JSON.parse(localStorage.getItem("allflight"));
  console.log(allflights);
  for (var i = start; i <= end; i++) {
    var seat = document.createElement("div");
    seat.classList.add("seat");
    seat.textContent = i;
    console.log(allflight.find((item) => item.seatno === i));
    seat.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.setItem("seat", this.textContent);
      console.log("Seat " + this.textContent + " toggled");
    });
    container.appendChild(seat);
  }
}

var leftColumns = document.querySelectorAll(".seats-container")[0].querySelectorAll(".seats-column");
var rightColumns = document.querySelectorAll(".seats-container")[1].querySelectorAll(".seats-column");

createSeats(leftColumns[0], 1, 6);
createSeats(leftColumns[1], 7, 12);
createSeats(leftColumns[2], 13, 18);
createSeats(rightColumns[0], 19, 24);
createSeats(rightColumns[1], 25, 30);
createSeats(rightColumns[2], 31, 36);

function getseat() {
  console.log("hhjhjh");
}