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

describe('Items Endpoint', function() {

  var item = {
    type: "Monitor",
    alternate-id: "12410058018208",
    alternate-id-type: "Barcode"
  }      

  var itemId = 0;

  it('should save an item', function(done) {

    //TODO: Add an expect for item Id
    request(bootstrap.api)
      .post('/items/')
      .send(item)
      .expect(201)
      .expect(item, done);

    //TODO: Push ItemId into item
  });

  it('should list an item', function(done) {
    request(bootstrap.api)
      .get('/items/')
      .expect(200)
      .expect([item], done);
  });

  it('should retrieve an item', function(done) {
    request(bootstrap.api)
      .get('/items/'+itemId)
      .expect(200)
      .expect(item, done);
  });

  it('should update an item', function(done) {
    request(bootstrap.api)
      .put('/items'+itemId)
      .send(item)
      .expect(200)
      .expect(item);

    request(bootstrap.api)
      .get('/items/'+itemId)
      .expect(200)
      .expect(item, done);
  });

  it('should delete an item', function(done) {
    request(bootstrap.api)
      .delete('/items/'+itemId)
      .expect(202, done);

    request(bootstrap.api)
      .get('/items/')
      .expect(200)
      .expect([], done);

    //TODO: Check error message
    request(bootstrap.api)
      .get('/items/'+itemId)
      .expect(404, done);
  })


});
