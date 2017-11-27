var http  = require('http');
var github = require('octonode');
var client = github.client('9380b8eadbd961feeaec63fe7fca78797624c644');
var server = http.createServer(function(req, res){
  console.log('request was made: ' + req.url);
  client.get('/user', {}, function (err, status, body, headers) {
    //console.log(body); //json object
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(body));
  });
});
server.listen(3000, 'localhost');
console.log('listening');
