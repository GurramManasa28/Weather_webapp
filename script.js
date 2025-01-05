const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

const apiKey = 'ba52b328b26258bd0ceabe882bad061c'; 

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (city === '') {
    alert('Please enter a city name!');
    return;
  }

  fetchWeather(city);
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found. Please try again!');
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function displayWeather(data) {
  const { name } = data;
  const { description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  cityName.textContent = `Weather in ${name}`;
  weatherDescription.textContent = `Condition: ${description}`;
  temperature.textContent = `Temperature: ${temp}°C`;
  humidity.textContent = `Humidity: ${humidity}%`;
  wind.textContent = `Wind Speed: ${speed} m/s`;

  weatherCard.classList.remove('hidden');
}