/**
 * Organisations endpoint tests
 */
var should = require('should'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  bootstrap = require('../bootstrap.js')();

/*
 * Global before() operations
 */

before(function(done) {
  bootstrap.clearDB(done);
});

describe('Organisations Endpoint', function() {

  var organisation = {
    name: 'Aimar Foundation',
    domain: 'aimarfoundation.org',
    path: 'aimar'
  };
/*it('should not create an organisation without a CSRF token', function(done) {

  request(bootstrap.api)
    .post('/organisations')
    .send(organisation)
    .expect(403)
    .end(function(err, res) {
      return done();
    });
});
*/

  it('should create an organisation', function(done) {

    console.log("Cookie is " + bootstrap.getCSRF());
    request(bootstrap.api)
      .post('/organisations')
      .set('X-XSRF-TOKEN', bootstrap.getCSRF())
      .set('cookie', bootstrap.getCookies())
      .send(organisation)
      .expect(201)
      .end(function(err, res) {
        res.body.should.containEql(organisation);
        return done();
      });

  });
  /*it('should list all organisations', function(done) {
    request(bootstrap.api)
      .get('/organisations')
      .expect(200)
      .end(function(err, res) {
        res.body[0].should.containEql(organisation);
        return done();
      });
  });

  it('should get an organisation', function(done) {
    request(bootstrap.api)
      .get('/organisations/' + organisation.path)
      .expect(200)
      .end(function(err, res) {
        res.body.should.containEql(organisation);
        return done();
      });
  });

  it('should not update an organisation without a CSRF token', function(done) {

    var org_updated = {
      name: 'Aimar Foundation',
      domain: 'aimarfoundation.org',
      path: 'aimarfoundation'
    };

    request(bootstrap.api)
      .put('/organisations/' + organisation.path)
      .send(org_updated)
      .expect(403);

    request(bootstrap.api)
      .get('/organisations/' + org_updated.path)
      .expect(404);

    request(bootstrap.api)
      .get('/organisations/' + organisation.path)
      .expect(200)
      .expect(organisation)
      .end(function(err, res) {
        //Now we begin working with the real updated org
        organisation = org_updated;
      });
  });

  it('should update an organisation', function(done) {
    request(bootstrap.api)
      .put('/organisations/' + organisation.path)
      .send(organisation)
      .expect(200)
      .end(function(err, res) {
        res.body.should.containEql(organisation);
      })

    request(bootstrap.api)
      .get('/organisations/' + organisation.path)
      .expect(200)
      .end(function(err, res) {
        res.body.should.containEql(organisation);
      });
  });

  it('should not delete an organisation without CSRF token', function(done) {
    request(bootstrap.api)
      .delete('/organisations/' + organisation.path)
      .expect(403);

    request(bootstrap.api)
      .get('/organisations/')
      .expect(200)
      .expect([organisation]);
  })

  it('should delete an organisation', function(done) {
    request(bootstrap.api)
      .delete('/organisations/' + organisation.path)
      .expect(202);

    request(bootstrap.api)
      .get('/organisations/')
      .expect(200)
      .end(function(err, res) {
        res.body.should.equal([]);
      })

    request(bootstrap.api)
      .get('/organisations/' + organisation.path)
      .expect(404)
      .end(function(err, res) {
        res.body.errors.code.should.equal(404);
        res.body.errors.message.should.equal('An organisation with that path was not found');

        done();
      });
  })
  */
});
