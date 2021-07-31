'use strict';

console.log('Got Pats, from our Server!');

//require is essential an import
const express = require('express');
require('dotenv').config();

//express must be called to be used as per docs
const app = express();

//hard wired port from .env
const PORT = process.env.PORT;

//weather data
const weatherData = require('./data/weather.json');

//specify routes our server should be listening for
//this is a send so it is displayed on browser! (console.logs are displayer in console and terminal)
app.get('/', (request, response) => {
  response.send('Hello again from the server response.send!');
});

//weather data will route here
app.get('/weather', (request, response) => {
  console.log(weatherData);
  let forecastArr = [];
  let cityName = request.query.searchQuery;
  let lat = request.query.lat;
  let lon = request.query.lon;
  
  weatherData.filter(obj => {
    if (obj.city_name.includes(cityName)){
      console.log(obj.data[0].datetime);
      forecastArr.push(new Forecast(obj.data));
    }
  });
  response.send(forecastArr);
});

app.get('/*', (request, response) => {
  response.status(404).send('Something went wrong!');
});
//need to tellserver wehre to listen!
app.listen(PORT, () => console.log(`listening on port ${PORT}`));


class Forecast {
  constructor(data) {
    this.threeDayDates = data.map(day => day.datetime);
    this.threeDayDescirption = data.map(day => day.weather.description);
  }
}
