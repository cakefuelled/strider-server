/**
 * Strider API Logging system
 */
var winston = require('winston'),
  fs = require('fs'),
  logDir = __dirname + '/../../logs';

if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

var logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      colorize: true,
      level: 'debug',
      handleExceptions: true,
      timestamp: true
    }),
    new(winston.transports.File)({
      level: 'info',
      timestamp: true,
      filename: logDir + '/server.json',
      handleExceptions: true,
      json: true
    })
  ],
  exitOnError: true
});

module.exports = logger;
