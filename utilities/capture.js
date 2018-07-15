const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const chalk = require('chalk');
const compare = require('./diff');

const log = console.log;
const directory = './client/public/diff';

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

      log(chalk.green(`Taking Live screenshot for the ${name} test!`))
      
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

      log(chalk.green(`Taking Dev screenshot for the ${name} test!`));
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

module.exports = (tests) => {
    if (!fs.existsSync(directory)) {
      mkdirp(directory, (() => {
        log(chalk.red(`Created directory: ${directory}`))
      }))
    }
  
    if (Array.isArray(tests)) {
      tests.forEach((test) => {
        runTest(test)
      })
    } else {
      runTest(tests)
    }
}