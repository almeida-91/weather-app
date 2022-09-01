async function getWeather(location) {
    clearDisplay();
    let loadDiv = document.createElement('div');
    loadDiv.className = 'loader';
    contentDiv.appendChild(loadDiv);
    
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
                throw (`location couldn't be found.`);
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
contentDiv.style.display = 'none';
let currentWeather;
changeBackground('initial');

submitButton.addEventListener('click', () => {
    getWeather(locationInput.value);
});

async function displayInfo(weather) {
    const location = document.createElement('h3');
    location.textContent = locationInput.value;
    clearInput();
    if (weather == 'error'){
        location.textContent = 'NOT FOUND :( (check spelling)';
        contentDiv.appendChild(location);
        contentDiv.style.display = 'grid';
        getGif('reading');
        return;
    } else if (weather == '') {
        location.textContent = 'Please enter a city!';
        location.style.textAlign = 'center';
        contentDiv.appendChild(location);
        contentDiv.style.display = 'grid';
        getGif('what');
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
    
    feelsLike.textContent = `Feels like : ${weather.feels_like}°C`;
    temp.textContent = `Temperature : ${weather.temp}°C`;
    tempmax.textContent = `Max : ${weather.temp_max}°C`;
    tempmin.textContent = `Min : ${weather.temp_min}°C`;
    humidity.textContent = `Humidity : ${weather.humidity}%`;


    clearDisplay();
    getGif(location.textContent).then(()=>{

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
    changeBackground(weather.temp);
    contentDiv.style.display = 'grid';
    })
}


function clearDisplay() {
    contentDiv.innerHTML = '';
}

function clearInput() {
    locationInput.value = '';
}

function changeBackground(temp) {
    if (temp == 'initial'){
        document.body.style.backgroundImage = 'URL(./images/kelvin-yan-WWl6xaSHFIo-unsplash.jpg)';
        document.body.style.backgroundSize = 'cover';
        giveCredit('initial');
        return;
    } else if (temp >= 25) {
        document.body.style.backgroundImage = 'URL(./images/elizeu-dias-RN6ts8IZ4_0-unsplash.jpg)';
    } else if (temp > 0 && temp < 10) {
        document.body.style.backgroundImage = 'URL(./images/osman-rana-HOtPD7Z_74s-unsplash.jpg)';
    } else if (temp > 10 && temp < 25){
        document.body.style.backgroundImage = 'URL(./images/todd-kent-jqXiBG2VDeA-unsplash.jpg)';
    } else if (temp < 0) {
        document.body.style.backgroundImage = 'URL(./images/fabian-mardi-kVKz9qnJC-k-unsplash.jpg)';
    }

    giveCredit(temp);
    document.body.style.backgroundSize = 'cover';
}

function giveCredit(temp) {
    const credit = document.getElementById('credit');
    const creditLink = document.createElement('a');

    credit.innerHTML = '';
    credit.textContent = 'Photo taken by ';

    if (temp == 'initial') {
        creditLink.href = 'https://unsplash.com/@kelvinyan';
        creditLink.textContent = 'Kelvin Yan';
    } else if (temp >= 25) {
        creditLink.href = 'https://unsplash.com/@elishavision';
        creditLink.textContent = 'Elizeu Dias';    
    } else if (temp > 0 && temp < 10) {
        creditLink.href = 'https://unsplash.com/@osmanrana';
        creditLink.textContent = 'Osman Rana';
    } else if (temp > 10 && temp < 25){
        creditLink.href = 'https://unsplash.com/@churchoftodd';
        creditLink.textContent = 'Todd Kent';
    } else if (temp < 0 ) {
        creditLink.href = 'https://unsplash.com/@fabianmardi';
        creditLink.textContent = 'Fabian Mardi';
    }
    credit.appendChild(creditLink);
}

async function getGif(location){
    let img = document.createElement('img');
    img.className = 'gif';
    try{
        const response  = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=AGFTIsyFul6yjnSGlXz8A4ALRB8a8YrD&s=${location}`, {mode: 'cors'})
        const data = await response.json();
        img.src = data.data.images.original.url;
        img.style.borderRadius = '20px';
        contentDiv.appendChild(img);
    } catch (error){
        console.error(error);
    }
}