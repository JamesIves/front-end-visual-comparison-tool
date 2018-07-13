const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const chalk = require('chalk');
const compare = require('./diff');

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = (tests) => (() => {
  const log = console.log;
  const diffDirectory = './client/public/diff';

  /* Removes dated content from previous tests by destroying the diff directory
    and replacing it with a brand new one. */
  rimraf(diffDirectory, (() => {
    log(chalk.blue('Succesfully removed the old diff directory...'))

    mkdirp(diffDirectory, (() => {
      log(chalk.blue('Creating new parent diff folder...'))
    }));
  }))


  tests.forEach(({name, live, dev, dimensions}) => {
    // Loop over all dimensions and make a comparrison for all of them...
    dimensions.forEach((dimension) => {
      const testName = name.replace(/\s+/g, '-').toLowerCase();
      const directory = `${diffDirectory}/${testName}/${dimension}`

      // Creates a directory for each size/test
      if (!fs.existsSync(directory)) {
        mkdirp(directory, (() => {
          log(chalk.red(`Created directory: ${directory}`))
        }))
      }

      /* Creates a headless browser instance with Puppeteer and takes our screenshots
        so we can run them through the pixel matcher library. */
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({
          width: dimension,
          height: 0
        })

        // Visits the live site to take a comparrison screenshot
        await page.goto(live);
        log(chalk.green(`Taking live screenshot for ${name} test at dimension ${dimension}`))
        
        /* We set a timeout here to make sure that all initial load animations
          have finished playing before we take the screenshots. */
        await timeout(5000);

        await page.screenshot({
          path: `${directory}/live.png`,
          fullPage: true
        });

        await page.goto(dev)
        log(chalk.green(`Taking dev screenshot for ${name} test at dimension ${dimension}`))
        await timeout(5000);

        await page.screenshot({
          path: `${directory}/dev.png`,
          fullPage: true
        });

        await browser.close();
        
        // Procceses each image and creates a comparrison image for the overlays.
        log(chalk.red(`Generating diff overlay...`))
        await compare(directory);

        // TODO: This should be refactored into a promise so we know
        // When to start the server for comparrison
      })();
    })
  })
})
