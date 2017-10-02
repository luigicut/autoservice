// server/controllers/helpers/DAILY_POWER_hlp.js

var DailyPower = require('../../models/DAILY_POWER');

module.exports = {
    getAggregateArray : getAggregateArray,
    getPowerV2        : getPowerV2
};

function getFromDate(inDate, inTimeStamp){
    // if inTimeStamp is there than create date based on it
    // since it may happen that server and client are in different timezone
    var lFromData = new Date(parseInt(inTimeStamp)) || new Date();
    if(inDate){
        switch(inDate){
            case 'day' :
                lFromData = lFromData.setDate(lFromData.getDate()-1);
                break;
            case 'week' :
                lFromData = lFromData.setDate(lFromData.getDate()-7);
                break;
            case 'month' :
                lFromData = lFromData.setDate(lFromData.getDate()-30);
                break;
            case 'year' :
                lFromData = lFromData.setDate(lFromData.getDate()-365);
                break;
            default:
                break;
        }
    }
    return lFromData;
}

function getAggregateArray(inData){
    var aggregateArray = [];
    var lFromData = getFromDate(inData.from, inData.fromTimestamp);

    if(inData.from && inData.from === 'day'){
        aggregateArray = [
            { '$match': {'id': {'$in' : inData.ids},
                         'currentDate': { '$gte': new Date(lFromData) } } },
            { '$group' : {
                           '_id': '$power'
                         }
            },
            { '$unwind' : {'path'                        : '$_id',
                           'includeArrayIndex'           : 'arrayIndex',
                           'preserveNullAndEmptyArrays'  : true} },
            { '$project': {'minute'      : '$_id.minute',
                           'arrayIndex'  : '$arrayIndex',
                           '_id'         : false} },
            { '$unwind' : {'path'                        : '$minute',
                           'includeArrayIndex'           : 'arrayIndexMinute',
                           'preserveNullAndEmptyArrays'  : true} },
            { '$project': {'arrayIndex': '$arrayIndex',
                           'arrayIndexMinute'    : '$arrayIndexMinute',
                           '_id'                 : false,
                           'power'               : '$minute.power',
                           'lastPower'           : '$minute.lastPower'} },

            { '$group' : {'_id': '$arrayIndex',
                          // lastPower
                          'maxLastPower': {'$max': '$lastPower'},
                          'minLastPower': {'$min': '$lastPower'},
                          'sumLastPower': {'$sum': '$lastPower'},
                          'avgLastPower': {'$avg': '$lastPower'},
                          // power
                          'avgPower': {'$avg': '$power'},
                          'maxPower': {'$max': '$power'},
                          'minPower': {'$min': '$power'},
                          'sumPower': {'$sum': '$power'}
                }
            },
            {'$project':{ '_id': false,
                 'id'          : '$_id',
                 'maxLastPower': '$maxLastPower',
                 'minLastPower': '$minLastPower',
                 'sumLastPower': '$sumLastPower',
                 'avgLastPower':{ '$divide':[
                                  { '$subtract':[
                                          { '$multiply':[ '$avgLastPower',100]},
                                          { '$mod':[{ '$multiply':[ '$avgLastPower',100]}, 1]}
                                  ]},
                              100]},
                 'maxPower': '$maxPower',
                 'minPower': '$minPower',
                 'sumPower': '$sumPower',
                 'avgPower':  { '$divide':[
                                  { '$subtract':[
                                          { '$multiply':[ '$avgPower',100]},
                                          { '$mod':[{ '$multiply':[ '$avgPower',100]}, 1]}
                                  ]},
                              100]}
                }
            },
            { '$sort' : {'id': 1} }
        ];
    }
    else if(inData.from && inData.from !== 'day'){
        aggregateArray = [
            { '$match': {'id': {'$in' : inData.ids},
                         'currentDate': { '$gte': new Date(lFromData)} } },
            { '$project' : {'currentDate' : '$currentDate', 'power' : '$power'}},
            { '$unwind' : {'path': '$power',
                           'includeArrayIndex': 'hourIndex',
                           'preserveNullAndEmptyArrays': true} },
            { '$unwind' : {'path': '$power.minute',
                           'includeArrayIndex': 'minuteIndex',
                           'preserveNullAndEmptyArrays': true} },
            { '$project' : {'currentDate' : '$currentDate',
                            'lastPower' : '$power.minute.lastPower',
                            'power' : '$power.minute.power',
                            'minuteIndex': 1,
                            'hourIndex' : '$hourIndex' } },


            { '$group' : {
                           '_id': '$currentDate',
                           'maxLastPower': {'$max': '$lastPower'},
                           'minLastPower': {'$min': '$lastPower'},
                           'sumLastPower': {'$sum': '$lastPower'},
                           'avgLastPower': {'$avg': '$lastPower'},

                             'avgPower': {'$avg': '$power'},
                             'maxPower': {'$max': '$power'},
                             'minPower': {'$min': '$power'},
                             'sumPower': {'$sum': '$power'}
                         }
            },
            {'$project':{ '_id': false,
                 'id'          : '$_id',
                 'maxLastPower': '$maxLastPower',
                 'minLastPower': '$minLastPower',
                 'sumLastPower': '$sumLastPower',
                 'avgLastPower':{ '$divide':[
                                  { '$subtract':[
                                          { '$multiply':[ '$avgLastPower',100]},
                                          { '$mod':[{ '$multiply':[ '$avgLastPower',100]}, 1]}
                                  ]},
                              100]},
                 'maxPower': '$maxPower',
                 'minPower': '$minPower',
                 'sumPower': '$sumPower',
                 'avgPower':  { '$divide':[
                                  { '$subtract':[
                                          { '$multiply':[ '$avgPower',100]},
                                          { '$mod':[{ '$multiply':[ '$avgPower',100]}, 1]}
                                  ]},
                              100]}
                }
            },
            { '$sort' : {'id': 1} }
        ];
    }

    return aggregateArray;

}

function getDateInterval(req){
    var lDateTimeFrom = new Date(getFromDate(req.params.timeframe, req.params.from));
        lDateTimeFrom2 = new Date(getFromDate(req.params.timeframe, req.params.from));

    var lDateTimeTo = new Date(parseInt(req.params.from));
    var lDateTimeTo2 = new Date(parseInt(req.params.from));
    var lDateTo = new Date(lDateTimeTo.setHours(0,0,0,0));
        lDateTo = new Date(lDateTo.setDate(lDateTo.getDate()+1));

    return {
        from        : new Date(lDateTimeFrom2.setHours(0,0,0,0)),
        fromTime    : lDateTimeFrom,
        fromHour    : lDateTimeFrom.getHours(),
        fromMinute  : lDateTimeFrom.getMinutes(),
        fromSecond  : lDateTimeFrom.getSeconds(),
        to          : lDateTo,
        toTime      : lDateTimeTo2,
        toHour      : lDateTimeTo2.getHours(),
        toMinute    : lDateTimeTo2.getMinutes(),
        toSecond    : lDateTimeTo2.getSeconds()
    };
}

function getPowerV2(req, res){

    var dates = getDateInterval(req);
    console.log('dates', JSON.stringify(dates));

    DailyPower.find({"id" : req.params.id,
                     "currentDate": {"$gte" : dates.from, "$lte" : dates.to } })
              .exec(function(err, docs){
                if(err){
                    console.log('getPowerV2 ERROR', err);
                }else{
                    console.log('docs', docs.length);
                    for(let i=0, len = docs.length; i < len; i++){
                        for(let q=0, len2 = docs[i].power.length; q < len; q++){
                            console.log
//                            if()
                        }
                    }
                }
              });

    res.status(200).send();

}