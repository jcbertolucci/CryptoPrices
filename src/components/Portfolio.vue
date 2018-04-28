<template>
  <v-app id="app">
    <v-content>
      <v-container grid-list-md text-xs-center class="grey lighten-3">
        <!-- MAIN LAYOUT -->
           <!-- First row -->
            <v-btn
              color="primary"
              dark
              fab
              fixed
              bottom
              right
              class="mb-5 pb-5"
              @click="goHome"
            >
              <v-icon >home</v-icon>
            </v-btn>
            <v-layout row justify-space-around align-center>
              <v-flex align-left xs4 pa-2>
                <v-card-text class="display-1 primary white--text card-title">Summary</v-card-text>
                <v-card class="chart-height">
                  <v-layout class="flex-parent">
                    <v-flex xs5>
                      <v-avatar class="ma-3" size="84px">
                        <img src="https://yt3.ggpht.com/-7fehKFObe38/AAAAAAAAAAI/AAAAAAAAAAA/-fIKecIb4x4/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="avatar">
                      </v-avatar>
                    </v-flex>
                    <v-flex xs7 ma-3 class="align-end">
                      <h3>Portfolio</h3>
                      <v-divider></v-divider>
                      <h3>Coins</h3>
                      <v-divider></v-divider>
                    </v-flex>  
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex xs8 pa-2>
                <v-card-text class="display-1">Portfolio</v-card-text>
                <v-card class="chart-height">
                  
                </v-card>
              </v-flex>
              <!-- <v-flex xs4>
                <v-card class="chart-height">
                  <v-card-text>Portfolio Pie</v-card-text>
                  <vue-chart type="pie" borderSkipped="bottom" :data="chartDataTopHoldings"></vue-chart>
                </v-card>
              </v-flex>
              <v-flex xs4>
                <v-card class="chart-height">
                  <v-card-text>Portfolio summary</v-card-text>
                  <vue-chart type="pie" borderSkipped="bottom" :data="chartDataTopHoldings"></vue-chart>
                </v-card>
              </v-flex> -->
            </v-layout>
            <!-- First row -->
            <!-- Second row -->
            <v-layout row square>
              <!-- <v-flex xs4>
                <v-card >
                  <v-card-text>Chart</v-card-text>
                  <vue-chart type="line" :data="chartDataBottomRight"></vue-chart>
                </v-card>
              </v-flex> -->
              <v-flex xs12 pa-2>
                <vue-table-portfolio></vue-table-portfolio>
              </v-flex>
            </v-layout>
              

            <!-- Second row -->
        <!-- MAIN LAYOUT -->
      </v-container>  
    </v-content>
  </v-app>  
</template>

<script>
  import {mapGetters} from 'vuex'
  import PortfolioTableTemplate from './PortfolioTable.vue'

  export default{
    components:{
      'vue-table-portfolio': PortfolioTableTemplate
    },    
     created(){
    },
    computed: {
      ...mapGetters([
        'user',
        'coinsUser'
      ])
    },  
    watch: {
      coinsUser: (value) =>{
        /* this.$store.dispatch('CALCULATE_COINS_VALUES')  */
        return value
      }
    },
    data(){
      return{
        chartDataBottomRight: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Your Portfolio (k)',
                    data: [10, 12, 13, 11.5, 12.2, 13,11, 12, 13, 11.5, 12, 12.5]
                }
            ]
        },
        chartDataTopHoldings: {
            labels: ['Item 1', 'Item 2', 'Item 3'],
            datasets: [
                {
                    label: 'Component 1',
                    data: [10, 20, 30]
                },
                {
                    label: 'Component 2',
                    data: [20, 30, 70]
                }
            ]
        },
        maxCoins: 50        
      }
    },
    methods: {
      onDismissed(){
      }
    },
    goHome(){
      this.$router.push(this.$route.query.redirect || '/')
    },
    created(){
      this.$store.dispatch('FETCH_PORTFOLIO_COINS')
      //this.$store.dispatch('CALCULATE_COINS_VALUES')
    }/* ,
    beforeMount(){
      this.$store.dispatch('CALCULATE_COINS_VALUES')
    } */
  }  
  
</script>

<style scoped>
.square{
  min-height: 300px;
}
.chart-height{
  height: 200px;
}
.chart-size{
  height: 200px;
}
#chart{
  max-height: 200px;
}
.card-title{
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-align: left
}
.flex-parent{
  display: flex;
}

</style>


