let dir = "C:\\Users\\Emrick-PC-Portable\\Documents";
let dirFunctions = require("./dirFunctions");


dirFunctions.walk(dir, function (err, results) {
  if (err) throw err;
  console.log(results);
});
