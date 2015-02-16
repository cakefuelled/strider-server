/**
 * Strider API
 * Authentication manager
 */

var openPaths = [{
  path: '/users',
  method: 'post'
}];

module.exports = {
  /**
   * Check if the user making the request is authorized for it.
   * At the moment this only checks if the request parameter :id is the same as the
   * logged in user's id.
   * If the user is authorized, it goes to the next handler. Otherwise
   * it returns 403 Forbidden.
   * @param  {Express}   req  Request
   * @param  {Express}   res  Response
   * @param  {Express}   next Next middleware
   * @return {void}
   */
  authorized: function(req, res, next) {
    if (!req.isAuthenticated) {
      res.status(401).send({
        errors: [401],
        message: 'You need to login first'
      });
      return;
    }

    if (req.user._id === req.params['id']) {
      next();
    } else {
      res.status(403).send({
        errors: [403],
        message: 'You are not authorized for this operation.'
      });
    }
  },
  /**
   * Check if the user is authenticated. Since this can be used
   * on endpoints where some methods might be allowed, you can
   * set open endpoints with the array at the top of this file.
   * That list acts as a whitelist, and any other method will be
   * checked.
   *
   * @param  {Express}   req  Request
   * @param  {Express}   res  Response
   * @param  {Express}   next Next middleware
   * @return {void}
   */
  authenticated: function(req, res, next) {
    // Check if this path should be available
    for (var i = 0, total = openPaths.length; i < total; i++) {
      if (openPaths[i].path === req.originalUrl && openPaths[i].method.toLowerCase() === req.method.toLowerCase()) {
        next();
        return;
      }
    }

    // check if the user is logged in
    if (!req.isAuthenticated()) {
      res.status(401).send({
        errors: [401],
        message: 'You need to login first'
      });
    } else {
      next();
    }
  }
};
