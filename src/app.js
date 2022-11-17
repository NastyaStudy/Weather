
let currentDate = new Date();
let now = document.querySelector(".now-date");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[currentDate.getDay()];
let month = currentDate.getMonth();
month++;
let year = currentDate.getFullYear();
let date = currentDate.getDate();

function addZerro(current){
    if(current < 10){
        current = `0${current}`;
    }
    return current;
}

now.innerHTML = `${addZerro(date)}.${addZerro(month)}.${year}`;
let currentDay = document.querySelector(".day-of-week");
currentDay.innerHTML = day;
let currentTime = document.querySelector(".now-time");
let currentHour = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();
currentTime.innerHTML = `${currentHour}:${addZerro(currentMinutes)}`;




let form = document.querySelector(".city-selection");

function changeCity(event){
    event.preventDefault();
    let city = document.querySelector(".current-city");
    let inputCity = document.querySelector(".input-city");
    city.innerHTML = inputCity.value;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showTemperature);
}
form.addEventListener("submit", changeCity);



function fromCoord(coordinates){
   let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;


}

function showTemperature(response){
    let currentTemperature = document.querySelector(".current-temperature");
    let feelsLike= document.querySelector(".feels-like");
    let humidity= document.querySelector(".humidity");
    let windy= document.querySelector(".windy");
    let country= document.querySelector(".country");
    let city = document.querySelector(".current-city");
    currenMetric = response.data.main.temp;
    country.innerHTML = response.data.sys.country;
    city.innerHTML = response.data.name;
    windy.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
    humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
    feelsLike.innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}°C`;
    currentTemperature.innerHTML = `${Math.round(currenMetric)}`;


    let iconElement = document.querySelector(".current-img");
    iconElement.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
    

    fromCoord(response.data.coord);
    getForecast(response.data.coord);
    
   }

let currenMetric = null;
let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
let city = "Vinnytsia";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showTemperature);

 let currentGeolocation = document.querySelector(".current-geolocation");
 currentGeolocation.addEventListener("click", getCurrentLocation);

 function handlePosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
       geolocationPosition();
  }

   function getCurrentLocation(event) {
  event.preventDefault();
   navigator.geolocation.getCurrentPosition(handlePosition);
}

 function geolocationPosition(){
axios.get(apiUrl).then(showTemperature);
 }

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return days[day];
}

function showForecast(response) {
 console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row text-center">`;
   forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col forecast">
            ${formatDay(
              forecastDay.dt
            )} <br />
                <img src="img/${
                forecastDay.weather[0].icon
              }.png" id="icon1" width="90%" />
              <br /> <span class="max">
            ${Math.round(forecastDay.temp.max)}°C
            </span>
            <span>|</span>
            <span class="temperature-min">
            ${Math.round(forecastDay.temp.min)}°C
            </span>
                     </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}