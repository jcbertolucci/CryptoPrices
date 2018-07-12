import VueRouter from 'vue-router'
import Vue from 'vue'
import * as firebase from 'firebase'

import SignUp from '@/components/SignUp.vue'
import SignIn from '@/components/SignIn.vue'
import HomeBeta from '@/components/HomeBeta.vue'
import DashboardPortfolio from '@/components/DashboardPortfolio.vue'
import Dashboard from '@/components/DashboardBeta.vue'
import DashboardCoin from '@/components/DashboardCoin.vue' 
import DashboardWallet from '@/components/DashboardWallet.vue'

Vue.use(VueRouter)

const routes = [
/*   { path: '*', redirect: 'Home'}, */
  /* { path: '/', name: 'Home', component: HomeVuetify }, */ 
  { path: '/', name: 'Home', component: HomeBeta },
  { path: '/signup', name: 'Sign Up', component: SignUp },
/*   { path: '/coins', name: 'Coins', component: Coins },*/
/* { path: '/portfolio', name: 'Portfolio', component: Portfolio }, */
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, 
    children: [
      {
        // Coin will be rendered inside Dashboard's <router-view>
        //  when /dashboard/coin is matched
        path: 'coin',
        component: DashboardCoin
      },
      {
        // Wallet will be rendered inside Dashboard's <router-view>
        //  when /dashboard/wallet is matched
        path: 'wallet',
        component: DashboardWallet
      } ,
      {
        path: 'portfolio',
        component: DashboardPortfolio
      }
    ],
    meta: { requiresAuth: true } 
  },
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