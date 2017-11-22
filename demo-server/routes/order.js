let express = require('express');
let router = express.Router();
let User  = require('./../model/UserModel.js');
require('./../utils/Date.js')

//获取订单信息
router.get('/', function(req, res, next) {
  //获取订单id
  let orderId = req.param('orderId');
  if(!orderId){
    res.json({
      status: 0,
      msg:'无法获取订单信息',
      data:''
    })
  }else {
    User.findOne({userId:req.cookies.userId},function (err,user) {
      if(err){
        res.json({
          status: 0,
          msg: err.message,
          data: '',
        })
      }else {
        let order = null;
        user.orderList.forEach(function (item) {
          if(item.orderId == orderId){
            order = item;
          }
        });
        if(order){
          res.json({
            status: 1,
            msg: 'success',
            data: order,
          })
        }else{
          res.json({
            status: 0,
            msg: 'fail',
            data:''
          })
        }
      }
    });
  }
});

//生成订单
router.post('/add',function (req,res,next) {
  //获取用户选择的地址id
  let addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status: 0,
      msg:'无法获取用户的地址',
      data:''
    })
    return;
  }
  User.findOne({userId:req.cookies.userId},function (err,user) {
    if(err){
      res.json({
        status: 0,
        msg: err.message,
        data: '',
      })
    }else {
      //获取选中的购物车商品
      let unSelGoods = [];
      let selGoods = [];
      let totalPrice = 0;
      let address = null;
      user.cartList.forEach(function (item) {
        if(item.checked == 1){
          selGoods.push(item);
          totalPrice += parseInt(item.productNum) * parseFloat(item.salePrice);
        }else {
          unSelGoods.push(item);
        }
      });
      //获取用户选定的地址
      user.addressList.forEach(function (item) {
        if(item.addressId == addressId){
          address = item;
        }
      });
      if(!selGoods || !address){
        res.json({
          status: 0,
          msg: '匹配信息失败',
          data:''
        });
        return;
      }
      //保存订单信息
      let r1 = Math.floor(Math.random()*10);
      let r2 = Math.floor(Math.random()*10);
      let platform = '333';
      let sysDate = new Date().Format('yyyyMMddhhmmss');
      let createDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
      let orderId = r1+platform+r2+sysDate;
      let order = {
        orderId: orderId,
        address: address,
        goods: selGoods,
        totalPrice: totalPrice,
        orderStatus: 1,
        createData: createDate
      };
      user.orderList.push(order);
      user.cartList = unSelGoods;
      user.save(function (err1,user1) {
        if(err1){
          res.json({
            status: 0,
            msg: err1.message,
            data: ''
          })
        }else {
          //删除
          res.json({
            status: 1,
            msg: 'order success',
            data: orderId
          })
        }
      })
    }
  })
});

module.exports = router;
