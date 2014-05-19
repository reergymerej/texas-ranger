# Texas Ranger

This is an npm module for walking directories.  [Get it](http://upload.wikimedia.org/wikipedia/en/4/4b/WalkerTitle.jpg)?

## API

### find

Asynchronously finds files in a directory with a given extension.

Parameters:

* {String} `directory` - the directory to search
* {String} `extension` - the file extension to look for
* {Boolean} `recursive` - search sub-directories
* {Function} `callback`
    * {Error} `err` - error encountered or `null`
    * {String[]} `files` - an array of the files

Returns: {undefined}

```javascript
var txRng = require('texas-ranger');

txRng.find('some-dir', 'txt', false, function (err, files) {
    if (!err && files) {
        console.log(files);
    }
});
```

### getExtension

Returns the extension of a given file in lowercase.

Parameters:

* {String} `file`

Returns: {String}

```javascript
var txRng = require('texas-ranger');

txRng.getExtension('foo.bAr'); // 'bar'
```

### isExtension

Test a file to see if it has an extension.

Parameters:

* {String} `file`
* {String} `extension`

Returns: {Boolean}

```javascript
var txRng = require('texas-ranger');

txRng.isExtension('foo.bAr', 'BaR'); // true
txRng.isExtension('foo', 'baz'); // false
```