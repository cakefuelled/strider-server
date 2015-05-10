var log = require('./lib/log.js');

/**
 * Strider API - Main Router
 * @param  {Object} Strider Strider main object
 * @return {void}
 */
module.exports = function(Strider) {

  /*  // Analytics tracking
    Strider.app.use(function(req, res, next) {
      Strider.analytics.pageview(req);
      next();
    });*/

  // Test route (accessed at GET http://localhost:8080/)
  Strider.app.get('/', function(req, res, next) {
    res.send({
      message: 'Strider API',
      version: Strider.version
    });
  });

  // Object routes
  require('./routes/auth.js')(Strider);
  require('./routes/items.js')(Strider);
  require('./routes/organisations.js')(Strider);
  require('./routes/locations.js')(Strider);
  require('./routes/users.js')(Strider);

  // Error handlers
  require('./middleware/errors.js')(Strider);

  Strider.app.use(function(req, res, next) {
    log.debug('Non existing endpoint: %s', req.url);
    res.status(501).send({
      errors: [501],
      message: 'Requested endpoint does not exist'
    });
    return;
  });

};
