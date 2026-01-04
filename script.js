function getWeather() {
    const city = document.getElementById("city").value;
    const error = document.getElementById("error");

    if (!city) {
        error.innerText = "Please enter a city name";
        return;
    }

    // UI states
    loading.style.display = "block";
    error.innerText = "";
    clearResult();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            loading.style.display = "none";

            if (data.cod !== 200) {
                error.innerText = data.message;
                return;
            }

            updateUI(data);
        })
        .catch(() => {
            loading.style.display = "none";
            error.innerText = "Failed to fetch weather data";
        });
}
function updateUI(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = `🌡️ ${data.main.temp} °C`;
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `🌬️ Wind: ${data.wind.speed} m/s`;
    const icon = document.getElementById("icon");

    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.style.display = "block";
}

function clearResult() {
    document.getElementById("cityName").innerText = "";
    document.getElementById("temp").innerText = "";
    document.getElementById("desc").innerText = "";
    document.getElementById("humidity").innerText = "";
    document.getElementById("wind").innerText = "";
    document.getElementById("icon").style.display = "none"; 
}
