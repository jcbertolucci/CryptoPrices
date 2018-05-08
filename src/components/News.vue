<template id="NewsTemplate">
  <div class="mt-4 news-wrapper">
    <div class="news">
      <v-card v-for="(item, index) in newsArticles" :key="index" class="mb-2 mr-1">
        <v-card-media :src="item.urlToImage" height="120px">
        </v-card-media>
        <v-card-title primary-title class="mt-0 pt-3">
          <div>
            <div class="custom-headline pb-3"><a :href="item.url" target="_blank">{{item.title}}</a></div>
            <div class="custom-content">{{item.description}}</div>
          </div>
        </v-card-title>
         <!--<v-card-actions>
          <v-btn right flat color="primary" :href="item.url" target="_blank">Go to Page </v-btn>
        </v-card-actions> -->
      </v-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      msg:'News',
      newsArray: [],
    }
  },
  computed:{
    ...mapGetters([
      'newsArticles'
    ])
  },
  methods:{
    /* fecthApiGuardian: function(){
      //let self=this;
      let today = new Date();
      let searchMonth = today.getMonth()+1
      let searchYear = today.getFullYear();
      let dateSearchFrom = searchYear + '-' + searchMonth + '-' + '01'
      let apiKey = 'a27dfb18-0f44-413b-a569-956b74a5127a';
      let url = `https://content.guardianapis.com/search?q=crypto/blockchain/bitcoin&format=json&from-date=${dateSearchFrom}&show-tags=contributor&show-fields=starRating,headline,thumbnail,short-url&order-by=relevance&api-key=${apiKey}`
      this.$http.get(url).then(function(data){ this.newsArray.push(data.body.response.results) }).catch(error => {console.log(error)});   
      console.log("fecthApiGuardian")
      
    } */
  }
}
</script>

<style scoped>
.reset-space{
  padding: 0px;
  margin: 0px;
  border: 0px;
}
.news{
  position: fixed;
  width: 20%;
  height: 85%;
  overflow-y: auto;
}
.custom-headline{
  font-weight: bold;
  line-height: 1.5;
  padding-bottom: 2%;
  text-align:justify;
  text-decoration: none;
  font-size: 16px;
}
.custom-headline a{
  text-decoration: none;
}
.custom-content{
  line-height: 20px;
  text-align: justify;
  font-size: 14px;
}

</style>
