var fs = require('fs');
var path = require('path');
var isUnixHiddenPath = function(path) {
    return /(^|\/)\.[^\/\.]/g.test(path);
};
var isValid = function(file) {
   return !isUnixHiddenPath(path.basename(file));
}
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
            if(isValid(file)) {
                results.push(file);
            }
          
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

module.exports = async function(dir) {
    return new Promise(function(res, rej) {
        walk(dir, function(err, results) {
            if (err) {
                rej(err);
            }
            else {
                res(results);
            }
         
        });
    });
   
};