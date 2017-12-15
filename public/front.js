//function for getting user info and formatting to display
function getUser() {
  var formatStr ="empty";
  var user = document.getElementById("user").value;
  console.log(user);
  fetch('/submit?users='+user)
    .then(function(res){
      return res.json();
    })
    .then(function(json){
      var body = json;
      formatStr = '<br> Login: ' + body.login
      +'<br> ID: ' + body.id
      +'<br> URL: ' + body.url
      +'<br> Type: ' + body.type
      +'<br> Name: ' + body.name
      +'<br> Public Repos: ' + body.public_repos
      +'<br> Company: ' + body.company
      +'<br> Location: ' + body.location
      +'<br> Gists: ' + body.public_gists
      +'<br> Followers: ' + body.followers;
      var data = document.getElementById('user-d');
      data.innerHTML = formatStr;
      data.style.display = 'block';
    });
}
