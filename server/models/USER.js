var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
var Schema = mongoose.Schema;
var Role = require('../models/ROLE');


var userSchema = new Schema({
    active:  {type: Boolean, default: true},
    created:  { type: Date, default: Date.now },
    lastUpdated: Date,
    lastUpdatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    role: {type: mongoose.Schema.Types.ObjectId, ref: 'ROLE'},
    country: {type: mongoose.Schema.Types.ObjectId, ref: 'COUNTRY'},
    language: {type: mongoose.Schema.Types.ObjectId, ref: 'LANGUAGE'},
    username: {type: String, lowercase: true, unique: true},
    firstName: String,
    lastName: String,
    password: {type: String, select: false},
    email: {type: String, lowercase: true, unique: true},
    lastLogin: Date,
    fkAuth: String,
    devicePwd: String,
    image: String
});


userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};



module.exports = mongoose.model('USER', userSchema,'USER');
