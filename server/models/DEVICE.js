var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;    
var uniqueValidator = require('mongoose-unique-validator');

var deviceSchema = new Schema({
    active: { type: Boolean, default: true},
    created:  { type: Date, default: Date.now },
    lastUpdated: Date,
    lastUpdatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    presoId: { type: String, unique: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    netId: {type: mongoose.Schema.Types.ObjectId, ref: 'NETWORKS'}
});

deviceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('DEVICE', deviceSchema,'DEVICE');
