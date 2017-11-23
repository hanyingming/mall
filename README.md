# mall

> vue + vue-router + axios + vuex    express + mongoose

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

![image](https://github.com/ButBueatiful/dotvim/raw/master/screenshots/vim-screenshot.jpg)

# 购物商城项目：
	采用MongoDB数据库。
	项目的功能：
		1.实现商品列表的价格的升降序、价格的过滤、分页。
		2.用户的登录与登出
		3.购物车的实现
		4.地址模块的实现
		5.订单的生成
		6.Vuex对购物车商品数量的应用

	后端开发框架：
		express + mongoose
	前端开发框架：
		vue + vue-router + axios + vuex + vue-infinite-scroll + vue-lazyload


# 后端项目的创建：
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


# 数据库集合的设计：
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


# 导入外部数据到数据库的方式：
	（1）使用MongoVue客户端导入数据：
		导入之前需要先创建集合。
		db.createCollection("user")
	（2）
		使用Dos窗口命令直接导入数据：
		mongoimport -d 数据库名 -c 集合名 --file 文件路径

mongodb数据库服务的启动：mongod --storageEngine mmapv1 --dbpath C:\data\mmapv1\db


# 前端项目mall的创建：
	初始化项目：vue init webpack mall
	进入项目：cd mall
	安装依赖：npm install
	安装axios：npm install axios --save
	测试项目初始化是否成功：
		命令行：npm run dev


# 功能模块的开发:
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


    六.Vuex对购物车商品数量的应用
          Vuex:
            什么是Vuex？
            为什么使用Vuex？
            如何使用？
        什么是Vuex？
        Vuex是专门为Vue.js应用程序开发的状态管理模式。
        （vue.js；data:中的变量就是状态。）

        为什么要使用Vuex？
        当我们构建一个中大型的单页面应用程序时，vuex可以帮助我们在组件外部统一管理状态。
        (可以提取公有变量)

        Vuex的核心概念：
          State：data中的变量（唯一的数据源）；单一的状态树
          Getters：可以派生新的状态。
          Mutations：更改Vuex中的state中的状态的唯一方法是提交mutation。（改变state数值）
          Actions：可以包含异步的操作；提交的是mutation，而不是直接变更状态。
          Modules：代码拆分（store对象分割成模块（modules））；
        使用vuex动态绑定购物车中商品的数量。
        后台设计接口：/cart/getCartNum;提供当前用户的购买商品的数量。


# 总结：
    (一)Vue父子组件通信：
        ①父子传值props
            子组件不能修改props传递的属性值。
            只能通过自定义事件，通过父组件修改子组件的值。
        ②父子传递对象props
            子组件中允许直接修改传递对象的值并能够反映到父组件上。
            也可以通过自定义事件，通过父组件修改子组件的值。
            但是：如果此对象需要添加新的属性时，必须使用
              import Vue from 'vue';Vue.set(对象名，'属性名’,属性初始值);才能将添加的对象属性反映到组件视图上。

    (二)关于vue的组件复用：
    点击超链接时，vue会判断路由是否发生改变。
    未变：不对点击事件进行处理。
    发生改变：对点击超链接进行处理，当再次加载组件的时候会根据router-view标签的key值进行
    判断，如果key值未变，组件复用；否则重新加载组件并进行渲染到router-view标签区域。
    因此，可以通过router-view标签的:key="key"来决定组件是否重新渲染。
    computed: {
      key() {//key值变动，渲染区域的组件重新渲染
      return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date();
      }
    }
    router-view标签的key值默认会随着所渲染的组件进行生成唯一不变的。

    (三)vue-resource和axios异步请求插件的异同：
        axios不支持跨域。需要配置config目录下的index.js文件中的proxyTable。
        proxyTable:{
          '/goods':{
            target:'http://localhost:3000'
          }
        }
        vue-resource:支持跨域。

    (四)Node.js启动方式：
        (1)通过node命令启动： node 入口文件名
        (2)webstrom配置启动入口，可用于代码的调试。
        (3)pm2  pm2 入口文件名
        (4)npm run start (用于express创建的项目)
        (5)npm run dev (用于vue-cli创建的项目)



# Vue的基础介绍：
    vue数据驱动，组件化，内置模板引擎。
    响应式：元素。

  	模板语法：
  		Mustache语法：{{msg}} 只作用于文本。
  		html赋值：v-html=""
  		绑定属性：v-bind:href=""或者:href=""
  		表达式：{{ok?'yes':'no'}}
  		文本赋值：v-text=""
  		指令：v-if=""
  		过滤器：{{msg|cap}}
  		双向数据流：v-model="" 用于表单输入

  	条件渲染：
  		v-if
  		v-else
  		v-else-if
  		v-show  控制div：display/none;
  				false不渲染
  		v-cloak 隐藏html代码

  	vue事件处理器：
  		v-on:click="greet"或者@click="greet"
  		v-on:click.stop
  		v-on:clck.stop.prevent
  		v-on:click.self
  		v-on:click.once

  	# vue:组件化
  		# 全局组件和局部组件
  		# 父子组件通讯-数据传递（vue本不允许数据流的双向流动，
  		# 只支持数据流的单向流动。只支持父传子。为此提供了一种新的通许方式
  		# 通过emit事件的触发向上传递数据，不允许修改父级的变量。）

  	# 以及可用于生产环境的构建配置的项目。
  	# 全局安装 vue-cli
  	npm install --global vue-cli
  	# 创建一个基于 webpack 模板的新项目
  	vue init webpack vue2
  	# 安装依赖，走你
  	cd vue2
  	npm install
  	npm run dev

  	路由：根据不同的url展示不同的内容或页面。
  	前端路由：不同的url展示不同的内容或页面交给前端完成。
  	优点：用户体验好，不需要每次都从服务器全部获取，快速展现给用户。
  	缺点：不有利于SEO收录。
  		  无法使用浏览器的前进、后退功能，每次都会重新发送请求，无法合理地使用缓存。
  		  单页面无法记住之前滚动的位置。
        
    什么时候使用前端路由：单页面应用，大部分的页面结构不发生变化，只改变部分内容。

    vue-router用来构建SPA
    <router-link></router-link>或者this.$router.push({path})用于跳转;
    <router-view></router-view> 组件渲染

    路由基础：
      动态路由的匹配
      嵌套路由
      编程式路由
      命名路由和命名视图
      

# MongoDB的基础介绍：
    MongoDB的特征：
        高可扩展性
        分布式存储
        低成本
        结构灵活
    
    MongoVue：Mongodb数据库的客户端。
        
    MongoDB的配置：
      基本配置文件：mongo.conf
      命令：mongod --conf C:\data\etc\mongo.conf
      
      可以配置的命令如下：
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
      
      Windows配置全局环境变量：
        打开我的电脑--》右键属性--》点击环境变量---》点击path--->添加mongodb安装的路径
        建立windows系统服务的命令:
          win10必须使用管理员打开Dos窗口
          mongod.exe --dbpath "C:\data\db" --logpath "C:\data\dbConf\mongodb.log" --install --serviceName "mongodb"

    切换至admin数据库，也可以使用db = db.getSiblingDB('admin')代替use admin。
    use admin

    创建管理员用户，并指定其权限。
    db.createUser({
      user : 'root',
      pwd : '123456',
      roles : [
        'clusterAdmin',
        'dbAdminAnyDatabase',
        'userAdminAnyDatabase',
        'readWriteAnyDatabase'
      ]
    })

    use admin
    db.createUser({
      user:'boss',
      pwd:'boss',
      roles:[{
        role:'readWriteAnyDatabase',
        db:'admin'
      }]
    })
    //等同于
    db.createUser({
      user:'boss1',
      pwd:'boss1',
      roles:[
        'readWriteAnyDatabase'
      ]
    })

    //创建数据库mofei并添加用户mofei
    use mofei
    db.createUser({
      user:'mofei',
      pwd:'mofei',
      roles:[{role:'readWrite',db:'mofei'}]
    })
    //插入数据
    db.test.insert({name:'mofei'})

    //创建数据库money并添加用户money
    use money
    db.createUser({
      user:'money',
      pwd:'money',
      roles:[{role:'readWrite',db:'css'}]
    })
    db.test.insert({username:'money',flag:'0'})

    服务器启动：mongod -auth
    use mofei
    db.auth({user:'mofei',pwd:'mofei'})
    show collections
    db.test.find()

    //连接数据库
    方式一：mongo
    方式二：mongo mongodb://boss:boss@127.0.0.1:27017
    方式三：mongo mongodb://127.0.0.1/admin -u boss -p boss

    操作数据库的语句：
    show dbs//展示数据库
    use db//使用某个数据库
    db//当前数据库的名称
    db.dropDatabase()//删除数据库

    //删除集合
    db.collection.drop();

    插入数据：
    db.collection.insert()插入数据
    db.collection.find()查询数据
    db.collection.update(
      <query>,//查询条件
      <update>,//更新的数据；默认覆盖以前的，使用$set:
      {
        upsert：<boolean>,//没有匹配数据，添加数据
        multi:<boolean>,//true：修改多条数据
        writeConcern:<document>
      }
    )

    use test
    //首先向test集合添加多条数据
    //修改age=19的数据hobby:run1并覆盖了原有的数据
    db.test.update({age:18},{hobby:'run1'})
    //向hobby:'run1'符合条件的记录中添加{age:18,name:'tom1'}
    db.test.update({hobby:'run1'},{$set:{age:18,name:'tom1'}})
    //更新没有符合条件的记录
    db.test.update({hobby:'bs'},{$set:{age:22,name:'hym'}})//没有更新
    //没有符合条件的记录，将数据添加到集合中
    db.test.update({hobby:'bs'},{$set:{age:22,name:'hym'}},{upsert:true})
    //同时更新符合条件的多条数据
    db.test.update({age:18},{$set:{age:23,name:'hym1'}},{multi:true})

    //删除集合内容（文档）
    db.collection.remove(
      <query>,
      <justOne>//true:只删除一条数据，删除所有符合条件的数据
    )

    //查询文档
    db.collection.find().limit(number)
    db.collection.find().limit(number).skip(number)
    //{key:1}正 {key:-1}倒叙
    db.collection.find().sort({key:1})
    // 先进行排序再
    db.test.find().sort({name:-1}).skip(2).limit(2)

    //备份数据库
    mongodump -h dbhost -d dbname -o dbdirectory
    //恢复数据库
    mongorestore -h <hostname><:port> -d dbname <path>

    //mongodb的驱动
    //mongodb连接数据库
    //node.js通过驱动调用mongodb数据库
    //创建项目mongodb_driver
    npm init
    npm install mongodb --save

    连接：
    schemas:定义数据库中存储数据的模式。（如同定义表）

    安装npm install mongoose --save
    var mongoose = require('mongoose')
    mongoose
    mongoose.connect('mongodb://127.0.0.1:27017/数据库名')
    let db = mongoose.connection;
    db.on('err',(err)=>{
      console.log(err);
    })
