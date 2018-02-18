<!-- HTML -->
<template>
  <v-app app class="white">
    <!-- <v-toolbar flat app color="accent" height="85px" class="elevation-4">
      <vue-menu></vue-menu>
    </v-toolbar>
    <v-content flat class="text-xs-center mt-3 pt-3"> -->
      <br><br>
      <section id="theBusinness" flat xs12 class="accent lighten-3 top-block full-width" wrap justify-content-center >
        <br>
        <br>
        <br>
        <v-flex xs12>
          <img id="img-logo" src="/src/assets/incliti2.png" alt="avatar" height="90px" width="180px" class="elevation-5">
          <h3 class="white--text main-h3">Cryptocurrency portfolio and price comparison platform</h3>
        </v-flex>
        <br>
        <v-flex xs12 icon-top-block>
          <v-btn flat >
            <div style="font-size:3em; color:white">
              <i class="fab fa-github"></i>
            </div>
          </v-btn>
          <v-btn flat >
            <div style="font-size:3em; color:white">
              <i class="fas fa-envelope"></i>
            </div>
          </v-btn>
        </v-flex>  
        <v-flex xs12 btn-top-block>
          <v-btn outline class="large white white--text"to="/coins">Check coins</v-btn>
          <v-btn outline class="large white white--text" to="/portfolio">Create a portfolio</v-btn>
          <v-btn outline class="large white white--text" to="/signup">Sign Up</v-btn>
        </v-flex>
      </section>  

      <section id="features" class="white mt-5 mb-5 pb-5" grid-list-md text-xs-center >
        <v-layout row wrap>
          <v-flex xs12 text-xs-center>
            <h2 class="pb-5" >Tools</h2>
          </v-flex>          
          <v-flex xs4 text-xs-left>
            <v-card class="elevation-1 mt-5 ml-5 mr-4 mb-3"> 
              <trend 
                :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0, 15]"
                :gradient="['#A500FF', '#FE9714', '#A500FF']"
                auto-draw
                :height = 250 
                :width = 500
                smooth>
              </trend>
            </v-card>
            <h1 class="ml-5 mb-1 content-middle-block"><strong>Current and Historical Data</strong></h1>
            <h5 class="ml-5 mt-1 mr-3 content-middle-block">Incliti uses some insteresting and powerful APIs, such as CryptoCompare's and CoinMarket's. Thanks to them for allowing us to bring more people into the crypto's world.</h5>
          </v-flex>
          <v-flex xs4 text-xs-left>
            <v-card class="mt-5 ml-5 mr-4 mb-3"> 
              <pie-chart class="ma-1 pa-1" height="250px" width="500px" :donut="true" :colors="['#A500FF', '#52007F', '#743298', '#410065']" :data="{'Bitcoin': 45, 'Ethereum': 23, 'Iota': 17, 'Ripple': 15}"></pie-chart>
            </v-card>
            <h1 class="ml-5 mb-1 content-middle-block"><strong>Portfolio</strong></h1>
            <h5 class="ml-5 mt-1 mr-3 content-middle-block">Use our platform to control your cryptocurrency porfolio and take advantage of our charts and analysis tools.</h5>
          </v-flex>
          <v-flex xs4 text-xs-left>
            <v-card class="mt-5 ml-5 mr-4 mb-3"> 
              <trend
                :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0, 15]"
                :gradient="['#FFA500', '#FE9714', '#A500FF']"
                auto-draw
                :height = 250 
                smooth>
              </trend>
            </v-card>
            <h1 class="ml-5 mb-1 content-middle-block"><strong>Price Comparison</strong></h1>
            <h5 class="ml-5 mt-1 mr-3 content-middle-block">With real-time data, Incliti will support your decision making by gathering prices from Exchanges all over the globe.</h5>
          </v-flex>
        </v-layout>  
      </section>

      <section id="currencyTotals" class="full-width">
        <vue-parallax></vue-parallax>
      </section>

      <section id="technologiesUsed" class="pt-5 mt-5">
        <h2>Technologies underneath this project
          <span>Our deepest thanks to:</span>
        </h2>
        <v-layout class="mt-3" row wrap>
          <v-flex xs3>
            <v-avatar
              :tile=false
              size="300px"
              class="white pt-0 mt-0"
            >
              <img src="/src/assets/vue-logo.svg" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs3 >
            <v-avatar
              :tile=false
              size="180px"
              class="white pt-4 mt-5"
            >
              <img src="/src/assets/vuetify-logo.png" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs3 >
            <v-avatar
              :tile=false
              size="200px"
              class="white pt-4 mt-4"
            >
              <img src="/src/assets/chartjs-logo.jpg" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs3 >
            <v-avatar
              :tile=false
              size="250px"
              class="white pt-2 mt-2"
            >
              <img src="/src/assets/firebase-logo.png" alt="avatar">
            </v-avatar>
          </v-flex>              
        </v-layout>
        <v-layout id="technologiesUsedInnerDiv" class="mt-0" row wrap>
          <v-flex xs3>
            <h2>Vue.js
              <span>The Progressive JavaScript Framework</span>
            </h2>
          </v-flex>
          <v-flex xs3>
            <h2>Vuetify
              <span>Material Component Framework</span>
            </h2>
          </v-flex>
          <v-flex xs3>
            <h2>Chart.js
              <span>Simple yet flexible JavaScript charting for designers & developers</span>
            </h2>
          </v-flex>
          <v-flex xs3>
            <h2>Firebase
              <span>Firebase helps you build better mobile apps and grow your business</span>
            </h2>
          </v-flex>
        </v-layout>
      </section>
      <!-- <br><br><br>
      <vue-topcoins></vue-topcoins>
      <br><br><br>
      <vue-twitterfeed></vue-twitterfeed> -->
    </v-content>
    <br><br><br><br><br><br>
    <!-- <v-btn
        color="primary"
        dark
        fab
        fixed
        bottom
        right
        class="mb-5 pb-5"
      >
        <v-icon @click="topPage()">keyboard_arrow_up</v-icon>
      </v-btn> -->
    <!-- <vue-footer class="full-width" name="footer"></vue-footer> -->
  </v-app>
  
</template>

<!-- Vue -->
<script>
  /* import MenuTemplate from './MenuVuetify.vue'
  import SubMenuTemplate from './SubMenu.vue' */
  import TopCoinsTemplate from './TopCoins.vue'
  import TwitterTemplate from './TwitterFeed.vue'
  /* import FooterTemplate from './Footer.vue' */
  import ParallaxTemplate from './Parallax.vue'
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
  import * as firebase from 'firebase'
  
  export default {
    components: {
      /* 'vue-menu': MenuTemplate, */
      /* 'vue-submenu': SubMenuTemplate, */
      /* 'vue-topcoins': TopCoinsTemplate, */
      /* 'vue-twitterfeed': TwitterTemplate, */
      /* 'vue-footer': FooterTemplate, */
      'vue-parallax': ParallaxTemplate
    },
    computed:{
      ...mapGetters([
        'user'
      ])
    },
    data(){
      return{
        windowSize: {
          x: 0,
          y: 0
        }
      }
    },
    methods:{
      /* topPage: function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      } */
    },
    created(){
      /* console.log(this.user.email)
      console.log(firebase.auth().currentUser)
      console.log(this.$router) */
    },/* ,
    mounted(){
      this.topPage()
    } */
    
  }
 
</script>
  


<!-- Style -->
<style scoped>
.footer{
  height: 150px;
  padding: 0;
  margin: 0;
  margin-top: 100px
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
.full-width{
  margin: auto;
  margin-left: -100px;
  margin-right: -100px;
}
.top-block{
  background-image: url('../../src/assets/gradient1.jpg');
  background-size:100%;
}
.middle-block{
  height: 450px;
  width: 100%;
  width: 100vw;
}
 h2.content-middle-block{
  font-size: 23px;
  font-weight: 400;
  line-height: 2em;
  font-family: 'Roboto', sans-serif;
}
  h5.content-middle-block{
  font-size: 22px;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
 }
 .main-h3{
  font-size: 50px;
  font-weight: 200;
  font-family: 'Roboto', sans-serif;
 }
.btn-top-block{
  padding-top: 5%;
  padding-bottom: 2%
}
#img-logo{
  margin-top: 1%;
  margin-bottom: 1%
}
#technologiesUsed h2{
  font-size: 60px;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
  display:block;
  line-height: 1.2em;
}
#technologiesUsed h2 span{
  font-size: 32px;
  font-weight: 200;
  font-family: 'Roboto', sans-serif;
  display:block
}
#technologiesUsedInnerDiv h2{
  font-size: 28px;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
  display:block;
  line-height: 1.3em;
}
#technologiesUsedInnerDiv h2 span{
  font-size: 23px;
  font-weight: 200;
  font-family: 'Roboto', sans-serif;
  display:block
}
#features h2{
  font-size: 60px;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
  display:block;
  line-height: 1.2em;
}


</style>


