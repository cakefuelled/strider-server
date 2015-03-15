var log = require('../lib/log.js'),
 Organisation = require('../models/organisation');

/**
 * Strider API - Items Router
 * @param {Object} Strider Strider main object
 */

module.exports = function(Strider) {

  Strider.app.get('/organisations', function (req, res) {
      Organisation.find(function(err, organisations) {
        if(err) {
          res.send(err);
        }

        res.send(organisations);
      });
  });

  Strider.app.post('/organisations', function (req, res) {

    var organisation = new Organisation({
      name: req.body.name,
      path: req.body.path,
      domain: req.body.domain
    });
    
    Organisation.save(function(err, organisation) {
      if(err) {
        res.send(err);
      }
      log.debug("Saved New Organisation");
      res.send(organisation);
    });

  });

  Strider.app.get('/organisations/:path', function (req, res) {
      Organisation.findOne({ path: req.params.path }, function(err, organisation) {
        if(err) {
          res.send(err);
        }
        log.debug(organisation.path);

        res.send(organisation);
      })
  });

  Strider.app.put('/organisations/:path', function (req, res, next) {
      return next();
  });

  Strider.app.del('/organisations/:path', function (req, res, next) {
      return next();
  });
};