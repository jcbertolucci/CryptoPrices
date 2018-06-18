<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>

export default {
  /* eslint-disable */
  name: 'app',
  
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  methods: {
    fetchMarket(){
      this.$store.dispatch('FETCH_MARKET')//call store action
    },
    fetchTopCoins(){
      this.$store.dispatch('FETCH_TOP_COINS')//call store action
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
    this.fetchMarket();
    this.fetchTopCoins();
    this.marketCoins();
  }
}
</script>

<style>
/*Fonts*/
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro|Source+Sans+Pro:b|Open+Sans|Roboto:thin');
@import url('https://fonts.googleapis.com/css?family=Lato:200,300,400,700|Roboto:400,700');

/*Elements*/
*, ::before, ::after{
  transition: all ease-in-out 300ms;
  box-sizing: border-box;
}
body{
  --primary: #BF360C;
  --accent: #4A148C;
  --lightgrey: rgb(128,128,128, 0.1);
  --darkgrey: #263238;
  font-family: 'Lato', sans-serif;
}
</style>
