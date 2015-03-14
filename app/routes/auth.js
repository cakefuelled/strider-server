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

  auth.all('/', function(req, res) {
    restful(req, res, {});
  });

  auth.all('/login', function(req, res, next) {
    restful(req, res, {
      POST: function(req, res) {
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

  auth.all('/logout', function(req, res) {
    restful(req, res, {
      GET: function(req, res) {
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
