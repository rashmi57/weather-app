async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "7b9624b3d732879def3b87a80ea937b8"; // Replace with your real key
  const weatherResult = document.getElementById("weatherResult");

  if (!city) {
    weatherResult.innerHTML = `<p style="color:red;">Please enter a city name.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if the response is valid
    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    const name = data.name;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;

    weatherResult.innerHTML = `
      <h2>${name}</h2>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Condition:</strong> ${description}</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}
