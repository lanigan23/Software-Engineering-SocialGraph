var http  = require('http');
var express = require('express');
var github = require('octonode');

var app = express();
var client = github.client('9380b8eadbd961feeaec63fe7fca78797624c644');
app.use(express.static(__dirname + '/Json'));
app.get('/', function(req, res){
  client.get('/user', {}, function (err, status, body, headers){
     //res.send(body);
    res.sendFile(__dirname + '/index.html');
  });
});

app.listen(3000);
console.log('listening');
