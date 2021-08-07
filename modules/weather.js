'use strict';


module.exports = getWeather;
const axios = require('axios');


async function getWeather(request, response) {

  let forecastArr = [];
  let cityName = request.query.searchQuery;
  let lat = request.query.lat;
  let lon = request.query.lon;
  //call to weather api
  const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`);

  forecastArr.push(new Forecast(weatherData.data.data));
  response.send(forecastArr);
}


//forecast object has 2 arrays, one for dates and the other for their corresponding weather report
class Forecast {
  constructor(data) {
    this.threeDayDates = data.map(day => day.datetime);
    this.threeDayDescription = data.map(day => day.weather.description);
  }
}



