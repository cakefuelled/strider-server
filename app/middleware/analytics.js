/**
 * Strider API
 * Analytics manager - uses Google Analytics for now
 */

var analytics = require("universal-analytics"),
  log = require('../lib/log.js'),
  trackingId = process.env.GOOGLE_ANALYTICS_ID || '';

function getVisitor(req) {
  if (req.isAuthenticated && typeof(req.user) !== 'undefined') {
    return analytics(trackingId, req.user._id);
  } else {
    return analytics(trackingId);
  }
}

module.exports = {
  pageview: function(req) {

    // Only run in production
    if (req.get('host') !== 'api.strider.com') {
      return;
    }

    var visitor = getVisitor(req),
      url = req.protocol + '://' + req.get('host') + req.originalUrl;

    // Log the pageview
    visitor.pageview(url, function(err) {
      if (err) {
        log.warn('Analytics: Failed to log pageview to ' + url + "\n" + err);
      } else {
        log.debug('Analytics: Pageview to ' + url)
      }
    });
  }
};
