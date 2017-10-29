'use strict';

const fs = require('fs');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('express-cors');
var exphbs  = require('express-handlebars');
//const jwt = require('express-jwt');
//const JSONApi = require('jsonapi-serializer');
//const JSONAPIError = JSONApi.Error;

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist')); // redirect Popper
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(cors({
  allowedOrigins: ['*'],
  headers: ['Authorization', 'X-Requested-With', 'Content-Type'],
}));

// --------------------------------------------------
//  NOTE: this is where we would add the dba-auth
//    middleware to check the Authorization header
// --------------------------------------------------

// app.use(jwt({
//   secret: request.header ??,
//   credentialsRequired: false
// }));

fs.readdirSync('./routes').forEach((file) => {
  console.log(file);
  if (file !== '.gitkeep') {
    app.use('/v4', require('./routes/' + file));
  }
});

app.get('/', (req, res) => {
  res.json({
    success: true,
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const notFoundError = new Error('HTTP 404 Not Found');
  notFoundError.status = 404;
  notFoundError.detail = `Url not found: ${req.url}`;
  next(notFoundError);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  const errorStructure = {
    status: err.status || 500,
    title: err.message,
    detail: err.detail || err.message,
  };
  if ({}.hasOwnProperty.call(err, 'source') === true) {
    errorStructure.source = err.source;
  }
  //const error = new JSONAPIError(errorStructure);
  res.json(errorStructure);
});

module.exports = app;

