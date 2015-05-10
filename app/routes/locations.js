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
  Location = require('../models/location'),
  Organisation = require('../models/organisation');

module.exports = function(Strider) {

  var locationsRouter = express.Router();

  locationsRouter.all('/:orgPath/locations/', function(req, res, next) {
    restful(req, res, next, {
      GET: function(req, res, next) {
        Organisation.findOne({
          path: req.params.orgPath
        }, function(err, org) {
          if (err) {
            return next(err);
          }

          Location.find({
            organisation: org._id
          }, function(err, locations) {
            if (err) {
              return next(err);
            }

            res.send(locations);
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
          var newLocation = new Location({
            id: req.body.id,
            name: req.body.name,
            address: req.body.address,
            postcode: req.body.postcode,
            organisation: org._id,
            type: req.body.type
          });

          newLocation.save(function(err, newLocation) {
            if (err) {
              return next(err);
            }

            res.send(newLocation);
          });
        })
      }
    })
  });

  locationsRouter.all('/:orgPath/locations/:id', function(req, res, next) {
    restful(req, res, next, {
      GET: function(req, res, next) {
        Organisation.findOne({
          path: req.params.orgPath
        }, function(err, org) {
          if (err) {
            return next(err);
          }

          Location.findOne({
            id: req.params.id,
            organisation: org._id
          }, function(err, location) {
            if (err) {
              return next(err);
            }

            res.send(location);
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

  Strider.app.use('/organisations', locationsRouter);
  //Strider.app.use('/organisations/:orgPath/items', auth.authenticated, items);
};
