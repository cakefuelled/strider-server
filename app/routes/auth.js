/**
 * Strider API
 * Auth endpoint
 */

// Dependencies
var express = require('express'),
  passport = require('passport'),
  // Middleware
  restful = require('../middleware/restful.js');

module.exports = function(Strider) {

  var auth = express.Router();

  // Return 405 on all methods of /auth
  auth.all('/', function(req, res, next) {
    restful(req, res, next, {});
  });

  auth.all('/login', function(req, res, next) {
    restful(req, res, next, {
      POST: function(req, res, next) {
        // Only local authentication supported atm
        passport.authenticate('local', function(err, user, info) {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(401).send({
              errors: [401],
              message: "Wrong email/pwd"
            });
          }
          req.logIn(user, function(err) {
            if (err) {
              return next(err);
            }
            // remove password before returning
            var userObject = user.toObject();
            delete userObject.pwd;
            return res.send(userObject);
          });
        })(req, res, next);
      },
      // To make browser debugging easier, GET login is allowed for now
      GET: function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(401).send({
              errors: [401],
              message: "Wrong email/pwd"
            });
          }
          req.logIn(user, function(err) {
            if (err) {
              return next(err);
            }
            return res.send({
              user: req.user._id
            });
          });
        })(req, res, next);
      }
    });
  });
  // Similar to GET login, logout is GET for now to make it easier
  auth.all('/logout', function(req, res, next) {
    restful(req, res, next, {
      GET: function(req, res, next) {
        req.logout();
        req.session.destroy(function(err) {
          res.send({
            message: 'Logout successful'
          });
        });
      }
    });
  });

  Strider.app.use('/auth', auth);
};
