const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const MongoConfig = require('./config/database.config');
const morgan = require('morgan');
const cors = require('cors');
const port = 9090;
const capture = require('./capture')

app.use(morgan('combined')); // Logging debugging
app.use(cors()) // Handles CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Establish connection to the database...
mongoose.connect(MongoConfig.url, { useNewUrlParser: true })
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


