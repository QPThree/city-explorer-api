'use strict';

module.exports = getMovies;
const axios = require('axios');


async function getMovies (request, response) {
  try {
    let cityName = request.query.searchQuery;
    let resultsArr = [];
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false`);
    //movie stuff here
    movieData.data.results.map(movie => {
      resultsArr.push(new Movie(movie))
    });
    response.send(resultsArr);
  } catch (error) {
    console.log(error)
    response.status(404).send('Something went wrong with the movie data!');
  }
}

class Movie {
  constructor(data) {
    this.data = data;
  }
}
