const axios = require('axios')

async function generateWeather(city) {
    try {
        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: city,
                appid: process.env.WEATHER_API_KEY,
                units: 'metric',
                lang: 'id'   
            }
        })

        return data.list
    } catch (error) {
        throw error
    }
}

module.exports = generateWeather