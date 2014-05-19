'use strict';

var fs = require('fs');

/**
* @param {String} file
* @return {String}
*/
var getExtension = function (file) {
    var ext = '';
    if (file && typeof file === 'string' && file.indexOf('.') !== -1) {
        ext = file.split('.').pop().toLowerCase();
    }
    return ext;
};

/**
* @param {String} file
* @param {String} ext
* @return {Boolean}
*/
var isExtension = function (file, ext) {
    var fileExt = file && getExtension(file);
    return !!(fileExt && (new RegExp(ext, 'i')).test(fileExt));
};

/**
* @param {String} dir
* @param {String} ext
* @param {Boolean} recursive
* @param {Function} done - err, {String[]} files
*/
var findByExtension = function (dir, ext, recursive, done) {
    var foundFiles = [],
        pending;

    var finish = function () {
        if (!pending) {
            done(null, foundFiles);
        }
    };

    // Used to keep proper reference to file
    var helper = function (file) {
        return function (err, stats) {
            if (!err) {

                // handle files
                if (stats.isFile()) {
                    pending--;

                    if (isExtension(file, ext)) {
                        foundFiles.push(file);
                    }
                    finish();

                } else if (stats.isDirectory()) {

                    // handle dirs
                    if (recursive) {
                        findByExtension(file, ext, recursive, function (err, files) {
                            pending--;
                            foundFiles = foundFiles.concat(files);
                            finish();
                        });
                    } else {
                        pending--;
                    }
                }        
            }
        };
    };

    fs.readdir(dir, function (err, files) {
        var file, i;

        if (err) {
            done(err);
        } else {

            pending = files.length;

            for (i = 0; i < files.length; i++) {
                file = dir + '/' + files[i];
                fs.stat(file, helper(file));
            }
        }
    });
};

exports.find = findByExtension;
exports.getExtension = getExtension;
exports.isExtension = isExtension;