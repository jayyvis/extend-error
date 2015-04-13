/** few custom error types required for web apps **/

var extendError = require('..');

/**
 * thrown when there is an app related error
 */
exports.AppError = extendError('AppError', 500);

/**
 * thrown when there is error in client request/data
 */
var ClientError = exports.ClientError = extendError(Error, 'ClientError', 400);

/**
 * specific http error types
 */
exports.HttpNotFound = extendError(ClientError, 'HttpNotFound', 404);
exports.HttpUnauthorized = extendError(ClientError, 'HttpUnauthorized', 401);
exports.HttpForbidden = extendError(ClientError, 'HttpForbidden', 403);
exports.HttpConflict = extendError(ClientError, 'HttpConflict', 409); //unique constraint error
