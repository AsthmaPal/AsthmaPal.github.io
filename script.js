document.addEventListener("DOMContentLoaded", function () {
    // Update Asthma Card
    updateAsthmaCard();

    // Get real-time weather data
    getWeatherData();

    // Simulate real-time health data
    setInterval(updateHealthData, 5000);
});

function updateAsthmaCard() {
    var asthmaCard = document.getElementById("asthmaCard");
    var asthmaRisk = document.getElementById("asthmaRisk");

    // 90% chance low risk, 10% chance high risk
    var isHighRisk = Math.random() < 0.1;

    asthmaRisk.textContent = isHighRisk ? "Asthma Risk: High" : "Asthma Risk: Low";
    asthmaCard.classList.toggle("highRisk", isHighRisk);
}

function getWeatherData() {
    var apiKey = "6fb2bb0fe6f6458c9ef213123231811";
    var city = "Beni.Suef";
    var apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    // Make the API call
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Weather API response:', data);
            // Update the weather card with the received data
            updateWeatherCard(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateWeatherCard(weatherData) {
    var weatherCard = document.getElementById("weatherCard");
    var weatherInfo = document.getElementById("weatherInfo");

    // Extract relevant data from the API response
    var temperatureCelsius = weatherData.current.temp_c;
    var humidity = weatherData.current.humidity;
    var conditionText = weatherData.current.condition.text;
    var isDay = weatherData.current.is_day;
    var iconUrl = weatherData.current.condition.icon;

    // Update the content of the weather card
    weatherInfo.innerHTML = `<strong>Temperature:</strong> ${temperatureCelsius}°C<br>
                            <strong>Humidity:</strong> ${humidity}%<br>
                            <strong>Condition:</strong> ${conditionText}`;

    // Update the weather icon dynamically
    updateWeatherIcon(iconUrl, isDay);
}

// function updateWeatherIcon(iconUrl, isDay) {
//     var weatherIconElement = document.getElementById("weatherIcon");

//     // If the icon element doesn't exist, create it
//     if (!weatherIconElement) {
//         weatherIconElement = document.createElement("img");
//         weatherIconElement.id = "weatherIcon";
//         weatherIconElement.style.width = "64px"; // Set the width as needed
//         document.getElementById("weatherCard").appendChild(weatherIconElement);
//     }

//     // Use the provided icon URL for day, otherwise use the night icon
//     weatherIconElement.src = isDay ? iconUrl : "//cdn.weatherapi.com/weather/64x64/night/113.png";
// }


function updateHealthData() {
    var healthCard = document.getElementById("healthCard");
    var healthInfo = document.getElementById("healthInfo");

    // Simulated health data
    var heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Random heart rate between 60 and 100 bpm
    var oxygenLevels = Math.floor(Math.random() * (100 - 90 + 1)) + 90; // Random oxygen levels between 90 and 100%

    // Update the content of the health card
    healthInfo.innerHTML = `<strong>Heart Rate:</strong> ${heartRate} bpm<br>
                            <strong>Oxygen Levels:</strong> ${oxygenLevels}%`;

    // You can also update other elements of the card as needed
}