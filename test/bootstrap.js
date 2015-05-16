/**
 * Bootstrap files
 * Add shared variables here so that all tests can be updated it at the same time
 */

var dotenv = require('dotenv'),
  request = require('supertest'),
  // Libraries
  crypter = require('../app/crypto/crypter.js'),
  // Models
  User = require('../app/models/user.js');

// Load environment variables from the .env file
dotenv.load();

module.exports = function() {
  var tests = {};

  tests.clearDB = require('mocha-mongoose')(process.env.MONGO, {
    noClear: true
  });

  tests.initAnonCookies = function() {
    request(tests.api)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err)
        }

        var cookie = res.headers['set-cookie'];
        //Works for now but will probably break
        tests.setCSRF(cookie[1].match('xsrf-token=(.+?);')[1]);
        tests.setCookies(cookie);
      });
  };

  tests.createUser = function(username, email, password) {

    // Create test user 1.
    var userSpec = {
      name: username,
      email: email,
      pwd: crypter.apply(password)
    };

    var user = new User(userSpec);

    // Create and insert new user.
    user.save(function(err) {
      if (err) {
        throw (err);
      }

      User.count({}, function(err, count) {
        count.should.equal(1);
      });
    });
  };

  tests.loginUser = function(emailAddr, password) {

    request(tests.api)
      .post('/auth/login')
      .set('X-XSRF-TOKEN', tests.getCSRF())
      .set('cookie', tests.getCookies())
      .send({
        email: emailAddr,
        pwd: password
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw (err);
        }

        res.body.should.have.property('email', "test1@gmail.com");
        res.body.should.not.have.property('pwd');

        var cookie = res.headers['set-cookie'];
        //Works for now but will probably break
        tests.setCSRF(cookie[1].match('xsrf-token=(.+?);')[1]);
        tests.setCookies(cookie);
      });
  };

  tests.setCSRF = function(token) {
    process.env.CSRF = token;
  };

  tests.getCSRF = function() {
    return process.env.CSRF || '';
  };

  tests.setCookies = function(cookies) {
    process.env.Cookies = cookies.join(';');
  };

  tests.getCookies = function() {
    return process.env.Cookies || '';
  };

  tests.port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
  tests.url = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
  tests.api = 'http://' + tests.url + ':' + tests.port + '';
  tests.cookie = '';

  return tests;
};
