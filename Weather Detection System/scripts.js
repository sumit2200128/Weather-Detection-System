const apikey = "f97d38dfb3233c402ed4d2a677e864eb";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBtn = document.querySelector(".search button");
const searchBox = document.getElementById("city");
const weatherIcon = document.querySelector(".weather-icon");
const languageDropdown = document.getElementById("language");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiurl}${city}&appid=${apikey}`);
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            document.querySelector(".city").innerText = data.name;
            document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerText = data.main.humidity + "%";
            document.querySelector(".wind").innerText = data.wind.speed + " km/h";

            // Set appropriate weather icon
            const weatherCondition = data.weather[0].main;
            const icons = {
                Clouds: "./Images/clouds.png",
                Clear: "./Images/clear.png",
                Rain: "./Images/rain.png",
                Drizzle: "./Images/drizzle.png",
                Mist: "./Images/mist.png"
            };
            weatherIcon.src = icons[weatherCondition] || "./Images/default.png";

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Translation Function
function translateContent() {
    const lang = languageDropdown.value;
    const translations = {
        en: { error: "Invalid City Name", humidity: "Humidity", wind: "Wind Speed" },
        es: { error: "Nombre de ciudad no válido", humidity: "Humedad", wind: "Velocidad del viento" },
        fr: { error: "Nom de ville invalide", humidity: "Humidité", wind: "Vitesse du vent" },
        hi: { error: "अमान्य शहर का नाम", humidity: "आर्द्रता", wind: "हवा की गति" },
        zh: { error: "无效的城市名称", humidity: "湿度", wind: "风速" }
    };

    const currentTranslation = translations[lang];
    document.getElementById("error-message").innerText = currentTranslation.error;
    document.getElementById("humidity-label").innerText = currentTranslation.humidity;
    document.getElementById("wind-label").innerText = currentTranslation.wind;
}
