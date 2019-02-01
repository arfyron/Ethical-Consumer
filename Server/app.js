const express = require('express');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');

const routes = require('./routes/routes.js')

const app = express()

app.use(morgan('dev'))
app.use(express.json());
app.use(compression())

app.use(express.static(path.join(__dirname, "/../public")));

app.use('/', routes);

module.exports = app;