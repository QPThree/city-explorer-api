'use strict';

require('dotenv').config(); //had to add .config();
const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
const Movies = require('./modules/movies.js');
const Restaurants = require('./modules/restaurants.js');
const app = express();
app.use(cors()); //had to add this


//---- GETS ----
app.get('/', (request, response) => {
  response.send('Hello again from the server response.send!');
});

app.get('/weather', weatherHandler);

app.get('/movies', Movies);

app.get('/yelp', Restaurants);

function weatherHandler(request, response) {
  // const { lat, lon } = request.query;
  const lat = request.query.lat;
  const lon = request.query.lon;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!')
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
