var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var aclUserSchema = new Schema({
    preso: {type: mongoose.Schema.Types.ObjectId, ref: 'DEVICE'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    invitation: {type: mongoose.Schema.Types.ObjectId, ref: 'USERINVITATIONS'},
    auth: {type: String, enum:['VIEW', 'ENABLE', 'MODIFY'], default: 'VIEW'}
});

module.exports = mongoose.model('ACL_USER', aclUserSchema,'ACL_USER');
