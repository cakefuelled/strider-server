/**
 * Test the Express server running, requires the server to be running locally for the tests
 */
var should = require('should'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  bootstrap = require('../../bootstrap.js')();

/*
 * Global before() operations
 */

before(function(done) {
  bootstrap.clearDB(done);
});

describe('Items Endpoint', function() {

  //Item Ids should be generic so that the id doesn't tie the thing to the object (so no Monitors being Mice etc.)
  //Can anyone hear me? Pull request reviewer! You are my only hope! Oh no! They're comi-...

  var item = {
    type: 'Monitor',
    altIds: [{
      id: '124199850918',
      type: 'Barcode'
    }]
  };

  it('should not save an item without a CSRF token', function(done) {

    request(bootstrap.api)
      .post('/items')
      .send(item)
      .expect(403)
      .end(function(err, res) {
        //TODO we should probably make the csrf test
        // a generic one, probably in bootstrap.js
        done();
      });
  });

  // it('should save an item', function(done) {

  //   request(bootstrap.api)
  //     .post('/items')
  //     .send(item)
  //     .expect(201)
  //     .end(function(err, res) {
  //       res.body.should.have.property('id', 'AIMAR-1');

  //       item.id = 'AIMAR-1';

  //       done();
  //     });
  // });

  it('should list all items', function(done) {
    request(bootstrap.api)
      .get('/items')
      .expect(200)
      .expect([item], done());
  });

  // it('should retrieve an item', function(done) {
  //   request(bootstrap.api)
  //     .get('/items/' + item.id)
  //     .expect(200)
  //     .expect(item)
  // });

  it('should not update an item without a CSRF token', function(done) {

    var item_updated = {
      id: 'AIMAR-1',
      type: 'Mouse',
      altIds: [{
        id: '124199850918',
        type: 'Barcode'
      }]
    };

    request(bootstrap.api)
      .put('/items/' + item.id)
      .send(item_updated)
      .expect(403);

    request(bootstrap.api)
      .get('/items/' + item.id)
      .expect(200)
      .expect(item, done())
      .end(function(err, res) {
        //Now we begin working with the real item          
        item = item_updated;
      });;
  });

  it('should update an item', function(done) {
    request(bootstrap.api)
      .put('/items/' + item.id)
      .send(item)
      .expect(200)
      .expect(item);

    request(bootstrap.api)
      .get('/items/' + item.id)
      .expect(200)
      .expect(item, done());
  });

  // it('should not delete an item without CSRF token', function(done) {
  //   request(bootstrap.api)
  //     .delete('/items/' + item.id)
  //     .expect(403);

  //   request(bootstrap.api)
  //     .get('/items/')
  //     .expect(200)
  //     .expect([item]);
  // });

  // it('should delete an item', function(done) {
  //   request(bootstrap.api)
  //     .delete('/items/' + item.id)
  //     .expect(202);

  //   request(bootstrap.api)
  //     .get('/items/')
  //     .expect(200)
  //     .expect([]);

  //   request(bootstrap.api)
  //     .get('/items/' + item.id)
  //     .expect(404)
  //     .end(function(err, res) {
  //       res.body.should.have.property('errors');
  //       res.body.errors.code.should.equal(404);
  //       res.body.errors.message.should.equal('An item with that id was not found');

  //       done();
  //     });
  // });


});
