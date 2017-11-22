var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

//加载数据库
require('./connect.js');

var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
var carts = require('./routes/carts');
var address = require('./routes/address');
var order = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


//用户登录拦截器
app.use(function (req,res,next) {
  console.log(req.cookies);
  if(req.cookies.userId){//用户登录，放行
    next();
  }else{//放行特定的url地址：用户登录验证，获取商品列表信息
    console.log("req.path:"+req.path);
    if(req.originalUrl == '/users/login'||req.path == "/goods"){
      next();//放行
    }else{
      res.json({
        status:303,
        msg:'用户未登录',
        data:''
      })
    }
  }
});

app.use('/', index);
app.use('/users', users);
app.use('/goods',goods);
app.use('/cart',carts);
app.use('/address',address);
app.use('/order',order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
