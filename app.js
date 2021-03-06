const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./app/routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.set('json spaces', 4);


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);


app.use(function (req, res, next) {
    next();
});


// catch 404 if special character and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Sorry, Page Not Found');
    err.status = 404;
    next(err);
});


let server = app.listen((process.env.PORT || '8080'), function () {
    let host = server.address().address;
    let port = process.env.PORT || '8080';


    console.log('Small API test app listening  at http://%s:%s', host, port);
});

// error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        status:err.status,
        error: {}
    });
});


module.exports = app;
