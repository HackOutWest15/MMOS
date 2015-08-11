//The main application framework
var express = require('express');
//The application
var app = express();
var favicon = require('serve-favicon');
var http = require('http');


//Set view engine to ejs instead of html
app.set('view engine', 'ejs');

//Static directory for css, js and images
app.use('/public', express.static(__dirname + '/public'));

//app.use(favicon(__dirname + '/public/images/favicon.ico'));

//Initialize routes
require('./app/routes.js')(app);

//Start application
http.createServer(app).listen(80);
console.log('Server is listening to port 80...');

