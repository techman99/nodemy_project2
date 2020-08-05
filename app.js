require('dotenv').config()
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const adminRouter = require("./router/adminRouter");
const managerRouter = require("./router/managerRouter");
const userRouter = require("./router/userRouter");
var session = require('express-session');
var userService =require("./service/user")
app.use(express.static(path.join(__dirname, "./view/Login_v16")))
// view engine setup

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 * 24 }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
  res.send("3000")
})
app.get("/login", function (req, res) {
  res.render("login")
})
app.get("/sign-up", function (req, res) {
  res.render("signup")
})
app.get("/listbook", function (req, res) {
  res.sendFile(path.join(__dirname, "./view/listbook.html"))
})
app.get("/home",async function (req, res) {
  userService.getAllBook().then(function (data) {
    res.render('home', {title: data})
})


})
app.use("/admin", adminRouter)
app.use("/manager", managerRouter)
app.use("/user", userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
