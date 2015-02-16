var mongoose = require("mongoose"),
  Update = require("update.js");

// Define the MongoDB Schema
var movementSchema = new mongoose.Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item'
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updates: [Update.schema]
});

//Automatically update the audit trail
movementSchema.pre('save', require('./utils/audit-logger.js'));

module.exports = mongoose.model('Movement', movementSchema);
