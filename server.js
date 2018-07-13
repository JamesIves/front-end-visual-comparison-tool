const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')
const MongoConfig = require('./config/database.config')
const port = 9090

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Establish connection to the database...
mongoose.connect(MongoConfig.url)
.then(() => {
  require('./routes/tests.routes.js')(app);

  app.listen(port, () => {
    console.log('Now listening on port ', port)

    // TODO: Initialize our front-end when the database has connected
  })
}).catch(error => {
  console.error('Encountered an error while starting the API', error)
  process.exit();
});
