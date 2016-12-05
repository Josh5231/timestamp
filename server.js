var express = require("express");
var app = express();
var port = 8080;

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.listen(8080, function () {
  console.log('Example app listening on port '+port+"!");
})