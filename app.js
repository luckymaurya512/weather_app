const API_KEY = `b68030f28c5aec332e1b5b35a0405a7c`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
const mainContainer = document.querySelector("main");

const getWeather = async (city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    console.log(data);
    return showWeather(data)
}


const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }

    const temp = data.main.temp;
    const feels_like=data.main.feels_like;
    const humidity=data.main.humidity;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US');
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US');
    
    if (temp < -5) {
        mainContainer.style.background = "linear-gradient(135deg, #0000ff, #00f)"; // Dark blue to blue for below -5°C
    } else if (temp < 0) {
        mainContainer.style.background = "linear-gradient(135deg, #00f, #1e90ff)"; // Blue to light blue for 0°C to -5°C
    } else if (temp < 5) {
        mainContainer.style.background = "linear-gradient(135deg, #1e90ff, #3cb371)"; // Light blue to medium green for 0°C to 5°C
    } else if (temp < 10) {
        mainContainer.style.background = "linear-gradient(135deg, #3cb371, #32cd32)"; // Medium green to lime green for 5°C to 10°C
    } else if (temp < 15) {
        mainContainer.style.background = "linear-gradient(135deg, #32cd32, #ffd700)"; // Lime green to gold for 10°C to 15°C
    } else if (temp < 20) {
        mainContainer.style.background = "linear-gradient(135deg, #ffd700, #ffa500)"; // Gold to orange for 15°C to 20°C
    } else if (temp < 25) {
        mainContainer.style.background = "linear-gradient(135deg, #ffa500, #ff4500)"; // Orange to red-orange for 20°C to 25°C
    } else if (temp < 30) {
        mainContainer.style.background = "linear-gradient(135deg, #ff4500, #ff0000)"; // Red-orange to red for 25°C to 30°C
    } else {
        mainContainer.style.background = "linear-gradient(135deg, #ff0000, #8b0000)"; // Red to dark red for above 30°C
    }
    
    weather.innerHTML = `
            <div>
            <h2>${temp} ℃</h2>
            <h3>Feels like ${feels_like} ℃</h3>
            <div class="weather-icon-description">
                <img class="image" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                <h4 class="description">${data.weather[0].main}</h4>
            </div>
            <h4>Humidity: ${humidity}</h4>
            <h4>Sunrise: ${sunrise}</h4>
            <h4>Sunset: ${sunset}</h4>
        </div>
    `
}

form.addEventListener("submit", function (event) {
    getWeather(search.value)
    event.preventDefault();
})
