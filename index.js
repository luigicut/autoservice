var express = require('express'),
	path = require('path'),
	cors = require('cors'),
	logger = require('morgan'),
	bodyParser     	= require('body-parser'),
	mongoose		= require('mongoose');
//	POWER_ctrl      = require('./server/controllers/POWER_controller');
//	DAILY_POWER_ctrl      = require('./server/controllers/DAILY_POWER_ctrl');

/* config */
var	l_db			= require('./server/config/db');


/* **** EXPRESS **** */
var routes = require('./routes');

var app = express();
	app.set('port', (process.env.PORT || 5000));
	app.use(cors());
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

//routes.initApp(app, express);
//routes.initAdmin(app, express);
//routes.initAPI(app, express);
routes.initAPIApp(app, express);

//var userRouter = require('./server/controllers/userRouter');

var mobileApp = require('./server/app').app;

app.use('/app/', mobileApp);

// redirect base to application, e.g. if nothing is selected than use as default
app.get('/', function(req, res){
    res.redirect('/app/');
});

// just a status call
app.get('/status', function(req, res){
    res.send('OK');
});

/* ****** */
MONGODB_URI='mongodb://heroku_wknfnlp3:le5d8nnh4f4089rvng4uv568ui@ds135069.mlab.com:35069/heroku_wknfnlp3'
/*
 |--------------------------------------------------------------------------
 | Connect to DB and Start the Server
 |--------------------------------------------------------------------------
 */
// mongoose.set('debug', true);
var mongoConnection = mongoose.connect(MONGODB_URI, function (err, res) {	// connect to database
  console.log('db url: ', MONGODB_URI);
  if (err) {
    console.log('ERROR connecting to: ' + MONGODB_URI, + '. ' + err);
  }else{
  	console.log('MongoDB is connected');
  	// init listen
  	app.listen(app.get('port'), function(){
		console.log('server is listening on port: '+app.get('port'));
		//require('./server/config/toclitable')(app._router.stack, 'express');
	});

//    POWER_ctrl.getAVG('preso-9622340');
//    DAILY_POWER_ctrl.getAVG('preso-9622340', 'day');
//    console.log('env SEED_DB', process.env.SEED_DB);
//	if(process.env.SEED_DB === 'true'){
//	    routes.seedDB(res);
//	}

//    console.log('seedDB');
//    var seedController = require('./server/controllers/SEED_controller');
//    seedController.seedDB();

  }
});

