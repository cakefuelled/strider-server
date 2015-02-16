var mongoose = require("mongoose"),
  crypto = require('../crypto/crypter.js'),
  Update = require("update.js");

// Define the MongoDB Schema
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  pwd: {
    type: String,
    //required: true,
    trim: false
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  type: {
    type: String,
    required: false,
    trim: true
  },
  updates: [Update.schema]

});

// Automatically fill in created_at and updated_at fields
userSchema.pre('save', require('./utils/audit-logger.js'));

userSchema.statics.findByEmail = function(email, cb) {
  // good idea to check if the given email is a string

  // 'this' will refer to the User model, but I usually use promises which lose the context and
  // you'll need to manually get the User model
  var User = this || mongoose.model('User');

  // pass given callback as the callback for the findOne method
  User.findOne({
    email: email
  }, cb);
};

// Validate password
userSchema.methods.validPassword = function(candidatePassword, done) {
  if (crypto.apply(candidatePassword) == this.pwd) {
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);
