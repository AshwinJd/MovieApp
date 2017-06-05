var express = require('express');
var routes = require('./routes/index')
//var path = require('path');
var json = require('./data.json');
var app = express();

//console.log(data.length);
//console.log(json);
//
// app.set('views', path.join(__dirname,'views'));
// app.set('view engine' , 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(8080,function(){
  console.log("Server Listening at 8080");
});

// app.use('/',routes);

app.get('/all',sendAll);

function sendAll(request,response){
   var data = JSON.stringify(json,null,4);
  response.send(data);
}
