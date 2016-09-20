const express = require('express');
var app = express.Router();
app.get('/',(req,res)=>{
  res.render('account/index',{user:req.user});
})
app.get('/logout',(req,res)=>{
  req.logout()
  res.redirect('/')
})
module.exports= app;
