import Vue from 'vue'
import Router from 'vue-router'
import GoodList from './../../views/GoodList.vue'
import Cart from './../../views/Cart.vue'
import Address from './../../views/Address.vue'
import OrderConfirm from './../../views/OrderConfirm.vue'
import OrderSuccess from './../../views/OrderSuccess.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: GoodList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
