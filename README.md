# Texas Ranger

This is an npm module for walking directories.  [Get it](http://upload.wikimedia.org/wikipedia/en/4/4b/WalkerTitle.jpg)?

## API

### find

Finds files in a directory with a given extension.

* {String} directory
* {String} extension
* {Boolean} recursive
* {Function} callback
    * {Error} err
    * {String[]} files


    var txRng = require('texas-ranger');

    txRng.find('some-dir', 'txt', false, function (err, files) {
        if (!err && files) {
            console.log(files);
        }
    });