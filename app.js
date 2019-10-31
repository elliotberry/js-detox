 const fs = require('fs');
 const path = require('path');
 const chalk = require('chalk');
 const prettyBytes = require('pretty-bytes');
 var prompt = require('prompt-sync')();
 const yn = require('yn');

 const {
   exec
 } = require('child_process');

 function getFilesize(filename) {
   const stats = fs.statSync(filename);
   const fileSizeInBytes = stats.size;
   return prettyBytes(fileSizeInBytes);
 }

 function fd() {
   return new Promise(function (res, rej) {
     exec('fd . -t f -H', (err, stdout, stderr) => {
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

 function headCat(file) {
   return new Promise(function (res, rej) {
     exec('cat ' + file, (err, stdout, stderr) => {
       if (err) {
         // node couldn't execute the command
         return;
       }

       let length = stdout.length;
       let y = stdout.substring(0, 200);
       let head = replaceAll(y, "\n", " ").trim();

       let obj = {
         path: file,
         name: path.parse(file).base,
         head: head,
         length: length,
         size: getFilesize(file)
       }

       res(obj);
     });
   });
 }


 function printTemplate(obj) {


   console.log('###################################################');
   console.log(chalk.blue.bold.underline(`Name:`), chalk.blue.bold(`${obj.name}`));
   console.log(chalk.bold.green.underline(`File Head:`), chalk.bold.green(`"${obj.head}"`));
   console.log(chalk.magenta.bold.underline(`Length:`), chalk.magenta.bold(`${obj.length} characters`));
   console.log(chalk.cyan.bold.underline(`Size:`), chalk.cyan.bold(` ${obj.size}`));
   console.log('###################################################');


 }

 function deleteFile(f) {

   fs.unlink(f.path, function (error) {
     if (error) {
       throw error;
     }
   });

 }

 async function start() {
   let r = await fd();

   let total = r.length;
   let i = 0;
   r.forEach(function (fi) {
     headCat(fi).then(function (item) {
       i++;
       console.log("");
       console.log("");
       console.log("");
       console.log("---------" + i + " / " + total + "---------");
       printTemplate(item);
       let n = prompt('Delete this file? (y/N)');
       if (yn(n) == true) {
         deleteFile(item);
         console.log("deleted " + item.path);
       }

     });

   });

 }
 start();
