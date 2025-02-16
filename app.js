var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mysql = require("mysql")
let session = require("express-session");
let requesIP = require("request-ip");
const http = require("http")
const qs = require("querystring");
const notifier = require("node-notifier")

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
// FUNCTIONS
  // get current users list 
  var currentUsers = [] 
  function GetOnlineUsers(){
    currentUsers = []
    connection.query('select * from currentUsers',function(error,results,fields) {
    currentUsers = results.map(row => row.username)
  })
  }
GetOnlineUsers()
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
    username = result.username
    if(currentUsers.includes(username)){
      notifier.notify({
        title : "Added unsuccessfully",
        message:"This username is currently in use, try again."
      })
      res.redirect('/')
    }
    else{
      connection.query(`insert into currentUsers() value("${username}")`)
      connection.query(`insert into AllVisitorsNames() value("${username}","${clientIP}")`)
      notifier.notify({
        title : "Added successfully",
        message:"We are searching now for someone to chat with"
      })
      req.session.tempname = username
      // the operation of finding a user to chat with
      GetOnlineUsers()
      let partner = ''
      setTimeout(()=>{
        currentUsers.splice(currentUsers.indexOf(username))
        let random = Math.floor(Math.random()*currentUsers.length)
        partner = currentUsers[random]
        res.redirect(`/${partner}`)
      },1000)
    }
  })
})
app.post('/new',(req,res)=>{
  GetOnlineUsers()
  let partner = ''
  setTimeout(()=>{
    currentUsers.splice(currentUsers.indexOf(req.session.tempname))
    currentUsers.splice(currentUsers.indexOf(req.params.chatwith))
    let random = Math.floor(Math.random()*currentUsers.length)
    partner = currentUsers[random]
    res.redirect(`/${partner}`)
  },1000)
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
