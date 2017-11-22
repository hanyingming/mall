var mongoose = require("mongoose");
mongoose.Promise = global.Promise;//为了解决过期的问题
/*调试模式是mongoose提供的一个非常实用的功能，用于查看mongoose模块对mongodb操作的日志，一般开发时会打开此功能，以便更好的了解和优化对mongodb的操作。*/
mongoose.set('debug', true);
/*mongoose会缓存命令，只要connect成功，处于其前其后的命令都会被执行，connect命令也就无所谓放哪里*/
var db=mongoose.connect('mongodb://127.0.0.1:27017/goods');
db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});

db.connection.on("open", function () {
  console.log("数据库连接成功");
});
