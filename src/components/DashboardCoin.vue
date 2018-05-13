<template>
  <div id="template-coin-parent">
    <div id="content-coin1">
      <v-progress-circular v-if="loading" :size="100" indeterminate color="primary" id="loading-circular"></v-progress-circular>
      <prices-template v-else-if="!loading"></prices-template>
    </div>
    <!-- <div id="content-news">
      <news-template></news-template>
    </div> -->
  </div>  
</template>

<script>
  import NewsTemplate from './News.vue'
  import PricesTemplate from './PricesTemplate.vue' 

  export default{
    components: {
      'news-template': NewsTemplate,
      'prices-template': PricesTemplate
    }, 
    data(){
      return{
        
      }
    },
    computed:{
      loading: function(newValue){
        return this.$store.getters.loading
      }
    },
    watch:{
      loading: function(newValue){
        return newValue
      }
    }
  }
  
</script>

<style>
  #template-coin-parent{
    display: flex;
    flex-direction: column;
  }
  #content-coin1{
    flex: 1;
  }

</style>

