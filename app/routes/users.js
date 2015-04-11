/**
 * Strider API
 * Users endpoint
 */

//Dependencies
var express = require('express'),
  util = require('util'),
  mongoose = require("mongoose"),
  fs = require('fs'),
  path = require('path'),
  extend = require('extend'),
  busboy = require('connect-busboy'),
  passport = require('passport'),
  // Middleware
  restful = require('../middleware/restful.js'),
  auth = require('../middleware/auth.js'),
  // Models
  User = require('../models/user.js'),
  // Internal libraries
  crypter = require('../crypto/crypter.js'),
  log = require('../lib/log.js');

module.exports = function(Strider) {

  var users = express.Router();

  users.get('/current', function(req, res) {
    // "Deep" copy of the user object to remove fields
    var user = JSON.parse(JSON.stringify(req.user));
    delete user.pwd;
    res.send(user);
  });

  users.all('/', function(req, res) {
    restful(req, res, {
      POST: function(req, res) {
        var user = new User({
          name: req.body.name,
          pwd: crypter.apply(req.body.pwd),
          email: req.body.email
        });

        user.save(function(err) {
          if (err) {
            res.status(400).send({
              errors: [400],
              message: err.err
            });
          } else {
            // trick to remove the pwd from the return
            var retUser = user.toObject();
            delete retUser['pwd'];
            res.send(retUser);
          }
        });
      },
      GET: function(req, res) {

        // Some defaults
        var limit = parseInt(req.query.limit) || 10,
          page = parseInt(req.query.page) || 0;

        // Search options (query string parameters)
        var opts = {
          orderby: req.query.orderby || 'name',
          limit: Math.min(Math.max(limit, 1), 50),
          page: Math.max(page, 0)
        };

        User.find()
          .select("-email -pwd") // exclude the email
          .sort(opts.orderby)
          .limit(opts.limit)
          .skip(opts.page * opts.limit)
          .exec(function(err, results) {
            if (err) {
              res.status(400), send({
                errors: [400],
                message: err
              });
            } else {
              res.send(results)
            }
          });
      }
    });
  });

  // Authorise endpoints
  users.put('/:id', auth.authorized);
  users.delete('/:id', auth.authorized);

  // Specific users
  users.all('/:id', function(req, res) {
    var userid = req.params['id'];
    restful(req, res, {
      GET: function(req, res) {
        // Search for the user
        User.findOne()
          .select("-email -pwd") // exclude the email
          .where('_id').equals(userid)
          .exec(function(err, result) {
            if (err) {
              res.send({
                errors: [err]
              });
              return;
            }

            if (result) {
              res.send(result);
            } else {
              res.status(404).send({
                errors: [404],
                message: "User not found"
              });
            }
          });
      },
      PUT: function(req, res) {
        // Check if it's a valid Mongo id
        User.findById(userid, function(err, user) {
          if (err) {
            res.send({
              errors: [err]
            });
            return;
          }

          if (req.body.name) user.name = req.body.name;
          if (req.body.thumb) user.thumb = req.body.thumb;
          if (req.body.pwd) user.pwd = crypter.apply(req.body.pwd);

          user.save(function(err) {
            if (!err) {
              return res.send(user);
            } else {
              return res.send({
                errors: [err]
              });
            }
          });
        });
      },
      DELETE: function(req, res) {
        // TODO implement this endpoint
        res.send({
          message: 'DELETE User endpoint for id ' + userid
        })
      }
    });
  });

  Strider.app.use('/users', auth.authenticated, users);
};
