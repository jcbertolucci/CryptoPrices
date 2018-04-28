<template>
  <div id="app">
    <v-app app class="white">
      <v-content flat class="text-xs-center">
        <v-toolbar flat app color="accent" height="85px" class="elevation-6">
          <app-menu :logOutProp="logOut"></app-menu>
        </v-toolbar>
        <router-view class="padding-bottom"></router-view>
        <vue-footer id="footer"></vue-footer>
      </v-content> 
    </v-app>    
  </div>
</template>

<script>
import FooterTemplate from './components/Footer.vue'


export default {
  /* eslint-disable */
  name: 'app',
  

  components:{
    'vue-footer': FooterTemplate
  },
  methods: {
    fetchTopCoins(){
      this.$store.dispatch('fetchTopCoins')//call store action
    },
    fetchAllCoins(){
      this.$store.dispatch('fetchAllCoins')//call store action
    },
    marketCoins(){
      this.$store.dispatch('fetchCoinMarkets', 'MARKET')//call store action
    },
    logOut(){
      this.$store.dispatch('LOG_USER_OUT', this.$store)
    }
  },
  created(){
    this.fetchTopCoins()
    this.fetchAllCoins()
    this.marketCoins()
  }
}
</script>

<style scoped>
.padding-bottom{
  padding-bottom: 20px
}
#footer{
  /* position:absolute;
  left:0px;
  bottom: 0px;
  height: 70px;
  width:100%; */
}

</style>
