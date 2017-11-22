let express = require('express');
let router = express.Router();
let Goods  = require('./../model/GoodsModel.js')
var User  = require('./../model/UserModel.js')

/* 获取商品列表*/
router.get('/', function(req, res, next) {
  //page, pageSize, queryParams, sortParams
  let page = req.param('page');
  page = page?parseInt(page):1;
  let pageSize = req.param("pageSize");
  pageSize = pageSize?parseInt(pageSize):10;
  let queryParams = req.param("queryParams");
  queryParams = queryParams?JSON.parse(queryParams):{};
  let sortParams = req.param("sortParams");
  sortParams = sortParams?JSON.parse(sortParams):{};

  Goods.pageQuery(page,pageSize,queryParams,sortParams,function (error,$page) {
    if(error){//分页查询数据异常
      res.json({
          status:0,
          msg:err.message
        })
    }else {//获取数据正常
      res.json({
        status:1,
        msg:'',
        data:{
          pageCount:$page.pageCount,
          list:$page.results
        }
      });
    }
  })
  /*
  * dbHelper.pageQuery(page, 10, Article, '', {}, {
        created_time: 'desc'
    }, function(error, $page){
        if(error){
            next(error);
        }else{
            res.render('index'{
                records: $page.results,
                pageCount: $page.pageCount
            })
        }
    });
  *
  * */
  //加载goods信息列表
  // Goods.fetch({},function (err,docs) {
  //   if(err){
  //     res.json({
  //       status:0,
  //       msg:err.message
  //     })
  //   }else {
  //     res.json({
  //       status:1,
  //       msg:'',
  //       data:{
  //         count:docs.length,
  //         list:docs
  //       }
  //     });
  //   }
  // })
});

//将商品添加到购物车中
router.post('/addCart', function(req, res, next) {
  //获取用户id
  //获取商品id
  //获取用户信息
  //获取商品信息
  //向用户中添加商品信息（存在：数量加1；不存在：加入商品信息）
  //返回结果

  let userId = req.cookies.userId;
  let goodId = req.body.goodId;
  User.findOne({userId:userId},function (err,userInfo) {
    if(err){//读取用户信息异常
      res.json({
        status:0,
        msg:err.message
      });
    }else {
      //更新商品信息$inc:{count:1}//Number字段
      //User.update({userId:userInfo.userId,"cartList.productId":goodId},{$set:{"cartList.$.productNum":+1}},function (err,numberAffected) {
      User.update({userId:userInfo.userId,"cartList.productId":goodId},{$inc:{"cartList.$.productNum":1}},function (err,numberAffected) {
        if(err){//更新异常
          res.json({
            status:0,
            msg:err.message,
            data:''
          });
        }else{
          //{ ok: 1, nModified: 1, n: 1 }
          //console.log(numberAffected);
          if(numberAffected&&numberAffected.nModified == 1) {//有此商品信息,已经修改商品数量
            res.json({
              status: 1,
              msg: "success add carts",
              data: ''
            });
          }
          else{//没有此商品信息，添加商品信息到购物车
            Goods.findOne({productId: goodId}, function (err, goodInfo) {
              if (err) {//读取商品信息异常
                res.json({
                  status: 0,
                  msg: err.message,
                  data:''
                });
              } else {
                // //添加商品信息
                goodInfo.checked = "1";//默认选中
                goodInfo.productNum = "1";//商品数量为1
                User.update({userId: userInfo.userId}, {$addToSet: {"cartList": goodInfo}}, function (err, numberAffected) {
                  if (err) {//添加商品信息失败
                    res.json({
                      status: 0,
                      msg: err.message,
                      data:''
                    });
                  } else {//添加商品信息成功
                    res.json({
                      status: 1,
                      msg: "成功添加到购物车",
                      data:''
                    });
                  }
                })
              }
            })
          }
        }
      })
    }
  })

});

module.exports = router;
