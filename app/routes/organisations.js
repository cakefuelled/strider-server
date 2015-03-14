var log = require('../lib/log.js'),
 Organisation = require('../models/organisation');

/**
 * Strider API - Items Router
 * @param {Object} Strider Strider main object
 */

module.exports = function(Strider) {

  Strider.app.get('/organisations', function (req, res, next) {
      Organisation.find(function(err, organisations) {
        if(err) {
          res.send(err);
          return next();
        }

        res.send(organisations);
        return next();
      });
  });

  Strider.app.post('/organisations', function (req, res, next) {
    var organisation = new Organisation(req.body);
    
    organisation.save(function(err, organisation) {
      if(err) {
        console.log(err);
        res.send(err);
        return next();
      }

      res.send(organisation);
      return next();
    });

  });

  Strider.app.get('/organisations/:path', function (req, res, next) {
      Organisation.findOne({ path: req.params.path }, function(err, organisation) {
        if(err) {
          res.send(err);
          return next();
        }

        res.send(organisation);
        return next();
      })
  });

  Strider.app.put('/organisations/:path', function (req, res, next) {
      return next();
  });

  Strider.app.del('/organisations/:path', function (req, res, next) {
      return next();
  });
};