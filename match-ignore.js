var glob = require('glob');
const ignores = [
    ".git",
    "node_modules",
    //"LICENSE",
    //"README"
]



module.exports = async function(files) {
   
    return files.filter(file => {
        let ret = false;
        for (let x=0; x < ignores.length; x++) {
            if (file.indexOf(ignores[x] > -1)) {
                ret = true;
                break;
            }
        }
       return ret
    })

};
