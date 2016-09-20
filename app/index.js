const express = require('express');
var app = express.Router();
app.get('/',(req,res)=>{
  res.render('index',{text:'World'});
})
module.exports= app;
