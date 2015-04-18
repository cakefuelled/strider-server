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

  tests.initCsrf = function(request, done) {
    request(tests.api)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        tests.cookie = res.headers['set-cookie'];
        //Works for now but will probably break
        tests.csrfToken = tests.cookie[0].match('xsrf-token=(.+?);')[1];
        done();
      });
  };

  tests.port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
  tests.url = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
  tests.api = 'http://' + tests.url + ':' + tests.port + '';
  tests.csrfToken = '';
  tests.cookie = '';

  return tests;
};
