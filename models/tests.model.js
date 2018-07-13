const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({
  title: String,
  current: String,
  dev: String
})

module.exports = mongoose.model('Test', TestSchema);