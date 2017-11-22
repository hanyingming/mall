<template>
  <div>
    <!--一定要有一个根元素-->
    <nav-header></nav-header>
    <nav-bread>
        <span slot="bread"></span>
    </nav-bread>
    <symbol id="icon-status-ok" viewBox="0 0 32 32">
      <title>status-ok</title>
      <path d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z" class="path1"></path>
      <path d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z" class="path2"></path>
    </symbol>
    <symbol id="icon-arrow-short" viewBox="0 0 25 32">
      <title>arrow-short</title>
      <path d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z" class="path1"></path>
    </symbol>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <!--<a href="javascript:void(0)" class="default cur">Default</a>-->
          <a href="javascript:void(0)" :class="{'sort-up':priceSort}" @click="sortGoods" class="price">Price
            <svg class="icon-arrow-short">
              <use  xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="setFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterPop}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{cur:priceChecked=='all'}" @click="setPriceFilter('all')">All</a></dd>
              <!--<dd><a href="javascript:void(0)" :class="{cur:priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>-->
              <dd v-for="(item,index) in priceFilter">
                <a href="javascript:void(0)" :class="{cur:priceChecked==index}" @click="setPriceFilter(index)" >{{item.startPrice}}-{{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice | currency('￥')}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" @click="addCart(item.productId)" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                加载中...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overlayFlag" @click="closePop"></div>
    <modal :mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录,否则无法加入到购物车中
      </p>
      <div slot="btnGroup">
        <a href="javascript:" @click="mdShow=false" class="btn btn--m">关闭</a>
      </div>
    </modal>
    <modal :mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>成功加入到购物车</span>
      </p>
      <div slot="btnGroup">
        <a href="javascript:" @click="mdShowCart=false" class="btn btn--m">继续购物</a>
        <router-link  href="javascript:" class="btn btn--m" to="cart" >查看购物车</router-link>
      </div>
    </modal>
    <n-footer></n-footer>
  </div>
</template>
<style>
  .load-more {
    text-align: center;
  }
</style>
<script>
//  import './../src/assets/css/base.css'
//  import './../src/assets/css/product.css'
  import './../src/assets/css/app.css'
  import NavHeader from './../src/components/Header.vue'
  import NavBread from '@/components/Bread.vue'
  import Footer from './../src/components/Footer.vue'
  import Modal from './../src/components/Modal.vue'
  import axios from 'axios'
  import {currency} from './../utils/currency'

  export default{
    data(){
      return {
        goodList:[],
        priceFilter: [
          {
            startPrice: 0,
            endPrice:100
          },
          {
            startPrice: 100,
            endPrice:300
          },
          {
            startPrice: 300,
            endPrice:500
          },
          {
            startPrice: 500,
            endPrice:1000
          },
        ],
        priceChecked: 'all',//默认没有价格过滤
        filterPop: false,//默认不弹出价格过滤框
        overlayFlag: false,
        priceSort:true,//默认升序
        page:1,
        pageSize:8,
        busy:true,//默认为true，禁止使用滚动加载数据
        mdShow:false,
        mdShowCart:false,
      }
    },
    filters: {
      currency: currency,
    },
    components: {//组件
      NavHeader: NavHeader,//头部组件
      NFooter: Footer,//尾部组件
      NavBread,//面包屑组件
      Modal,//全局模态框组件
    },
    mounted: function () {
      this.getGoods(false);//初始化加载数据
    },
    methods: {
      getGoods (flag) {//分页获取商品列表信息集合
        //编辑上传参数
        let priceLevel = this.priceChecked == 'all' ? {$gt:0} :{$gt:this.priceFilter[this.priceChecked].startPrice,$lte:this.priceFilter[this.priceChecked].endPrice};
        let param = {
          page:this.page,
          pageSize:this.pageSize,
          queryParams:{salePrice:priceLevel},
          sortParams:{salePrice:this.priceSort?1:-1}
        };
        console.log(param);
        axios.get('/goods',{
          params: param
        }).then(res=>{
          let resData = res.data;
          if(resData.status == 1){//加载数据成功
            if(flag){//分页加载
              this.goodList = this.goodList.concat(resData.data.list);
//              if(resData.data.count <= this.page){
//                this.busy = true;
//              }else {
//                this.busy = false;
//              }
            }else {
              this.goodList = resData.data.list;
              //this.busy = false;
            }
            //判断是否可以继续分页加载
            if(resData.data.pageCount <= this.page){
              this.busy = true;
            }else {
              this.busy = false;
            }
          }else {//加载数据失败
            this.goodList = [];
          }
        }).catch(error=>{
          console.log(error);//打印加载数据失败的日志
        })
      },
      setFilterPop () {//弹出价格过滤框
        this.filterPop = true;
        this.overlayFlag = true;
      },
      closePop () {//关闭价格过滤弹出框和覆盖层
        this.filterPop = false;
        this.overlayFlag = false;
      },
      setPriceFilter (index) {//价格过滤
        this.priceChecked = index;
        this.page = 1;//从第一页开始
        this.getGoods(false);//记载数据
        this.closePop();
      },
      sortGoods () {//排序商品
        this.priceSort = !this.priceSort;
        this.page = 1;
        this.getGoods();
      },
      loadMore () {//滚动分页加载数据的方法（this.busy=false时，滚动调用该方法）
        this.busy = true;//禁止再次滚动加载
        setTimeout(() => {
          this.page++;
          this.getGoods(true);//分页加载数据
        }, 500);
      },
      addCart(goodId){//添加商品到购物车
        axios.post('/goods/addCart',{goodId:goodId}).then(res=>{
          let resData = res.data;
          if(resData.status == 1){//加入成功
            this.mdShowCart = true;
            this.$store.commit('updateCartNum',1);
          }else{//加入失败
            this.mdShow = true;
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      closeModal () {//关闭模态框
        this.mdShow = false;
        this.mdShowCart = false;
      }
    },
  }
</script>
