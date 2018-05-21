const express=require('express');
const moment=require('moment');
const modelrouter=express.Router();

modelrouter.use(function timelog(req,res,next){
    requestproxy(req);
    next();
});

modelrouter.get('/',function(req,res){
    requestproxy('modelrouter', req.path);
    res.send('model router hit');
});
var requestproxy=function(name,req){
    console.log("hit: " + name + req+ " -: "+moment().format('MMMM Do YYYY, h:mm:ss'))
}

module.exports=modelrouter