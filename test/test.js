'use strict';

/**
 * mocha test cases
 */

/* eslint-env mocha */

var assert = require('assert');

describe('functional', function() {
	var errors = require('../test-fixtures/http-errors-functional');
	tests(errors);
	assert.ok(typeof errors.ClientError.extend === 'undefined', 'ClientError does not have an extend method');
});

describe('monkeypatched', function() {
	var errors = require('../test-fixtures/http-errors-monkeypatched');
	tests(errors);
	assert.ok(typeof errors.ClientError.extend === 'function', 'ClientError has an extend method');
});

describe('compatibility', function() {
	var errors = require('../test-fixtures/http-errors-previousformat');
	tests(errors);
});

function tests(errors) {
	describe('instantiation', function() {
		it('should work with new operator', function() {
			var err = new errors.AppError('problem');
			assert.ok(err instanceof errors.AppError);
		});

		it('should work without new operator', function() {
			/* eslint new-cap: [0] */
			var err = errors.AppError('problem');
			assert.ok(err instanceof errors.AppError);
		});
	});

	describe('inheritance', function() {
		it('should maintain prototype hierarchy with one level', function() {
			var err = new errors.ClientError('email required');

			assert.ok(err instanceof errors.ClientError, 'ClientError is not an instance of ClientError');
			assert.ok(err instanceof Error, 'ClientError is not an instance of Error');
		});

		it('should maintain prototype hierarchy with two levels', function() {
			var notfound = new errors.HttpNotFound('item not found');

			assert.ok(notfound instanceof errors.HttpNotFound, 'HttpNotFound is not an instance of HttpNotFound');
			assert.ok(notfound instanceof errors.ClientError, 'HttpNotFound is not an instance of ClientError');
			assert.ok(notfound instanceof Error, 'HttpNotFound is not an instance of Error');
		});
	});


	describe('error details', function() {
		it('should have message', function() {
			var err;

			err = new errors.ClientError('name required');
			assert.equal(err.message, 'name required');

			err = new errors.ClientError();
			assert.equal(err.message, '');
		});

		it('should have code', function() {
			var err = new errors.ClientError();
			assert.equal(err.code, 400);
		});

	});
}
