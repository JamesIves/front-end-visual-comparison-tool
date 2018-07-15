const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const compare = require('./diff');
const DirectoryConfig = require('../config/directory.config');

// TODO: Probably export these from somewhere else?
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
* @param {string} obj._id - The id of the test.
* @param {string} obj.name - The name of the test.
* @param {string} obj.current - The http path that represents the live site.
* @param {string} obj.dev - The http path that represents the dev site.
**/
async function runTest({_id, name, current, dev}) {
  (async () => {
    const browser = await puppeteer.launch();

    try {
      const page = await browser.newPage();

      /* Navitates puppeteer to the page to take the screenshot. If an error is
      encountered we throw an exception cancelling the rest of the process.
      These errors are collected in an API response so we can alert the front-end. */
      await page.goto(current).catch((error) => {
        throw `${error} ${current}`
      })

      log(chalk.yellow(`Taking Live screenshot for the ${name} test!`))
      
      /* We set a timeout here to make sure that all initial load animations
        have finished playing before we take the screenshots. */
      await timeout(5000);

      await page.screenshot({
        path: `${directory}/live_${_id}.png`,
        fullPage: true
      });

      await page.goto(dev).catch((error) => {
        throw `${error} ${current}`
      })

      log(chalk.yellow(`Taking Dev screenshot for the ${name} test!`));
      await timeout(5000);

      await page.screenshot({
        path: `${directory}/dev_${_id}.png`,
        fullPage: true
      });
      
      log(chalk.green(`Generating diff overlay...`))

      /* Once we have both of our screenshots we send them over to the compare function
      so we can get a pixel overlay for each image. */
      await compare(_id);

    } catch(error) {
      log(chalk.red(`Encountered an error while taking a screenshot: ${error}`))
      await browser.close()

    } finally {
      await browser.close()
    }
  })();
}


/**
* @desc Runs all of the neccersary procceses to capture a visual diff.
* @param {array} tests - An array of objects that contain test data.
**/
module.exports = (tests) => {
  console.log(directory)
    if (!fs.existsSync(directory)) {
      mkdirp(directory, (() => {
        log(chalk.red(`Created directory: ${directory}`))
      }))
    }

    tests.forEach((test) => {
      runTest(test)
    })
}