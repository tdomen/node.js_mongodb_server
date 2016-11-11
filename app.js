var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// ---- Renamed and Created by tdomen on 2016/10/25 -----
var login = require('./routes/auth/login');
var zukan = require('./routes/zukan/zukan');
var http = require('http');
var mongoose = require('mongoose');
// ------------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// ---- Created by tdomen on 2016/10/25 -----
// ポート設定
app.set('port', process.env.PORT || 3000);
// ------------------------------------------

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ルーティング機能
app.use('/login', login);
app.use('/zukan', zukan);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
	message: err.message,
	error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
	message: err.message,
	error: {}
    });
});


// ---- Created by tdomen on 2016/10/25 -----

// サーバ立ち上げ
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    mongoose.connect('mongodb://localhost/backend');
});
// ------------------------------------------

module.exports = app;
