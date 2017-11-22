var express = require('express');
var router = express.Router();
let User = require('./../model/UserModel.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//用户登录
router.post("/login",function (req,res,next) {
  //获取用户名与密码
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({userName:username,userPwd:password},function (err,userDoc) {
    if(err){
      res.json({
        status:0,
        msg:err.message
      })
    }else {
      if(userDoc){
        //返回cookie
        res.cookie('userId',userDoc.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie('userName',userDoc.userName,{
          path:'/',
          maxAge:1000*60*60
        });
        res.json({
          status:1,
          msg:"登录成功",
          data: userDoc
        })
      }else{
        res.json({
          status:0,
          msg:'用户名或密码有误',
          data:''
        })
      }
    }
  });
});

//用户登出
router.post('/logout',function (req,res,next) {
  res.cookie('userId','',{
    path:'/',
    maxAge:-1
  });
  res.cookie('userName','',{
    path:'/',
    maxAge:-1
  });
  res.json({
    status:1,
    msg:"登出成功",
    data: ''
  })
});

//校验用户是否登陆
router.post('/checkLogin',function (req,res,next) {
  if(req.cookies.userId){//已经登陆
    res.json({
      status:1,
      msg:'已登录',
      data:req.cookies.userName
    })
  }else{//未登录
    res.json({
      status:0,
      msg:'未登录',
      data:''
    })
  }
});

module.exports = router;
