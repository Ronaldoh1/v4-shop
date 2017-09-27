'use strict';
const fs = require('fs');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('express-cors');
const jwt = require('express-jwt');
const elasticsearch = require('elasticsearch');

const app = express();
const esClientHost = `${process.env.ELASTICSEARCH_AUTH || 'elastic:changeme'}@${process.env.ELASTICSEARCH_URL || 'localhost:9200'}`;
const esclient = new elasticsearch.Client({
  host: esClientHost,
  log: 'trace'
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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
  if (file !== '.gitkeep') {
    app.use('/v4', require('./routes/' + file));
  }
});

app.get('/', (req, res) => {
  esclient.cat.health({
    format: 'json',
  })
    .then((results) => {
      res.json({
        success: true,
        elastic_status: results[0].status,
      });
    });
});

module.exports = app;
