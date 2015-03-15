#!/bin/env node

/**
 * Strider API Server
 */

// Module loading
var restify = require('restify'),
  bodyParser = require('body-parser'),
  events = require('events'),
  dotenv = require('dotenv'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  expressValidator = require('express-validator'),
  // Models
  User = require('./app/models/user.js'),
  // Libs
  log = require('./app/lib/log.js');
  //Validators
  validators = require('./app/validators.js')

// Load environment variables from the .env file
dotenv.load();

/**
 * Main Strider object
 * Used to share access to variables and data from other modules.
 * All attributes should be self explanatory and allow customization
 * from the .env file.
 * @type {Object}
 */
var Strider = {
  app: restify.createServer({
    name: 'Strider-API'
  }),
  ipaddress: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1",
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,
  api_dir: process.env.API_DIR || '/',
  version: require('./package.json').version,
  events: new events.EventEmitter(),
  mongo: mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO),
  analytics: require('./app/middleware/analytics.js')
};

// Log Mongo errors
var db = mongoose.connection;
db.on('error', function(err) {
  log.error('MongoDB connection error:', err.message);
});
db.once('open', function callback() {
  log.info("Connected to MongoDB");
});

// Set up passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd'
  },
  function(email, password, done) {
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect email/password.'
        });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Set up express middleware
Strider.app.use(bodyParser.urlencoded({
  extended: true
}));
Strider.app.use(restify.fullResponse());
Strider.app.use(restify.bodyParser());
Strider.app.use(expressValidator({customValidators: validators}));  //Has to be after bodyParser
Strider.app.use(cookieParser());
Strider.app.use(session({
  secret: process.env.SESSION_SECRET || 'Strider',
  resave: true,
  saveUninitialized: true
}))
Strider.app.use(passport.initialize());
Strider.app.use(passport.session());


// Set up API routes
require('./app/routes.js')(Strider);

// Start the server
Strider.app.listen(Strider.port, Strider.ipaddress, function() {
  log.info('Strider API v%s started on %s:%s%s',
    Strider.version,
    Strider.ipaddress,
    Strider.port,
    Strider.api_dir);
});

// Non existing endpoints
Strider.app.on('NotFound', function(req, res, err, next) {
  log.debug('Non existing endpoint: %s', req.url);
  res.send(501, {
    errors: [501],
    message: 'Requested endpoint does not exist'
  });
});

Strider.app.on('InternalServerError', function(req, res, err, next) {
  log.error(err);
  return next();
});

// Error handling
process.on('uncaughtException', function(err) {
  // Handle the error safely
  log.error(err);
  return next();
});
