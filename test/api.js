/**
 * Test the Express server running, requires the server to be running locally for the tests
 */
var should = require('should'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  bootstrap = require('./bootstrap.js')();

/*
 * Global before() operations
 */

before(function(done) {
  mongoose.connect(process.env.MONGO, function(err) {
    if (err) {
      return done(err);
    }
    done();
  });
});

before(function(done) {
  bootstrap.clearDB(done);
});

describe('API server', function() {
  describe('Get version', function() {
    it('should return the version', function(done) {
      request(bootstrap.api)
        .get('/')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }

          var pjson = require('../package.json');

          if (res.body.version !== pjson.version) {
            return done(err)
          }
          done();
        })
    });
  });

  describe('Global handlers', function(done) {
    it('should return 501 for non existing endpoints', function(done) {
      request(bootstrap.api)
        .get('/madeUpEndpoint')
        .expect(501)
        .end(done);
    });
  });
});
