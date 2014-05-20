/* jshint expr: true */

var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    txRng = require('../index'),
    getExtension = txRng.getExtension,
    isExtension = txRng.isExtension,
    testDir = process.cwd() + '/test/test-fs',
    get = txRng.settings.get,
    set = txRng.settings.set;

describe('getExtension', function () {
    it('should return a string', function () {
        (typeof getExtension()).should.equal('string');
    });

    it('should return something even when there is no .', function () {
        getExtension('asdf').should.equal('');
    });
});

describe('isExtension', function () {
    it('should return a Boolean', function () {
        (typeof isExtension()).should.equal('boolean');
    });

    it('should return true for a match', function () {
        isExtension('foo.bar', 'bar').should.equal(true);
    });

    it('should return false for no match', function () {
        isExtension('foo.bar', 'baz').should.equal(false);
    });

    it('should be case-insensitive', function () {
        isExtension('foo.BaR', 'bAR').should.equal(true);
    });
});

describe('find', function () {

    describe('errors', function () {
        it('should result when missing "dir" arg', function () {
            return txRng.find(null, 'txt', true, function (err, files) {
                should.exist(err);
            });
        });

        it('should result when missing "ext" arg', function () {
            return txRng.find(testDir, '', true, function (err, files) {
                should.exist(err);
            });
        });
    });

    it('should return null for no matches', function () {
        return txRng.find(testDir, 'donkey', false, function (err, files) {
            expect(files).to.be.null;
        });
    });

    it('should return an array', function () {
        return txRng.find(testDir, 'txt', false, function (err, files) {
            (files).should.be.an('array');
        });
    });

    it('should find all matches', function () {
        set('relative', false);
        return txRng.find(testDir, 'txt', false, function (err, files) {
            expect(files).to.include.members([
                testDir + '/bar.txt',
                testDir + '/foo.txt'
            ]);
            set('relative', true);
        });
    });

    it('should search recursively when asked', function () {
        return txRng.find(testDir, 'txt', true, function (err, files) {
            expect(files).to.include.members([
                testDir + '/bar.txt',
                testDir + '/foo.txt',
                testDir + '/foo/baz.txt',
                testDir + '/foo/baz/quux.txt'
            ]);
        });
    });

    it('should not search recursively unless asked', function () {
        return txRng.find(testDir, 'txt', false, function (err, files) {
            expect(files).to.include.members([
                testDir + '/bar.txt',
                testDir + '/foo.txt'
            ]);
        });
    });

    it('should not include the directory when relative: true', function () {
        set('relative', true);
        
        return txRng.find(testDir, 'bar', false, function (err, files) {
            expect(files[0].indexOf(testDir)).to.equal(-1);
        });
    });
});

describe('setting options', function () {

    describe('settings', function () {
        it('should provide a getter', function () {
            expect(txRng.settings.get).to.exist;
        });

        it('should provide a setter', function () {
            expect(txRng.settings.set).to.exist;
        });
    });

    describe('defaults', function () {
        it('should have relative: true', function () {
            expect(get('relative')).to.be.true;
        });
    });
});