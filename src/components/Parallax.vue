<template>
  <v-parallax src="../../src/assets/moon.jpg" >
    <v-layout column align-center justify-center>
      <h1 class="font">{{totalCoins}} cryptocurrencies have been created on Earth.</h1>
    </v-layout>
  </v-parallax>
</template>

<script>
import {mapGetters} from 'vuex'

  export default {
    data(){
      return{
      }      
    },
    computed:{
      ...mapGetters([
        'totalCoins'
      ])
    },  
    created(){
    }    
  }
</script>
<style scoped>
h1.font{
  font-size: 60px;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
}
.block{
  height: 430px;
  width: 100%;
  width: 100vw;
  padding-left: 0%;
  padding-right: 0%;
  margin-left: -80px;
  margin-right: 0px
}
</style>
