var mongoose = require("mongoose"),
  Update = require("./update.js");


// Define the MongoDB Schema
var organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  domain: {
    type: String,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  updates: [Update.schema]
});

//Automatically update the audit trail
//organisationSchema.pre('save', require('./utils/audit-logger.js'));

module.exports = mongoose.model('Organisation', organisationSchema);