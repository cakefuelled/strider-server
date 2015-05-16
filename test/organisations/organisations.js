/**
 * Organisations endpoint tests
 */
var should = require('should'),
  request = require('supertest-as-promised'),
  mongoose = require('mongoose'),
  bootstrap = require('../bootstrap.js')();

/*
 * Global before() operations
 */
/*before(function(done) {
  bootstrap.clearDB(done);
  //bootstrap.initAnonCookies();
  //bootstrap.createUser("Tester1", "test1@gmail.com", "password");
  //bootstrap.loginUser("test1@gmail.com", "password");
});

describe('Organisations Endpoint', function() {

  var organisation = {
    name: 'Aimar Foundation',
    domain: 'aimarfoundation.org',
    path: 'aimar'
  };

  it('should not create an organisation without a CSRF token', function(done) {

    return request(bootstrap.api)
      .post('/organisations')
      .send(organisation)
      .expect(403, done);
  });


  it('should create an organisation', function(done) {

    return request(bootstrap.api)
      .post('/organisations')
      .set('X-XSRF-TOKEN', bootstrap.getCSRF())
      .set('cookie', bootstrap.getCookies())
      .send(organisation)
      .expect(201)
      .then(function(res) {
        res.body.should.containEql(organisation);
        done();
      })
      .catch(function(err) {
        done(err);
      });

  });

  it('should list all organisations', function(done) {

    return request(bootstrap.api)
      .get('/organisations')
      .expect(200)
      .then(function(res) {
        res.body[0].should.containEql(organisation);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('should get an organisation', function(done) {
    return request(bootstrap.api)
      .get('/organisations/aimar')
      .expect(200)
      .then(function(res) {
        res.body.should.containEql(organisation);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('should not update an organisation without a CSRF token', function(done) {

    var org_updated = {
      name: 'Aimar Foundation',
      domain: 'aimarfoundation.org',
      path: 'aimarfoundation'
    };

    return request(bootstrap.api)
      .put('/organisations/aimar')
      .send(org_updated)
      .expect(403)
      .then(function(res) {
        return request(bootstrap.api)
          .get('/organisations/aimarfoundation')
          .expect(404);
      })
      .then(function(res) {
        return request(bootstrap.api)
          .get('/organisations/aimar')
          .expect(200)
      })
      .then(function(res) {
        res.body.should.containEql(organisation);
        //Now we begin working with the real updated org
        organisation = org_updated;
        done();
      })
      .catch(function(err) {
        done(err);
      });

  });

  it('should update an organisation', function(done) {
    //Organisation path is still Aimar, so use that once
    return request(bootstrap.api)
      .put('/organisations/aimar')
      .set('X-XSRF-TOKEN', bootstrap.getCSRF())
      .set('cookie', bootstrap.getCookies())
      .send(organisation)
      .expect(200)
      .then(function(res) {
        res.body.should.containEql(organisation);

        return request(bootstrap.api)
          .get('/organisations/aimarfoundation')
          .expect(200);
      })
      .then(function(res) {
        res.body.should.containEql(organisation);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('should not delete an organisation without CSRF token', function(done) {

    return request(bootstrap.api)
      .delete('/organisations/aimarfoundation')
      .send()
      .expect(403)
      .then(function(res) {
        return request(bootstrap.api)
          .get('/organisations/aimarfoundation')
          .expect(200);
      })
      .then(function(res) {
        res.body.should.containEql(organisation);
        done();
      })
      .catch(function(err) {
        done(err);
      });

  });

  it('should delete an organisation', function(done) {

    return request(bootstrap.api)
      .del('/organisations/aimarfoundation')
      .set('X-XSRF-TOKEN', bootstrap.getCSRF())
      .set('cookie', bootstrap.getCookies())
      .expect(202)
      .then(function(res) {

        return request(bootstrap.api)
          .get('/organisations/')
          .expect(200);

      })
      .then(function(res) {
        res.body.should.be.empty;

        request(bootstrap.api)
          .get('/organisations/aimarfoundation')
          .expect(404);
      })
      .then(function(res) {
        //res.body.errors.code.should.equal(404);
        //res.body.errors.message.should.equal('An organisation with that path was not found');
        done();
      })
      .catch(function(err) {
        done(err);
      });

  });

});
*/