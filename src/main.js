// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "jquery/dist/jquery.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "font-awesome/css/font-awesome.min.css"

import Vue from 'vue'
import App from './App'
import router from './router';
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI);

//import axios from './plugin/index'
import Data from './assets/data.json'

Vue.config.productionTip = false

import Foldertree from "./components/foldertree.vue";
import Cascade from "./components/cascade.vue";
import Tab from "./components/tab.vue";

Vue.component("foldertree", Foldertree)
Vue.component("cascade", Cascade)
Vue.component("tab", Tab)

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App :wwidth="winwidth" :tabtree="tabtreedata"></App>',
  data:{
    winwidth: document.documentElement.clientWidth,
    tabtreedata: [],
  },
})

window.onresize = function () {
  vue.winwidth = document.documentElement.clientWidth;
}

// axios.get("./assets/data.json").then(function (res) {
//   console.log(res);
//   vue.tabtreedata = res.data;
// })
console.log(Data)
vue.tabtreedata =Data
