/**
 * Bootstrap files
 * Add shared variables here so that all tests can be updated it at the same time
 */

var dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.load();

module.exports = function() {
  var tests = {};

  tests.clearDB = require('mocha-mongoose')(process.env.MONGO, {
    noClear: true
  });

  tests.setCSRF = function(token) {
    console.log("Token set to :" + token);
    process.env.CSRF = token;
  };

  tests.getCSRF = function(){
    return process.env.CSRF || '';
  };

  tests.setCookies = function(cookies) {
    console.log("Cookies set to :" + cookies);
    process.env.Cookies = cookies;
  };

  tests.getCookies = function(){
    return process.env.Cookies || '';
  };

  tests.port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
  tests.url = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
  tests.api = 'http://' + tests.url + ':' + tests.port + '';
  tests.cookie = '';

  return tests;
};
