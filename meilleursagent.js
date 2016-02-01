var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var json = require('./meilleursagentsshema');



app.get('/scrape', function(req, res){

url = 'https://www.meilleursagents.com/prix-immobilier/paris-75000/#estimates';


request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var price, town, zipcode , surface , nbpieces , type ;
	
    price =  $("[class='t-right']").text();
	json.properties.Town = price;
	/*town =   $("[itemprop='addressLocality']").text();
	zipcode = $("[itemprop='postalCode']").text();
	var datas = $("[class = 'lbcParams criterias']>table > tr > td");
	
   type = datas[0].children[0].data;
   nbpieces = datas[1].children[0].data;
   surface = datas[2].children[0].data;
  
   json.properties.price = price;
   json.properties.Town = town;
   json.properties.Area = surface;
   json.properties.zipcode = zipcode;
   json.properties.nbroom = nbpieces;
   json.properties.type = type;
*/
   console.log("value   : " + price);
}


fs.writeFile('output2.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

});

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your consolee!');

} )}) ;



app.listen('8080')
console.log('Magic happens on port 8080');
//exports = module.exports = app;