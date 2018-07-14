const tests = require('../controllers/tests.controller.js')

module.exports = (app) => {
  app.post('/tests', tests.create);
  app.get('/tests', tests.findAll);
  app.get('/tests/:testId', tests.findOne);
  app.put('/tests/:testId', tests.update);
  app.delete('/tests/:testId', tests.delete);
  app.get('/run', tests.testAll);
  app.get('/run/:testId', tests.testOne);
}