const Test = require('../models/tests.model.js');

// Adds a new test
exports.create = (req, res) => {
  if (!req.body.name || !req.body.dev || !req.body.current) {
    return res.status(400).send({
      message: "All fields are required"
    })
  }

  const test = new Test({
    name: req.body.name,
    current: req.body.current,
    dev: req.body.dev
  })

  test.save().then((data) => {
    res.send(data)
  }).catch((error) => {
    res.status(500).send({
      message: error.message || "Error has occured"
    })
  })

}

// Finds a single test
exports.findAll = (req, res) => {
  Test.find().then((tests) => {
    res.send(tests)
  }).catch((error) => {
    res.status(500).send({
      message: error.message || "Error has occured"
    })
  })
}

// Finds one id
exports.findOne = (req, res) => {
  Test.findById(req.params.testId).then((test) => {
    if (!test) {
      return res.status(404).send({
        message: `No matching test with the id ${req.params.testId} could be found...`
      })
    }

    res.send(test)
  }).catch((error) => {
    if(error.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Test with the id ${req.params.ntestId} could be found`
      })
    }

    return res.status(500).send({
      message: `Error retreiving test with id ${req.params.testId}`
    })
  })
}

// Updates a test
exports.update = (req, res) => {
  if (!req.body.name || !req.body.dev || !req.body.current) {
    return res.status(400).send({
      message: "All fields are required"
    })
  }

  Test.findByIdAndUpdate(req.params.testId, {
    name: req.body.name,
    current: req.body.current,
    dev: req.body.dev
  }, {new: true}).then((test) => {
    if (!test) {
      return res.status(404).send({
        message: `Test not found with id ${req.params.testId}`
      })
    }

    res.send(test);
  }).catch((error) => {
    if(error.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Test with the id ${req.params.ntestId} could be found`
      })
    }

    return res.status(500).send({
      message: `Error retreiving test with id ${req.params.testId}`
    })
  })
}

exports.delete = (req, res) => {
  Test.findByIdAndRemove(req.params.testId).then((test) => {
    if (!test) {
      return res.status(404).send({
        message: `Test not found with id ${req.params.testId}`
      })
    }

    res.send({
      message: `Test with id ${req.params.testId} has been deleted...`
    })
  }).catch((error) => {
    if (error.kind === 'ObjectId' || error.name === 'NotFound') {
      return res.status(404).send({
          message: `Test not found with id ${req.params.noteId}`
      });                
    }
    return res.status(500).send({
        message: `Could not delete test with id ${req.params.noteId}`
    });
  })
}