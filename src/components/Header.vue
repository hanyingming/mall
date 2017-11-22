<template>
  <div>
    <header class="header">
      <symbol id="icon-cart" viewBox="0 0 38 32">
        <title>cart</title>
        <path d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z" class="path1"></path> <path d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z" class="path2"></path> <path d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z" class="path3"></path>
        <path d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z" class="path4"></path>
      </symbol>
      <div class="navbar">
        <div class="navbar-left-container">
          <!--<a href="/">-->
            <!--&lt;!&ndash;<img src="static/logo1.png" class="navbar-brand-logo">&ndash;&gt;-->
          <!--</a>-->
        </div>
        <div class="navbar-right-container" style="display: flex;">
          <div class="navbar-menu-container"><!---->
            <span v-show="loginStatus">{{nickname}}</span>
            <a href="javascript:void(0)" @click="LoginModelFlag=true" v-if="!loginStatus" class="navbar-link">Login</a>
            <a href="javascript:void(0)" v-show="loginStatus" @click="logout" class="navbar-link">LogOut</a>
            <div class="navbar-cart-container"><!---->
              <span class="navbar-cart-count" v-if="cartNum>0">{{cartNum}}</span>
              <router-link to="/cart" class="navbar-link navbar-cart-link">
                <svg class="navbar-cart-logo">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':LoginModelFlag}">
        <!--<div class="md-modal modal-msg md-show md-modal-transition">-->
        <div class="md-modal-inner">
          <div class="md-top">
            <div class="md-title">Login in</div>
            <button class="md-close" @click="LoginModelFlag=false">Close</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <div class="error-wrap"><!---->
                <span class="error" :class="{'error-show':errorTip}">用户名或者密码错误</span>
              </div>
              <ul>
                <li class="regi_form_input">
                  <i class="icon IconPeople"></i>
                  <input type="text" tabindex="1" v-model="username" name="loginname" placeholder="User Name" data-type="loginname" class="regi_login_input regi_login_input_left">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2" v-model="password" @keyup.enter="login" name="password" placeholder="Password" class="regi_login_input regi_login_input_left login-input-no input_text">
                </li>
              </ul>
            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="login">登  录</a>
            </div>
          </div>
        </div>
      </div>
      <!---->
    </header>
    <div class="md-overlay" v-show="LoginModelFlag"></div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        username:"",
        password:"",
        errorTip: false,//默认不展示提示信息
        LoginModelFlag: false,//默认关闭登陆模态框
        loginStatus:false,//默认未登录
        nickname:'',//用户昵称
      }
    },
    mounted: function () {
      this.checkLogin();
    },
    computed: {
      cartNum () {
        return this.$store.state.cartNum;
      }
    },
    methods: {
      login () {//用户登录
        if(!this.username || !this.password){//校验数据是否为空
          this.errorTip = true;
          return;
        }
        this.errorTip = false;
        axios.post('/users/login',{//执行登陆操作
          username:this.username,
          password:this.password
        }).then((res)=>{
          let resData = res.data;
          if(resData.status == 0){//用户名或密码有误
            this.errorTip = true;
          }else {//登陆成功
            //console.log(resData);
            this.LoginModelFlag = false;
            this.loginStatus = true;
            this.nickname = resData.data.userName;
            this.getCartNum();//获取购物车商品的数量
          }
        }).catch((err)=>{//链接异常
          console.log(err);
        });
      },
      logout () {//用户登出
        axios.post('/users/logout').then((res)=>{
          let resData = res.data;
          if(resData.status == 1){//登出成功
            this.loginStatus = false;
            this.$store.commit('initCartNum',0);
          }else{//登出失败
            console.log(resData);
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      checkLogin () {//检查用户是否登陆
        axios.post('/users/checkLogin').then((res)=>{
          let resData = res.data;
          if(resData.status == 1){//已经登陆
            this.loginStatus = true;
            this.nickname = resData.data;
            this.getCartNum();
          }else{//未登录
            this.loginStatus = false;
            this.nickname = resData.data;
          }
        }).catch((err)=>{//链接异常
          console.log(err);
        })
      },
      getCartNum () {//获取购物车商品的数量
        axios.get('/cart/getCartNum').then((res)=>{
          let resData = res.data;
          if(resData&&resData.status == 1){//获取成功
            this.$store.commit('initCartNum',resData.data);
          }
        }).catch((err)=>{
          console.log(err);
        });
      }
    }
  }
</script>
