# Front-End Visual Comparison
This application runs a side by side visual comparrison between the Front-End of your local developer environment and your production site. Once the tests have concluded a you'll be able to view the comparrison side by side in the applications interface.

## Getting Started
Clone this repository, or simply download it as a zip. As this project is database driven you'll need to start up a local Mongo database and import the path into the `config/database.config.js` file like so:

```javascript
module.exports = {
  url : 'mongodb://localhost'
};
```

Once you've added your database path you can run the following commands in order. This will install the required dependencies and start the service.

```shell
$ npm install
$ npm start
```

Once the service is started you can access the local interface at http://localhost:3000. The API service runs on port 9090.

## Creating a Test
The interface will prompt you to add a "Live" and a "Dev" site, and a name. The service will make a visual comparrison using the live site as the base, and the overlay will highlight the changes between the two. Once the test has been created the service will begin running the test in the background, this can sometimes take some time as it needs to navigate to both web pages to gather the screenshots. You'll be able to navigate to the test in the "Show All Tests" interface, and it will update in real-time once the test has concluded. 

## Re-Running Tests
If you'd like to re-run a test you can go to the tests page and click the "Re-Run Test" button. If you'd like to bulk update all of your tests you can choose "Run All Tests" from the navigation menu. Each test page also provides you with the ability to update or delete a test if you no longer want it to make a comparison.

## API
There's several API endpoints which can be utilized.

| Endpoint | Type | Description |
| ------------- | ------------- | ------------- |
| `/tests`  | `GET` | Fetches all tests. |
| `/tests`  | `POST` | Adds a test, accepts a JSON object with the properties `name`, `live` and `dev`. |
| `/tests/:id`  | `GET` | Fetches a specific test based on its id. |
| `/tests/:id`  | `PUT`  | Updates a specific test, accepts a JSON object with the properties `name`, `live` and `dev`. |
| `/tests/:id`  | `DELETE`  | Deletes a specific test. |
| `/run`  | `GET`  | Runs all tests that are stored in the database. Eventually returns an array containing all of the tests with a `validate` flag that will either be `true` or `false` depending on if the test resulted in an error or not. |
| `/run/:id`  | `GET`  | Runs a specific test. Returns the test object with a `validate` flag that will be either `true` or `false` depending on if the test resulted in an error or not. |


## FAQ
```
Question: Which browser does this use?
Answer: This application takes the screenshot with Chrome using puppeteer. 
```

![Screenshot](screenshot.png)
