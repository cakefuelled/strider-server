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
  // Model
  Organisation = require('../models/organisation');

module.exports = function(Strider) {

  var organisationsRouter = express.Router();

  organisationsRouter.all('/', function(req, res) {
    restful(req, res, {
      GET: function(req, res) {
        Organisation.find(function(err, organisations) {
          if (err) {
            res.send(err);
          }

          res.send(organisations);
        })
      },
      POST: function(req, res) {
        var newOrg = new Organisation({
          name: req.body.name,
          path: req.body.path,
          domain: req.body.domain
        });
        newOrg.save(function(err) {
          if (err) {
            res.status(400).send({
              errors: [400],
              message: err.err
            });
          } else {
            res.status(201).send(newOrg);
          }
        });
      }

    })
  });

  organisationsRouter.all('/:path', function(req, res) {
    restful(req, res, {
      GET: function(req, res) {
        Organisation.findOne({
          path: req.params.path
        }, function(err, organisation) {
          if (err) {
            res.send({
              errors: [err]
            });
            return;
          }

          res.send(organisation);
        });
      },
      PUT: function(req, res) {
        console.log(req.params.path);
        Organisation.findOne({
          path: req.params.path
        }, function(err, organisation) {
          if (err) {
            res.send({
              errors: [err]
            });
            return;
          }

          console.log(organisation);
          if (req.body.path) organisation.path = req.body.path;
          if (req.body.name) organisation.name = req.body.name;
          if (req.body.domain) organisation.domain = req.body.domain;

          organisation.save(function(err) {
            if (err) {
              return res.send({
                errors: [err]
              });
            }

            return res.send(organisation);
          });
        });
      },
      DEL: function(req, res) {}
    });
  });
  Strider.app.use('/organisations', organisationsRouter);
  //Strider.app.use('/organisations', auth.authenticated, organisationsRouter);
};
