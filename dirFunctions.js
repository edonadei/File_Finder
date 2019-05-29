let fs = require('fs');
let path = require('path');

exports.walk = function (dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        let biggestFileInFolder = {
            path: null,
            size: 0
        };
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    exports.walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    let filesize = fs.statSync(biggestFileInFolder.path)["size"];
                    if (biggestFileInFolder.path) {
                        if (filesize > biggestFileInFolder.size) {
                            biggestFileInFolder.path = file;
                            biggestFileInFolder.size = filesize;
                        }
                    } else {
                        biggestFileInFolder.path = file;
                        biggestFileInFolder.size = filesize;
                    }

                    if (!--pending) done(null, results);
                }
            });
        }
        );
        results.push(biggestFileInFolder);
    });
};
