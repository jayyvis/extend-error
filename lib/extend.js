var util = require('util');
var assert = require('assert');


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
function extend(BaseError, extendedErrorOptions) {
    assert(BaseError.prototype instanceof Error || BaseError === Error, 'BaseError must be Error type');

    if (typeof(extendedErrorOptions) == 'string') {
        extendedErrorOptions = {name: extendedErrorOptions};
    }

    assert(extendedErrorOptions.name, 'Extended error type name is required');

    if (! extendedErrorOptions.toString) {
        // override the toString method to error type name and inspected message (to expand objects)
        extendedErrorOptions.toString = function() {
            return this.name + (typeof(this.message) == 'undefined' ? '' : ': ' + util.inspect(this.message));
        };
    }

    // define extended error type.
    var ExtendedError = (function(objectOptions) {
        // handle constructor call without 'new'
        if (! (this instanceof ExtendedError)) {
            return new ExtendedError(objectOptions);
        }

        // compitable with Error constructor.
        if (util.isPrimitive(objectOptions)) {
            if (typeof(objectOptions) == 'undefined') {
                objectOptions = {};
            } else {
                objectOptions = {message: objectOptions};
            }
        }

        // assign object options.
        for(var optionName in objectOptions) {
            if (objectOptions.hasOwnProperty(optionName)) {
                this[optionName] = objectOptions[optionName];
            }
        }

        //include stack trace in error object
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    });

    // inherit the base prototype chain
    util.inherits(ExtendedError, BaseError);

    // assign prototype options.
    for(var optionName in extendedErrorOptions) {
        if (extendedErrorOptions.hasOwnProperty(optionName)) {
            ExtendedError.prototype[optionName] = extendedErrorOptions[optionName];
        }
    }

    return ExtendedError;
}

module.exports = extend;
