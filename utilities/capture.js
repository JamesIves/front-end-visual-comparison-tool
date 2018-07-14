const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const chalk = require('chalk');
const compare = require('./diff');

const log = console.log;
const diffDirectory = './client/public/diff';

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTest({name, current, dev}) {
  const testName = name.replace(/\s+/g, '-').toLowerCase();
  const directory = `${diffDirectory}/${testName}`

  // Creates a directory for each size/test
  if (!fs.existsSync(directory)) {
    console.log('does this exist?')
    mkdirp(directory, (() => {
      log(chalk.red(`Created directory: ${directory}`))
    }))
  }

  (async () => {
    const browser = await puppeteer.launch();

    try {
      const page = await browser.newPage();
      // Visits the live site to take a comparrison screenshot
      await page.goto(current).catch((error) => {
        throw `${error} ${current}`
      })

      log(chalk.green(`Taking live screenshot for ${name} test`))
      
      /* We set a timeout here to make sure that all initial load animations
        have finished playing before we take the screenshots. */
      await timeout(5000);

      await page.screenshot({
        path: `${directory}/live.png`,
        fullPage: true
      });

      await page.goto(dev).catch((error) => {
        throw `${error} ${current}`
      })

      log(chalk.green(`Taking dev screenshot for ${name} test`));
      await timeout(5000);

      await page.screenshot({
        path: `${directory}/dev.png`,
        fullPage: true
      });

      await browser.close();
      
      // Procceses each image and creates a comparrison image for the overlays.
      log(chalk.red(`Generating diff overlay...`))
      await compare(directory);

    } catch(error) {
      console.log(`Encountered an error while taking a screenshot: ${error}`)
      browser.close()
    } finally {
      browser.close()
    }

    // TODO: This should be refactored into a promise so we know
    // When to start the server for comparrison
  })();
}

module.exports = (tests) => {
  /* Removes dated content from previous tests by destroying the diff directory
    and replacing it with a brand new one.
    rimraf(diffDirectory, (() => {
      log(chalk.blue('Succesfully removed the old diff directory...'))
  
      mkdirp(diffDirectory, (() => {
        log(chalk.blue('Creating new parent diff folder...'))
      }));
    }))*/
  
    if (Array.isArray(tests)) {
      tests.forEach((test) => {
        runTest(test)
      })
    } else {
      runTest(tests)
    }
}