// server/models/POWER.js
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var deviceSchema = new Schema({
    active: { type: Boolean, default: true},
    created:  { type: Date, default: Date.now },
    lastUpdated: Date,
    lastUpdatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
//    id: {type: mongoose.Schema.Types.ObjectId, ref: 'DEVICE'},
    id: String,
    topic: String,
    fromTimestamp: Date,
    toTimestamp: Date,
    power: Number,
    lastPower: Number
});

module.exports = mongoose.model('POWER', deviceSchema,'POWER');
