var mongoose = require("mongoose")

// Define the MongoDB Schema
var locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  postcode: {
    type: String,
    //required: true,
    trim: false
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
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }

});

// Automatically fill in created_at and updated_at fields
locationSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
locationSchema.statics.findByPostcode = function(postcode, cb) {

  // 'this' will refer to the Location model, but could be a promise
  var Location = this || mongoose.model('Location');

  // pass given callback as the callback for the findOne method
  Location.findOne({
    postcode: postcode
  }, cb);
};

module.exports = mongoose.model('Location', locationSchema);
