

const ignores = [
    ".git",
    "node_modules"
]


module.exports = async function(files) {
    let filtered = []
    files.forEach(file => {
        let ret = true
        for (let x=0; x < ignores.length; x++) {
            if (file.includes(ignores[x])) {
                ret = false;
                break;
            }
        }
        if (ret === true) {
            filtered.push(file);
        }
    })
    return filtered
};
