const tests = [
  {
    name: 'Homepage',
    live: 'http://jamesiv.es',
    dev: 'http://localhost:4000',
    dimensions: [728, 320]
  },
  {
    name: 'Blog Page',
    live: 'https://jamesiv.es/blog',
    dev: 'http://localhost:4000/blog',
    dimensions: [728, 320]
  }
];

const visualRegression = require('./capture')(tests)

// Runs the visual regression test
visualRegression()