// CORS middleware, wrapped on our own middleware in case we
// want to change it in the future
var cors = require('cors');
module.exports = cors();