var express = require('express');
var app = express();
var unirest = require('unirest');


app.get('/', function (req, res) {
  res.send('This is a domain checker application built with node.js, Express.js and is running on Heroku. Send a POST request with the domain in question to receive information');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});


app.post('/', function (req, res) {
	console.log('req is',req);
	//Use unirest to make the get request to our api
	//Note: we'll concatenate the req to the url (that's our domain name)
	// unirest.get("https://domainsearch.p.mashape.com/index.php?name="+req)
	// .header("X-Mashape-Key", "l23VwmZ13TmshvRxySx2Bha4vG7vp1kC8mmjsnIgNGHmgpWcYn")
	// .header("Accept", "application/json")
	// .end(function (result) {
	//   console.log(result.status, result.headers, result.body);

	// });
  res.send('POST request to homepage');
});