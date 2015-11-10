/**
 * mocha test cases
 */

var assert = require('assert');
var extend = require('../');
var http = require('http');


var NotFound = extend(extend.CodedError, {name: 'NotFound', message: http.STATUS_CODES[404], code: 404});
var InternalServerError = extend(extend.CodedError, {name: 'InternalServerError', message: http.STATUS_CODES[500], code: 500});


describe('instantiation', function() {
    it('should work with new operator', function() {
        var err = new NotFound('not found');
        assert.ok(err instanceof NotFound);
        assert.ok(err instanceof extend.CodedError);
        assert.ok(err instanceof Error);
    });

    it('should work without new operator', function() {
        var err = NotFound('not found');
        assert.ok(err instanceof NotFound);
        assert.ok(err instanceof extend.CodedError);
        assert.ok(err instanceof Error);
    });

    it('should work like original error', function () {
        var err = new NotFound("not found");
        assert.ok(err.message == "not found");
    });
});


describe('properties', function() {
    it('should have message', function() {
        var err = new NotFound('not found');
        assert.equal(err.message, 'not found');

        err = new NotFound();
        assert.equal(err.message, http.STATUS_CODES[404]);
    });

    it('should have code', function() {
        var err = new NotFound();
        assert.equal(err.code, 404);
    });

    it('should have other property', function() {
        var err = new NotFound({other: 'yes'});
        assert.equal(err.other, 'yes');
    });
});
