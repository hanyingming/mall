<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Order Success</span>
    </nav-bread>
    <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li class="cur"><span>Make</span> payment</li>
            <li class="cur"><span>Order</span> confirmation</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="../static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
              <span>Order ID：{{orderId}}</span>
              <span>Order total：{{totalPrice}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/cart">Cart List</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/goods">Goods List</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
</style>
<script>
  import './../src/assets/css/checkout.css'
  import NavHeader from './../src/components/Header.vue'
  import NavBread from '@/components/Bread.vue'
  import Footer from './../src/components/Footer.vue'
  import Modal from './../src/components/Modal.vue'
  import axios from 'axios'
  import {currency} from './../utils/currency'

  export default {
    data() {
      return {
        orderId: '',
        totalPrice: 0,
      }
    },
    mounted: function () {
      this.getOrder();
    },
    components: {
      NavHeader,
      NavBread,
      NavFooter: Footer,
      Modal,
    },
    methods: {
      getOrder () {//根据订单编号获取订单信息
        //订单编号
        let orderId = this.$route.query.orderId;
        console.log(orderId);
        axios.get('/order',{
          params:{
            orderId: orderId
          }
        }).then((res)=>{
          let resData = res.data;
          if(resData&&resData.status==1){//成功
            this.orderId = resData.data.orderId;
            this.totalPrice = resData.data.totalPrice;
          }
        }).catch((err)=>{
          console.log(err);
        });
      }
    }
  }
</script>
