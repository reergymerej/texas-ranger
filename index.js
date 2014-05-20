'use strict';

var fs = require('fs');
var settings = (function () {

    var data = {
        relative: true
    };

    return {
        get: function (x) {
            return data[x];
        },

        set: function (x, y) {
            data[x] = y;
        }
    };
}());

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
        pending,
        dirRegExp = settings.get('relative') &&
            new RegExp('^' + dir + '\/');

    var finish = function () {
        var i;

        if (!pending) {
            for (i = 0; i < foundFiles.length && dirRegExp; i++) {
                foundFiles[i] = foundFiles[i].replace(dirRegExp, '');
            }
            done(null, foundFiles.length ? foundFiles : null);
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

    if (dir && ext) {
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
    } else {
        done(new Error(!dir ? 'What directory, dude?' :
            'What extension are you looking for?'));
    }
};

exports.find = findByExtension;
exports.getExtension = getExtension;
exports.isExtension = isExtension;
exports.settings = settings;