var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var languageSchema = new Schema({
    type: {
        type: String,
        enum: ['EN', 'IT', 'DE', 'HU'],
        default: 'EN'
    }
});

module.exports = mongoose.model('LANGUAGE', languageSchema,'LANGUAGE');
