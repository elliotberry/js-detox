#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const format = require("./slugify.js");
const fd = require("./fs2.js");
const ignore = require("./match-ignore");
const thisDir = path.resolve(".");

const findFilesToChange = async function (filesArray) {
  let filesToChange = [];
  for await (f of filesArray) {
    let p = path.parse(f);
    let oldName = p.name;
    let newName = format(oldName);
    if (p.name !== newName) {
      filesToChange.push({ oldName: oldName, newName: newName });
    }
  }
  return filesToChange;
};

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
  const filteredNum = filesArray.length - filtered.length;
  const filesToChange = await findFilesToChange(filtered);
  console.log(`found ${filesArray.length} files, filtered ${filteredNum}. ${filesToChange.length} files to rename.`)

  showFileUpdates(filesToChange)
}

//program.option("-d, --dry-run", "Dry run (show changes)");
//program.parse(process.argv);
start();
