const appRoot = require('app-root-path');
const users = require(appRoot+'/lib/user');
const express = require('express');
var app = express.Router();
app.get('/login',(req,res)=>{
  res.render('login');
})
app.get('/signup',(req,res)=>{
  res.render('signup');
})
app.post('/signup',(req,res)=>{
  users.create(req.body.username,req.body.password)
  .then(()=>res.redirect('/login'))
  .catch(()=>res.redirect('/signup?error=true'))
})
module.exports= app;
