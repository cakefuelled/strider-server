var mongoose = require("mongoose"),
  Update = require("./update.js");

// Define the MongoDB Schema
var locationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation'
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
  },
  updates: [Update.schema]

});

// Automatically log updates
//locationSchema.pre('save', require('./utils/audit-logger.js'));

module.exports = mongoose.model('Location', locationSchema);
