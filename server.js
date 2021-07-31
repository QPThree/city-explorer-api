'use strict';

console.log('Got Pats, from our Server!');

//require is essential an import
const express = require('express');

//express must be called to be used as per docs
const app = express();

//specify routes our server should be listening for
//this is a send so it is displayed on browser! (console.logs are displayer in console and terminal)
app.get('/', (request, response) => {
  response.send('Hello again from the server response.send!');
});

//need to tellserver wehre to listen!
app.listen(3001, ()=> console.log('listening on port 3001'));
