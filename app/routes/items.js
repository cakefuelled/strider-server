/**
 * Strider API - Items Router
 * @param {Object} Strider Strider main object
 */
// Dependencies
var express = require('express'),
  // Middleware
  log = require('../lib/log.js'),
  auth = require('../middleware/auth.js'),
  // Models
  Item = require('../models/item');

module.exports = function(Strider) {

  var items = express.Router();

  items.all('/', function(req, res, next) {
    restful(req, res, {
      GET: function(req, res, next) {
        Item.find(function(err, items) {
          if (err) {
            res.send(err);
            return next();
          }

          res.send(items);
          return next();
        })
      },
      POST: function(req, res, next) {
        var item = new Item(req.body);

        item.save(function(err, item) {
          if (err) {
            log(err);
            res.send(err);
            return next();
          }

          res.send(item);
          return next();
        });
      }

    })
  });

  items.all('/:id', function(req, res, next) {
    restful(req, res, {
      GET: function(req, res, next) {
        Item.findOne({
          _id: req.params.id
        }, function(err, item) {
          if (err) {
            log(err);
            res.send(err);
            return next();
          }

          res.send(item);
          return next();
        })
      },
      PUT: function(req, res, next) {
        return next();
      },
      DEL: function(req, res, next) {
        return next();
      }
    })
  });

  Strider.app.use('/items', auth.authenticated, items);
};
