



var getMa = function(){

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var jsonleboncoin = require('./leboncoininfos');
var jsonmeilleursagents =  require('./meilleursagentsshema');
var lbcinfos = require('./leboncoininfos');



//file loading
  var body = fs.readFileSync('./rosny.html', 'utf8');
  var $ = cheerio.load(body);
  var prices = $('.small-4.medium-2.columns.prices-summary__cell--median');

   // we get the value
  var avgflat = prices[0].children[0].data;
  var avghouse = prices[1].children[0].data;
  var avgrental = prices[2].children[0].data;
  // we want only numbers
avgflat = avgflat.match(/[0-9,]/g).join("").replace(",", ".");
    avghouse = avghouse.match(/[0-9,]/g).join("").replace(",", ".");
avgrental = avgrental.match(/[0-9,]/g).join("").replace(",", ".");
//values insertion
jsonmeilleursagents.properties.avgpriceflat  = avgflat;
jsonmeilleursagents.properties.avgpricehouse  = avghouse;
jsonmeilleursagents.properties.avgpricerental = avgrental;
//comparaison

    var pricelbc = jsonleboncoin.properties.price
    pricelbc = pricelbc.toString().replace(' ','');
    var arealbc = parseInt(jsonleboncoin.properties.Area);
    pricelbc = parseInt(pricelbc);

var pricemeterlbc = pricelbc/arealbc;
var type = jsonleboncoin.properties.type;
var pricemeterMa;
switch(type)
{
case "Appartement":
pricemeterMa = jsonmeilleursagents.properties.avgpriceflat;
break;
case "Maison":
pricemeterMa = jsonmeilleursagents.properties.avgpricehouse;
break;
//location pas fait -> soulève un pb : les locations sont quand meme des appartements ou maison dans type
}
//console.log("price/m2 LeBonCoin : " + pricemeterlbc );
   // console.log("price/m2 MeilleursAgents : " + pricemeterMa );
    if(pricemeterlbc <= pricemeterMa){
//console.log("GOOD DEAL ;)");
 jsonleboncoin.properties.deal = true;              
//console.log(jsonleboncoin.properties.deal);								 
									 }
     if(pricemeterlbc > pricemeterMa){
 //console.log("Bad deal :(");
  jsonleboncoin.properties.deal = false;
                                     }
									 
fs.writeFile('meilleursagentsinfos.json', JSON.stringify(jsonmeilleursagents, null, 4), function(err)
{

});

fs.writeFile('leboncoininfos.json', JSON.stringify(jsonleboncoin, null, 4), function(err)
{

});

return  jsonleboncoin.properties.deal;

}

exports.getMa = getMa;

