
const path = require('path');

const slugify = require('slugify');




function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

let format = function (name) {
  let y = slugify(name);
  return replaceAll(y, "_", "-").toLowerCase();
}


let file = process.argv[2];
let k = path.parse(file);

console.log(format(k.name) + k.ext);
