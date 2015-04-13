'use strict';

var util = require('util');
var assert = require('assert');

/**
 * Create subtype of Error object
 *
 * @param BaseType [optional] defaults to {Error}
 * @param subTypeName
 * @param errorCode [optional]
 * @returns {SubType}
 */
function extendError(BaseType, subTypeName, errorCode /*optional*/) {
	if (typeof BaseType === 'string') {
		errorCode = subTypeName;
		subTypeName = BaseType;
		BaseType = Error;
	}

	if (!this) {
		if (typeof BaseType !== 'function') {
			throw new Error('`BaseType` must be a Function');
		}

		return extendError.apply(BaseType, arguments);
	}

	assert(subTypeName, 'subTypeName is required');

	// Define the new type
	function SubType(message) {
		// Handle constructor called without `new`
		if (!(this instanceof SubType)) {
			return new SubType(message);
		}

		// Populate error details
		this.name = subTypeName;
		// Only set `this.code` if a code is defined for the type (to prevent
		// "{code:undefined}" when stringifying)
		if (errorCode) {
			this.code = errorCode;
		}
		this.message = message || '';

		// Include stack trace in error object
		Error.captureStackTrace(this, this.constructor);
	}

	// Inherit the base prototype chain
	util.inherits(SubType, this);

	// Override the toString method to error type name and inspected message (to
	// expand objects)
	SubType.prototype.toString = function toString() {
		return this.name + ': ' + util.inspect(this.message);
	};

	// Attach extend() to the SubType to make it extendable further (but only if
	// extend has been monkeypatched onto the Error object).
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
