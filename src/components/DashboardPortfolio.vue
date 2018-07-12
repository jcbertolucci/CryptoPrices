<template>
  <div class="portfolio-main-parent">
    <div class="summary-data">

      <div class="summary-left">
        <h2>Total value</h2>
        <h4>A$</h4>
        <h1> 7897.00</h1>
      </div>
      <div class="summary-Mleft">
        <div class="summary-coins">
          <h2>Best coin</h2>
          <h4>Bitcoin</h4>
          <h1 class="red--text">-5%</h1>
        </div>
      </div>
      <div class="summary-Mright">
        <div class="summary-coins">
          <h2>Worst coin</h2>
          <h4>Ethereum</h4>
          <h1 class="red--text">-34%</h1>
        </div>
      </div>
      <div class="summary-right">
        <h2>Loss / Gain</h2>
        <h1 class="green--text">0.6%</h1>
      </div>
    </div>

    <div class="portfolio-table">
      <!-- menu -->
      <div class="white portfolio-menu">
        <div class="portfolio-menu-left">
          <h2 class="primary--text  pl-3 pt-2 pb-2">Portfolio</h2>
        </div>
        <div class="portfolio-menu-right">
          <v-btn color="primary">Add Coin</v-btn>
        </div>
      </div>
      <!-- menu -->

      <!-- table -->
      <div class="portfolio-table">
        <v-card flat>
          <v-data-table
            :headers="tableHeader"
            :items="treatedUser"
            hide-actions
            class="elevation-1 ma-0 pa-0"
          >
            <template slot="items" slot-scope="props" class="text-left">
              <td class="text-xs-left">{{ props.item.name }} <span class="space-between">({{ props.item.name }})</span> </td>
              <td class="text-xs-right">{{ props.item.buyDate }}</td>
              <td class="text-xs-right">{{ props.item.amount }}</td> 
              <td class="text-xs-right">{{ props.item.formatedBuyPrice }}</td>
              <td class="text-xs-right">{{ props.item.formatedCalculatedItem.totalValue }}</td>
              <td class="text-xs-right">{{ props.item.formatedCalculatedItem.currentPrice }}</td>
              <td class="text-xs-right">{{ props.item.formatedCalculatedItem.currentValue }}</td>
              <td class="text-xs-right">{{ props.item.formatedCalculatedItem.profitLoss }}</td>
              <td class="text-xs-right">{{ props.item.change}}</td>
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">
                Sorry, no coins. Try adding a new one :)
              </v-alert>
            </template>
          </v-data-table>

        </v-card>

      </div>
      <!-- table -->
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import utils from '../../src/utils/utils.js'

export default {
  data(){
    return{
      active: null,
      userCoins: [],
      tableHeader: [
        {
          text: 'Coin',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Bought on', align: 'right', value: 'boughtOn' },
        { text: 'Amount', align: 'right', value: 'amount' },
        { text: 'At Price', align: 'right', value: 'boughtAtPrice' },
        { text: 'Total Value', align: 'right', value: 'totalValue' },
        { text: 'Current Price', align: 'right', value: 'currentPrice' },
        { text: 'Current Value', align: 'right', value: 'currentValue' },
        { text: 'Profit/Loss', align: 'right', value: 'profitLoss' },
        { text: 'Change', align: 'right', value: 'change' },
        { text: 'Actions', align: 'center', value: 'name', sortable: false }
      ],
    }
  },
  computed: {
    ...mapGetters([
      'coinsUser'
    ]),
    treatedUser(){
      let symbol = ''
      let currency = ''
      let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      let url = ''
      let array = this.coinsUser
      array.map((item)=>{
        symbol = item.name
        currency = item.currency
        url = `https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${symbol}&tsym=${currency}`
        fetch(proxyUrl+url)
        .then(response => response.json())
        .then(function(data){ 
          console.log(data.Data)
          if(data.Data){
            item.calculatedItem.currentPrice = data.Data.AggregatedData.PRICE
            item.calculatedItem.currentValue =  (item.calculatedItem.currentPrice * item.amount)
            item.calculatedItem.totalValue = (item.buyPrice * item.amount)
            item.calculatedItem.profitLoss = (item.calculatedItem.currentValue - item.calculatedItem.totalValue)

            //Format numbers
            item.formatedBuyPrice = utils.formatNumbersCents(item.buyPrice)
            item.formatedCalculatedItem.currentPrice = utils.formatNumbersCents(data.Data.AggregatedData.PRICE)
            item.formatedCalculatedItem.currentValue =  utils.formatNumbersCents((item.calculatedItem.currentPrice * item.amount))
            item.formatedCalculatedItem.totalValue = utils.formatNumbersCents((item.buyPrice * item.amount))
            item.formatedCalculatedItem.profitLoss = utils.formatNumbersCents((item.calculatedItem.currentValue - item.calculatedItem.totalValue))
          }
        })
      })
      /* return this.coinsUser */
      return array
    }
  },
  watch: {
    coinsUser: (value) =>{
      return value
    }
  }
}
</script>
<style>
.portfolio-main-parent{
  display:grid;
  grid-template-rows: 1fr 2fr;
  grid-gap: 5rem;
}
.summary-data{
  display:grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  text-align: center;
}
.portfolio-table{
  
}
.summary-data h2{
  font-size: 28px;
  padding-bottom: 4%;
}
.summary-data h1{
  font-size: 50px;
}
.summary-right h1{
  font-size: 60px;
}
.portfolio-menu{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.portfolio-menu-right{
  text-align:right; 
}

</style>

