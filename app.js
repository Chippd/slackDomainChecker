var express = require('express');
var app = express();
var unirest = require('unirest');
var bodyParser = require('body-parser');


app.get('/', function (req, res) {
  res.send('This is a domain checker application built with node.js, Express.js and is running on Heroku. Send a POST request with the domain in question to receive information');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Domain checker app for Slack bot has started');
});

app.use(bodyParser());

app.post('/', function (req, res) {
	// console.log('req is',req.body.text);
	//Use unirest to make the get request to our api
	//Note: we'll concatenate the query to the url (that's our domain name)
	unirest.get("https://domainsearch.p.mashape.com/index.php?name="+req.body.text)
	.header("X-Mashape-Key", "l23VwmZ13TmshvRxySx2Bha4vG7vp1kC8mmjsnIgNGHmgpWcYn")
	.header("Accept", "application/json")
	.end(function (result) {
	  //console.log(result.status, result.headers, result.body);

	  //Stringify the result.body JSON and return it to the user
	  var responseText = JSON.stringify(result.body);

	  res.send(responseText);

	});
  //res.send('Received POST request, check your logs');
});