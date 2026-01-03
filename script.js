function getWeather() {
    const city = document.getElementById("city").value.trim();
    const error = document.getElementById("error");

    error.innerText = "";

    if (!city) {
        error.innerText = "Please enter a city name";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temp").innerText =
                `Temperature: ${data.main.temp} °C`;
            document.getElementById("desc").innerText =
                `Weather: ${data.weather[0].description}`;
            document.getElementById("humidity").innerText =
                `Humidity: ${data.main.humidity}%`;
        })
        .catch(err => {
            error.innerText = err.message;
        });
}
