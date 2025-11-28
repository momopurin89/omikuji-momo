const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// View engine setup (EJSの利用を定義 [cite: 38, 49])
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ミドルウェア設定
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // style.css, images, javascriptsの公開 [cite: 53]

// ルーティング設定
app.use('/', indexRouter);

// catch 404 and forward to error handler (404 Not Found [cite: 131])
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler (500 Internal Server Error [cite: 134])
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // 開発環境のみスタックトレースを表示 [cite: 134]
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); // error.ejs を表示 [cite: 132]
});

module.exports = app;