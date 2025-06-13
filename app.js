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
const upload = require("express-fileupload")

// routes
const indexRouter = require('./routes/index');
const friendsRouter = require("./routes/friends");
const { json } = require('stream/consumers');

var app = express();
// create connection
let connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'ChatAno'
})
// FUNCTIONS
function errorMSG(msg){
  return `<div style="box-shadow: 0px 1px 2px 0px grey; padding: 10px;border-left: 5px solid red;font-family: cursive;">
            ${msg}
          </div>`
}  

// milldware
app.use(session({
  secret:"cm91dGVz"
}))

app.use(cookieParser())

app.use(upload())



// forms' post
app.post('/friends',(req,res)=>{
  // submited image
  // uploaded image=
  let file = req.files.avatar
  let filename = file.name
  file.mv("./public/images/"+filename)
  // submited information
  let body = req.body
  let user = {
    username:body.username,
    avatar:filename,
    gender:body.gender,
    country:body.country,
    link:body['contact-link'],
    langs:body.langs,
    topics:body.topics
  }
  connection.query(`select * from visitors where usernmae = '${user.username}'`,(err,result,fields)=>{
    connection.query(
      `INSERT INTO visitors() VALUES (?,?,?,?,?,?,?)`,
      [
        user.username,
        user.avatar,
        user.gender,
        user.country,
        user.link,
        JSON.stringify(user.langs),
        JSON.stringify(user.topics)
      ],
      (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              res.send(errorMSG("This usernmae is teken"))
            } else {
              res.send(errorMSG("Database Error"))
            }
        } else {
          console.log("User added successfully");
          res.cookie('user',JSON.stringify(user),{httpOnly: true, maxAge: 86400*1000*365});
        }
      }
    )
  })
})
app.post('/',(req,res)=>{
  let currCookies = req.cookies
  console.log(currCookies)
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/', indexRouter);
app.use('/friends',friendsRouter);

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
