var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
var User = require('../models/USER');






module.exports.findByEmail = function(req, res) {
    console.log('passed email', req.params.email);
    User.findOne({email: req.params.email.toLowerCase()}, function(err, user){
        if(user){
           res.status(200).send(user);
        } else {
            res.status(404).send();
        }
    }

)};