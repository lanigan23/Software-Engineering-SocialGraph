var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();
var github = require('octonode');
var client = github.client();

app.use(express.static(__dirname + '/Json'));
app.use(express.static(__dirname + '/public'));


var options = {
  url : 'https://api.github.com/orgs/google/members',
  headers : {
    'User-Agent' : 'request'
  }
};

var data;
function callback(error, response, body){
  if(!error && response.statusCode == 200){
    data = JSON.parse(body);
    //console.log(data);
    formatData(data);
  }
  else throw error;
}
request(options, callback);

var info2 = fs.readFileSync('Json/test.json','utf8');
info2 = JSON.parse(info2);
app.listen(3000);
console.log('listening');

function formatData(data){
  var gData;
  gData = {};
  var keys = Object.keys(data);
  gData['name'] = "Google";
  gData['children'] = [];
  for(var i=0;i<keys.length;i++){
    gData.children.push({"name":data[keys[i]].login, "children":[{
      "name":data[keys[i]].login},
      {"name":data[keys[i]].id},
      {"name":data[keys[i]].avatar_url},
      {"name":data[keys[i]].url},
      {"name":data[keys[i]].followers_url},
      {"name":data[keys[i]].following_url},
      {"name":data[keys[i]].gists_url},
      {"name":data[keys[i]].starred_url},
      {"name":data[keys[i]].subscriptions_url},
      {"name":data[keys[i]].organizations_url},
      {"name":data[keys[i]].repos_url},
      {"name":data[keys[i]].events_url},
      {"name":data[keys[i]].received_events_url},
      {"name":data[keys[i]].type},
      {"name":data[keys[i]].site_admin}]});
  }
  //console.log(JSON.stringify(gData));
  fs.writeFileSync('Json/flare.json', JSON.stringify(gData));
  app.get('/members', function(req, res){
    res.sendFile(__dirname + '/members.html');
  });
  app.get('/mems', function(req, res){
    res.sendFile(__dirname + '/index.html');
  })
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/home.html');
});
app.get('/submit', function(req, res){
  var user = req.query.users;
  client.get('/users/'+user,{}, function(err, status, body, headers){
    res.send(body);
  });
});
//formatData(info2);
