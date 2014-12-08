/**
 * Add extend() method to Error type
 * 
 * @param subTypeName
 * @param errorCode [optional]
 * @returns {SubType}
 */

Error.extend = function(subTypeName, errorCode /*optional*/) {
	if(subTypeName === undefined) throw new Error('subTypeName is required');
	
	//define new error type
	
	var SubType = (function(message) {
		//handle constructor call without 'new'
		if (! (this instanceof SubType)) {
			return new SubType(message);
		}
		
		//populate error details
		this.name = subTypeName; 
		this.code = errorCode;
		this.message = message || '';
		
		//include stack trace in error object
		Error.captureStackTrace(this, this.constructor);
	});
	
	//inherit the base prototype chain
	SubType.prototype = this;
	
	
	//override the toString method to error type name and inspected message (to expand objects)
	SubType.prototype.toString = function() {
		return this.name + ': ' + this.message;
	};
	
	//attach extend() to the SubType to make it extendable further
	SubType.extend = this.extend;
	
	return SubType;
};
