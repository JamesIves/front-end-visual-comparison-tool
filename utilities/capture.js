const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const compare = require('./diff');
const DirectoryConfig = require('../config/directory.config');

const log = console.log;
const directory = DirectoryConfig.path;

/**
* @desc Creates an async timeout.
* @param {string} ms - The amount of time the timeout should be for.
**/
async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
* @desc Generates a snapshot of both the live and dev environment using Pupeteer.
* @param {string} test._id - The id of the test.
* @param {string} test.name - The name of the test.
* @param {string} test.live - The http path that represents the live site.
* @param {string} test.dev - The http path that represents the dev site.
**/
async function runTest(test) {
  const { _id, name, live, dev, size } = test;
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    /* If a size is present we set the viewport, otherwise we leave it
    open to the default setting. */
    if (size) {
      await page.setViewport({
        width: size,
        height: 0
      })
    };

    /* Navitates puppeteer to the page to take the screenshot. If an error is
    encountered we throw an exception cancelling the rest of the process.
    These errors are collected in an API response so we can alert the front-end. */
    await page.goto(live).catch((error) => {
      throw `${error} ${live}`
    });

    log(chalk.yellow(`Taking Live screenshot for the ${name} test!`));
      
    /* We set a timeout here to make sure that all initial load animations
    have finished playing before we take the screenshots. */
    await timeout(5000);

    await page.screenshot({
      path: `${directory}/live_${_id}.png`,
      fullPage: true
    });

    await page.goto(dev).catch((error) => {
      throw `${error} ${dev}`
    });

    log(chalk.yellow(`Taking Dev screenshot for the ${name} test!`));
    await timeout(5000);

    await page.screenshot({
      path: `${directory}/dev_${_id}.png`,
      fullPage: true
    });
      
    log(chalk.green(`Generating diff overlay...`));

    /* Once we have both of our screenshots we send them over to the compare function
    so we can get a pixel overlay for each image. */
    await compare(_id);

  } catch(error) {
    log(chalk.red(`Encountered an error while taking a screenshot: ${error}`));
    await browser.close();

    test['success'] = false;
    return test;

  } finally {
    await browser.close();

    test['success'] = true;
    return test;
  }
}


/**
* @desc Runs all of the neccersary procceses to capture a visual diff.
* @param {array} tests - An array of objects that contain test data.
**/
module.exports = tests => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(directory)) {
      mkdirp(directory, (() => {
        log(chalk.red(`Created directory: ${directory}`));
      }));
    };
  
    let testPromises = tests.map(test =>  {
      return runTest(test);
    });
  
    Promise.all(testPromises).then(results => {
      resolve(results);
    }).catch(() => {
      reject('Encountered processing error.');
    });
  })
}