const recursive = require("recursive-readdir");
module.exports = function(thisDir) {
    return new Promise(function(res, rej) {
        recursive(thisDir, function(err, files) {
      
            if (err) {
                rej(err);
            } else {
                res(files);
            }
        });
    });
};
