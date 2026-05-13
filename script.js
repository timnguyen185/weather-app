const searchBtn = document.getElementById("search-btn")
const cityInput = document.getElementById("city-input")
const weatherResult = document.getElementById("weather-result")

const apiKey = "9f6b661d701064d7138f2c77c5c05908"

async function getWeather(city) {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

  weatherResult.innerHTML = `
  <p>Loading...</p>
`

  const response = await fetch(url)

  const data = await response.json()

  console.log(data)

  displayWeather(data)
}

function displayWeather(data) {
  weatherResult.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temperature: ${data.main.temp}°F</p>
    <p>Weather: ${data.weather[0].description}</p>
  `
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value

  getWeather(city)
})