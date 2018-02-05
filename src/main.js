// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  //{ path: '/login', component: Login },
  { path: '/signup', component: SignUp },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

/* eslint-disable*/
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
