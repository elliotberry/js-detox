 const slugify = require('slugify');
 const fs = require('fs');
 const path = require('path');


 // List all files in a directory in Node.js recursively in a synchronous fashion
 let walkSync = function (dir, filelist = []) {
   let files = fs.readdirSync(dir);
 
   files.forEach(function (file) {
     if (fs.statSync(path.join(dir, file)).isDirectory()) {
       filelist = walkSync(path.join(dir, file), filelist);
     } else {
       filelist.push(path.join(dir, file));
     }
   });
   return filelist;
 };

 let rn = function (old, nu) {
   fs.rename(old, nu, function (data, err) {
     console.log(data, err);
   });

 }
 let makeName = function(p) {
    let r = path.parse(p);
    let newName = slugify(r.name).toLowerCase();
    return newName + r.ext;
 }
 
 let r = walkSync(process.argv[2]);
 r.forEach(function(file) {
     console.log(makeName(file));
 })
 console.log(r);
