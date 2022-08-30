async function getWeather(location) {
    try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=f97349dec3affe34ff0eaa9cf7b8628b`)
        .then(function(response){
            let weather = response.json();
            weather.then(function(response){
                currentWeather = response.main;
                displayInfo(currentWeather);
            })
        })
    } catch(error) {
        console.error(error);
        displayInfo('error');
    }
}
const locationInput = document.getElementsByTagName('input')[0];
const submitButton = document.getElementsByTagName('button')[0];
const contentDiv = document.getElementById('content');
let currentWeather;

submitButton.addEventListener('click', () => {
    getWeather(locationInput.value);
});

function displayInfo(weather) {
    clearDisplay();
    if (weather == 'error'){
        contentDiv.innerHTML = 'NOT FOUND :(';
    }
    let feelsLike = document.createElement('p');
    let temp = document.createElement('p');
    let tempmax = document.createElement('p');
    let tempmin = document.createElement('p');
    let humidity = document.createElement('p');
    
    feelsLike.textContent = `Feels like : ${weather.feels_like}`;
    temp.textContent = `Temperature : ${weather.temp}`;
    tempmax.textContent = `Max Temperature : ${weather.temp_max}`;
    tempmin.textContent = `Min Temperature : ${weather.temp_min}`;
    humidity.textContent = `Humidity : ${weather.humidity}`;

    contentDiv.appendChild(feelsLike);
    contentDiv.appendChild(temp);
    contentDiv.appendChild(tempmax);
    contentDiv.appendChild(tempmin);
    contentDiv.appendChild(humidity);
}


function clearDisplay() {
    contentDiv.innerHTML = '';
}