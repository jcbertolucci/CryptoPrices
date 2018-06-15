<template>
  <div class="wrapper">
    <div class="titles">
      <h2>Markets</h2>
      <h4>
        <span class="field-title">Cryptocurrencies</span> <span class="field-value">1604</span>
        <span class="field-title">Markets:</span> <span class="field-value">10837</span>
        <span class="field-title">Market Cap:</span> <span class="field-value">$15.6789987,00</span>
        <span class="field-title">24h Volume:</span> <span class="field-value">$15.6789987,00</span>
      </h4>
    </div>
    <div id="search-bar-container">
      <v-text-field 
        id="search-bar"
        solo
        append-icon="search"
        label="Search Coin"
        v-model="searchText"
        >
      </v-text-field>
      <v-select
        id="combo-pair"
        single-line
        bottom
        :items="pairs"
        v-model="selectedPair"
        v-bind:label="selectedPair.name"
        single-line
        item-text="name"
        item-value="symbol"
        return-object
        class="wrapper"
      >
      </v-select>
    </div>
    <v-container id="container" fluid grid-list-md pa-0 ma-0>
      <v-data-iterator
        content-tag="v-layout"
        row
        wrap
        :search="searchText"
        :items="marketCoinItems"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs12
          sm6
          md4
          lg3
        >
          <v-card id="card">
            <v-card-title>
              <v-avatar size="34" class="pr-3">
                <img :src="props.item.imageUrl">
              </v-avatar>
              <h2>{{ props.item.name }}</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content class="card-content-left">Price:</v-list-tile-content>
                <v-list-tile-content class="card-content-right-bigger align-end" v-if="selectedPair.symbol === 'AUD'">{{ props.item.priceAud }}</v-list-tile-content>
                <v-list-tile-content class="card-content-right-bigger align-end" v-else-if="selectedPair.symbol === 'USD'">{{ props.item.priceUsd }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content class="card-content-left">Change day(%):</v-list-tile-content>
                <v-list-tile-content v-if="isNegative(props.item.coinInfo.CHANGEPCTDAY)" class="card-content-right-smaller align-end red-text">{{ props.item.coinInfo.CHANGEPCTDAY }}</v-list-tile-content>
                <v-list-tile-content v-else-if="!isNegative(props.item.coinInfo.CHANGEPCTDAY)" class="card-content-right-smaller align-end green--text">{{ props.item.coinInfo.CHANGEPCTDAY }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content class="card-content-left">Low Day:</v-list-tile-content>
                <v-list-tile-content class="card-content-right-smaller align-end">{{ props.item.coinInfo.LOWDAY }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content class="card-content-left">High Day:</v-list-tile-content>
                <v-list-tile-content class="card-content-right-smaller align-end">{{ props.item.coinInfo.HIGHDAY }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content class="card-content-left">Volume Day:</v-list-tile-content>
                <v-list-tile-content class="card-content-right-smaller align-end">{{ props.item.coinInfo.VOLUMEDAY }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <br>
            <!--EXCHANGES -->
            <h3 class="pl-3">Exchanges</h3>
            <v-list id="exchanges-list" dense>
              <v-list-tile v-for="item in props.item.exchanges" :key="item.MARKET">
                <v-list-tile-content class="card-content-left">{{ item.MARKET }}</v-list-tile-content>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-list-tile-content v-if="item.MARKET.toUpperCase() === 'BTCMARKETS'"><v-btn color="green" small outline>Buy</v-btn></v-list-tile-content>  
                <v-list-tile-content class="card-content-right-smaller align-end">{{ item.PRICE }}</v-list-tile-content>
              </v-list-tile>
            </v-list> 
            <v-divider></v-divider>
            <v-list id="exchanges-summary" dense color="white">
              <v-list-tile>
                <v-list-tile-content class="card-content-left">Cheapest:</v-list-tile-content>
                <v-list-tile-content class="align-end">BtcMarkets</v-list-tile-content>
              </v-list-tile>
            </v-list> 
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </div>  
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      searchText:"",
      pairs:[
        {name: 'Australian Dollar', symbol: 'AUD'},
        {name: 'American Dollar', symbol: 'USD'}
      ],
      rowsPerPageItems: [],
      pagination: {
        /* rowsPerPage: 100 */
        rowsPerPage: 100
      }
      
    }),
    methods:{
      isNegative: (number)=>{
        let convNumber = 0
        if (typeof number === "string"){
          convNumber  = parseFloat(number)
        }
        return convNumber < 0 ? true : false
      }/* ,
      sortASCExchangesPrices: (exchanges)=>{
        let sortedExchanges = exchanges.sort((a,b) => {
          return parseFloat(a.PRICE) - parseFloat(b.PRICE)
        });
        return sortedExchanges
      } */
    },
    watch:{
      searchText: function(newVal, oldVal) {
        return newVal
      },
      selectedPair: function(newVal, oldVal) {
        return newVal
      },
      marketCoinItems: function(newVal, oldVal){
        let coinsWithExchanges = newVal.filter(coin=> coin.exchanges.length > 0)
        /* coinsWithExchanges.map((item) => {
          item.exchanges.sort((a,b) => {
            return parseFloat(a.PRICE) - parseFloat(b.PRICE)
          });
        }) */
        return coinsWithExchanges
      }
    },
    computed:{
      marketCoinItems() {
        let coinsWithExchanges = this.$store.getters.marketCoinItems.filter(coin=> coin.exchanges.length > 0)
        coinsWithExchanges.map((item) => {
          item.exchanges.sort((a,b) => {
            return parseFloat(a.PRICE) - parseFloat(b.PRICE)
          });
        })
        return coinsWithExchanges
      },
      selectedPair: {
        get: function () {
          return this.$store.getters.selectedPair
        },
        set: function (newValue) {
          console.log(newValue) 
          this.$store.dispatch("UPDATE_PAIR", newValue)
        }
      }
      
    }  
  }
</script>

<style>
#search-bar-container{
  align-items: center;
  display: flex;
  flex-direction: row;
  padding-bottom: 2%;
}
#search-bar{
  flex: 1;
}
#combo-pair{
  padding-left: 5%;
  flex: 2;
}
.wrapper{
  min-height: 100%;
}
.titles{
  border-bottom: 1px solid grey;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.titles h2{  
  align-self: baseline;
  font-size: 30px;
  /* color: rgba(247, 241, 241, 0.473) */
}
.field-title{  
  font-size: 17px;
  padding-left: 10px;
  font-weight: 300;
}
.field-value{  
  font-size: 20px;
  font-weight: 400;
  color: rgb(255, 40, 2);
}
.card-content-left{
  font-size: 13px;
  font-weight: 400;
}
.card-content-right-bigger{
  font-size: 18px;
  font-weight: 600;
}
.card-content-right-smaller{
  font-size: 14px;
  font-weight: 500;
}
.red-text{
  color: rgb(241, 63, 19);
}
#exchanges-summary .align-end{
  font-size: 15px;
  font-weight: 600;
}
#card{
  margin-bottom: 15px;
}
h3{
  font-size: 20px;
  font-weight: 600;
}
#container h2{
  font-size: 24px;
}
</style>

