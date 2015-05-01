/** few custom error types required for web apps **/

var extendError = require('..');

/**
 * thrown when there is an app related error
 */
exports.AppError = extendError({
	subTypeName: 'AppError',
	properties: {
		code: 500
	}
});

/**
 * thrown when there is error in client request/data
 */
var ClientError = exports.ClientError = extendError(Error, {
	subTypeName: 'ClientError',
	properties: {
		code: 400
	}
});

/**
 * specific http error types
 */
exports.HttpNotFound = extendError(ClientError, {
	subTypeName: 'HttpNotFound',
	properties: {
		code: 404
	}
});
exports.HttpUnauthorized = extendError(ClientError, {
	subTypeName: 'HttpUnauthorized',
	properties: {
		code: 401
	}
});
exports.HttpForbidden = extendError(ClientError, {
	subTypeName: 'HttpForbidden',
	properties: {
		code: 403
	}
});
exports.HttpConflict = extendError(ClientError, {
	subTypeName: 'HttpConflict',
	properties: {
		code: 409
	}
}); //unique constraint error
