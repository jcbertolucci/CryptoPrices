<template>
  <v-app id="app">
    <v-content>
      <v-container grid-list-md text-xs-center class="grey lighten-3">
        <v-snackbar
          :timeout="5000"
          :top="true"
          :value=true
          >
          {{ firebaseMsg }}
            <v-btn flat color="pink" @click="snackbar = false">Close</v-btn>
        </v-snackbar> 
        
        <!-- MAIN LAYOUT -->
           <!-- First row -->
            <v-layout row justify-space-between square>
              <v-flex xs5>
                <v-card dark color="primary">
                  <v-card-text>Top Holdings</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs6>
                <v-card dark color="secondary">
                  <v-card-text>Portfolio Pie</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs6>
                <v-card dark color="accent">
                  <v-card-text>Portfolio summary</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <!-- First row -->
            <!-- Second row -->
            <v-layout row justify-space-between square>
              <v-flex xs5>
                <v-card dark color="primary">
                  <v-card-text>Bottom Holdings</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card dark color="secondary">
                  <v-card-text>CHart</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex xs12>
                <vue-table-portfolio :tableData="tableData"></vue-table-portfolio>
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
        'firebaseMsg'
      ])
    },  
    data(){
      return{
        maxCoins: 50,
        tableHeader: [
          { text: "Coins", sortable:false, value: 'coins'},
          { text: 'Price A$', value: 'priceAUD'},
          { text: 'Total Value', value: 'marketCapUsd'},
          { text: 'Profit/Loss', value: 'volumaUsd24h'},
          { text: 'Change', value: 'totalSupply'}
        ],
        tableData: [
          {name: 'Bitcoin', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ethereum', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Litecoin', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ripple', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ripple', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ripple', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ripple', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ripple', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ripple', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ripple', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ripple', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ripple', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'},
          {name: 'Ripple', price: '$4560,00', totalValue: '$4500,002', profitLoss: '$15.00k', change: '56.15%'}
        ]
      }
    },
    methods: {
    },
    created(){
      this.$store.dispatch('FETCH_PORTFOLIO_COINS', this.maxCoins)
    }
  }  
  
</script>

<style scoped>
.square{
  min-height: 300px;
}
</style>


