#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
var program = require('commander');
const slugify = require('slugify');
const rename = require('rename');
const thisDir = path.resolve('./'); //path.basename(process.cwd());
const {
  exec
} = require('child_process');




//process fd
function fd() {
  return new Promise(function (res, rej) {
    
    exec('fd --full-path ' + thisDir, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }
      let y = stdout.split('\n');
      var filtered = y.filter(function (el) {
        return el != '';
      });
      res(filtered);
    });
  });
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

let format = function (name) {
  let y = slugify(name);
  return replaceAll(y, "_", "-");
}

function printTemplate(obj) {

  console.log(chalk.blue.bold.underline(`Name:`), chalk.blue.bold(`${obj.name}`));
}

async function start() {
  
  
  let r = await fd();
  r.forEach(function (f) {
   
    let p = path.parse(f);

    let newName = format(p.name);
    console.log(f);
    if (p.name !== newName) {
     
        console.log(p.base + " --> " + newName);

      if (!program.dryrun) {
        console.log(thisDir + "/" + f);
        rename(thisDir + "/" + f, thisDir + "/" + newName);
      }
    }
  });
}


program.option('-d, --dryrun', 'Dry run (show changes)');
program.parse(process.argv);
start();
