var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql')
const qs = require('querystring')

var indexRouter = require('./routes/index');
var coursesRouter = require('./routes/courses');

var app = express();

//  Connection with DB
let Connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  database:'prog4teach',
  charset:'utf8mb4'
})
// forms
app.post('/',(req,res)=>{
  let body = ''
  req.on('data',(data)=>{
    body += data
  })
  req.on('end',(data)=>{
    let result = qs.parse(body) ,
      name = result.name ,
      email = result.email
      message = result.message
    Connection.query(`INSERT INTO form(name, email, message) VALUES('${name}','${email}','${message}');`,function(err,queryResult,fields) {
      if (err) {
        res.status(400).send("Unable to send");
      } else {
        res.redirect('/');
      }
    })
  })
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/courses', coursesRouter);

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
