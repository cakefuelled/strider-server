/**
 * Strider API - Organisations Router
 * @param {Object} Strider Strider main object
 */

var express = require('express'),
  // Middleware
  auth = require('../middleware/auth.js'),
  log = require('../lib/log.js'),
  restful = require('../middleware/restful.js'),
  validate = require('express-validation'),
  HttpError = require('httperrors'),
  // Model
  Organisation = require('../models/organisation');

module.exports = function(Strider) {

  var organisationsRouter = express.Router();

  organisationsRouter.all('/', function(req, res, next) {
    restful(req, res, next, {
      GET: function(req, res, next) {
        Organisation.find(function(err, organisations) {
          if (err) {
            return next(err);
          }

          res.send(organisations);
        });
      },
      POST: function(req, res, next) {
        var newOrg = new Organisation({
          name: req.body.name,
          path: req.body.path,
          domain: req.body.domain
        });
        newOrg.save(function(err) {
          if (err) {
            return next(err);
          }

          res.status(201).send(newOrg);
        });
      }
    });
  });

  organisationsRouter.all('/:path', function(req, res, next) {
    restful(req, res, next, {
      GET: function(req, res, next) {
        Organisation.findOne({
          path: req.params.path
        }, function(err, organisation) {
          if (err) {
            return next(err);
          }
          if (!organisation) {
            return next(new HttpError.NotFound("Organisation " + req.params.path + " not found"));
          }

          res.send(organisation);
        });
      },
      PUT: function(req, res, next) {

        var organisation = {};
        if (req.body.path) organisation.path = req.body.path;
        if (req.body.name) organisation.name = req.body.name;
        if (req.body.domain) organisation.domain = req.body.domain;

        Organisation.findOneAndUpdate({
          path: req.params.path
        }, organisation, function(err, updatedOrg) {
          if (err) {
            return next(err);
          }

          res.send(updatedOrg);
        });
      },
      DELETE: function(req, res, next) {
        Organisation.findOneAndRemove({
          path: req.params.path
        }, function(err) {
          if (err) {
            return next(err);
          }
          res.status(202).send();
        });
      }
    });
  });

  Strider.app.use('/organisations', organisationsRouter);
  //Strider.app.use('/organisations', auth.authenticated, organisationsRouter);
};
