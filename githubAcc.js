var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/Json'));

// var graph = JSON.parse(fs.readFileSync('Json/flare.json').toString());
// graph.name = "lol";
// fs.writeFileSync('Json/flare.json', JSON.stringify(graph));
var options = {
  url : 'https://api.github.com/orgs/Google',
  headers : {
    'User-Agent' : 'request'
  }
};

var stuff;
function callback(error, response, body){
  if(!error && response.statusCode == 200){
    stuff = JSON.parse(body);
    //console.log(stuff);
    formatData(stuff);
  }
}
request(options, callback);

var info = {"login":"google","id":1342004,"url":"https://api.github.com/orgs/google","repos_url":"https://api.github.com/orgs/google/repos",
  "events_url":"https://api.github.com/orgs/google/events",
  "hooks_url":"https://api.github.com/orgs/google/hooks",
  "issues_url":"https://api.github.com/orgs/google/issues",
  "members_url":"https://api.github.com/orgs/google/members{/member}",
  "public_members_url":"https://api.github.com/orgs/google/public_members{/member}",
  "avatar_url":"https://avatars1.githubusercontent.com/u/1342004?v=4",
  "description":"","name":"Google","company":null,
  "blog":"https://opensource.google.com/","location":null,
  "email":"","has_organization_projects":true,"has_repository_projects":true,
  "public_repos":1143,"public_gists":0,"followers":0,"following":0,
  "html_url":"https://github.com/google","created_at":"2012-01-18T01:30:18Z","updated_at":"2017-08-08T16:13:10Z"
  ,"type":"Organization"};
//console.log(info["login"]);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
console.log('listening');

function formatData(data){
  var gData;
  gData = {};
  gData['name'] = data.login;
  gData['children'] = [];
  for(x in data){
    var item = data[x];
    gData.children.push(item);
  }
  console.log(JSON.stringify(gData));
}
//formatData(stuff);
//formatData(info);
