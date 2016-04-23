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

	//create the object to be returned on successful lookup
	var responseObj ={
		"text": "Domain Lookup complete",
		"attachments":[]
	}

	//store colours in variables for use later
	var green = "#36a64f";
	var red = "#F44336";

	//Use unirest to make the get request to our api
	//Note: we'll concatenate the query to the url (that's our domain name)
	unirest.get("https://domainsearch.p.mashape.com/index.php?name="+req.body.text)
		.header("X-Mashape-Key", "l23VwmZ13TmshvRxySx2Bha4vG7vp1kC8mmjsnIgNGHmgpWcYn")
		.header("Accept", "application/json")
		.end(function (result) {

			console.log(result.body);

			//loop over the result object
			for (var key in result.body) {
			  if (result.body.hasOwnProperty(key)) {

			  	//create the attachment object
			  	var attachment = {};

			  	//store the domain availability in variable for use later
			  	var availability = result[key];

			  	//set fallback and title to same value, with happy or sad face based on availability
			  	attachment.fallback = attachment.title = key+" is "+ availability + ((availability === "Available") ? " :)":" :(");

			  	//set color to red or green based on availability
			  	attachment.color = (availability === "Available") ? green:red;

			  	console.log('attachment is', attachment);

			  	//push attachment to attachments array in responsObject
			  	responseObj.attachments.push(attachment);
			  }
			}

		//send the response object
	  res.send(responseObj);

	});
});