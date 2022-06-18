function formatDate() {
  let today = new Date();
  let day = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let actDay = day[today.getDay()];
  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = today.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let nDay = `Today is ${actDay},${hour}:${min}`;
  return nDay;
}
let nDay = document.querySelector("#nowDay");
nDay.innerHTML = formatDate();

function displayWeathercondition(response) {
  console.log(response);
  let newTemp = Math.round(response.data.main.temp);
  document.querySelector("#valueC").innerHTML = newTemp;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  calcFarenheit();
}

function change(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  let apiKey = "840cae4b192e01b195c079d7573fc04f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(displayWeathercondition);
}
let form = document.querySelector("form");
form.addEventListener("submit", change);

function showFarenheit(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#valueF");
  farenheit.classList.replace("hide", "show");
  let celcius = document.querySelector("#valueC");
  celcius.classList.replace("show", "hide");
}
let ch2Farenheit = document.querySelector("#farenheit");
ch2Farenheit.addEventListener("click", showFarenheit);

function showCelcius(event) {
  event.preventDefault();
  let celcius = document.querySelector("#valueC");
  celcius.classList.replace("hide", "show");
  let farenheit = document.querySelector("#valueF");
  farenheit.classList.replace("show", "hide");
}
let ch2Celcius = document.querySelector("#celcius");
ch2Celcius.addEventListener("click", showCelcius);

function calcFarenheit() {
  let degry = document.querySelector("#valueC");
  let celcius = parseFloat(degry.textContent);
  let faren = Math.round(celcius * 1.8 + 32);
  let farenheit = document.querySelector("#valueF");
  farenheit.innerHTML = faren;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&limit=5&appid=840cae4b192e01b195c079d7573fc04f&units=metric`;
  axios.get(apiUrl).then(displayWeathercondition);
}
function geo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let yorPos = document.querySelector("#button-addon3");
yorPos.addEventListener("click", geo);
