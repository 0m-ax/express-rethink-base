const express = require('express');
var app = express.Router();
app.get('/login',(req,res)=>{
  res.render('login');
})
module.exports= app;
