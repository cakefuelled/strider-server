/**
 * Strider API - Items Router
 * @param {Object} Strider Strider main object
 */
// Dependencies
var express = require('express'),
  // Middleware
  log = require('../lib/log.js'),
  auth = require('../middleware/auth.js'),
  restful = require('../middleware/restful.js'),
  // Models
  Item = require('../models/item'),
  Organisation = require('../models/organisation'),
  Location = require('../models/location');

module.exports = function(Strider) {

  var itemsRouter = express.Router();

  itemsRouter.all('/:orgPath/items/', function(req, res, next) {
    restful(req, res, next, {
      GET: function(req, res, next) {
        Organisation.findOne({
          path: req.params.orgPath
        }, function(err, org) {
          if (err) {
            return next(err);
          }

          Item.find({
            organisation: org._id
          }, function(err, items) {
            if (err) {
              return next(err);
            }

            res.send(items);
          })
        });
      },
      POST: function(req, res, next) {
        //Get the organisation
        Organisation.findOne({
          path: req.params.orgPath
        }, function(err, org) {
          if (err) {
            return next(err);
          }
          Location.findOne({
            id: req.body.location
          }, function(err, loc) {
            if (err) {
              return next(err);
            }
            var newItem = new Item({
              id: req.body.id,
              type: req.body.type,
              organisation: org._id,
              location: loc._id
            });

            newItem.save(function(err, newItem) {
              if (err) {
                return next(err);
              }

              res.send(newItem);
            });

          });
        });
      }
    });
  });

  itemsRouter.all('/:orgPath/items/:id', function(req, res, next) {
    restful(req, res, next, {
      GET: function(req, res, next) {
        Organisation.findOne({
          path: req.params.orgPath
        }, function(err, org) {
          if (err) {
            return next(err);
          }

          Item.findOne({
            id: req.params.id,
            organisation: org._id

          }, function(err, item) {
            if (err) {
              return next(err);
            }

            res.send(item);
          })
        });
      },
      PUT: function(req, res, next) {
        return next();

      },
      DEL: function(req, res, next) {
        return next();
      }
    })
  });

  Strider.app.use('/organisations', itemsRouter);
  //Strider.app.use('/organisations/:orgPath/items', auth.authenticated, itemsRouter);
};
