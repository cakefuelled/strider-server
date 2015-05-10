/**
 * Strider API
 * RESTful adapter to make the API fully REST compliant
 * It sends a 405 when the method is not implemented, instead of a 404.
 *
 * Sample usage:
 * A handler that allows only GET requests and returns
 *
 *    exports.myrestfulhandler = function (req, res) {
 *      restful(req, res, {
 *        get: function (req, res) {
 *          res.send(200, 'Hello restful world.');
 *        }
 *      });
 *    }
 *
 * Source: http://stackoverflow.com/a/15754373/1262824
 */

module.exports = function(req, res, handlers) {
  var method = req.method;
  if(method.toUpperCase() === 'OPTIONS'){
    res.status(200).send();
    return;
  }
  if (!(method in handlers)) {
    res.set('Allow', Object.keys(handlers).join(', ').toUpperCase());
    res.status(405).send({
      errors: [405]
    });
  } else {
    handlers[method](req, res);
  }
}
