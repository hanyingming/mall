# vue4

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

基础知识：
  vue-resource和axios异步请求插件的异同：
  axios不支持跨域。需要配置config目录下的index.js文件中的proxyTable。
  proxyTable:{
    '/goods':{
      target:'http://localhost:3000'
    }
  }
  vue-resource:支持跨域。

  Node.js启动方式：
  (1)通过node命令启动： node 入口文件名
  (2)webstrom配置启动入口，可用于代码的调试。
  (3)pm2  pm2 入口文件名
  (4)npm run start (用于express创建的项目)
  (5)npm run dev (用于vue-cli创建的项目)



MongoDB的特征：
	高可扩展性
	分布式存储
	低成本
	结构灵活

MongoDB的操作：
基本配置：mongo.conf
命令：mongod --conf C:\data\etc\mongo.conf
可以配置的名利如下：
#数据库路径
dbpath=C:\data\db
#日志输出文件路径
logpath=C:\data\dbConf\mongo.log
#错误日志应该采用追加模式，配置这个选项后，mongodb的日志会自动追加到现有的日志文件，而不是重新创建一个新文件。
logappend=true
#启用日志文件，默认启用
journal=true(win32需要配置)
过滤无用的日志信息，若需要调试请设置为false
quiet=true
#端口号 默认为27017
port=27017
#指定存储引擎（默认不需要配置此引擎，win32需要配置）
storageEngine=mmapv1
#http配置(服务启动的时候开启28017日志端口)
httpinterface=true
MongoVue：Mongodb数据库的客户端。

购物商城项目：
	采用MongoDB数据库。
	项目的功能：
		1.实现商品列表的价格的升降序、价格的过滤、分页。
		2.用户的登录与登出
		3.购物车的实现
		4.地址模块的实现
		5.订单的生成
		6.vuex对购物车商品数量的应用

	后端开发框架：
		express+mongoose
	前端开发框架：
		vue+vue-router+axios+vue-infinite-scroll+vue-lazyload+vuex

后端项目的创建：
	安装npm install -g express
	安装是否成功的命令：
	express --version
	express -h
	安装express生成器
	npm install -g express-generator
	使用生成器创建项目：express 项目名称
	安装依赖配置：npm install
	进入项目：cd demo-server
	启动项目：npm run start

	测试后端项目是否启动成功的访问地址：http://127.0.0.1:3000/

	项目中添加数据库操作：
		安装mongoose：npm install mongoose --save
	添加schema、model文件夹

	设计GoodsSchema、UsersSchema
	设计GoodsModel、UsersModel

	使用supervisor启动项目（监听项目的变化，不可靠）: supervisor ./bin/www

	数据库集合的设计：
		Goods:{
			"productId":String,
			"productName":String,
			"salePrice":Number,
			"productImage":String
		}
		Users:{
			"userId":String,
			"userName":String,
			"userPwd":String,
			"orderList":Array,
			"cartList":[
				{
					"productId":String,
					"productName":String,
					"salePrice":String,
					"productImage":String,
					"checked":String,
					"productNum":String
				}
			],
			"addressList":[
				{
					"addressId":String,
					"userName":String,
					"streetName":String,
					"postCode":Number,
					"tel":Number,
					"isDefault":Boolean
				}
			]
		}
	导入外部数据到数据库的方式：
	（1）使用MongoVue客户端导入数据：
		导入之前需要先创建集合。
		db.createCollection("user")
	（2）
		使用Dos窗口命令直接导入数据：
		mongoimport -d 数据库名 -c 集合名 --file 文件路径

mongodb数据库服务的启动：mongod --storageEngine mmapv1 --dbpath C:\data\mmapv1\db

前端项目vue10的创建：
	初始化项目：vue init webpack vue10
	进入项目：cd vue10
	安装依赖：npm install
	安装axios：npm install axios --save
	测试项目初始化是否成功：
		命令行：npm run dev

一、实现商品列表的价格的升降序、价格的过滤、分页。
	1.排序：
		升降排序：
			设置参数：
			param:{
				page:页码,
				pageSize:每页的记录数,
				queryParams:查询参数集合,
				sortParams:排序参数集合
			}
	2.分页：vue-infinite-scroll
	npm install vue-infinite-scroll

	3.价格过滤：
		salePrice:{
			$gt:priceGt,
			$lte:priceLte
		}

二、用户登录：
	前台：获取用户信息，检验通过，通过post方式向后台传输用户信息。
	后台：获取上传的用户信息，根据用户名与密码查询用户信息，如果存在，返回登录成功，
		  否则，返回登录失败。
		  同时向客户端发送cookie，记住用户登录信息。

	用户登出：
		清空有关用户信息的cookie。

	登录拦截器：
		在app.js中使用app.use(function(req,res,next))设置全局拦截：用于用户是否登陆拦截
	如果用户登录，放行；没有登陆，则返回信息提示用户进行登陆。
	但是需要对一些特定接口进行放行：比如登陆验证信息；获取商品列表信息等。

	全局模态框：
		通过父子组件设置全局模态框：使用到了slot插槽和modal对话框。


三、购物车的实现：
	前端：
		1.使用头部组件、面包屑组件、尾部组件已经静态购物车代码构成购物车的静态页面。
		回车登陆：需要在密码框中添加@keyup.enter='login'，即输完密码后点击回车调用登陆方法。
		2.点击删除按钮，弹出对话框提示用户是否删除商品。是：发起请求从购物车中删除该商品，
		否，关闭对话框。
		3.修改商品数量，发起请求修改商品数量；
		  修改选中各种商品的状态，发起请求修改是否选中字段。
		4.通过vue的实时计算，设计商品是否全选以及商品的总价。
		  通过引入accuracy.js过滤商品价格，即对商品价格进行格式处理。
	后端：
		创建Cart.js路由处理请求文件
			1.接口/cart/list:用于用户获取个人购物车商品数据。
			2.接口/cart/del:用于删除购物车的商品。
			3.接口/cart/edit：用于商品数量的修改以及是否选中商品。




四、地址模块：
	1.地址列表功能实现
	2.地址切换和展开功能实现
	3.地址设置默认
	4.删除地址
	后端：
		定义接口/address/list返回用户的地址列表信息。
	前端：
		通过请求接口/address/list获取地址列表信息并渲染到页面。
	地址列表的切换和展开：
		列表的切换使用的选中索引和当前索引是否相等，来确定是否选中状态。
		列表的展开：点击展开按钮，显示所有列表信息。
	地址设置默认：
		将地址中的isDefault属性设置为isDefault:false,再将选中的地址isDefault:true。
	地址删除：
		弹出对话框提示用户是否删除地址。取消关闭；确认根据用户的id和地址的id
		去数据库中删除地址信息。

五、订单的生成
	订单确认页面。
	获取用户提交的地址编号，通过查询当前用户信息获取用户购物车中选中的商品信息，
	订单包含的的信息：
	orderId: orderId,//订单编号：随机数+平台编号+随机数+系统时间
	address: address,//地址信息
	goods: selGoods,//商品信息里诶包
	totalPrice: totalPrice,//商品总价
	orderStatus: 1,//订单状态
	createData: createDate//下单日期

六.vuex对购物车商品数量的应用
	Vuex:
		什么是vuex？
		为什么使用vuex？
		如何使用？
什么是vuex？
Vuex是专门为Vue.js应用程序开发的状态管理模式。
（vue.js；data:中的变量就是状态。）

为什么要使用vuex？
当我们构建一个中大型的单页面应用程序时，vuex可以帮助我们在组件外部统一管理状态。
(可以提取公有变量)

Vuex的核心概念：
	State：data中的变量（唯一的数据源）；单一的状态树
	Getters：可以派生新的状态。
	Mutations：更改Vuex中的state中的状态的唯一方法是提交mutation。（改变state数值）
	Actions：可以包含异步的操作；提交的是mutation，而不是直接变更状态。
	Modules：代码拆分（stroe对象分割成模块（moules））；
使用vuex动态绑定购物车中商品的数量。
后台设计接口：/cart/getCartNum;提供当前用户的购买商品的数量。



For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
