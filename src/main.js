import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyLoad from 'vue-lazyload'
import 'swiper/dist/css/swiper.css'
import 'assets/style/iconfont.css'
import 'assets/style/reset.css'
import 'assets/style/border.css'
import 'assets/style/global.css'
import 'animate.css'
import 'assets/style/font-awesome/css/font-awesome.min.css'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://autumnfish.cn'

fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad, {
  loading: require('assets/imgs/timg.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})