<template>
  <div id="app">
    <v-app app class="white" id="main-outter-container">
      <v-content flat class="text-xs-center" >
        <app-menu :logOutProp="logOut"></app-menu>
        <!-- <v-toolbar flat app color="accent" class="elevation-1">
          <app-menu :logOutProp="logOut"></app-menu>
        </v-toolbar> -->
        <router-view class="padding-bottom"></router-view>
        <!-- <vue-footer id="footer"></vue-footer> -->
      </v-content> 
    </v-app>    
  </div>
</template>

<script>
/* import FooterTemplate from './components/Footer.vue' */


export default {
  /* eslint-disable */
  name: 'app',
  
  components:{

  },
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  methods: {
    fetchTopCoins(){
      this.$store.dispatch('fetchTopCoins')//call store action
    },
    fetchAllCoins(){
      this.$store.dispatch('fetchAllCoins')//call store action
    },
    fetchNewsArticles(){
      this.$store.dispatch('FETCH_NEWS_ARTICLES')//call store action
    },
    marketCoins(){
      this.$store.dispatch('fetchCoinMarkets', 'MARKET')//call store action
    },
    logOut(){
      this.$store.dispatch('LOG_USER_OUT', this.$store)
    }
  },
  watch: {
    user(value) {
      if(value === null || value === undefined) {
        this.$router.push('/')
      }
    }
  },
  created(){
    this.fetchNewsArticles();
    /* this.fetchTopCoins(); */
    /* this.fetchAllCoins(); */
    this.marketCoins();
  }
}
</script>

<style scoped>

/* .padding-bottom{
  padding-bottom: 20px
} */
</style>
