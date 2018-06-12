<template>
  <div id="template-wallet-parent">
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
        <div class="content-middle"  >
            <div v-if="hasAnyExchange" flat class="content-middle-card-data" tile="true">
                <div class="content-middle-card-container-inside-card">
                  <v-card id="card-account">
                      <v-icon color="primary" class="padding-text" size="35px">account_balance_wallet</v-icon>
                      <span>Account Summary</span>
                      <div v-if="loading1" class="no-data-available">
                        <v-progress-circular id="circular-progress" :size="100" :width="5" :indeterminate="true" color="primary"></v-progress-circular>
                      </div>
                      <div v-if="!loading1" class="data-available">
                        <v-data-table
                          :headers="headerAccount"
                          :items="userBalance"
                          hide-actions
                          class="elevation-0"
                          id="data-table-account"
                        >
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-left">{{ props.item.currency }}</td>
                                <td class="text-xs-left">{{ props.item.balance }}</td>
                                <td class="text-xs-left">{{ props.item.pendingFunds }}</td>
                            </template>
                        </v-data-table>
                      </div>
                  </v-card>
                  <v-card id="card-buy">
                      <v-icon class="padding-text" color="primary" size="40px">swap_horiz</v-icon>
                      <span>Buy</span>
                      <div class="card-buy-sell-field-wrapper">
                        <div class="card-buy-sell-column-left">
                          <h6 class="mt-0">Available AUD:</h6>
                          <h6 id="order-type">Order Type:</h6>
                          <h6>Volume:</h6>
                          <h6>Price:</h6>
                        </div>
                        <div class="card-buy-sell-column-middle">
                          <h6 class="mt-0">{{getAmountCurrency('AUD')}}</h6>
                          <v-radio-group class="pt-0 ma-0" v-model="buyOrderType" :mandatory="false" row>
                            <v-radio label="Market" class="pa-0 ma-0 mt-1" color="primary" value="Market"></v-radio>
                            <v-radio label="Limit" class="pa-0 ma-0 mt-1" color="primary" value="Limit"></v-radio>
                            <!-- <a class="pa-0 ma-0 tool-tip" href="#" :data-tool-tip="toolTip">?</a> -->
                          </v-radio-group>
                          <v-text-field
                            class="pa-0 ma-0"
                            v-model="buyVolume"
                            prefix="BTC"
                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (e1 = !e1)"
                          ></v-text-field>
                          <v-text-field
                            class="pt-0 mt-0"
                            v-model="buyPrice"
                            prefix="AUD"
                            :disabled = "buyOrderType === 'Market'"
                          ></v-text-field>
                        </div>
                        <div class="card-buy-sell-column-right">
                          <div class="div-top">
                            <h5>Spend Total: {{ buySpendTotal }}</h5>
                          </div>
                          <div class="div-middle">
                          </div>
                          <div class="div-bottom">
                            <v-btn 
                              block
                              outline
                              color="primary"
                              @click.native="sendOrder('BUY')"
                            >Buy</v-btn>
                          </div>
                          
                        </div>
                      </div>
                  </v-card>
                  <v-card id="card-sell">
                      <v-icon class="padding-text" color="primary" size="40px">swap_horiz</v-icon>
                      <span>Sell</span>
                      <div class="card-buy-sell-field-wrapper">
                        <div class="card-buy-sell-column-left">
                          <h6 class="mt-0">Available BTC:</h6>
                          <h6 id="order-type">Order Type:</h6>
                          <h6>Volume:</h6>
                          <h6>Price:</h6>
                        </div>
                        <div class="card-buy-sell-column-middle">
                          <h6 class="mt-0">{{getAmountCurrency('BTC')}}</h6>
                          <v-radio-group class="pt-0 ma-0" v-model="sellOrderType" :mandatory="false" row>
                            <v-radio label="Market" class="pa-0 ma-0 mt-1" color="primary" value="Market"></v-radio>
                            <v-radio label="Limit" class="pa-0 ma-0 mt-1" color="primary" value="Limit"></v-radio>
                          </v-radio-group>
                          <v-text-field
                            class="pa-0 ma-0"
                            v-model="sellVolume"
                            prefix="BTC"
                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (e1 = !e1)"
                          ></v-text-field>
                          <v-text-field
                            class="pt-0 mt-0"
                            v-model="sellPrice"
                            prefix="AUD"
                            :disabled = "sellOrderType === 'Market'"
                          ></v-text-field>
                        </div>
                        <div class="card-buy-sell-column-right">
                          <div class="div-top">
                            <h5>Spend Total: {{ sellGetTotal }}</h5>
                          </div>
                          <div class="div-middle">

                          </div>
                          <div class="div-bottom">
                            <v-btn 
                              block
                              outline
                              color="primary"
                              @click.native="sendOrder('SELL')"
                            >Sell</v-btn>
                          </div>
                          
                        </div>
                      </div>
                  </v-card>
                  <v-card id="card-table">
                      <v-icon class="padding-text" color="primary" size="40px">subject</v-icon>
                      <span>Order History</span>
                      <div v-if="loading2" class="no-data-available">
                        <v-progress-circular id="circular-progress" :size="100" :width="5" :indeterminate="true" color="primary"></v-progress-circular>
                      </div>
                      <div v-if="!loading2" class="data-available">
                        <v-data-table
                            :headers="headerHistory"
                            :items="orderHistory"
                            hide-actions
                            class="elevation-0"
                            id="data-table-history"

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
            <div v-else-if="!hasAnyExchange" class="content-middle-card-no-data">
                <h1>No Exchanges</h1>
                <h6>Add a new exchange above</h6>
            </div>
        </div>
    </div>  
</template>

<script>
import BtcMarketsAPI from '../BackendAPI/BtcMarkets.js'
import { ClientResponse } from 'http';
import privateInfos from '../utils/PrivateInfo.js'
import Utils from '../utils/utils.js'

export default {
  data(){
    return{
      color: 'info',
      toastMessage: '',
      timeout: 600000,
      error: '',
      snackbar: false,
      e1: false,
      toolTip: 'Market Order - Buy immediately at the best available price (easy). Limit Order - Place order at a specific price (advanced). If you place a buy limit order above the market rate our system will execute the order for the market rate.',

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
      
      //TODO
      publicKey: privateInfos.btcMarkets.publicKey,
      privateKey: privateInfos.btcMarkets.privateKey,

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
    },
    orderHistory: (newValue) => {
      
    }
  },
  computed:{
    buyAvailable: function (){
      return this.getAmountCurrency('AUD')
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
      return amount;
    },
    sendOrder: function(from){
      const origin = from.toUpperCase();
      let params;

      switch(origin){
        case 'BUY':
          params = Object.assign({},{
                        publicKey: this.publicKey, 
                        privateKey: this.privateKey, 
                        instrument: this.buyInstrument,
                        currency: this.buyCurrency,
                        price: Utils.toFinancial2(this.buyPrice),
                        volume: Utils.toFinancial4(this.buyVolume),
                        orderSide: 'Bid',
                        orderType: this.buyOrderType});
          break;  
        case 'SELL':
          params = Object.assign({},{
                          publicKey: this.publicKey, 
                          privateKey: this.privateKey, 
                          instrument: this.sellInstrument,
                          currency: this.sellCurrency,
                          price: Utils.toFinancial2(this.sellPrice),
                          volume: Utils.toFinancial4(this.sellVolume),
                          orderSide: 'Ask',
                          orderType: this.sellOrderType});
      }

      console.log(params);

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
        }
      })
      .catch((error) => {
        this.color = 'error'
        this.toastMessage = error;
        this.snackbar = true;
      });
    },
    fetchBalance: function (){
      let params = {publicKey: this.publicKey, privateKey: this.privateKey};
      BtcMarketsAPI.getBalance(params)
      .then(response => response.json())
      .then((response) => {
        this.userBalance = response
      })
      .catch((error) => {
        console.log(error);
        /* this.error = error.message */
      })
      .finally(() => {
        this.loading1 = false;
      });
    },
    fetchOrderHistory: function(pairs){
      let blabla = [];
      let orders = [];
      let flattenedOrder=[]
      pairs.map((pair) =>{
            pair.map((item) =>{
                let params = {publicKey: this.publicKey, privateKey: this.privateKey, instrument: item.instrument, currency: item.currency};
                /* BtcMarketsAPI.getOrderHistory(this.publicKey, this.privateKey, item.instrument, item.currency) */
                BtcMarketsAPI.getOrderHistory(params)
                  .then(response => response.json())
                  .then((response) =>{
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
      
      console.log(params);
      return params;
    }
  },
  created(){
    this.fetchBalance();
  }
}
</script>
<style>
.content-middle-card-container-inside-card{
    display: grid;
    grid-template-rows: 1fr 0.5fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "account account"
                         "buy sell"
                         "tablee tablee";
    text-align: left;        
    grid-gap: 5px;     
    padding-top: 10px;                          
}
#card-account{
    grid-area:account;
}
#card-buy{
    grid-area:buy;
}
#card-sell{
    grid-area:sell;
}
#card-table{
    grid-area:tablee;
}
.padding-text{
    padding:5px;
}
#content-top{
    width: 50%;
    margin: 20px auto;
}
#card-top-parent{
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "card-top-left card-top-right";
    grid-area: 2/3;
    text-align: left;
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
.content-middle{
    width: 95%;
    margin: 0 auto;
}
.content-middle-card-no-data{
    padding: 10% 10% 10% 10%;
    font-size: 80px;
}
.content-middle-card-no-data h6{
    font-size: 25px;
}
.content-middle-card-data{
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
    text-align:left;
}
.card-buy-sell-field-wrapper{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr 2fr;
}
.card-buy-sell-column-left{
  padding: 15% 0 0 15%;
  font-size: 22px;
  font-weight: 400;
  color: rgb(100, 100, 100);
}
.card-buy-sell-column-left h6{
  margin-top: 30%
}
.card-buy-sell-column-middle{
  padding: 0% 0 5% 5%;
  font-size: 24px;
  font-weight: 600;
  color: #DD2C00;
}
.card-buy-sell-column-middle h6{
  padding-top: 7.5%;
  padding-bottom: 11%
}
.data-table-bottom h1{
  width: 10%;
  margin: 0 auto;
}
#data-table-account th{
  font-size: 14px;
  color: rgb(26, 25, 25)
}
#data-table-history th{
  font-size: 14px;
  color: rgb(26, 25, 25)
}
#data-table-history td{
  font-size: 12px;
  color: rgb(26, 25, 25)
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
/* .radio-limit::after{
  position: absolute;
  padding-left: 4em;
  padding-bottom: 1em;
  content: 'O';
} */
.tool-tip{
  text-decoration: none;
}
.tool-tip[data-tool-tip]::after{
  content: attr(data-tool-tip);
  display:block;
  position: absolute;
  background-color: rgb(255, 60, 0);
  color: white;
  padding: 1em 1em;
  font-size: .5em;
  border-radius: 5px;
  left: 105%;
  width: 90%;
  transform: scale(0);
}
.tool-tip[data-tool-tip]:hover::after{
  transform: scale(1);
}
.card-buy-sell-column-right{
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(65, 62, 62, 0.13);
}
.div-top{
  flex-grow: 1;
  margin: 3%;
}
.div-middle{
  flex-grow: 2;
  text-align: left;
}
.div-bottom{
  padding: 3%;
  flex-grow: 1;
}

</style>


