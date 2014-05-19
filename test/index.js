var should = require('chai').should(),
    txRng = require('../index'),
    getExtension = txRng.getExtension,
    isExtension = txRng.isExtension,
    testDir = process.cwd() + '/' + 'test-fs';

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

describe('findByExtension', function () {
    it('should return an array', function () {
        // txRng.find().should.be.an('array');
    });
});