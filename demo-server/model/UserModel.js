let mongoose = require('mongoose');
let UserSchema = require("../schema/UserSchema.js");
const UserModel = mongoose.model('user',UserSchema,'users');
let async = require('async');

let User = {
  save : function (data,cb) {
    UserModel.create(data, function (err, small) {
      cb(err);
    })
  },
  fetch:function(condition,cb){
    UserModel.find(condition, function(err, docs) {
      cb(err,docs);
    });
  },
  findOne:function (condition,cb) {
    UserModel.findOne(condition,function (err,doc) {
      cb(err,doc);
    })
  },
  delById:function(condition,cb){
    UserModel.remove(condition, function (err) {
      cb(err);
    });
  },
  update:function(condition,update,cb){
    UserModel.update(condition,update,{ multi: true },function (err, numberAffected, raw) {
      cb(err,numberAffected);
    });
  },
  pageQuery:function (page, pageSize, queryParams, sortParams, callback) {
    let start = (page - 1) * pageSize;
    let $page = {
      pageNumber: page
    };
    async.parallel({
      count: function (done) {  // 查询数量
        UserModel.count(queryParams).exec(function (err, count) {
          done(err, count);
        });
      },
      records: function (done) {   // 查询一页的记录
        UserModel.find(queryParams).skip(start).limit(pageSize).sort(sortParams).exec(function (err, doc) {
          done(err, doc);
        });
      }
    }, function (err, results) {
      let count = results.count;
      $page.pageCount = Math.ceil((count - 1) / pageSize + 1);//页面总数向上取整
      $page.results = results.records;
      callback(err, $page);
    });
  },
}
module.exports = User;
