/**
 * Strider API
 * Custom Validators for Strider Objects
 */

var validators = {};
var orgValidators = require('./validators/organisation.js');

for(key in orgValidators) {
  validators[key] = orgValidators[key];
}

module.exports = validators;