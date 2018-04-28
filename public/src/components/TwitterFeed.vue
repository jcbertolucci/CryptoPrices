<template>
  <div>
    <!--HEADER-->
    <v-toolbar color="primary lighten-1  accent--text" light dense prominent>
      <i class="fab fa-twitter fa-3x"></i>
      <v-toolbar-title class="headline">Tweets</v-toolbar-title>
    </v-toolbar> 
    <!--CONTENT CARDS-->  
    <v-container fluid grid-list class="pa-0 pt-2 elevation-2">
      <v-layout row wrap>
        <v-flex v-bind="{ [`xs${item.flex}`]: true}" v-for="item in twitters" :key="item.id">
          <v-card class="ma-3">
            <v-layout column wrap text-xs-center>
              <v-flex xs12>
                <v-card align-center color="primary lighten-1" >
                  <v-flex xs12 pl-5 pr-5 mr-5 ml-5 pt-1>
                    <v-avatar size="100px">
                      <img :src="item.urlImg" alt=""></img>
                    </v-avatar>  
                    <v-layout row wrap text-xs-center>
                      <v-flex>
                        <br>
                        <p class="title white--text"><strong>{{item.name}}</strong></p>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap text-xs-center>
                      <v-flex x4>
                        <span>Tweets</span><br>
                        <strong class="title" >3,581</strong>
                      </v-flex>  
                      <v-flex x4>
                        <span>Following</span><br>
                        <strong class="title">270</strong>
                      </v-flex>
                      <v-flex x4>
                        <span>Followers</span><br>
                        <strong class="title">22.5K</strong>
                      </v-flex>
                      <v-flex x4>
                        <span>Likes</span><br>
                        <strong class="title">4,294</strong>
                      </v-flex>
                    </v-layout>
                   </v-flex>
                </v-card>
                <v-card>
                </v-card>
              </v-flex>
                <br>
                <v-flex x12>
                <v-card>
                  <div class="scrollable-content">
                    <a class="twitter-timeline" href="https://twitter.com/Beetcoin?ref_src=twsrc%5Etfw">
                      <v-progress-circular indeterminate v-bind:size="100" v-bind:width="2" color="light-blue lighten-1"></v-progress-circular>
                    </a>  
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        
        <!-- <v-expansion-panel>
          <v-expansion-panel-content xs6 hide-actions v-for="twitter in twitters">
            <v-layout align-center row spacer slot="header">
              <v-flex xs1>
                <v-avatar size="80px" slot="activator">
                  <img :src="twitter.urlImg" alt="">
                </v-avatar>
              </v-flex>
              <v-flex xs3>
                <strong>{{twitter.name}}</strong>
              </v-flex>
              <v-flex no-wrap>
                <strong><a :href="twitter.twitterLink" target="_blank">{{twitter.link}}</a></strong>
              </v-flex>
              <v-flex
                class="grey--text"
                ellipsis
                left
              >
                <v-chip left label small color="red lighten-4" class="ml-0">1 new</v-chip>
                <strong>Twitter</strong>
              </v-flex>
            </v-layout>
            <v-card class="scrollable-content" light>
              <v-divider></v-divider>
              <div >
                <a class="twitter-timeline" href="https://twitter.com/Beetcoin?ref_src=twsrc%5Etfw"></a>  
              </div>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel> -->
      </v-layout> 
    </v-container>
  </div>
  
</template>

<script>
  export default {
    data () {
      return {
        twitters:[
          {flex:'4',id:'1',link:'@Beetcoin',urlImg:'https://pbs.twimg.com/profile_images/934558287013580800/EkOn-vRm_400x400.jpg', name:'Beetcoin', twitterLink: 'https://twitter.com/beetcoin', description:'Thank you for joining our community and for using Vuetify in your projects'},
          {flex:'4',id:'2',link:'@crypto_rand',urlImg:'https://pbs.twimg.com/profile_images/951839540746096644/EhZoQfQf_400x400.jpg', name:'Crypto Rand', twitterLink: 'https://twitter.com/crypto_rand', description:'Thank you for joining our community and for using Vuetify in your projects'},
          {flex:'4',id:'3',link:'@CryptoFacto',urlImg:'https://pbs.twimg.com/profile_images/940303971641520128/QgJi9pbM_400x400.jpg', name:'Crypto Facto', twitterLink: 'https://twitter.com/cryptofacto', description:'Thank you for joining our community and for using Vuetify in your projects'},
          {flex:'6',id:'4',link:'@Crypto_Analyst',urlImg:'https://pbs.twimg.com/profile_images/826360195496411136/uT-tlUib_400x400.jpg', name:'Crypto Analyst', twitterLink: 'https://twitter.com/Crypto_Analyst', description:'Thank you for joining our community and for using Vuetify in your projects'},
          {flex:'6',id:'5',link:'@CryptoCobain',urlImg:'https://pbs.twimg.com/profile_images/549171123884392448/tzURuJbe_400x400.jpeg', name:'Crypto Cobain', twitterLink: 'https://twitter.com/CryptoCobain', description:'Thank you for joining our community and for using Vuetify in your projects'}          
          /* {flex:'4',id:'6',link:'@CryptoChoe',urlImg:'https://pbs.twimg.com/profile_images/953082059156742144/ZhgOVHcy_400x400.jpg', name:'Eric Choe', twitterLink: 'https://twitter.com/CryptoChoe', description:'Thank you for joining our community and for using Vuetify in your projects'},          
          {flex:'4',id:'7',link:'@davidgokhshtein',urlImg:'https://pbs.twimg.com/profile_images/959022218138279936/9ofMEtXs_400x400.jpg', name:'David Gokhshtein', twitterLink: 'https://twitter.com/davidgokhshtein', description:'Thank you for joining our community and for using Vuetify in your projects'},          
          {flex:'4',id:'8',link:'@Crypto_Bitlord',urlImg:'https://pbs.twimg.com/profile_images/961733806213414913/FSxImibP_400x400.jpg', name:'฿ITLORD', twitterLink: 'https://twitter.com/Crypto_Bitlord', description:'Thank you for joining our community and for using Vuetify in your projects'},          
          {flex:'4',id:'9',link:'@CryptoGat',urlImg:'https://pbs.twimg.com/profile_images/955070280560467968/zQnwyBdS_400x400.jpg', name:'Ivan S. (CryptoGat)', twitterLink: 'https://twitter.com/CryptoGat', description:'Thank you for joining our community and for using Vuetify in your projects'} */
          /* {id:'',link:'@n00bqu33n',urlImg:'https://pbs.twimg.com/profile_images/945648775271469056/2_X4W89c_400x400.jpg', name:'n00bqu33n ', twitterLink: 'https://twitter.com/n00bqu33n', description:'Thank you for joining our community and for using Vuetify in your projects'},          
          {id:'',link:'@missnatoshi',urlImg:'https://pbs.twimg.com/profile_images/961698727307108352/oNh6URPe_400x400.jpg', name:'MISSNATOSHI  ', twitterLink: 'https://twitter.com/missnatoshi', description:'Thank you for joining our community and for using Vuetify in your projects'},           */
        ]
        
      }
    },
    computed: {
      today: function(){
        let date = new Date()
        return date.toLocaleDateString();
      }
    }
  }
</script>

<style>
 .scrollable-content {
  height: 400px;
  overflow: auto
}
/*
.margin{
  margin: 0.1%
}
  
.margin-right{
  margin-right: 2%
} */

</style>
