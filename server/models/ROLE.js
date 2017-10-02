var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var roleSchema = new Schema({
    type: {
        type: String,
        enum: ['SUPERADMIN', 'ADMIN', 'USER'],
        default: 'USER'
    }
});

module.exports = mongoose.model('ROLE', roleSchema,'ROLE');
