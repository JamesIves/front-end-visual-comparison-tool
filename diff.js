const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

// Makes the pixel comparrison between the two screenshots
module.exports = (directory) => {
  let filesRead = 0;
  const live = fs.createReadStream(`${directory}/live.png`).pipe((new PNG()).on('parsed', doneReading));
  const dev = fs.createReadStream(`${directory}/dev.png`).pipe((new PNG()).on('parsed', doneReading));

  function doneReading() {
    if (++filesRead < 2) return;
  
    const diff = new PNG({width: live.width, height: live.height})
  
    pixelmatch(live.data, dev.data, diff.data, live.width, live.height, { threshold: 0.1 });
  
    diff.pack().pipe(fs.createWriteStream(`${directory}/diff.png`));
  }
}