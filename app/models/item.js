var mongoose = require("mongoose");

// Define the MongoDB Schema
var itemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  alternate_id: {
    type: String,
  },
  updates: [Update.schema]
});

//Automatically update the audit trail
itemSchema.pre('save', require('./utils/audit-logger.js'));

module.exports = mongoose.model('Item', itemSchema);
