// Selecting necessary DOM elements
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "c3866d340bad39bff057f41f15cab672";

// Event listener for the form submission
weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); // Preventing default form submission behavior
    const city = cityInput.value; // Getting the value of the city input field
    if (city) { // Checking if the city input field is not empty
        try {
            const weatherData = await getWeatherData(city); // Fetching weather data for the entered city
            displayWeatherInfo(weatherData); // Displaying weather information
        }
        catch (error) {
            console.error(error);
            displayError(error); // Displaying error message if fetching weather data fails
        }
    }
    else {
        displayError("Please enter a city") // Displaying error message if city input field is empty
    }
});

// Function to fetch weather data from the API
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl)

    if (!response.ok) {
        throw new Error("Could not fetch weather data") // Throwing an error if fetching weather data fails
    }
    return await response.json();
}

// Function to display weather information on the card
function displayWeatherInfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = ""; // Clearing the card content
    card.style.display = "flex"; // Making the card visible

    // Creating elements to display weather information
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("h1");
    const humidityDisplay = document.createElement("h1");
    const descDisplay = document.createElement("h1");
    const weatherEmoji = document.createElement("h1");

    // Setting text content for the elements
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)} °C`
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Adding classes to the elements
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Appending elements to the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// Function to get weather emoji based on weather ID
function getWeatherEmoji(weatherId) {
    switch(true){
        case (weatherId >=200 && weatherId < 300):
            return "⛈️";
        case (weatherId >=300 && weatherId < 400):
            return "🌧️"
        case (weatherId >=500 && weatherId < 600):
            return "🌧️"
        case (weatherId >=600 && weatherId < 700):
            return "☃️❄️"
        case (weatherId >=700 && weatherId < 800):
            return "🌫️"
        case (weatherId === 800):
            return "☀️"
        case (weatherId >=801 && weatherId < 810):
            return "☁️"
        default:
            return "❓"
    }
}

// Function to display error message on the card
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = ""; // Clearing the card content
    card.style.display = "flex"; // Making the card visible
    card.appendChild(errorDisplay); // Appending error message to the card
}
