const fs = require('fs');
const path = require('path');

module.exports = {
  currentBase: () => {
    return path.basename(process.cwd());
  },
};