let express = require('express');
let router = express.Router();
var User  = require('./../model/UserModel.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//返回地址列表信息
router.post('/list',function (req,res,next) {
  User.findOne({userId:req.cookies.userId},function (err,user) {
    if(err){
      res.json({
        status:0,
        msg:err.message,
        data:''
      })
    }else {
      if(user){
        res.json({
          status:'1',
          msg: 'success',
          data:user.addressList
        })
      }else{
        res.json({
          status:0,
          msg:'',
          data:''
        })
      }
    }
  })
});

//移除地址信息
router.post('/remove',function (req,res,next) {
  let addressId =  req.body.addressId;
  if(!addressId){
    res.json({
      status: 0,
      msg: '无法获取默认地址的编号',
      data: ''
    })
    return;
  }
  User.update({userId:req.cookies.userId},{$pull:{'addressList':{'addressId':addressId}}},function (err,numberAffected,raw) {
    if(err){
      res.json({
        status: 0,
        msg: err.message,
        data:''
      })
    }else{//删除成功
      if(numberAffected&&numberAffected.nModified>0){
        res.json({
          status: 1,
          msg:'success delete',
          data:''
        })
      }else{
        res.json({
          status: 0,
          msg: 'fail delete',
          data: ''
        })
      }
    }
  })
});

//设置默认地址
router.post('/default',function (req,res,next) {
  let addressId =  req.body.addressId;
  if(!addressId){
    res.json({
      status: 0,
      msg: '无法获取默认地址的编号',
      data: ''
    })
    return;
  }
  User.findOne({userId:req.cookies.userId},function (err,user) {
    if(err){
      res.json({
        status: 0,
        msg: err.message,
        data: ''
      })
    }else{
      if(user){
        user.addressList.forEach(function (item) {
          if(item.addressId == addressId){
            item.isDefault = true;
          }else {
            item.isDefault = false;
          }
        });
        user.save(function (err1,doc) {
          if(err1){
            res.json({
              status: 0,
              msg: err1.message,
              data: ''
            })
          }else {
            res.json({
              status:1,
              msg:'success',
              data:user.addressList
            })
          }
        });
      }else{
        res.json({
          status: 0,
          msg: 'fail',
          data: ''
        })
      }
    }
  })
})

module.exports = router;


