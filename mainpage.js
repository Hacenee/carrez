var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
app.use(bodyParser.urlencoded({ extended: true }));
var jsonleboncoin = require('./leboncoininfos');
var jsonmeilleursagents =  require('./meilleursagentsshema');
var lbcinfos = require('./leboncoininfos');
var ma = require('./modulemeilleursagents');
var lbc = require('./moduleboncoin');
app.use(express.static(__dirname + '/views/mainpage.css'));


app.get('/myserver', function(req, res){

res.render('index.ejs');

//res.sendFile( __dirname  + '/mainpage.html');




}) ;

app.post('/myserver', function(req, res) {
  var url = req.body.url; 
  lbc.getlbc(url);
 
  var deal = ma.getMa();
 console.log(deal);
 if(deal  == true){
 res.send('good deal');
 }
 
 if(deal  == false){
 res.send('bad deal');
 }
 
});






app.listen('8080')
console.log('the server is coming');

