var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var jsonleboncoin = require('./leboncoininfos');
var jsonmeilleursagents =  require('./meilleursagentsshema');
var lbcinfos = require('./leboncoininfos');
var ma = require('./modulemeilleursagents');
var lbc = require('./moduleboncoin');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/myserver', function(req, res){

//res.render('./views/mainpage');

res.sendFile( __dirname  + '/views/mainpage.html');




}) ;

app.post('/myserver', function(req, res) {
  var url = req.body.url; 
  lbc.getlbc(url);
 
  var deal = ma.getMa();
 console.log(deal);
 if(deal  == true){
 //res.send('good deal');
 res.sendFile( __dirname  + '/views/goodchoice.html');
 }
 
 if(deal  == false){
 //res.send('bad deal');
 res.sendFile( __dirname  + '/views/badchoice.html');
 }
 
});






app.listen('8080')
console.log('the server is coming');

