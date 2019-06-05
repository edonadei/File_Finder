let fs = require('fs');
let path = require('path');

exports.walk = function (dir, done) {
    let results = [];
    // Here we read the dir
    fs.readdir(dir, function (err, list) {
        if (err) 
        {
            return done(err);
        }
        // For each dir, we keep in memory the biggest file
        let biggestFileInFolder = {
            path: null,
            size: null
        };
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    exports.walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    // If we have a biggest file
                    if (biggestFileInFolder.path) { 
                        let filesize = fs.statSync(biggestFileInFolder.path)["size"];
                        if (filesize > biggestFileInFolder.size) {
                            biggestFileInFolder.path = file;
                            biggestFileInFolder.size = filesize;
                        }
                    // If we don't, we create one
                    } else {
                        biggestFileInFolder.path = file;
                        biggestFileInFolder.size = fs.statSync(file)["size"];
                    }

                    if (!--pending) done(null, results);
                }
            });
        }
        );
        results.push(biggestFileInFolder);
    });
};
