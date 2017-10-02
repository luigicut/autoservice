var path = require('path');
var mongoose = require('mongoose');

//var s3util = require('./server/common/s3util');
//var presoAccessRules = require('./server/common/presoaccessrules');
var pathVarApp      = require('./server/config/basepathvars');

var USER_controller = require('./server/controllers/USER_controller');
/*var COUNTRY_controller = require('./server/controllers/COUNTRY_controller');
var DEVICESETTINGS_controller = require('./server/controllers/DEVICESETTINGS_controller');
var ACL_controller = require('./server/controllers/ACL_controller');
var DEVICE_controller = require('./server/controllers/DEVICE_controller');
var USERINVITATIONS_controller = require('./server/controllers/USERINVITATIONS_controller');
var NETWORKS_controller = require('./server/controllers/NETWORKS_controller');
var ACL_USER_controller = require('./server/controllers/ACL_USER_controller');
var POWER_controller = require('./server/controllers/POWER_controller');
var DAILY_POWER_ctrl      = require('./server/controllers/DAILY_POWER_ctrl');

var authConfig = require('./server/config/auth');*/
var User = require('./server/models/USER');

// MULTER

	var multer = require('multer');
	
	var storageUser = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'uploads/')
		},
		filename: function (req, file, cb) {
			cb(null, 'user_'+req.params.id+'_'+file.fieldname+Date.now()+path.extname(file.originalname));
		}
	});
	
	var uploadUser = multer({ storage : storageUser }).any();
	
	var storageDevice = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'uploads/')
		},
		filename: function (req, file, cb) {
			cb(null, 'device_'+req.params.id+'_'+file.fieldname+Date.now()+path.extname(file.originalname));
		}
	});
	
	var uploadDevice = multer({ storage : storageDevice }).any();



// Middleware Upload to Amazon S3

/*	function uploadToS3(request, response, next) {
		
		console.log('\n\n UPLOAD TO S3 \n\n');
		
		if(!request.files.file) {
			console.log('ERROR in uploadToS3 - no File');
	        response.status(501).send();
		}
		 		
	    var file 	= request.files.file;
	    
	    var namePrefix = request.device ? 'preso/device_' : 'profiles/user_';

	    file.originalFilename = namePrefix+request.params.id+'_'+Date.now()+file.originalFilename;
	    
	    var inData 	= {
		    imgKey 	: file.originalFilename,
		    imgType : request.files.file.type
		};
	    
	    // console.log('\n\n inData \n\n');
	    // console.log(inData);

	    // console.log('\n\n file \n\n');
	    // console.log(file);
		
	    s3util.postImg({ 
		    data : inData, 
		    file : file 
		}).then(function(data) {
			request.s3data = data;
			next();
	    }, function(error) {
		    console.error('ERROR in Middleware uploadToS3 - s3util.postImg: '+error);
		    response.status(501).send();
	    });
	
	};
*/
/* MODEL Controllers */


/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
/*var ensureAuthenticated = function(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'notauthorized' });
  }
  var token = req.header('Authorization');

  var payload = null;
  try {
    payload = jwt.decode(token, authConfig.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'tokenexpired' });
  }

  User.findById(payload.sub)
          .populate('language role country')
          .populate({path: 'country', populate: {path: 'languages'}})
          .exec(function(err, user) {
              if (!user) {
                return res.status(501).send();
              }
              req.user = user;
              next();
      });
};*/

/*var ensureAuthenticatedAuth0 = function(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'notauthorized' });
  }
  var token = req.header('Authorization');

  var payload = null;
  try {
    payload = jwtDecode.decode(token);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'tokenexpired' });
  }

    // TO CHECK: find by _id OR fkAuth
    var isValidId = mongoose.Types.ObjectId.isValid(payload.sub);

    // 
    var findQuery = {};
    if(isValidId){
        var objId = new mongoose.Types.ObjectId(payload.sub);
        findQuery = {_id: objId};
    }else{
        findQuery = {fkAuth: payload.sub};
    }

    User.findOne(findQuery)
    .populate('language role country')
    .populate({path: 'country', populate: {path: 'languages'}})
    .exec(function(err, user) {
        if (!user) {
            return res.status(501).send();
        }
        req.user = user;
        next();
    });
};*/

/*var ensureAuthorisedGet = function(req, res, next) {

    var isSuperAdmin     = (req.user.role.type    === 'SUPERADMIN');
    var isAdmin          = (req.user.role.type    === 'ADMIN');
    var allowedOperation = (req.user.country.code === req.params.countryCode);
    
    if(isSuperAdmin || (isAdmin && allowedOperation)) {
        next();
    }
    else {
        res.status(401).send({
            message : 'unAuthorized' 
        });
    }

};*/

/*var ensureAuthorisedPost = function(req, res, next) {

    var isSuperAdmin     = (req.user.role.type    === 'SUPERADMIN');
    var isAdmin          = (req.user.role.type    === 'ADMIN');
    var allowedOperation = (req.user.country.code === req.body.country.code);

    if(isSuperAdmin || (isAdmin && allowedOperation)) {
        next();
    }
    else {
        res.status(401).send({
            message : 'unAuthorized' 
        });
    }

};*/

//replace userId of Auth0 with _id in MongoDB
/*var transformAuth0Id = function(req, res, next) {
    console.log('transformAuth0Id');
    var auth0Id ;
    if(req.params.userId){
        auth0Id = req.params.userId;
    }
    if(req.body.userId){
        auth0Id = req.body.userId;
    }

    if(auth0Id){
        User.findOne({fkAuth: auth0Id})
        .exec(function(err, user) {
            if (!user) {
                return res.status(501).send();
            }
          
            if(req.params.userId){
                req.params.userId = user._id;
            }
            if(req.body.userId){
                req.body.userId = user._id;
            }

            next();
        });
    }else{
        next();
    }
    
};*/
/*
// initMobileApp
var initMobileApp = function initMobileApp(mobileApp, express){
    mobileApp.use('/bower_components', express.static(__dirname + '/bower_components'));
    mobileApp.use(express.static(__dirname + '/app'));
    mobileApp.use(express.static(__dirname + '/.tmp'));

	mobileApp.get('/app', function(request, response) {
        response.sendFile(path.resolve(__dirname + '/app/index.html'));
    });

};*/


// Admin APP
/*var initAdmin = function(admin, express){
    console.log('__dirname', __dirname);
};

module.exports.initAdmin = function(app, express){
    console.log('initAdmin');
    initAdmin(app, express);

};*/

/*var initApp = function initApp(app, express){
  app.post('/postregisterhook', USER_controller.postregisterhook);
  
};

module.exports.initApp = initApp;*/


/*************************************/

module.exports.initAPIApp = function(app, express){
    //BASE PATH ARE DEFINED IN ./server/config/basepathvars

    // UPLOADS API
    	app.get(pathVarApp.baseApiPath+'/uploads/:id', function(req, res){
			res.sendFile(path.join(__dirname, "./", "uploads", req.params.id));
		});
    
    // USER API
    
	  

        // GET ../user/email/:email

           app.get(pathVarApp.baseUSER+'/email/:email',
                      
                        USER_controller.findByEmail);


		
	
};
