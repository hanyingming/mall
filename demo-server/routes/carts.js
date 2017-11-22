let express = require('express');
let router = express.Router();
var User  = require('./../model/UserModel.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//返回购物车数据--根据用户id
router.post('/list',function (req,res,next) {
  //根据用户id,查询用户的购物车数据
  User.findOne({userId:req.cookies.userId},function (err,doc) {
    if(err){
      res.json({
        status: 0,
        msg: err.message,
        data: ''
      })
    }else{
        res.json({
          status: 1,
          msg:'',
          data: doc.cartList
        })
    }
  })
});

//根据用户id和商品id删除购物车商品信息
router.post('/del',function (req,res,next) {//根据用户id和商品id删除购物车商品信息
  let userId = req.cookies.userId;
  let goodId = req.body.goodId;
  if(!goodId){
    res.json({
      status: 0,
      msg: "无法获取有效商品信息",
      data:''
    });
    return;
  }
  //根据用户id和商品id删除购物车商品信息
  User.update({userId:userId},{$pull:{'cartList':{'productId':goodId}}},function (err,numberAffected) {
    if(err){
      res.json({
        status: 0,
        msg: err.message,
        data:''
      })
    }else{//删除成功
      res.json({
        status: 1,
        msg:'success delete',
        data:''
      })
    }
  })
});

//编辑购物车中的商品信息
router.post('/edit',function (req,res,next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;
  //根据用户id和商品id修改商品信息
  User.update({userId:userId,'cartList.productId':productId},{$set:{'cartList.$.productNum':productNum,'cartList.$.checked':checked}},function (err,numberAffected) {
    if(err){
      res.json({//操作异常
        status:0,
        msg:err.message,
        data:''
      })
    }else{
      console.log(numberAffected);
      if(numberAffected&&numberAffected.ok == 1) {
        res.json({
          status:1,
          msg:'',
          data:''
        })
      }else{
        res.json({//修改失败
          status:0,
          msg:'修改失败',
          data:''
        })
      }
    }
  })
});

//处理全选
// router.post('/checkAll',function (req,res,next) {
//   let userId = req.cookies.userId;
//   let checked = req.body.checked;
//   // db.rbacs.update({grants:{$all:['user']}},{$set:{"grants.$":'user2'}})
// //$all的值必须是一个数组
//   User.update({userId:userId},{$push:{'cartList':{checked:checked}}},function (err,numberAffected) {
//   //User.update({userId:userId,'cartList.checked':'1'},{$set:{"cartList.$":checked}},function (err,numberAffected) {
//   //User.update({userId:userId,'cartList':{$elemMatch:{checked:'1'}},$atomic:true},{$set:{'cartList.$.checked':checked}},function (err,numberAffected) {
//     if (err) {
//       res.json({//操作异常
//         status:0,
//         msg:err.message,
//         data:''
//       })
//     }else{
//       if(numberAffected&&numberAffected.ok == 1) {
//         res.json({
//           status:1,
//           msg:'',
//           data:''
//         })
//       }else{
//         res.json({//修改失败
//           status:0,
//           msg:'修改失败',
//           data:''
//         })
//       }
//     }
//   });
// })

//购物车中的商品全选处理接口
router.post('/checkAll',function (req,res,next) {
  let userId = req.cookies.userId;
  let checked = req.body.checked;
  User.findOne({userId:userId},function (err,user) {
    if(err){
      res.json({
        status:0,
        msg:err.message,
        data:''
      })
    }else{
      if(user){
        user.cartList.forEach(function (item) {
          item.checked = checked;
        });
        user.save(function (err1,doc) {
          if(err1){
            res.json({
              status:0,
              msg:err1.message,
              data:''
            })
          }else{
            res.json({
              status:1,
              msg:'success',
              data:''
            })
          }
        })
      }else{
        res.json({
          status:0,
          msg:'fail',
          data:''
        })
      }
    }
  })
});

//获取购物车商品的数量
router.get('/getCartNum',function (req,res,next) {
  User.findOne({userId:req.cookies.userId},(err,user)=>{
    if(err){
      res.json({
        status: 0,
        msg: err.message,
        data:''
      })
    }else{
      if(user){
        let cartNum = 0;
        user.cartList.map(function (item) {
          cartNum += parseInt(item.productNum);
        })
        res.json({
          status:1,
          msg:'success',
          data:cartNum
        })
      }else{
        res.json({
          status: 0,
          msg: 'fail',
          data: ''
        })
      }
    }
  })
});

module.exports = router;
