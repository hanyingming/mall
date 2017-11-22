// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import Vuex from 'vuex'

Vue.config.productionTip = false
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(VueLazyload, {//配置图片懒惰加载插件
  preLoad: 1.3,
  error: '../static/loading/loading-bars.svg',
  loading: '../static/loading/loading-bars.svg',
  attempt: 1
})
Vue.use(infiniteScroll)//配置滚动加载页面数据插件

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    cartNum: 0,
  },
  mutations: {
    initCartNum (state,num) {
      state.cartNum = num;
    },
    updateCartNum (state,num) {
      state.cartNum += num;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
