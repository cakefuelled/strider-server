var mongoose = require("mongoose");

// Define the MongoDB Schema
var updateSchema = new mongoose.Schema({
  updated_at: {
    type: Date,
    required: true
  },
  updated_by: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Update', updateSchema);
