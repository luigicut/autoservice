var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var invitationsSchema = new Schema({
    netId: {type: mongoose.Schema.Types.ObjectId, ref: 'NETWORKS'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    firstName: String,
    lastName: String,
    email: {type: String, lowercase: true},
    status: {type: String, enum:['PENDING', 'ACCEPTED', 'DECLINED'], default: 'PENDING'},
    enable: {type: Boolean, default: true}
});

module.exports = mongoose.model('USERINVITATIONS', invitationsSchema,'USERINVITATIONS');
