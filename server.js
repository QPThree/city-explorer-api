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
  response.send('Weather data here');
  console.log(weatherData);
});

app.get('/*', (request, response) => {
  response.status(404).send('Something went wrong!');
});
//need to tellserver wehre to listen!
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));
