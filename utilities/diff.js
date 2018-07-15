const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const chalk = require('chalk');
const DirectoryConfig = require('../config/directory.config');

/**
* @desc Generates a pixel comparison between two images with the aid of the pixelmatch library.
* @param {string} id - The id of the test.
**/
module.exports = (id) => {
  const log = console.log;
  const directory = DirectoryConfig.path;
  let filesRead = 0;

  const live = fs.createReadStream(`${directory}/live_${id}.png`).pipe((new PNG()).on('parsed', doneReading));
  const dev = fs.createReadStream(`${directory}/dev_${id}.png`).pipe((new PNG()).on('parsed', doneReading));

  function doneReading() {
    if (++filesRead < 2) return;
  
    const diff = new PNG({width: live.width, height: live.height})
    pixelmatch(live.data, dev.data, diff.data, live.width, live.height, { threshold: 0.1 });
  
    diff.pack().pipe(fs.createWriteStream(`${directory}/diff_${id}.png`));
    log(chalk.green(`Succesfully generated the diff image for test id: ${id}`))
  }
}