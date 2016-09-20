//
// load config
//
var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
//
// load modules
//
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var user = require(appRoot+'/lib/user');
//
// passport setup
//
passport.use(new Strategy(
function(username, password, cb) {
  user.auth(username,password).then((User)=>{
    cb(null,User)
  }).catch((error)=>{
    cb(null, false);
  })
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  user.get(id).then((User)=>{
    cb(null, User);
  }).catch((err)=>{
    cb(err);
  })
});
//
// initialise express
//
var app = express();
app.set('views', appRoot + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/default');
app.use(require('express-ejs-layouts'));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore(config.session.redis)
}));
//
// start passport
//
app.use(passport.initialize());
app.use(passport.session());
app.use('/',require(appRoot+'/app/'))
//
//Debug stuff
//
if ( app.get('env') === 'development' ) {
  console.info("entering dev mode")
  app.use('/debug',require('./debug.js'))
}
//
//auth managment roots
//
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});
//
// start the app
//
app.listen(config.port);
