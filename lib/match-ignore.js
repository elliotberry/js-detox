const picomatch = require('picomatch');
const ignores = [
    "*git*",
    "*node_modules*"
]


module.exports = async function(files) {
   
    let d = await files.filter(file => {
        let k = picomatch.matchBase(file, ignores)
        console.log(k)

        return k
    })
    return d

};
