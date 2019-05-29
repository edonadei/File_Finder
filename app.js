let dir = "V:\Folder";
let dirFunctions = require("./dirFunctions");

dirFunctions.walk(dir, function (err, results) {
  if (err) throw err;
  console.log(results);
});