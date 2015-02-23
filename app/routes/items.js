var log = require('../lib/log.js'),
 Item = require('../models/item');

/**
 * Strider API - Items Router
 * @param {Object} Strider Strider main object
 */

module.exports = function(Strider) {

  Strider.app.get('/items', function (req, res, next) {
      Item.find(function(err, items) {
        if(err) {
          res.send(err);
          return next();
        }

        res.send(items);
        return next();
      });
  });

  Strider.app.post('/items', function (req, res, next) {
    var item = new Item(req.body);
    
    console.log('About to save');
    console.log(item);
    item.save(function(err, item) {
      if(err) {
        console.log(err);
        res.send(err);
        return next();
      }

      console.log(item);
      res.send(item);
      return next();
    });

  });

  Strider.app.get('/items/:id', function (req, res, next) {
      Item.findOne({ _id: req.params.id }, function(err, item) {
        if(err) {
          res.send(err);
          return next();
        }

        res.send(item);
        return next();
      })
  });

  Strider.app.put('/items/:id', function (req, res, next) {
      return next();
  });

  Strider.app.del('/items/:id', function (req, res, next) {
      return next();
  });
};