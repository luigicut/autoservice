var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var networksSchema = new Schema({
    limit: Number,
    ip: String,
    name: String,
    ssid: String,
    password: {type: String, select: false},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'}
});

networksSchema.pre('save', function(next) {
  var network = this;
  if (!network.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(network.password, salt, function(err, hash) {
      network.password = hash;
      next();
    });
  });
});

networksSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('NETWORKS', networksSchema,'NETWORKS');