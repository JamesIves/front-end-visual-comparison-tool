module.exports = (app) => {
  const tests = require('../controllers/tests.controller.js')

  app.post('/tests', tests.create);

  app.get('/tests', tests.findAll);

  app.get('/tests/:testId', tests.findOne)

  app.put('/tests/:testId', tests.update);

  app.delete('/tests/:testId', tests.delete);
}