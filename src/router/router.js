import VueRouter from 'vue-router'
import Vue from 'vue'
import * as firebase from 'firebase'

import SignUp from '@/components/SignUp.vue'
import SignIn from '@/components/SignIn.vue'
/* import HomeVuetify from '@/components/HomeVuetify.vue' */
import HomeBeta from '@/components/HomeBeta.vue'
import Coins from '@/components/Coins.vue'
import Portfolio from '@/components/Portfolio.vue'
import Dashboard from '@/components/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
/*   { path: '*', redirect: 'Home'}, */
  /* { path: '/', name: 'Home', component: HomeVuetify }, */ 
  { path: '/', name: 'Home', component: HomeBeta },
  { path: '/signup', name: 'Sign Up', component: SignUp },
/*   { path: '/coins', name: 'Coins', component: Coins },
  { path: '/portfolio', name: 'Portfolio', component: Portfolio, meta: { requiresAuth: true } }, */
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/signin', name: 'SignIn', component: SignIn }
]
const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if(!requiresAuth) next()
  else if (!firebase.auth().currentUser) next('SignIn')
  else next()
  
})
export default router