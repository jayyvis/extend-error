# extend-error

Ever tried to create custom error types in Node.js and wished it should be this simple?

    var MyError = extend(Error, 'MyError');
    throw MyError('wow')

### Installation

    npm install tangxinfa/extend-error

#### Test

    npm test

### Documentation

    /**
     * extend Error type.
     *
     * @param BaseError base error type to extend. Must be Error or subclass of Error.
     * @param extendedErrorOptions extended error type options.
     *        Object:
     *          - name     [required] string, extended error type name.
     *          - message  [optional] string, default error message.
     *          - toString [optional] function, overwrite toString method.
     *        String: extended error type name.
     * @return Extended error type.
     */
     function extend(BaseError, extendedErrorOptions)

    /**
     * CodedError type
     *   - name: CodedError
     *   - code: Error code.
     */
    var CodedError = extend(Error, {...});

### Examples for a web app

#### Extend error types

    var http = require('http');
    var util = require('util');
    var extend = require('extend-error');
    
    var NotFound = extend(extend.CodedError, {name: 'NotFoundError', message: http.STATUS_CODES[404], code: 404});
    var InternalServerError = extend(extend.CodedError, {name: 'InternalServerError', message: http.STATUS_CODES[500], code: 500});

#### Throw errors

    throw new NotFound({resource: '/subject/1'});

    // 'new' keyword is optional.
    throw InternalServerError();

#### Handle errors

    if (err instanceof NotFound) {
        res.send(err.code, "Please create subject" + err.resource + ") first.");
    } else {
        res.send(err.code, err.message);
    }
