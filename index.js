#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const format = require("./lib/slugify.js");
const fd = require("./lib/fs2.js");
const ignore = require("./lib/match-ignore");
const thisDir =  path.resolve(process.argv[2]);
const findFilesToChange = require('./lib/findfiles')

async function showFileUpdates(pathObjArr) {
  pathObjArr.forEach((obj) => {
    console.log(
      chalk.blue.bold.underline(obj.oldName) +
        " --> " +
        chalk.blue.bold(obj.newName)
    );
  });
}

async function start() {
  console.log(`looking in this dir: ${chalk.blue.bold.underline(thisDir)}`)
  let filesArray = await fd(thisDir);
  
  let filtered = await ignore(filesArray);
  console.log(filtered.length)
  const filteredNum = filesArray.length - filtered.length;
 //const filesToChange = await findFilesToChange(filtered);
  console.log(`found ${filesArray.length} files, filtered ${filteredNum}. files to rename.`)

 // showFileUpdates(filesToChange)
}


start();
