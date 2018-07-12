<template>
  <div id="template-wallet-parent">
      <div v-if="userExchanges.length > 0" class="titles">
        <!-- <h2><span class="field-title"></span>Bitcoin</h2> -->
        <h2><span class="field-title">Exchange: </span>BtcMarkets</h2>
        <h4>
          <!-- <span class="field-title">Cryptocurrencies</span> <span class="field-value">1604</span>
          <span class="field-title">Markets:</span> <span class="field-value">10837</span> -->
          <span class="field-title">Market Cap:</span> <span class="field-value">$15.6789987,00</span>
          <span class="field-title">24h Volume:</span> <span class="field-value">$15.6789987,00</span>
        </h4>
      </div>
      <v-snackbar
        :timeout="timeout"
        :top="true"
        :color='color'
        v-model="snackbar"
        :multi-line="true"
      >
        {{ toastMessage }}
        <v-btn flat @click.native="snackbar = false">Dismiss</v-btn>
      </v-snackbar>
        <div v-if="userExchanges.length > 0" class="content-middle">
            <div flat class="content-middle-card-data" tile="true">
                <div class="content-middle-card-container-inside-card">
                  <v-card id="card-account" flat>
                    <!-- <h2>Account Summary</h2> -->
                    <h2 class="white primary--text pl-3 pt-1 pb-1">Account Summary</h2>
                    <div v-if="loading1" class="no-data-available">
                      <v-progress-circular id="circular-progress" :size="100" :width="5" :indeterminate="true" color="primary"></v-progress-circular>
                    </div>
                    <div v-if="!loading1" class="data-available">
                        <v-data-table
                          :headers="headerAccount"
                          :items="userBalance"
                          id="data-table-account"
                          :rows-per-page-items=[5]
                        >
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-left">{{ props.item.currency }}</td>
                            <td class="text-xs-left">{{ props.item.balance }}</td>
                            <td class="text-xs-left">{{ props.item.pendingFunds }}</td>
                        </template>
                      </v-data-table>
                    </div>
                  </v-card>
                  <div id="tab-sell-buy">
                    <v-tabs
                      fixed-tabs
                      v-model="active"
                      color="white"
                      dark
                      slider-color="primary"
                      grow
                    >
                      <v-tab ripple class="primary--text">
                        Buy
                      </v-tab>
                      <v-tab ripple class="primary--text">
                        Sell
                      </v-tab>
                      <v-tab-item>
                        <v-card id="card-buy" flat>
                          <!-- <v-icon class="padding-text" color="primary" size="40px">swap_horiz</v-icon> -->
                          <!-- <h2 class="white primary--text pl-3">Buy</h2> -->
                          <div class="card-buy-sell-field-wrapper">
                            <div class="card-buy-sell-column-left">
                              <h2 class="card-title pt-2 pb-4"><strong>Available AUD: </strong><span class="white-text"> A${{getAmountCurrency('AUD')}}</span> </h2>
                              <!-- <h3 class="pt-3 pb-4 heading">Available AUD: <span class="secondary--text">{{getAmountCurrency('AUD')}}</span></h3> -->
                              <h6 class="card-title pb-1 grey-text">Order Type:</h6>
                              <!-- <hr>       -->                    
                              <v-radio-group v-model="buyOrderType" :mandatory="false" row :hide-details="true" class="pb-3">
                                <v-radio label="Market" class="pa-0 ma-0 mt-1" color="primary" value="Market"></v-radio>
                                <v-radio label="Limit" class="pa-0 ma-0 mt-1" color="primary" value="Limit"></v-radio>
                              </v-radio-group>
                              <v-text-field
                                v-model="buyVolume"
                                label="Volume"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="buyPrice"
                                label="Price"
                                required
                                :disabled = "buyOrderType === 'Market'"
                              ></v-text-field>
                            </div>
                            <div class="card-buy-sell-column-right">
                              <div class="div-top">
                                <!-- <h5>Spend Total: {{ buySpendTotal }}</h5> -->
                                <p class="ma-2 white-text">
                                  <strong>Market Order:</strong>
                                  <span class="caption grey-text">Buy immediately at the best available price (easy).</span>
                                </p>
                                <p class="ma-2">
                                  <strong>Limit Order:</strong>
                                  <span class="caption grey-text">
                                    Place order at a specific price (advanced). If you place a buy limit order above the market rate our system will execute the order for the market rate.
                                  </span>
                                </p>
                              </div>
                              <div class="div-bottom ">
                                <v-select
                                  :items="buyCoins"
                                  v-model="buyCoinsValue"
                                  label="Select coin"
                                  autocomplete
                                  class="pb-4"
                                  item-avatar="https://www.cryptocompare.com/media/19633/btc.png"
                                ></v-select>
                                <v-btn 
                                  class="btn-tabs"
                                  overflow=true
                                  :disabled="buyCoinsValue === null"
                                  large 
                                  block
                                  color="primary"
                                  @click.native="sendOrder('BUY')"
                                >Buy {{buyCoinsValue}}</v-btn>
                              </div>
                              
                            </div>
                          </div>
                        </v-card>
                      </v-tab-item>
                      <v-tab-item>
                        <v-card id="card-sell" flat>
                          <!-- <v-icon class="padding-text" color="primary" size="40px">swap_horiz</v-icon> -->
                          <!-- <h2 class="white primary--text pl-3">Buy</h2> -->
                          <div class="card-buy-sell-field-wrapper">
                            <div class="card-buy-sell-column-left">
                              <h2 class="card-title pt-2 pb-4"><strong>Available {{ sellDisplayCurrency }}: </strong><span class="white-text"> {{ getDisplayCurrencyValue }}</span> </h2>
                              <!-- <h3 class="pt-3 pb-4 heading">Available AUD: <span class="secondary--text">{{getAmountCurrency('AUD')}}</span></h3> -->
                              <h6 class="card-title pb-1 grey-text">Order Type:</h6>
                              <!-- <hr>       -->                    
                              <v-radio-group v-model="sellOrderType" :mandatory="false" row :hide-details="true" class="pb-3">
                                <v-radio label="Market" class="pa-0 ma-0 mt-1" color="primary" value="Market"></v-radio>
                                <v-radio label="Limit" class="pa-0 ma-0 mt-1" color="primary" value="Limit"></v-radio>
                              </v-radio-group>
                              <v-text-field
                                v-model="sellVolume"
                                label="Volume"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="sellPrice"
                                label="Price"
                                required
                                :disabled = "sellOrderType === 'Market'"
                              ></v-text-field>
                            </div>
                            <div class="card-buy-sell-column-right">
                              <div class="div-top">
                                <!-- <h5>Spend Total: {{ buySpendTotal }}</h5> -->
                                <p class="ma-2 white-text">
                                  <strong>Market Order:</strong>
                                  <span class="caption grey-text">Sell immediately at the best available price (easy).</span>
                                </p>
                                <p class="ma-2">
                                  <strong>Limit Order:</strong>
                                  <span class="caption grey-text">
                                    Place order at a specific price (advanced). If you place a sell limit order above the market rate our system will execute the order for the market rate.
                                  </span>
                                </p>
                              </div>
                              <div class="div-bottom ">
                                <v-select
                                  :items="sellCoins"
                                  v-model="sellCoinsValue"
                                  label="Select coin"
                                  autocomplete
                                  class="pb-4"
                                ></v-select>
                                <v-btn 
                                  class="btn-tabs"
                                  overflow=true
                                  large 
                                  block
                                  color="primary"
                                  @click.native="sendOrder('SELL')"
                                >SELL {{sellCoinsValue}}</v-btn>
                              </div>
                              
                            </div>
                          </div>
                        </v-card>
                      </v-tab-item>
                    </v-tabs>
                  </div>                    
                  <v-card id="card-table">
                      <!-- <v-icon class="padding-text" color="primary" size="40px">subject</v-icon>
                      <span>Order History</span> -->
                      <h2 class="white primary--text  pl-3 pt-2 pb-2">Order History</h2>
                      <div v-if="loading2" class="no-data-available">
                        <v-progress-circular id="circular-progress" :size="100" :width="5" :indeterminate="true" color="primary"></v-progress-circular>
                      </div>
                      <div v-if="!loading2" class="data-available">
                        <v-data-table
                            :headers="headerHistory"
                            :items="orderHistory"
                            class="elevation-0"
                            id="data-table-history"
                            :rows-per-page-items=[7]

                        >
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-left">{{ props.item.id }}</td>
                                <td class="text-xs-left">{{ convertMiliToDate(props.item.creationTime) }}</td>
                                <td class="text-xs-left">{{ props.item.instrument }}</td>
                                <td class="text-xs-left">{{ props.item.side }}</td>
                                <td class="text-xs-left">{{ props.item.currency }}</td>
                                <td class="text-xs-left">{{ convertIE8(props.item.price) }}</td>
                                <td class="text-xs-left">{{ convertIE8(props.item.volume).toPrecision(6) }}</td>
                                <td class="text-xs-left">{{ convertIE8(props.item.fee) }}</td>
                                <td class="text-xs-left">{{ props.item.orderId }}</td>
                            </template>
                        </v-data-table>
                      </div>  
                  </v-card>       
                </div>              
            </div>
        </div>
        <div v-else class="content-middle-card-no-data">
            <h1>No Exchanges</h1>
            <h6>Add a new exchange on the left</h6>
        </div>
    </div>  
</template>

<script>
import BtcMarketsAPI from '../BackendAPI/BtcMarkets.js'
import { ClientResponse } from 'http';
/* import privateInfos from '../utils/PrivateInfo.js' */
import Utils from '../utils/utils.js'
import {mapGetters} from 'vuex'

export default {
  data(){
    return{
      shortNamesCoins:[
        {id: 'AUD', name: 'Australian Dollars'},
        {id: 'BTC', name: 'Bitcoin'},
        {id: 'ETH', name: 'Ethereum'},
        {id: 'XRP', name: 'Ripple'},
        {id: 'LTC', name: 'Litecoin'},
        {id: 'ETC', name: 'Ethereum Cash'},
        {id: 'BCH', name: 'Bitcoin Cash'}
      ],
      sellCoinsValue: 'Bitcoin',
      buyCoinsValue: null,
      sellCoins: [
        'Bitcoin', 'Ethereum', 'Litecoin', 'Bitcoin Cash',
        'Ripple', 'Ethereum Cash'
      ],
      buyCoins: [
        'Bitcoin', 'Ethereum', 'Litecoin', 'Bitcoin Cash',
        'Ripple', 'Ethereum Cash'
      ],
      active: null,
      color: 'info',
      toastMessage: '',
      timeout: 600000,
      error: '',
      snackbar: false,
      e1: false,

      buySpendTotal: '0',
      buyOrderType: 'Market',
      buyVolume: "0.0000",
      buyPrice: "0.00",
      buyInstrument: 'BTC',
      buyCurrency: 'AUD',
      
      sellGetTotal: '0',
      sellOrderType: 'Market',
      sellVolume: "0.0000",
      sellPrice: "0.00",
      sellInstrument: 'BTC',
      sellCurrency: 'AUD',
     
      loading1: true,
      loading2: true,
      orderHistoryPairs: [],
      orderHistory:[],
      userBalance:[],
      row: 1,
      alert: true,
      hasAnyExchange: true,
      headerAccount: [
          {text: "Currency", sortable: false, value: 'currency'},
          {text: "Balance", sortable: false, value: 'balance'},
          {text: "Funds in Order", sortable: false, value: 'pendingFunds'},
      ],
      headerHistory: [
          {text: "Trade Id", sortable: false, value: 'tradeId'},
          {text: "Date & Time", sortable: false, value: 'dateTime'},
          {text: "Instrument", sortable: false, value: 'instrument'},
          {text: "Side", sortable: false, value: 'side'},
          {text: "Currency", sortable: false, value: 'currency'},
          {text: "Price", sortable: false, value: 'price'},
          {text: "Volume", sortable: false, value: 'volume'},
          {text: "Fee(inc GST)", sortable: false, value: 'fee'},
          {text: "Order Ref.", sortable: false, value: 'orderRef'}
      ]
    }
  },
  watch:{
    userBalance: function(newValue){
      //Get all currencies of User Balance
      let currencies = newValue.map((item) =>{
        return item.currency;
      })
      //Filter currencies BTC, AUD, ETH
      let filteredCur = currencies.filter((item) =>{
                            return (item === "BTC" || item === "AUD" || item === "ETH")
                        });
      /*
      Create pairs with all possible combinations within the currencies.
      Eg. AUD, BTC
          BTC, AUD
          AUD, ETH...
          I'll be used to check the history of all possible order combinations from BTCMarkets
      */
      let pairs = filteredCur.map((item) =>{
        let excludedItem = filteredCur.filter(curren => curren !== item)
        let pair = excludedItem.map((_item) =>{
          return {instrument: item, currency: _item}
        })
        return pair
      })
      this.orderHistoryPairs = pairs
    },
    orderHistoryPairs: function(newValue){
      this.fetchOrderHistory(newValue);
    }
  },
  computed:{
    sellDisplayCurrency: function(){
      const coinId = this.shortNamesCoins.filter((coin) => coin.name.toUpperCase() === this.sellCoinsValue.toUpperCase())[0].id
      return coinId
    },
    getDisplayCurrencyValue: function(){
      let balance = 0;
      if(this.userBalance.length > 0){
        const coinId = this.shortNamesCoins.filter((coin) => coin.name.toUpperCase() === this.sellCoinsValue.toUpperCase())[0].id
        balance = this.userBalance.filter(coin => coin.currency.toUpperCase() === coinId.toUpperCase())[0].balance
      }
      return balance
    },
    buyAvailable: function (){
      return this.getAmountCurrency('AUD')
    },
    ...mapGetters([
      'userExchanges'
    ]),
    btcPublicKey: function(){
      const btc = this.userExchanges.filter( (exc)=> exc.exchange.toUpperCase() === 'BTCMARKETS');
      return btc[0].publicKey
    },
    btcPrivateKey: function(){
      const btc = this.userExchanges.filter( (exc)=> exc.exchange.toUpperCase() === 'BTCMARKETS')
      return btc[0].privateKey
    }
  },
  methods:{
    consoleInfo: function (){
      
    },
    convertIE8: (value)=>{
      let converter = 100000000;
      let val = Number(value)
      return val / converter
    },
    convertMiliToDate: (value) =>{
      let date = new Date(value);
      return date.toUTCString();
    },
    getAmountCurrency: function(currency){
      let amount = 0;
      let balanceCurrency = [];
      if(this.userBalance.length > 0){
        balanceCurrency = this.userBalance.filter((item) => {
          return item.currency === currency
        })
        if(balanceCurrency.length == 1){
          amount = balanceCurrency[0].balance
        }
      }
      return amount.toFixed(2);
    },
    sendOrder: function(from){
      const origin = from.toUpperCase();
      let params;
      console.log(origin);
      switch(origin){

        case 'BUY':
          params = Object.assign({},{
                        publicKey: this.btcPublicKey,
                        privateKey: this.btcPrivateKey, 
                        instrument: this.buyInstrument,
                        currency: this.buyCurrency,
                        price: Utils.toFinancial2(this.buyPrice),
                        volume: Utils.toFinancial4(this.buyVolume),
                        orderSide: 'Bid',
                        orderType: this.buyOrderType});
          break;  
        case 'SELL':
          params = Object.assign({},{
                          publicKey: this.btcPublicKey,
                          privateKey: this.btcPrivateKey, 
                          instrument: this.sellInstrument,
                          currency: this.sellCurrency,
                          price: Utils.toFinancial2(this.sellPrice),
                          volume: Utils.toFinancial4(this.sellVolume),
                          orderSide: 'Ask',
                          orderType: this.sellOrderType});
      }
      console.log(params)
      BtcMarketsAPI.createOrder(params)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        //Means it got an error
        if(json.name){
          this.color = 'error'
          this.toastMessage = json.name;
          this.snackbar = true;
        }
        //Means it successfully created order
        if(json.success){
          this.color = 'success'
          this.toastMessage = 'Success - Order Id: ' + json.id;
          this.snackbar = true;
          this.fetchBalance();
        }
      })
      .catch((error) => {
        this.color = 'error'
        this.toastMessage = error;
        this.snackbar = true;
      });
    },
    fetchBalance: function (){
      let params = {publicKey: this.btcPublicKey, privateKey: this.btcPrivateKey};
      BtcMarketsAPI.getBalance(params)
      .then(response => response.json())
      .then((response) => {
        this.userBalance = response
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading1 = false;
      });
    },
    fetchOrderHistory: function(pairs){
      let orders = [];
      let flattenedOrder=[]
      pairs.map((pair) =>{
            pair.map((item) =>{
                let params = {publicKey: this.btcPublicKey, privateKey: this.btcPrivateKey, instrument: item.instrument, currency: item.currency};
                /* BtcMarketsAPI.getOrderHistory(this.publicKey, this.privateKey, item.instrument, item.currency) */
                BtcMarketsAPI.getOrderHistory(params)
                  .then(response => response.json())
                  .then((response) =>{
                    console.log(response);
                    let orders = response.map((order)=>{
                      if(order){//if not null
                        //Add some info from order to the order trades
                        order.trades.map((t)=>{
                          t.currency = order.currency;
                          t.instrument = order.instrument;
                          t.ordertype = order.ordertype;
                        })
                        return order.trades
                      }
                    })
                    //Creates one single array of orders
                    flattenedOrder = orders.reduce((acc, cur)=>{ 
                      return acc.concat(cur)
                    }, [])
                    //Pushes orders to final array
                    flattenedOrder.map((item) => {
                      this.orderHistory.push(item)
                    })
                    //Sorts by date descending
                    this.orderHistory.sort((a, b)=> b.creationTime - a.creationTime)
                  })
                  .catch((error) => {
                    console.log(error);
                    /* this.error = error.message */
                  })
                  .finally(() => {
                    this.loading2 = false
                  })
              //)
            })
        })
      /*
      //reduce to flatten in one array allo trades of all orders
      flattenedOrder = ordersHistory.reduce((acc, cur)=>{ 
        return acc.concat(cur)
      }, [])
      //assign to final variable
      console.log(flattenedOrder)  */
    },
    defineBuyParams: ()=>{
      return params;
    }
  },
  created(){
    this.fetchBalance();
  },
  mounted(){
  }
}
</script>
<style>
.content-middle-card-container-inside-card{
    display: grid;
    grid-template-areas: "account sell-buy"
                          "tabl tabl";
    text-align: left;        
    grid-gap: 2rem 1rem;     
    padding-top: 10px;                          
}
#card-account{
    grid-area: account;
}
#card-account > h2{
  font-size: 19px;
}
#tab-sell-buy{
    grid-area: sell-buy;
}
#card-table{
    grid-area: tabl;
}
#card-table > h2{
  font-size: 19px;
}
.padding-text{
    padding:5px;
}
#content-top{
    width: 50%;
    margin: 20px auto;
}
#card-top-child-right{
    grid-area: card-top-right;
    text-align: center;
    align-self: center;
}
#card-top-child-left{
    grid-area: card-top-left;
    padding: 25px 25px 10px 25px;
}
#card-top-child-left p:first-child{
    line-height: 1.2em;
    font-size: 21px
}
.span-highlighted{
    color: #DD2C00;
} 
.content-middle-card-no-data{
    padding: 10% 10% 10% 10%;
    font-size: 70px;
}
.content-middle-card-no-data h6{
    font-size: 25px;
}
.content-middle-card-data{
    font-size: 20px;
    font-weight: 700;
    text-align:left;
}
.card-buy-sell-field-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.card-buy-sell-column-left{
  padding: 5%;
  font-weight: 300;
}
.data-table-bottom h1{
  width: 10%;
  margin: 0 auto;
}
#data-table-account th{
  font-size: 14px;
  color: white;
}
#data-table-account td{
  font-size: 12px;
  color: white;
}
#data-table-history th{
  font-size: 17px;
  color: white;
}
#data-table-history td{
  font-size: 11px;
}
.no-data-available{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}
.no-data-available #circular-progress{
  margin-bottom: 15%;
}
.card-buy-sell-column-right{
  padding: 5% 2%;
  display: grid;
  grid-template-rows: 1fr 2fr;
  font-size: 17px;
  font-weight: 400;
}
.div-top{
  border: 1px solid rgba(228, 224, 224, 0.329);
  border-radius: 1rem;
  font-size: 14px;
  font-weight: 400;
  text-align: justify;
}
.div-bottom{
  /* padding: 2%;
  display: grid;
  grid-template: row;
  grid-template-areas: "top top top top top"
                        "left left left left right";
  grid-gap: 5% 0; */
  align-self: center;
  justify-self: stretch;
}
.div-bottom-top{
  align-self: center;
  justify-self: end;
  grid-area: top;
}
.div-bottom-left{
  grid-area: left;
  justify-self: end;
  align-self: center;
}
.div-bottom-right{
  align-self: center;
  justify-self: right;
  grid-area: right;
}
.field-title:first-child{  
  padding-left: 0;
}  
.card-title{
  font-size: 15px;
  font-weight: 300;
}
h6.card-title{
  border-bottom: 1px solid white;
}
h2.card-title{
  font-size: 22px;
  font-weight: 400;
}
h2.content-middle{
  font-size: 20px;
  font-weight: 400;
}
.btn-scope{ /*Global setting*/
  text-decoration: none;
  padding: 0.7em 1.8em;
  font-weight: 700;  
  border-radius: 5%;
}
.btn-ghost{
  border: 1.5px solid var(--primary);
  color: var(--primary);
}
.btn-ghost:hover{
  background: var(--primary);
  color: white;
}
.btn-white{
  color: white;
  font-size: 15px;
}
.btn-white:hover{
  color: var(--primary);
  font-size: 15px;
}
.btn-primary{
  background: var(--primary);
  color: white;
}
.btn-primary:hover{
  background-color: var(--primary);
  color: white;
}
.grey-text{
  color: rgb(228, 224, 224);
  opacity: 0.9;
}
.white-text{
  color: white !important;
  opacity: 1 !important;
}



  
</style>


