<template id="NewsTemplate">
    <div class="reset-space wrapper">
      <div class="card reset-space border" v-for="news in newsArray" >
        <img class="card-img-top reset-space" :src="news.urlToImage" alt="Card image cap">
        <div class="card-block">
          <h4 class="card-title">{{news.title}}</h4>
          <p class="card-text"><a :href="news.url"></a>{{news.description}}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
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
      newsArray: []
    }
  },
  created(){
    this.$http.get('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=e07d207ff3204ba380935338b1acf48f')
    .then(function(data){
      this.newsArray = data.body.articles;
    })
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
