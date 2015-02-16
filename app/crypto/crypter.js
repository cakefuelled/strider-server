var crypto = require('crypto');
var SALT = process.env.SALT || ""; // No salting by default (test environment)

/**
 * @param toHash the string to salt and hash
 */
module.exports = {
  apply: function(toHash) {
    var salted = toHash + SALT;
    return crypto.createHash('sha256').update(salted).digest('base64');
  }
}
