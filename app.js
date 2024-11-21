const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('./api/services/passport');

app.use(express.static(__dirname + '/views'));
app.use(express.static('node_modules'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'kaojsbdjasdjl2iasj',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 },
  // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));


app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const routesRestful = require('./routes/routes-restful');
const routesViews = require('./routes/routes-view');

app.use('/api', routesRestful);
app.use('/', routesViews);


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

require("./api/services/DefaultServices").admin();

module.exports = app;