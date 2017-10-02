var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var aclSchema = new Schema({
    active: {type: Boolean, default: true},
    created:  { type: Date, default: Date.now },
    lastUpdated: Date,
    topic: String,
    lastUpdatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    type: {type: String, enum:['pub', 'sub', 'both']},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    device: {type: mongoose.Schema.Types.ObjectId, ref: 'DEVICE'}
});

module.exports = mongoose.model('ACL', aclSchema,'ACL');
