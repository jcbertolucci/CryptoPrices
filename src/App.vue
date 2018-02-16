<template>
  <div id="app">
    <v-app app class="white">
      <v-content flat class="text-xs-center mt-3 pt-3">
        <v-toolbar flat app color="accent" height="85px" class="elevation-4">
          <vue-menu></vue-menu>
        </v-toolbar>
        <router-view></router-view>   
        <vue-footer></vue-footer>
      </v-content> 
    </v-app>    
  </div>
</template>

<script>
import MenuTemplate from './components/MenuVuetify.vue'
import FooterTemplate from './components/Footer.vue'

export default {
  /* eslint-disable */
  
  name: 'app',

  components:{
    'vue-menu': MenuTemplate,
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

</style>
