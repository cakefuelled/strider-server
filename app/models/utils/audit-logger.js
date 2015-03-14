/**
 * Strider API
 *
 * An audit logger to ensures that all data updates log the updater's username and a timestamp
 *
 * Assumes the Update schema
 */

module.exports = function(next, req, callback) {
  var now = new Date();

  //Get the username from the request object
  var user = req.user;

  this.updates.updated_at = now;
  this.updates.updated_by = user;

  next(callback);
};
