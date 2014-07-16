var util = require('util');
var assert = require('assert');


/**
 * Add extend() method to Error type
 * 
 * @param subTypeName
 * @param errorCode [optional]
 * @returns {SubType}
 */

Error.extend = function(subTypeName, errorCode /*optional*/) {
	assert(subTypeName, 'subTypeName is required');
	
	//define new error type
	
	var SubType = (function(message) {
		//protection against forgetting 'new' while throwing errors
		/*
		 * throw new AppError('reason')
		 * throw AppError('reason')
		 */ 
		if (! (this instanceof SubType)) {
			return new SubType(message);
		}
		
		//include stack trace in error object
		Error.captureStackTrace(this, this.constructor);
		
		//populate error details
		this.name = subTypeName; 
		this.code = errorCode;
		this.message = message || '';
	});
	
	//inherit the base prototype chain
	util.inherits(SubType, this);
	
	
	//override the toString method to error type name and inspected message (to expand objects)
	SubType.prototype.toString = function() {
		return 'Error:' + this.name + ': ' + util.inspect(this.message);
	};
	
	//attach extend() to the SubType to make it extendable further
	SubType.extend = this.extend;
	
	return SubType;
};

