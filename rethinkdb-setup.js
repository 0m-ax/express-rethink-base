var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
var r = require('rethinkdbdash')(config.rethinkdb);
r.tableCreate('users')
  .then(r.table('users').indexCreate('email');
