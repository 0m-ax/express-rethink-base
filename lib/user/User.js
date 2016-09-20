'use strict';
//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
//
//load modules
//
var r = require('rethinkdbdash')(config.rethinkdb);

class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
  }
}
module.exports = User;
