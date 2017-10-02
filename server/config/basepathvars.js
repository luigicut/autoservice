// config/basepathvars.js
var baseApiPath = '/api/app';
var baseUSER = baseApiPath+'/user';
var baseINVITATIONS = baseUSER+'/invitations';
var baseACLUSER = baseUSER+'/acl';
var baseDEVICE = baseApiPath+'/device';
var baseDEVICESETTINGS = baseApiPath+'/settings';

module.exports = {
  baseApiPath : baseApiPath,
  baseUSER : baseUSER,
  baseINVITATIONS: baseINVITATIONS,
  baseACLUSER: baseACLUSER,
  baseDEVICE: baseDEVICE,
  baseDEVICESETTINGS: baseDEVICESETTINGS
};
