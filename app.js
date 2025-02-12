var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mysql = require("mysql")
let session = require("express-session");
let requesIP = require("request-ip");
const http = require("http")
const qs = require("querystring")

var indexRouter = require('./routes/index');
const { hostname } = require('os');

var app = express();
// create connection
let connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'ChatAno'
})
// get current users list 
let cu = []
connection.query("select * from currentUsers",function(err,result){
  for(let i=0;i<Object.keys(result).length;i++){
    cu.push(result[i].username)
  }
})
// session
app.use(session({
  secret:"cm91dGVz"
}))

app.post('/',(req,res)=>{
  let body = '' , clientIP = requesIP.getClientIp(req) , result
  req.on("data",(data)=>{
    body += data
  })
  req.on('end',()=>{
    result = qs.parse(body)
    if(cu.includes(result.username)){
      console.log("This username is currently in use, try again")
    }
    else{
      connection.query(`insert into currentUsers() value("${result.username}")`,function(err,result){
        console.log("Added successfully ... We are searching now for someone to chat with")
      })
      connection.query(`insert into AllVisitorsNames() value("${result.username}","${clientIP}")`,function(err,result){
        console.log("Added successfully ... We are searching now for someone to chat with")
      })
    }
    res.redirect('/')
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
