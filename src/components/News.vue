<template id="NewsTemplate">
    <div class="reset-space wrapper">
      <div class="card reset-space image" v-for="news in newsArray" >
        <img class="reset-space" :src="news.urlToImage" alt="Card image cap">
        <div class="media-content">
          <p class="card-header-title">John Smith</p>
          <p class="subtitle is-6">@johnsmith</p>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      msg:'News',
      newsArray: [],
      newsArray2: []
    }
  },
  methods:{
    fecthApiGuardian: function(){
      //let self=this;
      let today = new Date();
      let searchMonth = today.getMonth()+1
      let searchYear = today.getFullYear();
      let dateSearchFrom = searchYear + '-' + searchMonth + '-' + '01'
      let apiKey = 'a27dfb18-0f44-413b-a569-956b74a5127a';
      let url = `https://content.guardianapis.com/search?q=crypto/blockchain/bitcoin&format=json&from-date=${dateSearchFrom}&show-tags=contributor&show-fields=starRating,headline,thumbnail,short-url&order-by=relevance&api-key=${apiKey}`

      this.$http.get(url).then(function(data){ this.newsArray2 = data.body.response.results });            
    },
    fetchApiNews: function(){
      this.$http.get('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=e07d207ff3204ba380935338b1acf48f')
      .then(function(data){
        this.newsArray = data.body.articles.filter(function(article){
          return article.description.length > 3 //to avoid "..." description
        });
        console.log(this.newsArray);
      })
    }   
  },
  mounted(){
    this.fetchApiNews();
    this.fecthApiGuardian();
  }
}
</script>

<style scoped>
.reset-space{
  padding: 0px;
  margin: 0px;
  border: 0px;
}

</style>
