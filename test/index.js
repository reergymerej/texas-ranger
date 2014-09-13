/* jshint expr: true */

var txRng = require('../index'),
    getExtension = txRng.getExtension,
    isExtension = txRng.isExtension,
    testDir = process.cwd() + '/test/test-fs',
    get = txRng.settings.get,
    set = txRng.settings.set,
    will = require('willy').will;

describe('getExtension', function () {
    it('should return a string', function () {
        will(getExtension('asdf.txt')).beA(String);
    });

    it('should return something even when there is no .', function () {
        will(getExtension('asdf')).be('');
    });
});

describe('isExtension', function () {
    it('should return a Boolean', function () {
        will(isExtension()).be(false);
    });

    it('should return true for a match', function () {
        will(isExtension('foo.bar', 'bar')).be(true);
    });

    it('should return false for no match', function () {
        will(isExtension('foo.bar', 'baz')).be(false);
    });

    it('should be case-insensitive', function () {
        will(isExtension('foo.BaR', 'bAR')).be(true);
    });
});

describe('find', function () {

    describe('errors', function () {
        it('should result when missing "dir" arg', function (done) {
            txRng.find(null, 'txt', true, function (err, files) {
                will(err).beAn(Error);
                done();
            });
        });

        it('should result when missing "ext" arg', function (done) {
            txRng.find(testDir, '', true, function (err, files) {
                will(err).beAn(Error);
                done();
            });
        });
    });

    describe('success', function () {
        it('should return null for no matches', function (done) {
            txRng.find(testDir, 'donkey', false, function (err, files) {
                will(files).beNull();
                done();
            });
        });

        it('should not search recursively unless asked', function (done) {
            txRng.find(testDir, 'txt', false, function (err, files) {
                will(files).haveOnly([
                    'bar.txt',
                    'foo.txt'
                ]);
                done();
            });
        });

        it('should return an array', function (done) {
            txRng.find(testDir, 'txt', false, function (err, files) {
                will(files).beAn(Array);
                done();
            });
        });

        describe('foo', function () {
            before(function () {
                set('relative', false);
            });

            after(function () {
                set('relative', true);
            });
            it('should find all matches', function (done) {

                txRng.find(testDir, 'txt', false, function (err, files) {
                    will(files).haveOnly([
                        testDir + '/bar.txt',
                        testDir + '/foo.txt'
                    ]);
                    done();
                });
            });

        });
    });
    



    // it('should search recursively when asked', function () {
    //     return txRng.find(testDir, 'txt', true, function (err, files) {
    //         expect(files).to.include.members([
    //             testDir + '/bar.txt',
    //             testDir + '/foo.txt',
    //             testDir + '/foo/baz.txt',
    //             testDir + '/foo/baz/quux.txt'
    //         ]);
    //     });
    // });

    

    // it('should not include the directory when relative: true', function (done) {
    //     set('relative', true);
        
    //     txRng.find(testDir, 'bar', false, function (err, files) {
    //         expect(files[0].indexOf(testDir)).to.equal(-1);
    //         done();
    //     });
    // });
});

// describe('setting options', function () {

//     describe('settings', function () {
//         it('should provide a getter', function () {
//             expect(txRng.settings.get).to.exist;
//         });

//         it('should provide a setter', function () {
//             expect(txRng.settings.set).to.exist;
//         });
//     });

//     describe('defaults', function () {
//         it('should have relative: true', function () {
//             expect(get('relative')).to.be.true;
//         });
//     });
// });