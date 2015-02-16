var passport = require('passport'),
  log = require('./lib/log.js');

/**
 * Strider API - Router
 * @param  {Object} Strider Strider main object
 * @return {void}
 */
module.exports = function(Strider) {

  // Analytics tracking
  Strider.app.use(function(req, res, next) {
    Strider.analytics.pageview(req);
    next();
  });

  // Test route (accessed at GET http://localhost:8080/)
  Strider.app.get('/', function(req, res) {
    res.send({
      message: 'Strider API',
      version: Strider.version
    });
  });

  // Error handlers
  Strider.app.use(function(req, res, next) {
    log.debug('Non existing endpoint: %s', req.url);
    res.status(501).send({
      errors: [501],
      message: 'Requested endpoint does not exist'
    });
    return;
  });

  Strider.app.use(function(err, req, res, next) {
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.status(err.status || 500).send({
      errors: [500],
      message: 'Please get in touch with the devs'
    });
    return;
  });
};
