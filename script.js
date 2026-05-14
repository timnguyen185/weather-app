const searchBtn = document.getElementById("search-btn")
const cityInput = document.getElementById("city-input")
const weatherResult = document.getElementById("weather-result")

const apiKey = "9f6b661d701064d7138f2c77c5c05908"

async function getWeather(city) {
  
    weatherResult.innerHTML = `
  <p>Loading weather data...</p>
`
  
   try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

    const response = await fetch(url)

    const data = await response.json()

    console.log(data)

    if (data.cod === "404") {
      weatherResult.innerHTML = `
        <p>City not found. Try again.</p>
      `
      return
    }

    displayWeather(data)

  } catch (error) {
    weatherResult.innerHTML = `
      <p>Something went wrong. Please try again later.</p>
    `

    console.error(error)
  }
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

  if (city === "") {
    weatherResult.innerHTML = `
      <p>Please enter a city name.</p>
    `
    return
  }

  getWeather(city)
})

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim()

    if (city === "") {
      weatherResult.innerHTML = `
        <p>Please enter a city name.</p>
      `
      return
    }

    getWeather(city)
  }
})