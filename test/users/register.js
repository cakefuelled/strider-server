/**
 * Tests user registration
 */

var should = require('should'),
  request = require('supertest'),
  // Libraries
  crypter = require('../../app/crypto/crypter.js'),
  // Models
  User = require('../../app/models/user.js'),
  // Test bootstrap
  bootstrap = require('../bootstrap.js')();


describe('/users registration', function() {
  before(function(done) {
    bootstrap.clearDB(done);
  });

  // TODO: expect 400s if input malformed.

  it('should allow for successful registration and increment user count', function(done) {
    // get the login cookie.
    request(bootstrap.api)
      .post('/users')
      .set('X-XSRF-TOKEN', bootstrap.getCSRF())
      .set('cookie', bootstrap.getCookies())
      .send({
        name: "TestUser Register",
        email: "test-register@gmail.com",
        pwd: "test-register"
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        User.count({}, function(err, count) {

          count.should.equal(1);
          res.body.should.have.property('name', 'TestUser Register');

          done();
        });
      });
  });

  it('should not allow duplicate emails', function(done) {
    // get the login cookie.
    request(bootstrap.api)
      .post('/users')
      .set('X-XSRF-TOKEN', bootstrap.getCSRF())
      .set('cookie', bootstrap.getCookies())
      .send({
        name: "TestUser Register 2",
        email: "test-register@gmail.com",
        pwd: "test-register2",
        thumb: "images/test-user2.jpg"
      })
      .expect(400)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        User.count({}, function(err, count) {

          count.should.equal(1);

          done();
        });
      });
  });
});
