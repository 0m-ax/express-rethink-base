//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
//
//load modules
//
var r = require('rethinkdbdash')(config.rethinkdb);
var User = require('./User');
var bcrypt = require('bcrypt-as-promised');




module.exports.get = function (userID){
  return r.table('users').get(userID).run()
    .then((user)=>new User(user))
};
module.exports.auth = function (email,password){
  return r.table('users').getAll(email, {index: "email"}).run()
  .then((user)=>user[0])
  .then((user)=>bcrypt.compare(password,user.hash).then(()=>user))
  .then((user)=>new User(user))
}
module.exports.create = function (email,password){
  return r.table('users').getAll(email, {index: "email"}).run()
  .then((users)=>{
    if(users.length != 0){
      throw 'email in use';
    }
    return
  })
  .then(
    bcrypt.hash(password, 10)
    .then((hash)=>
      r.table('users').insert({
        email:email,
        hash:hash
      }).run()
    )
  )
}
