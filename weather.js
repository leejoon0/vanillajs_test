
const API_KEY = "";
const COORDS = "coords";

const geoName = document.querySelector(".geo_name");
const imgWeather = document.querySelector(".imgWeather");


function getWeather(lat, lon)
{
    fetch(`https:\\api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(res){
        return res.json();
    }).then(function(data){
        console.log(data);
        const temperature = data.main.temp;
        const place = data.name;
        const icon = data.weather[0].icon;

        geoName.innerText = `${place} - ${temperature}°C`;
        imgWeather.setAttribute("style", `border: medium none; width: 45px; height: 45px; background: url('http://openweathermap.org/img/w/${icon}.png') repeat scroll 0% 0% transparent;`);
    });
}

function getSuccess(position){
    const obj = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    saveCoords(obj);
    getWeather(position.coords.latitude, position.coords.longitude);
}

function getError(){
    return "geo error";
}

function getGeoLocation(){
    navigator.geolocation.getCurrentPosition(getSuccess, getError);
}

function saveCoords(obj){
    localStorage.setItem(COORDS, JSON.stringify(obj));
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        getGeoLocation();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function Init(){
    loadCoords();
}

Init();
