const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8080;
const app = express();
const server = app.listen(port);
const io = require('socket.io').listen(server);

io.on('connection', (client) => {

  // Emit event to load tests, make this a callback so we can
  // run a .then statement on the client
  client.on('verifyPath', (path) => {
    console.log('Verifying the Path....')
    // This function should verify the paths when a URL is validated. This is an important
    // step otherwise it will choke up the application....
    client.emit('verified', path);
  })

  client.on('runTests', () => {
    // This function should run the tests...
  })
});

io.listen(port);

// Verify were running sockets...
console.log('listening on port ', port)