const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({
  name: String,
  description: String,
  live: String,
  dev: String,
  size: Number
})

module.exports = mongoose.model('Test', TestSchema);