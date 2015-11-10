var extend = require('./extend.js');
var util = require('util');


/**
 * CodedError type
 *   - name: CodedError
 *   - code: Error code.
 */
var CodedError = extend(Error, {
    name: 'CodedError',
    code: undefined,
    toString: function () {
        return this.name + ' ' + this.code + (typeof(this.message) == 'undefined' ? '' : ': ' + util.inspect(this.message));
    }
});


module.exports = CodedError;
