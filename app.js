var express = require('express');
var app = express();


app.get('/', function (req, res) {
  res.send('Hello World!');
});

var port_number = server.listen(process.env.PORT || 3000);

app.listen(port_number, function () {
  console.log('Example app listening on port 3000!');
});