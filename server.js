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

// -----Modules requires ---

const Weather = require('./modules/weather.js');
const Movies = require('./modules/movies.js');

//----GET REQUESTS-----
//specify routes our server should be listening for
//this is a send so it is displayed on browser! (console.logs are displayer in console and terminal)
app.get('/', (request, response) => {
  response.send('Hello again from the server response.send!');
});

//weather data will route here
app.get('/weather', Weather);

app.get('/movies', Movies);
app.get('/*', (request, response) => {
  response.status(404).send('Something went wrong!');
});
//need to tellserver where to listen!
app.listen(PORT, () => console.log(`listening on port ${PORT}`));


