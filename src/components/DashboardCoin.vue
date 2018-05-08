<template>
  <div id="template-coin-parent">
    <div id="search-bar" class="mt-5">
      <v-text-field 
        solo
        append-icon="search"
        label="Search Coin"
        v-model="search"
        ></v-text-field>
    </div>
    <div id="content-coin1">
      <v-progress-circular v-if="loading" :size="100" indeterminate color="primary" id="loading-circular"></v-progress-circular>
      <prices-template v-else-if="!loading" :searchText="search"></prices-template>
    </div>
    <div id="content-news">
      <news-template></news-template>
    </div>
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
        search:""
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
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 130px 1fr;
    grid-template-areas: "search search search news"
                          "content1 content1 content1 news";  
    grid-gap: 1%;
    min-height: 100%;   
  }
  #search-bar{
    grid-area: 1 / 2;
  }
  #content-coin1{
    position: relative;
    grid-area:content1;
    margin-left: 2%;
  } 
  /* #content-coin2{
    background-color: white;
    grid-area:content2;
  } 
  #content-coin3{
    background-color: white;
    grid-area:content3;
  }  */
  #content-news{
    grid-area:news;
    margin-left: 2%;
    margin-bottom: 2%;
  } 
  #loading-circular{
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>

