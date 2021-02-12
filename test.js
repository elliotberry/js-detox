const fg = require('fast-glob');
const g = async function() {
    const entries = await fg(['.git'], { dot: true });
    console.log(entries)
}
g();