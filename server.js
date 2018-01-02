var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/build/views'));
app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.listen(8080);

console.log("Running at Port 8080");