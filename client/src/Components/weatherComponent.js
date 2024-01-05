import React, { useState } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [cities, setCities] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/climate/getWeather?cities=${cities}`);
      setWeatherData(response.data.cities);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }; 
  

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter cities separated by commas (e.g., toronto,mumbai,london)"
        value={cities}
        onChange={(e) => setCities(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>
      <div>
        {weatherData.map((data, index) => (
          <div key={index}>
            <h3>{data.city}</h3>
            <p>Temperature: {data.temperature}</p>
            <p>Condition: {data.condition}</p>
            <p>Humidity: {data.humidity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherComponent;