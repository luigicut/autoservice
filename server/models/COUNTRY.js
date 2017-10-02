var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var countrySchema = new Schema({
    active: {type: Boolean, default: true},
    created:  { type: Date, default: Date.now },
    lastUpdated: Date,
    lastUpdatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
    name: String,
    code: String,
    languages: [ {type: mongoose.Schema.Types.ObjectId, ref: 'LANGUAGE'} ]
});

module.exports = mongoose.model('COUNTRY', countrySchema,'COUNTRY');
