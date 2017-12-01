const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nunjucks = require('nunjucks');
const config = require('config');
const se = require('./js/utilities.js');
const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    var data = {};
    se.getToken(function(token) {
        data.token = token.access_token;
        res.render('index.html', data);
    })
});

app.listen(8080, function() {
  console.log("Listening to port 8080");
  //se.getToken(function(token) { console.log(token.access_token)});
})
