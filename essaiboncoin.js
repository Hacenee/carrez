


var getlbc = function(url){
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var json = require('./leboncoinshema');



//url = 'http://www.leboncoin.fr/ventes_immobilieres/915700197.htm?ca=12_s';



//url = 'http://www.leboncoin.fr/ventes_immobilieres/888865422.htm?ca=12_s';
request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var price, town, zipcode , surface , nbpieces , type ;
	
    price =  $("[itemprop='price']").text();
	town =   $("[itemprop='addressLocality']").text();
	zipcode = $("[itemprop='postalCode']").text();
	var datas = $("[class = 'lbcParams criterias']>table > tr > td");
	
	if((datas[0].children[0].data == "Maison")||(datas[0].children[0].data == "Appartement")){
   type = datas[0].children[0].data;
   nbpieces = datas[1].children[0].data;
   surface = datas[2].children[0].data;
     }
	 
	 else{
	 
	  type = datas[1].children[0].data;
   nbpieces = datas[2].children[0].data;
   surface = datas[3].children[0].data;
	 
	 
	 }
  
  
   json.properties.price = price;
   json.properties.Town = town;
   json.properties.Area = surface;
   json.properties.zipcode = zipcode;
   json.properties.nbroom = nbpieces;
   json.properties.type = type;

   
}


fs.writeFile('leboncoininfoss.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

});
});

}



url = 'http://www.leboncoin.fr/ventes_immobilieres/920350882.htm?ca=12_s';
getlbc(url);


