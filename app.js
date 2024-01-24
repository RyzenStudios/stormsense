const cityInput = document.querySelector('#city-input');
const submitBtn = document.querySelector('#submit');
const weatherData = document.querySelector('#weather-info');

if (cityInput && submitBtn && weatherData && clock) {
  submitBtn.addEventListener('click', () => {
    weatherData.innerHTML = '<p>Loading...</p>';
    const city = cityInput.value;
    const apiKey = '87c8b10c4e5440fe446e7fab9b8888b3';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let image = '';
        if (data.weather && data.weather.length > 0) {
          const description = data.weather[0].description;
          if (description.includes('cloud')) {
            image = '<img src="https://i.ibb.co/7QpKsCX/cloudy.png">';
          } else if (description.includes('rain')) {
            image = '<img src="https://i.ibb.co/7gj0nxh/rain.png">';
          } else if (description.includes('sun')) {
            image = '<img src="https://i.ibb.co/KjNgV7T/sunny.png">';
          }
        }
        weatherData.innerHTML = `
          ${image}
          <p>City: ${data.name}</p>
          <p>Temperature: ${data.main.temp} &#8451;</p>
          <p>Description: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
      })
      .catch(error => {
        console.error(error);
        weatherData.innerHTML = '<p>City not found</p>';
      });
  });
}


