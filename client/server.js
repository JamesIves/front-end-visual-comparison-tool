const io = require('socket.io')();

io.on('connection', (client) => {

  // Emit event to load tests, make this a callback so we can
  // run a .then statement on the client
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

const port = 8000;
io.listen(port);

// Verify were running sockets...
console.log('listening on port ', port)