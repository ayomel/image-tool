const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(3000, function() {
  console.log("Listening to port 3000");
})
