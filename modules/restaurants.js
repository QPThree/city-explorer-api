'use strict';

module.exports = getRestaurants;
const axios = require('axios');
let cache = require('./cache.js');

const yelp = require('yelp-fusion');
const api_key = process.env.YELP_API_KEY;
const client = yelp.client(api_key);

async function getRestaurants (request, response) {
  console.log('inside getRestaurants');
  try {
    let cityName = request.query.searchQuery;
    const key = 'restaurant-' + cityName;
    // let resultsArr = [];
    let restaurantData = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${cityName}`, {
      headers: {
        'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
      }
    });
    if (cache[key] && (Date.now() - cache[key].timestamp < (1000 * 60 * 60 * 24 * 30))) {
      console.log('Cache hit on Restaurants');
    } else {
      console.log('Cache miss on Restaurants. Writing to cache now');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = restaurantData.data.businesses.map(business => new Restaurant(business));
    }
    response.send(cache[key].data);
  } catch (error) {
    console.log(error)
    response.status(404).send('Something went wrong with the movie data!');
  }
}

class Restaurant {
  constructor(data) {
    this.data = data;
  }
}
