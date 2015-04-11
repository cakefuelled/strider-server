/**
 * Test the users endpoint
 */
var should = require('should'),
  request = require('supertest'),
  util = require('util'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  // Libraries
  crypter = require('../../app/crypto/crypter.js'),
  // Models
  User = require('../../app/models/user.js'),
  // Tests bootstrap
  bootstrap = require('../bootstrap.js')(),
  // Global variables
  cookie = '',
  users = [];

describe('Authorized /users endpoint', function() {
  /*
   * Each test suite that requires an empty db/sample should
   * do so inside their first describe().
   * Specific db clears go here
   *   1. Clear DB
   *   2. Register a new user
   *   3. Login to get a valid cookie
   */
  before(function(done) {
    bootstrap.clearDB(done);
  });

  before(function(done) {
    // Create test user 1.
    var userSpec = {
      name: "TestUser 1",
      email: "test1@gmail.com",
      pwd: crypter.apply("password")
    };

    var user = new User(userSpec);

    // Create and insert new user.
    user.save(function(err) {
      if (err) {
        return done(err);
      }

      User.count({}, function(err, count) {
        //count.should.equal(1);
        users[0] = user._id;
      });
    });

    return done();
  });

  before(function(done) {
    // Create test user 2, I need two users to test that
    // authorization works fine
    var userSpec = {
      name: "TestUser 2",
      email: "test2@gmail.com",
      pwd: crypter.apply("password"),
      thumb: "images/2.jpg"
    };

    var user = new User(userSpec);

    // Create and insert new user.
    user.save(function(err) {
      if (err) {
        return done(err);
      }

      User.count({}, function(err, count) {
        count.should.equal(2);

        users[1] = user._id;
        return done();
      });
    });
  });

  before(function(done) {
    // get the login cookie for user 1.
    request(bootstrap.api)
      .post('/auth/login')
      .send({
        email: "test1@gmail.com",
        pwd: "password"
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        res.body.should.have.property('email', "test1@gmail.com");
        res.body.should.not.have.property('pwd');

        cookie = res.headers['set-cookie'];
        return done();
      });
  });

  describe('/users with login cookie', function() {

    it('should not allow put', function(done) {
      request(bootstrap.api)
        .put('/users')
        .set('cookie', cookie)
        .expect(405)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          done()
        })
    });

    it('should not allow delete', function(done) {
      request(bootstrap.api)
        .delete('/users')
        .set('cookie', cookie)
        .expect(405)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          done()
        })
    });

    it('should return current user', function(done) {
      request(bootstrap.api)
        .get('/users/current')
        .set('cookie', cookie)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          res.body.should.have.property('_id', users[0].toHexString());
          res.body.should.not.have.property('pwd');
          done()
        })
    });
  });

  describe('/users/:id', function() {

    it('should allow to get specific user', function(done) {
      request(bootstrap.api)
        .get('/users/' + users[0])
        .set('cookie', cookie)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          res.body.should.have.property('name', "TestUser 1");
          done();
        })
    });

    it('should not return non existing users', function(done) {
      var nonExistingUser = "000000000000000000000000";
      request(bootstrap.api)
        .get('/users/' + nonExistingUser)
        .set('cookie', cookie)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          res.body.message.should.equal("User not found");
          done()
        })
    });

    it('should not allow post', function(done) {
      request(bootstrap.api)
        .post('/users/1')
        .set('cookie', cookie)
        .expect(405)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          done()
        })
    });

    it('should allow delete to same id', function(done) {
      request(bootstrap.api)
        .delete('/users/' + users[0])
        .set('cookie', cookie)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          done()
        })
    });

    it('should not allow put to different id', function(done) {
      request(bootstrap.api)
        .put('/users/' + users[1])
        .set('cookie', cookie)
        .expect(403)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          done()
        })
    });

    it('should not allow delete to different id', function(done) {
      request(bootstrap.api)
        .delete('/users/' + users[1])
        .set('cookie', cookie)
        .expect(403)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          done()
        })
    });
  });
});
