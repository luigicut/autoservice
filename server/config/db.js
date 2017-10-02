// config/db.js
var uristring = process.env.MONGODB_URI || process.env.MONGODB_LOCALHOST;

module.exports = {
  url : uristring
};
