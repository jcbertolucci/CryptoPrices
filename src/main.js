// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader
import Vuex from 'vuex'
import { store } from './store/store'
import router from './router/router'

//Components
import colors from 'vuetify/es5/util/colors'
import AlertComp from './components/Shared/Alert.vue'

Vue.config.productionTip = false

Vue.component('app-alert', AlertComp)

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(router)
Vue.use(Vuetify,{
  theme: {
    primary: colors.deepOrange.accent4,
    secondary: colors.red.lighten2,
    accent: colors.purple.darken4,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base
  }
})
/* eslint-disable*/
new Vue({
  store:store,
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
})
