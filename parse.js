const slugify = require("slugify");
const rename = require("rename");

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, "g"), replace);
}
module.exports = function(name) {
    let y = slugify(name);
    let g = y.toLowerCase();
    return replaceAll(g, "_", "-");
};
