# Front-End Visual Comparison
This application runs a side by side visual comparrison between the Front-End of your local developer environment and your production site. Once the tests have concluded a web server is created which will show the pixel by pixel difference of what has changed.

## Getting Started
Clone this repository, or simply download it as a zip. Once done you can modify the `tests` array found within `config.js`. Each test should be an object containing a series of paramters, you can have as many or as little tests as you like.

```javascript
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
```

All available paramters can be found in the table below.

| Parameter | Description | Type | Requirement |
| ------------- | ------------- | ------------- | ------------- |
| `name`  | The `name` parameter should represent the name of your test. For instance if you're testing your article page, you should name this `Article Page` or something similar. | `String` | `Required` | 
| `live`  | The `live` parameter should represent the URL of the page you'd like to base your tests on. All comparrisons will be drawn against this url. | `String` | `Required` |
| `dev`  | The `dev` paramter should represent the url of the page you're currently working on. Typically this would be a localhost or staging url, and its used to check for regressions against the live url. | `String` | `Required` |
| `dimensiuons`  | The `dimensions` paramter should be an array containing all of the breakpoints you'd like to test against. Each test can be run multiple times at different breakpoints to ensure mobile compatability. The array should contain integers which represent the browser width, the test will _always_ run against the entire height of the page. | `Array` | `Required` |

Once done run the following command. The terminal will update you on the status of the test, and the web server will launch once all comparrisons have been made.

```bash
$ node config.js
```

## FAQ
```
Question: Which browser does this use?
Answer: This application takes the screenshot with Chrome using puppeteer. 

Question: Can I adjust the threshold for the overlay?
Answer: Yes! You can adjust it using the threshold variable in the config.js file. The pixel comparrisons are created using the pixelmatch library. 
```
