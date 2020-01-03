#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const program = require("commander");

const format = require("./parse.js");
const f = require("./files.js");
const fd = require('./fd.js');
const thisDir = path.resolve('./');

async function start() {
    let r = await fd(thisDir);

    r.forEach(function(f) {
        let p = path.parse(f);
        let newName = format(p.name);
        if (p.name !== newName) {
            console.log(chalk.blue.bold.underline(p.base) + " --> " + chalk.blue.bold(newName));
            if (!program.dryrun) {
              //console.log(thisDir + "/" + f, thisDir + "/" + newName);
              fs.renameSync(thisDir + "/" + f, thisDir + "/" + newName + p.ext);
                //rename(thisDir + "/" + f, thisDir + "/" + newName);
            }
        }
    });
}

program.option("-d, --dryrun", "Dry run (show changes)");
program.parse(process.argv);
start();
