
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


let metric = document.querySelector("#metric");
let imperial = document.querySelector("#imperial");
metric.addEventListener("click", toMetric);
imperial.addEventListener("click", toImperial);

function toImperial(event){
    event.preventDefault();
    let temperatureElement = document.querySelector(".current-temperature");
    metric.classList.remove("active");
    imperial.classList.add("active");
    let imperialTemperature= (currenMetric * 9) / 5 + 32;
    temperatureElement.innerHTML= Math.round(imperialTemperature);
}

function toMetric(event){
    event.preventDefault();
    let temperatureElement=document.querySelector(".current-temperature");
    metric.classList.add("active");
    imperial.classList.remove("active");
    temperatureElement.innerHTML= Math.round(currenMetric);
}

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

    fromCoord(response.data.coord);
  
    let currentImg = document.querySelector(".current-img");
    let currentSky = response.data.weather[0].id;
    if(whatPartOfDay()){

    if(currentSky === 800) {  
    currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/606/original/weather10.png?1663690328`);
    }

    if(currentSky === 701 || currentSky === 711 || currentSky === 721 || currentSky === 731 || currentSky === 741 || currentSky === 751 || currentSky === 761 || currentSky === 762 || currentSky === 771 || currentSky === 781) {  
    currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/606/original/weather10.png?1663690328`);
    }

    if(currentSky === 801 || currentSky === 802){
       currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/608/original/weather1.png?1663690654`);
    }

    else {
        if(currentSky === 800) {  
    currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/607/original/weather11.png?1663690350`);
    }
    if(currentSky === 701 || currentSky === 711 || currentSky === 721 || currentSky === 731 || currentSky === 741 || currentSky === 751 || currentSky === 761 || currentSky === 762 || currentSky === 771 || currentSky === 781) {  
    currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/607/original/weather11.png?1663690350`);
    }
    if(currentSky === 801 || currentSky === 802){
       currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/050/561/original/weather9.png?1667044634`);
    }
    }

   }
    if(currentSky === 803 || currentSky === 804 || currentSky === 301){
       currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/598/original/weather7.png?1663681638`);
    }

    // Storm
    if(currentSky === 200 || currentSky === 201 || currentSky === 202 || currentSky === 210 || currentSky === 211 || currentSky === 212 || currentSky === 221 || currentSky === 230 || currentSky === 231 || currentSky === 232) {  
    currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/599/original/weather2.png?1663681648`);
    }

    // Snow
     if(currentSky === 600 || currentSky === 601 || currentSky === 611 || currentSky === 612 || currentSky === 613 || currentSky === 615 || currentSky === 616 || currentSky === 620) {  
    currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/050/569/original/weather6.png?1667047839`);
    }
    if(currentSky === 602 || currentSky === 621 || currentSky === 622){
         currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/050/568/original/weather4.png?1667047829`);
    }

    // Rain
    if(currentSky === 500 || currentSky === 501 || currentSky === 520 || currentSky === 511 || currentSky === 300 || currentSky === 310 || currentSky === 311 || currentSky === 313) {  
    currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/605/original/weather8.png?1663689746`);
    }

    if(currentSky === 502 || currentSky === 503 || currentSky === 504 || currentSky === 521 || currentSky === 522 || currentSky === 531 || currentSky === 302 || currentSky === 312 || currentSky === 314 || currentSky === 321) {  
    currentImg.setAttribute("src", `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/597/original/weather5.png?1663681630`);
    }


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

 
 function whatPartOfDay(){
  let night = (currentHour >= "22") || (currentHour <= "6");
//   let day = (currentHour < "22") && (currentHour > "6");
    if(night){
    return false;
  }
//   if(day){
//     return true;
//   }
}
let partDay = whatPartOfDay();
console.log(whatPartOfDay());