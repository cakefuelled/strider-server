var mongoose = require("mongoose"),
  Update = require("update.js");

// Define the MongoDB Schema
var locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: false,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  }
  updates: [Update.schema]

});

// Automatically log updates
locationSchema.pre('save', require('./utils/audit-logger.js'));

locationSchema.statics.findByPostcode = function(postcode, cb) {

  // 'this' will refer to the Location model, but could be a promise
  var Location = this || mongoose.model('Location');

  // pass given callback as the callback for the findOne method
  Location.findOne({
    postcode: postcode
  }, cb);
};

module.exports = mongoose.model('Location', locationSchema);
