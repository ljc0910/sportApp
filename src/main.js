// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('swiper/dist/css/swiper.css')
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//import "./style.css"//引入css样式
import Mint from 'mint-ui' 
Vue.use(Mint)//设置全局
Vue.use(router)
import echarts from 'echarts'
Vue.prototype.$echarts = echarts  //全局引入echarts图表插件
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
   data: {
    eventHub: new Vue()
  },
  components: { App }
})
