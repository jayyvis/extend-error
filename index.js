'use strict';

var cloneDeep = require('lodash.clonedeep');
var forOwn = require('lodash.forown');
var identity = require('lodash.identity');
var util = require('util');

/**
 * Create subtype of Error object
 *
 * @param {Object} BaseType [optional] defaults to {Error}
 * @param {Object} options
 * @param {string} options.subTypeName
 * @param {Function} options.parseFn parses the parameters passed to the
 * {SubType} constructor and returns the Error's message. Called in the context
 * of the {SubType} instance. One possible use might be to pass an
 * {HttpResponse} Object into the error constructor and assign the response as
 * one of the error's properties.
 * @param {Function} options.toString Alternate `toString()` method to attach to
 * the {SubType}'s prototype.
 * @param {Object} options.properties place properties here that should be
 * attached to every instance of {SubType}. For example, the HTTP status code
 * that corresponds to this exception
 * @returns {SubType}
 */
function extendError(BaseType, options) {
	if (typeof BaseType !== 'function') {
		options = BaseType;
		BaseType = Error;
	}

	if (!this) {
		if (typeof BaseType !== 'function') {
			throw new Error('`BaseType` must be a Function');
		}

		return extendError.apply(BaseType, arguments);
	}

	if (!options) {
		throw new Error('`options` is required');
	}

	if (!options.subTypeName) {
		throw new Error('`options.subTypeName` is required');
	}

	var subTypeName = options.subTypeName;
	var parseFn = options.parseFn || identity;
	var properties = options.properties ? cloneDeep(options.properties) : {};

	// Define the new type
	function SubType(message) {
		// Handle constructor called without `new`
		if (!(this instanceof SubType)) {
			return new SubType(message);
		}

		this.name = subTypeName;

		this.message = parseFn(message || '');

		forOwn(properties, function(value, key) {
			this[key] = value;
		}, this);

		// Include stack trace in error object
		Error.captureStackTrace(this, this.constructor);
	}

	// Inherit the base prototype chain
	util.inherits(SubType, this);

	// Override the toString method to error type name and inspected message (to
	// expand objects)
	SubType.prototype.toString = options.toString || function toString() {
		return this.name + ': ' + util.inspect(this.message);
	};

	// Attach extend() to the SubType to make it further extendable (but only if
	// `extend()` has been monkeypatched onto the Error object).
	if (this.extend) {
		SubType.extend = this.extend;
	}

	return SubType;
}

/**
 * Add `extend()` method to {Error} type
 */
extendError.monkeypatch = function() {
	Error.extend = extendError;
};

module.exports = extendError;
