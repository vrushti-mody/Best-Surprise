require('custom-env').env()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
var session = require('express-session');
var indexRouter = require('./routes/index');
const cors = require('cors')
var MongoStore = require('connect-mongo').default;
var app = express();
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(db => {
  console.log("Database connected");
});

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
