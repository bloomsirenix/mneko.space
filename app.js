/*
* Copyright © manikineko.nl and mneko.space Dev Team all rights reserved
* Usage and/or Modification are Prohibited, Without permission of the site domain owner!
*/

//Express Stuff
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

//NASA API STUFF
var nasa_marsRouter = require('./routes/api/nasa/mars');
var nasa_neoRouter = require('./routes/api/nasa/neo');
var nasa_apodRouter = require('./routes/api/nasa/apod');
var nasa_mediaRouter = require('./routes/api/nasa/media');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//NASA Part of API
app.use('/nasa/mars', nasa_marsRouter);
app.use('/nasa/neo', nasa_neoRouter);
app.use('/nasa/apod', nasa_apodRouter);
app.use('/nasa/media', nasa_mediaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
