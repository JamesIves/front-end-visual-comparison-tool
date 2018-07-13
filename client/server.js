const express = require('express');
var request = require('request');
const port = 9000;
const io = require('socket.io')()

io.on('connection', (client) => {
  console.log('Connected to sockets...')
  // Emit event to load tests, make this a callback so we can
  // run a .then statement on the client
  client.on('verifyPath', (path) => {
    console.log('Verifying the Path....', path)

    urlExists(path, function(err, exists) {
      if (exists) {
        socket.emit('verified', true)
      } else {
        client.emit('verified', false)
      }
    });
  })

  client.on('runTests', () => {
    // This function should run the tests...
  })
});


function urlExists(url, cb) {
  request({ url: url, method: 'HEAD' }, function(err, res) {
    if (err) return cb(null, false);
    cb(null, /4\d\d/.test(res.statusCode) === false);
  });
}


io.listen(port);

// Verify were running sockets...
console.log('listening on port ', port)