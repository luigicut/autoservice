var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var deviceSchema = new Schema({
    active: { type: Boolean, default: true},
    created:  { type: Date, default: Date.now },
    lastUpdated: Date,
    lastUpdatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    presoId: {type: mongoose.Schema.Types.ObjectId, ref: 'DEVICE'},
    humanName: String,
    description: String,
    image: String,
    onTime: Date,
    offTime: Date,
    deviceOn: {type: Number, default: 1 },
    ssid: String,
    password: String,
    globalPowerLimit: Number,
    priority: { type: Number, unique: true },
    sent: {type: Boolean, default: false}
});

module.exports = mongoose.model('DEVICESETTINGS', deviceSchema,'DEVICESETTINGS');
