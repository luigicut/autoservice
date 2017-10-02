// ./common/request
var request = require('request');
var requestSettings = require('../config/request');


var request = request.defaults({
        headers: requestSettings.headers,
        baseUrl: requestSettings.protocol + requestSettings.host + ':' + requestSettings.port
    });

function hooksSettings(deviceId){
    //http://207.154.206.69:8080/hooks/settings/:id
    var uri = '/hooks/settings/'+ deviceId;
    request.post({ uri: '/hooks/settings/'+ deviceId }, function(error, resp, body){
        if(error){
            console.log('./common/request postSettings() error: ', error);
        }else{
            console.log('./common/request postSettings() DONE');
        }
    });
}


module.exports = {
    hooksSettings : hooksSettings
};