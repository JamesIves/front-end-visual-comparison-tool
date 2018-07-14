const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({
  name: String,
  current: String,
  dev: String
})

module.exports = mongoose.model('Test', TestSchema);