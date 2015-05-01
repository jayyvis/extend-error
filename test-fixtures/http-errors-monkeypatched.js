/** few custom error types required for web apps **/

require('..').monkeypatch();

/**
 * thrown when there is an app related error
 */
exports.AppError = Error.extend({
	subTypeName: 'AppError',
	properties: {
		code: 500
	}
});


/**
 * thrown when there is error in client request/data
 */
var ClientError = exports.ClientError = Error.extend({
	subTypeName: 'ClientError',
	properties: {
		code: 400
	}
});

/**
 * specific http error types
 */
exports.HttpNotFound = ClientError.extend({
	subTypeName: 'HttpNotFound',
	properties: {
		code: 404
	}
});
exports.HttpUnauthorized = ClientError.extend({
	subTypeName: 'HttpUnauthorized',
	properties: {
		code: 401
	}
});
exports.HttpForbidden = ClientError.extend({
	subTypeName: 'HttpForbidden',
	properties: {
		code: 403
	}
});
exports.HttpConflict = ClientError.extend({
	subTypeName: 'HttpConflict',
	properties: {
		code: 409
	}
}); //unique constraint error
