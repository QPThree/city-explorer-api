'use strict';

console.log('Got Pats, from our Server!');

//require is essential an import
const express = require('express');
require('dotenv').config();

//express must be called to be used as per docs
const app = express();

//cors for front end to talk to back end!
const cors = require('cors');
app.use(cors());

//hard wired port from .env
const PORT = process.env.PORT;

let axios = require('axios');

//----GET REQUESTS-----
//specify routes our server should be listening for
//this is a send so it is displayed on browser! (console.logs are displayer in console and terminal)
app.get('/', (request, response) => {
  response.send('Hello again from the server response.send!');
});

//weather data will route here
app.get('/weather', async (request, response) => {
  try {
    let forecastArr = [];
    let cityName = request.query.searchQuery;
    let lat = request.query.lat;
    let lon = request.query.lon;
    //call to weather api
    const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`);

    forecastArr.push(new Forecast(weatherData.data.data));
    response.send(forecastArr);
  } catch (error) {
    response.status(404).send('Something went wrong with the weather data!');
  }
});

app.get('/movies', async (request, response) => {
  try {
    let cityName = request.query.searchQuery;
    let resultsArr = [];
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false`);
    //movie stuff here
    console.log(movieData.data);
    movieData.data.results.map(movie => {
      resultsArr.push(new Movie(movie))
    });
    response.send(resultsArr);
  } catch (error) {
    console.log(error)
    response.status(404).send('Something went wrong with the movie data!');
  }
});
app.get('/*', (request, response) => {
  response.status(404).send('Something went wrong!');
});
//need to tellserver where to listen!
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//forecast object has 2 arrays, one for dates and the other for their corresponding weather report
class Forecast {
  constructor(data) {
    this.threeDayDates = data.map(day => day.datetime);
    this.threeDayDescription = data.map(day => day.weather.description);
  }
}
class Movie {
  constructor(data) {
    this.data = data;
  }
}
