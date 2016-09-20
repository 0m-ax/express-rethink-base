const express = require('express');
var appRoot = require('app-root-path');
var user = require(appRoot+'/lib/user');
var app = express.Router();
app.get('/getUser',(req,res)=>{
  res.send(req.user);
})
app.get('/create',(req,res)=>{
  user.create('maxc@maxc.in','test')
  .then((done)=>{
    console.log(done)
    res.send("done")
  }).catch(()=>{
    res.send("error")
  })
})
module.exports= app;
