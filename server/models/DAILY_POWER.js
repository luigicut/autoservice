// server/models/DAILY_POWER.js
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;


var minuteSchema = new Schema({lastPower: Number,
                               power: Number,
                               fromTimestamp: Date,
                               toTimestamp: Date});
var hourSchema = new Schema({
        minute : [minuteSchema],
        avgPower : Number,
        maxPower : Number
    });

var schema = new Schema({
        active: { type: Boolean, default: true},
        created:  { type: Date, default: Date.now },
        lastUpdated: Date,
        id: String,
        topic: String,
        currentDate: Date,
        power: [hourSchema],
        avgPower : Number,
        maxPower : Number
    },
    {
      timestamps: { createdAt: 'created', updatedAt: 'lastUpdated' }
    });

schema.pre('save', function(next){
    var total = 0;
    var count = 0;
    var max   = 0;
    for(var i=0; i<this.power.length; i++){
        if(this.power[i]  && this.power[i] !== null){
            var minuteTotal = 0;
            var minuteCount = 0;
            var minuteMax   = 0;
            for(var q=0; q<this.power[i].minute.length; q++){
                if(this.power[i].minute[q] && this.power[i].minute[q] !== null){
                    minuteTotal += this.power[i].minute[q].power;
                    minuteCount ++;
                    minuteMax = minuteMax < this.power[i].minute[q].power ? this.power[i].minute[q].power : minuteMax;
                }
            }
            this.power[i].avgPower = minuteCount > 0 ? minuteTotal/minuteCount : 0;
            this.power[i].maxPower = minuteMax;
            total += this.power[i].avgPower;
            count ++;
            max = this.power[i].maxPower > max ? this.power[i].maxPower : max;
        }
    }
    this.avgPower = count > 0 ? total/count : 0;
    this.maxPower = max;
    next();
});

module.exports = mongoose.model('DAILY_POWER', schema,'DAILY_POWER');

/*

power: [ 0...24: [0...59 : {lastPower: Number, power: Number, fromTimestamp: Date, toTimestamp: Date} ] ]


*/
