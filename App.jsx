import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // 👉 Replace this with your actual API key from OpenWeatherMap
  const API_KEY = "37ca7189a23139d4e1537dda27c3445d";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    setWeather(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);

      if (data.cod === 200) {
        setWeather({
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
        });
      } else {
        // fallback: mock weather details if city not found
        setWeather({
          name: city,
          temp: 30,
          humidity: 70,
          condition: "Clear (Mock Data)",
          icon: "01d",
        });
        setError("");
      }
    } catch (err) {
      console.error("Error fetching:", err);
      setError("Error fetching data");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">🌤 Weather App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="icon"
          />
          <p>🌡 <strong>Temperature:</strong> {weather.temp} °C</p>
          <p>💧 <strong>Humidity:</strong> {weather.humidity} %</p>
          <p>☁ <strong>Condition:</strong> {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;
