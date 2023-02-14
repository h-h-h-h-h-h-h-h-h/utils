import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apis from './assets/http/apis'
import 'vant/lib/index.css';
import { Picker } from 'vant';
Vue.use(Picker);

import VueZxing from 'vue-zxing';
Vue.use(VueZxing);

Vue.prototype.$apis = apis
Vue.config.productionTip = false

//H5+ 扫码
var Quagga = require("quagga");
Vue.prototype.$Quagga = Quagga;

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import calendar from 'js-calendar-converter'
Vue.prototype.$calendar = calendar

// 样式
import 'normalize.css'
import '/src/assets/style/style'

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
