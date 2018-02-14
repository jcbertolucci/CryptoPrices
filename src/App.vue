<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>    
    </div>    
  </div>
</template>

<script>

export default {
  /* eslint-disable */
  name: 'app',

  methods: {
    fetchTopCoins(){
      this.$store.dispatch('fetchTopCoins')//call store action
    },
    fetchAllCoins(){
      this.$store.dispatch('fetchAllCoins')//call store action
    }
    ,
    fetchCoinMarkets(){
      this.$store.dispatch('fetchCoinMarkets')//call store action
    }
  },
  created(){
    this.fetchTopCoins();
    this.fetchAllCoins();
    this.fetchCoinMarkets();
  }
}
</script>

<style scoped>

</style>
