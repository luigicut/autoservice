var express = require('express'),
    path = require('path');

var app = express();
/* whatever configuration code */


	// static file
  	console.log('__dirname app', __dirname);
	app.use('/', express.static(__dirname + '/../../dist'));
//	app.use('/', express.static(__dirname + '/../../app'));

//

exports.app = app;