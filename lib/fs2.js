
var fs = require('fs');
var path = require('path');

const findInDir = function(dir, fileList = []) {
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        
        const filePath = path.join(dir, file);
        const fileStat = fs.lstatSync(filePath);
        
        if (fileStat.isDirectory()) {
            findInDir(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });

    return fileList;
}

module.exports = async function(dir) {
    return await findInDir(dir);
}

