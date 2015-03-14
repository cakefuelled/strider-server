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

  it('should not create an organisation without a CSRF token', function(done) {

    request(bootstrap.api)
      .post('/organisations')
      .send(item)
      .expect(403);
  });

  it('should create an organisation', function(done) {

    request(bootstrap.api)
      .post('/organisations')
      .send(organisation)
      .expect(201)
      .expect(organisation, done());
      
  });

  it('should list all organisations', function(done) {
    request(bootstrap.api)
      .get('/organisations')
      .expect(200)
      .expect([organisation], done());
  });

  it('should get an organisation', function(done) {
    request(bootstrap.api)
      .get('/organisations/'+organisation.path)
      .expect(200)
      .expect(organisation)
  });

  it('should not update an organisation without a CSRF token', function(done) {

      var org_updated = {
            name: 'Aimar Foundation',
            domain: 'aimarfoundation.org',
            path: 'aimarfoundation'
          };   

    request(bootstrap.api)
      .put('/organisations/'+organisation.path)
      .send(org_updated)
      .expect(403);

    request(bootstrap.api)
      .get('/organisations/'+org_updated.path)
      .expect(404);

    request(bootstrap.api)
      .get('/organisations/'+organisation.path)
      .expect(200)
      .expect(organisation)
      .end(function(err, res) {
        //Now we begin working with the real updated org
        organisation = org_updated;
      });;
  });

  it('should update an item', function(done) {
    request(bootstrap.api)
      .put('/organisations/'+organisation.path)
      .send(organisation)
      .expect(200)
      .expect(organisation);

    request(bootstrap.api)
      .get('/organisations/'+organisation.path)
      .expect(200)
      .expect(organisation, done());
  });

  it('should not delete an organisation without CSRF token', function(done) {
    request(bootstrap.api)
      .delete('/organisations/'+organisation.path)
      .expect(403);

    request(bootstrap.api)
      .get('/organisations/')
      .expect(200)
      .expect([organisation]);
  })

  it('should delete an organisation', function(done) {
    request(bootstrap.api)
      .delete('/organisations/'+organisation.path)
      .expect(202);

    request(bootstrap.api)
      .get('/organisations/')
      .expect(200)
      .expect([]);

    request(bootstrap.api)
      .get('/organisations/'+organisation.path)
      .expect(404)
      .end(function(err, res) {
        res.body.errors.code.should.equal(404);
        res.body.errors.message.should.equal('An organisation with that path was not found');

        done();
      });
  })


});
