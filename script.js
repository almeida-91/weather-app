async function getWeather(location) {
    if(!location){ 
        displayInfo('');
        return;
    }
    try {
        let weatherFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=f97349dec3affe34ff0eaa9cf7b8628b`)
        while(!weatherFetch){
            let count = 0;
            setInterval(()=>{
                count++;
                console.log(count);
            },1);
        }
        let weather = weatherFetch.json();
        weather.then(function(response){
            if (response.cod == 404){
                displayInfo('error');
                throw (`Couldn't fetch input data`);
            }
            currentWeather = response.main;
            displayInfo(currentWeather);
        });
    } catch(error) {
        alert(error);
        console.error(error);
    }
}


const locationInput = document.getElementsByTagName('input')[0];
const submitButton = document.getElementsByTagName('button')[0];
const contentDiv = document.getElementById('content');
let currentWeather;
displayCredit('https://unsplash.com/@kelvinyan');

submitButton.addEventListener('click', () => {
    getWeather(locationInput.value);
    displayCredit('https://unsplash.com/@kelvinyan');
});

function displayInfo(weather) {
    const location = document.createElement('h3');
    location.textContent = locationInput.value;
    clearInput();
    clearDisplay();
    if (weather == 'error'){
        location.textContent = 'NOT FOUND :(';
        contentDiv.appendChild(location);
        return;
    } else if (weather == '') {
        location.textContent = 'Please enter a city!';
        location.style.textAlign = 'center';
        contentDiv.appendChild(location);
        return;
    }
    let feelsLike = document.createElement('span');
    let temp = document.createElement('span');
    let tempmax = document.createElement('span');
    let tempmin = document.createElement('span');
    let humidity = document.createElement('span');

    let feelsImage = document.createElement('img');
    let tempImage = document.createElement('img');
    let maxImage = document.createElement('img');
    let minImage = document.createElement('img');
    let humidImage = document.createElement('img');

    tempImage.src = './images/thermometer.png';
    feelsImage.src = './images/thermometer-alert.png';
    maxImage.src = './images/sun-thermometer-outline.png';
    minImage.src = './images/snowflake-thermometer.png';
    humidImage.src = './images/cloud-percent-outline.png';
    
    feelsLike.textContent = `Feels like : ${weather.feels_like}`;
    temp.textContent = `Temperature : ${weather.temp}`;
    tempmax.textContent = `Max : ${weather.temp_max}`;
    tempmin.textContent = `Min : ${weather.temp_min}`;
    humidity.textContent = `Humidity : ${weather.humidity}`;

    contentDiv.appendChild(location);
    contentDiv.appendChild(feelsImage);
    contentDiv.appendChild(feelsLike);
    contentDiv.appendChild(tempImage);
    contentDiv.appendChild(temp);
    contentDiv.appendChild(maxImage);
    contentDiv.appendChild(tempmax);
    contentDiv.appendChild(minImage);
    contentDiv.appendChild(tempmin);
    contentDiv.appendChild(humidImage);
    contentDiv.appendChild(humidity);
}


function clearDisplay() {
    contentDiv.innerHTML = '';
}

function clearInput() {
    locationInput.value = '';
}

function displayCredit(creditInfo){
    const credit = document.getElementById('credit');
    credit.innerHTML = '';
    credit.textContent += 'Photo taken by';

    const creditLink = document.createElement('a');
    creditLink.textContent = 'this guy';
    creditLink.href = creditInfo;
    credit.appendChild(creditLink);
}