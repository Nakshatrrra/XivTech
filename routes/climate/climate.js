const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const ApiKey = process.env.API_KEY;
router.get('/getWeather', async (req, res) => {
    let cities = req.query.cities; // Get the comma-separated string of cities from query parameters
    const apiKey = ApiKey;

    // Check if cities parameter is provided
    if (!cities) {
        return res.status(400).json({ error: 'Cities parameter is required.' });
    }

    // Convert the comma-separated string of cities to an array
    cities = cities.split(',');

    // Check if cities is an array and contains values
    if (!Array.isArray(cities) || cities.length === 0) {
        return res.status(400).json({ error: 'Cities parameter must contain at least one city.' });
    }

    try {
        // Create an array to store weather information for all cities
        const weatherInfoArray = [];

        // Fetch weather information for each city in the array
        for (const city of cities) {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.trim()}`);
            
            // Extract relevant data from the response
            const { temp_c: temperature, condition, humidity } = response.data.current;

            // Push weather information to the array
            weatherInfoArray.push({
                city: city.trim(),
                temperature: `${temperature}°C`,
                condition: condition.text,
                humidity: `${humidity}%`
            });
        }

        // Return weather information for all cities
        res.json({ cities: weatherInfoArray });

    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Error fetching weather data.' });
    }
});

module.exports = router;