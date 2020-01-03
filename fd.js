const {
    exec
} = require("child_process");


//process fd
module.exports = function(thisDir) {
    return new Promise(function(res, rej) {
        exec("fd --full-path " + thisDir, (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                return;
            }
            let y = stdout.split("\n");
            var filtered = y.filter(function(el) {
                return el != "";
            });
            res(filtered);
        });
    });
}