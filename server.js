const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/views'));
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    const renderer = require('vue-server-renderer').createRenderer()

    res.sendFile('index.html');
});

app.listen(8080);

console.log("Running at Port 8080");