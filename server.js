const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/tests/create', (req, res) => {
  console.log(req.body)
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(process.env.PORT || 8080);