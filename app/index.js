const express = require('express');
var app = express.Router();
app.get('/',(req,res)=>{
  res.render('index',{text:'World'});
})
app.use('/',require('./auth.js'))
app.use('/account',
  require('connect-ensure-login').ensureLoggedIn(),
  require('./account/')
)
module.exports= app;
