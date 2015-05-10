var mongoose = require("mongoose"),
  Update = require("./update.js");


// Define the MongoDB Schema
var itemSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation'
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  altIds: [{
    id: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true
    }
  }],
  updates: [Update.schema]
});

//Automatically update the audit trail
//itemSchema.pre('save', require('./utils/audit-logger.js'));

module.exports = mongoose.model('Item', itemSchema);
