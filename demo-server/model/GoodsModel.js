let mongoose = require('mongoose');
let GoodsSchema = require("../schema/GoodsSchema.js");
const GoodsModel = mongoose.model('good',GoodsSchema,'goods');
let async = require('async');

let Goods = {
  save : function (data,cb) {
    GoodsModel.create(data, function (err, small) {
      cb(err);
    })
  },
  fetch:function(condition,cb){
    GoodsModel.find(condition, function(err, docs) {
      cb(err,docs);
    });
  },
  findOne:function (condition,cb) {
    GoodsModel.findOne(condition,function (err,doc) {
      cb(err,doc);
    })
  },
  delById:function(condition,cb){
    GoodsModel.remove(condition, function (err) {
      cb(err);
    });
  },
  update:function(condition,update,cb){
    GoodsModel.update(condition,update,{ multi: true },function (err, numberAffected, raw) {
      cb(err,numberAffected);
    });
  },
  pageQuery:function (page, pageSize, queryParams, sortParams, callback) {
    var start = (page - 1) * pageSize;
    var $page = {
      pageNumber: page
    };
    async.parallel({
      count: function (done) {  // 查询数量
        GoodsModel.count(queryParams).exec(function (err, count) {
          done(err, count);
        });
      },
      records: function (done) {   // 查询一页的记录
        GoodsModel.find(queryParams).skip(start).limit(pageSize).sort(sortParams).exec(function (err, doc) {
          done(err, doc);
        });
      }
    }, function (err, results) {
      var count = results.count;
      $page.pageCount = Math.ceil((count - 1) / pageSize + 1);//页面总数向上取整
      $page.results = results.records;
      callback(err, $page);
    });
  },
}
module.exports = Goods;
