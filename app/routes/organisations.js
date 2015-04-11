/**
 * Strider API - Organisations Router
 * @param {Object} Strider Strider main object
 */

var express = require('express'),
    // Middleware
    auth = require('../middleware/auth.js'),
    log = require('../lib/log.js'),
    restful = require('../middleware/restful.js'),
    validate = require('express-validation'),
    // Model
    Organisation = require('../models/organisation');

module.exports = function(Strider) {

    var organisationsRouter = express.Router();

    organisationsRouter.all('/', function(req, res, next) {
        restful(req, res, next, {
            GET: function(req, res, next) {
                Organisation.find(function(err, organisations) {
                    if (err) {
                        res.send(err);
                        return next();
                    }

                    res.send(organisations);
                    return next();
                })
            },
            POST: function(req, res, next) {
                /*var newOrg = new Organisation({
                    name: req.body.name,
                    path: req.body.path,
                    domain: req.body.domain
                });
                */
                res.send("done");
                return next();
                /*newOrg.save(function(err) {
                    res.send("Done");
                    return next();
                    if (err) {
                        console.log(err);
                    }
                });
                */
            }

        })
    });

    organisationsRouter.all('/:path', function(req, res, next) {
        restful(req, res, next, {
            GET: function(req, res, next) {
                Organisation.findOne({
                    path: req.params.path
                }, function(err, organisation) {
                    if (err) {
                        res.send(err);
                        return next();
                    }

                    res.send(organisation);
                    return next();
                })
            },
            PUT: function(req, res, next) {
                return next();
            },
            DEL: function(req, res, next) {
                return next();
            }
        })
    });
    Strider.app.use('/organisations', organisationsRouter);
    //Strider.app.use('/organisations', auth.authenticated, organisationsRouter);
};
