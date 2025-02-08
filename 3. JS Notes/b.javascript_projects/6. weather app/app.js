let form = document.getElementById('form');
let map = document.getElementById('map');
let searchBox = document.getElementById('searchBox');
const apikey = "96759c1a70c7d08845e7d71379e80567";
const main = document.getElementById("main");

form.addEventListener('submit', (event) => {

    event.preventDefault();
    getWeatherData(searchBox.value)
    searchBox.value = ''
})

async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
    const data = await response.json();
    // console.log(data.main)
    addWeatherToPage(data, city)
}
function addWeatherToPage(data, city) {
    // const temp = KtoC(data.main.temp);
    console.log(data)
    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `<div class='weatherbx'>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /><h2> ${data.main.temp}°C </h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> </div>
        <h3>${data.weather[0].main}</h3>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
    // console.log('object')
    showGoogleMap(city)
}

function showGoogleMap(city) {
    var map = document.getElementById("map");
    map.innerHTML = "";
    let frame = document.createElement("iframe");
    frame.setAttribute("src", `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
    frame.setAttribute("id", "frame")
    map.append(frame);
}
// let city = document.getElementById("city").value;

// Temperature is available in Fahrenheit, Celsius and Kelvin units.

// For temperature in Fahrenheit use units=imperial
// For temperature in Celsius use units=metric
// Temperature in Kelvin is used by default, no need to use units parameter in API call
