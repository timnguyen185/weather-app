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


async function getForecast(city) {
  const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`

  const response = await fetch(forecastUrl)

  const data = await response.json()

  console.log(data)

  displayForecast(data)
}

function displayWeather(data) {
  const iconCode = data.weather[0].icon
  const iconUrl = 
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
weatherResult.innerHTML = `
  <div class="weather-card">
    <h2>${data.name}</h2>
    <img src="${iconUrl}" alt="Weather icon" />
    <p class="temp">${data.main.temp}°F</p>
    <p class="description">
      ${data.weather[0].description}
    </p>
  </div>
`
}

function displayForecast(data) {
  const forecastContainer =
    document.getElementById("forecast")

  forecastContainer.innerHTML = ""

  const dailyForecasts = data.list.filter((item, index) => {
    return index % 8 === 0
  })

  dailyForecasts.forEach((forecast) => {
    const date = new Date(forecast.dt_txt)

    const iconCode = forecast.weather[0].icon

    const iconUrl =
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    forecastContainer.innerHTML += `
      <div class="forecast-card">
        <h3>
          ${date.toLocaleDateString("en-US", {
            weekday: "short"
          })}
        </h3>

        <img src="${iconUrl}" alt="Forecast icon" />

        <p>${forecast.main.temp}°F</p>

        <p>${forecast.weather[0].description}</p>
      </div>
    `
  })
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
  getForecast(city)
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
    getForecast(city)
  }
})