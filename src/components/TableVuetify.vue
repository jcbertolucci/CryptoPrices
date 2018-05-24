<template id="TableVuetify">

  <!-- If called from Home page -->
  <v-data-table v-if="calledFromHomePath" :headers="coinTableHeader" :items="coinTableItems" hide-actions class="elevation-2" >
    <template slot="items" slot-scope="props" class="table">
      <td class="text-xs-left pl-0">
        <v-btn color="grey" small flat dark>
          <img :src="props.item.imageUrl" height="30">
        </v-btn>              
        <!-- {{ props.item.name }}-->
      </td>
      <td class="text-xs-right">{{ props.item.priceUsd }}</td>
      <td class="text-xs-right">{{ props.item.priceAud }}</td>
      <td class="text-xs-right">{{ props.item.marketCapUsd }}</td>
      <td class="text-xs-right">{{ props.item.volumeUsd }}</td>
      <td class="text-xs-right">{{ props.item.totalSupply }}</td>
      <td class="text-xs-right pr-2">
        <v-btn round outline color="error" class="error--text center" v-if="isNegative(props.item.dayPercVar)">{{ props.item.dayPercVar }}</v-btn>
        <v-btn round outline color="green" class="green--text center" v-else ="!isNegative(props.item.dayPercVar)">{{ props.item.dayPercVar }}</v-btn>
      </td>
      <td class="text-xs-right pr-2">
        <v-btn round outline color="error" class="error--text center" v-if="isNegative(props.item.weekPercVar)">{{ props.item.weekPercVar }}</v-btn>
        <v-btn round outline color="green" class="green--text center" v-else ="!isNegative(props.item.weekPercVar)">{{ props.item.weekPercVar }}</v-btn>
      </td>
    </template>
    <template slot="no-data">
      <!-- <v-progress-circular indeterminate v-bind:size=200 v-bind:width=3 color="deep-orange accent-4"></v-progress-circular> -->
    </template>
    <template slot="footer">
      <td colspan="100%">
        <i class="text caption right pr-3">Data retrivied from <a rel="stylesheet" href="https://coinmarketcap.com/" target="_blank">CoinMarket</a></i>
      </td>
    </template>
  </v-data-table>

  <!-- If called from Coins page -->
  <v-card v-else-if="calledFromCoinsPath"> 
    <v-card class="pb-3">
      <v-layout column></v-layout>
      <v-layout row justify-left align-center pa-0 ma-0>
        <v-flex id="first-left-flex"  xs1 offset-xs0 pa-0 ma-0>
          <v-subheader>Currency pair:</v-subheader>
        </v-flex>
        <v-flex id="first-select-flex" xs2 offset-xs0>
          <v-select
            single-line
            bottom
            :items="pairs"
            v-model="selectedPair"
            v-bind:label="selectedPair.name"
            single-line
            item-text="name"
            item-value="symbol"
            return-object
          ></v-select>
        </v-flex>
        <v-flex xs10 offset-xs1 pa-0 ma-0 pl-5>
          <v-subheader class="coins-title">{{filteredItems[0].name}}({{filteredItems[0].symbol}})/{{selectedPair.symbol}}</v-subheader>
        </v-flex>
      </v-layout>
      
      <v-layout row justify-left id="layout-bottom-coin-info" pa-0 ma-0> 
          <v-flex id="second-left-flex" xs1 offset-xs0 pa-0 ma-0>
            <v-subheader>Coin:</v-subheader>
          </v-flex>
          <v-flex id="second-select-flex" xs2 offset-xs0 pa-0 ma-0>
            <v-select
              single-line
              bottom
              :items="coinsForSearch"
              v-model="selectedCoin"
              v-bind:label="selectedCoin.name"
              single-line
              item-text="name"
              item-value="symbol"
              return-object
            ></v-select>
          </v-flex>
          
          <v-flex xs1 offset-xs0 class="cards-info" pa-0 ma-0 pl-5 ml-4 v-if="exchangesSelectedCoin.length > 1">
            <h2>LAST PRICE<span>{{filteredItems[0].coinInfo.PRICE}}</span></h2>
          </v-flex>
          <v-flex xs1 offset-xs0 class="cards-info" pa-0 ma-0 pl-5 v-if="exchangesSelectedCoin.length > 1">
            <h2>OPEN DAY<span>{{filteredItems[0].coinInfo.OPENDAY}}</span></h2>
          </v-flex>
          <v-flex xs1 offset-xs0 class="cards-info" pa-0 ma-0 pl-5 v-if="exchangesSelectedCoin.length > 1">
            <h2>LOW DAY<span>{{filteredItems[0].coinInfo.LOWDAY}}</span></h2>
          </v-flex>
          <v-flex xs1 offset-xs0 class="cards-info" pa-0 ma-0 pl-5 v-if="exchangesSelectedCoin.length > 1">
            <h2>HIGH DAY<span>{{filteredItems[0].coinInfo.HIGHDAY}}</span></h2>
          </v-flex>
          <v-flex xs1 offset-xs0 class="cards-info align-right" pa-0 ma-0 pl-5 v-if="exchangesSelectedCoin.length > 1">
            <h2 v-if="filteredItems[0].coinInfo.POSITIVE">DAILY CHANGE
              <span class="green--text">{{filteredItems[0].coinInfo.CHANGEPCTDAY}}</span>
            </h2>
            <h2 v-else="filteredItems[0].coinInfo.POSITIVE">DAILY CHANGE
              <span class="red--text">{{filteredItems[0].coinInfo.CHANGEPCTDAY}}</span>
            </h2>
          </v-flex>
          <v-flex xs1 offset-xs0 class="cards-info" pa-0 ma-0 pl-5 v-if="exchangesSelectedCoin.length > 1">
          <!-- color="green" class="green--text center" -->
            <h2>VOLUME DAY<span>{{filteredItems[0].coinInfo.VOLUMEDAY}}</span></h2>
          </v-flex>
          <v-flex xs1 offset-xs0 class="cards-info" pa-0 ma-0 pl-5 v-if="exchangesSelectedCoin.length > 1">
            <h2>LAST MARKET<span caption>{{filteredItems[0].coinInfo.LASTMARKET}}</span></h2>
          </v-flex>
          <v-flex xs1 offset-xs0 class="cards-info" pa-0 ma-0 pl-5 v-if="exchangesSelectedCoin.length > 1">
            <h2>LAST VOLUME<span>{{filteredItems[0].coinInfo.LASTVOLUME}}</span></h2>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-card>   

    <v-container dark  grid-list-md justify-left >
      <v-layout row justify-left pa-0 ma-0 >
        <v-flex xs4 text-left justify-left text-left>  
          <h1 v-if="exchangesSelectedCoin.length > 1" class="container-title text-left">Exchanges for pair: {{filteredItems[0].symbol}}/{{selectedPair.symbol}}</h1>
        </v-flex>
        <v-flex xs8 text-left justify-left >
          <h1 v-if="exchangesSelectedCoin.length > 1" class="container-title">Best price: <span class="primary--text">{{bestPriceExchange.MARKET}}</span></h1>
          <h1 v-if="exchangesSelectedCoin.length > 1" class="container-title --text">Best volume: <span class="primary--text">{{bestVolumeExchange.MARKET}}</span></h1>
        </v-flex>  
      </v-layout>  
      <template>
        <v-progress-linear
          :indeterminate="query"
          :query="true"
          v-model="value"
          :active="show"
        ></v-progress-linear>
      </template>
      <v-data-iterator
        content-tag="v-layout"
        row
        wrap
        :items="exchangesSelectedCoin"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        :no-data-text = "messageLoading"
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs12
          sm6
          md4
          lg3
        >
          <v-card class="card-coins">
            <v-card-title class="pa-3 ma-0 ">
              <h4 class="title">{{ props.item.MARKET }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content class="card-subtitle">Price</v-list-tile-content>
                <v-divider></v-divider>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Last Price:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  <h2>{{ props.item.PRICE }}</h2>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Last Volume:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  <v-btn flat >
                    <H4>{{ props.item.LASTVOLUME }}</H4><br><h6 class="space-between">{{selectedCoin.symbol}}</h6>
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Volume (24h):</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  <v-btn flat >
                    <H4>{{ props.item.VOLUME24HOUR }}</H4><br><h6 class="space-between">{{selectedCoin.symbol}}</h6>
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Open (24h):</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  <v-btn flat >
                    <H4>{{ props.item.OPEN24HOUR }}</H4>
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Low (24h):</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  <v-btn flat >
                    <v-icon color="green" left class="fas fa-long-arrow-alt-down"></v-icon> <H4>{{ props.item.LOW24HOUR }}</H4>
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>High (24h):</v-list-tile-content>
                <v-list-tile-content class="align-end ">
                  <v-btn flat >
                    <v-icon color="red" left class="fas fa-long-arrow-alt-up"></v-icon> <H4>{{ props.item.HIGH24HOUR }}</H4> 
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Change (24h):</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  <v-btn flat v-if="props.item.POSITIVE"> 
                      <h3 class="green--text">{{props.item.CHANGEPCT24HOUR}}</h3>
                  </v-btn>
                  <v-btn flat v-else="!props.item.POSITIVE"> 
                      <h3 class="red--text">{{props.item.CHANGEPCT24HOUR}}</h3> 
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      coinsForSearch: function(){
        let coinsForSearch = []
        let obj = {name:'', symbol: ''}
        this.allCoinsTableItems.map((item) => {
          obj.name = item.name
          obj.symbol = item.symbol
          coinsForSearch.push(obj)
          obj = {name:'', symbol: ''}
        })
        return coinsForSearch
      },
      selectedPair: {
        get: function () {
          return this.$store.getters.selectedPair
        },
        set: function (newValue) {
          this.queryAndIndeterminate()
          this.$store.dispatch("UPDATE_PAIR", newValue)
        }
      },      
      selectedCoin: {
        get: function () {
          return this.$store.getters.selectedCoin
        },
        set: function (newValue) {
          this.queryAndIndeterminate()
          this.$store.dispatch("UPDATE_COIN", newValue)
        }
      }, 
       marketCoinItems: {
        get: function () {  
          return this.$store.getters.marketCoinItems
        },
        set: function (newValue) {
          this.$store.dispatch("fetchCoinMarkets", 'MARKET')
        }
      }, 
      allCoinsTableItems: {
        get: function () {  
          return this.$store.getters.allCoinsTableItems          
        },
        set: function (newValue) {
          this.$store.dispatch("fetchAllCoins")
        }
      },
      calledFromCoinsPath: function(){
        //TODO

        return this.getRoutePath() === '/coins'
        /* return this.getRoutePath() === '/dashboard' */
      },
      calledFromHomePath: function(){
         return this.getRoutePath() === '/' 
 
      },
      filteredItems: function(){
        if (this.search.length <= 0) {
          return this.marketCoinItems
        }
        let filter = this.marketCoinItems.filter( (i) => {
          return i.symbol.toUpperCase() === this.selectedCoin.symbol
        }) 
        return filter
      },
      exchangesSelectedCoin: function(){
        let cheapestExchange = {}
        let biggestVolexchange = {}

        //Get cheapest exchange
        this.filteredItems[0].exchanges.sort(function(a,b){
          return a.RAWPRICE - b.RAWPRICE
        })        
        this.bestPriceExchange = this.filteredItems[0].exchanges[0]

        //Get top volume exchange
        this.filteredItems[0].exchanges.sort(function(a,b){
          return b.RAWVOLUME - a.RAWVOLUME
        })         
        this.bestVolumeExchange = this.filteredItems[0].exchanges[0]

        console.log(this.filteredItems[0].exchanges)

        return this.filteredItems[0].exchanges
      }
    },
    data(){
      return{
        bestPriceExchange: {},
        bestVolumeExchange: {},
        messageLoading: "Fetching real time data...",
        value: 0,
        query: false,
        show: true,
        interval: 0,
/*         tmp: '',
        noData: false,
        finishLoading: false, */
        search: 'BTC',
        pagination: {},
        rowsPerPageItems: [8,16,24,48],
        pagination: {
          rowsPerPage: 8
        },
        pairs:[
          {name: 'Australian Dollar', symbol: 'AUD'},
          {name: 'American Dollar', symbol: 'USD'}
        ]
      }
    },
    methods: {
      /* max25chars: (v) => v.length <= 25 || 'Input too long!', */
      print: ()=>{
        console.log(this.coinsForSearch)
        console.log(this.allCoinsTableItems)
      },
      isNegative: (number) =>{
        return number < 0 ? true : false
      },
      getRoutePath: ()=>{
        return window.location.pathname
      },
      queryAndIndeterminate () {
        this.query = true
        this.show = true
        this.value = 0
        this.query = false

        this.interval = setInterval(() => {
          if(this.exchangesSelectedCoin.length > 0){
          /* if (this.value === 100) { */
            clearInterval(this.interval)
            this.show = false
            //return setTimeout(this.queryAndIndeterminate, 2000)
          }else{
            //this.messageLoading = "No data available...Try change the pair. :)"
          }
          this.value += 20
        }, 2000)
      }
    },
    watch:{
      /* cheapestExchange: function(){

        return name
      } */
      
    },
    created(){
      this.print()
    },
    mounted(){
      this.queryAndIndeterminate()
    },
    beforeDestroy () {
      //clearInterval(this.interval)
    },
    
  }
</script>

<style scoped>
.parent{
  display: flex;
  flex-direction: row;
}
.item{
  width: 100%;
  padding-top: 10px;

}
.coins-title{
  font-size: 36px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.card-coins{
  margin: 05px;
  transition: .15s all ease-in-out;
}
/* .card-coins:hover {
 transform: scale(1.03); 
} */
.card-subtitle{
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 500
}
.card-content{
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  font-weight: 400
}
.cards-info{
  text-align: left
}
#layout-bottom-coin-info h2{
  font-size: 13px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  display:block;
  line-height: 2em;
}
#layout-bottom-coin-info h2 span{
  font-size: 22px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  display:block
}
#first-left-flex, #second-left-flex{
  max-width: 120px;
}
#first-select-flex, #second-select-flex{
  max-width: 170px;
}
.container-title{
  margin: 20px;
  font-size: 30px;
  text-align: left
}
.space-between{
  padding-left: 2px
}

</style>


