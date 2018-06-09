<template>
    <div id="template-wallet-parent">
        <div id="content-top">
            <v-card id="card-top">
                <div id="card-top-parent">
                    <div id="card-top-child-left">
                        <p>Linking your exchange account below allows you checking your account overview and operating assets</p>
                        <br>
                        <p class="grey--text caption">We are currently accepting linking accounts with <span class="span-highlighted">Coinbase</span> and <span class="span-highlighted">BTCMarkets</span></p>                                
                    </div>
                    <div id="card-top-child-right">
                        <v-btn fab dark color="primary">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                        <p class="grey--text ">Add a new linking account</p>                              
                        <!-- <v-avatar id="icon-left" :size="100" color="grey lighten-4">
                            <img src="data:image/png;base64,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">
                        </v-avatar>
                        <v-avatar id="icon-right" :size="100" color="grey lighten-4">
                            <img src="https://cdn-images-1.medium.com/max/1200/1*yvhnWkPk9aUmPElGe5mfqA.png">
                        </v-avatar>  -->                        
                    </div>
                </div>
            </v-card>
        </div>
        <div class="content-middle"  >
            <div v-if="hasAnyExchange" flat class="content-middle-card-data" tile="true">
                <!-- <v-avatar size="50" class="pr-3">
                  <img src="data:image/png;base64,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">
                </v-avatar> -->
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
                            <!-- <template slot="footer">
                                <td colspan="100%">
                                    <strong>Total Equity in AUD (Est.): $451.56</strong>
                                </td>
                            </template> -->
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
                          <v-radio-group class="pt-0 ma-0" v-model="buyRadioMarket" :mandatory="false" row>
                            <v-radio label="Market" class="pa-0 ma-0 mt-1" color="primary" value="market"></v-radio>
                            <v-radio label="Limit" class="pa-0 ma-0 mt-1" color="primary" value="limit"></v-radio>
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
                          ></v-text-field>
                        </div>
                        <div class="card-buy-sell-column-right">
                          <div class="div-top">
                            <h5>Spend Total: {{ buySpendTotal }}</h5>
                          </div>
                          <div class="div-middle">
                            <!-- <div>
                              <v-btn color="primary" small flat>
                                <v-icon left dark>clear_all</v-icon>
                                Spend All
                              </v-btn>
                            </div>
                            <div>
                              <v-btn color="primary" small flat>
                                <v-icon left dark>attach_money</v-icon>
                                Best Sell Price
                              </v-btn>
                            </div> -->
                          </div>
                          <div class="div-bottom">
                            <v-btn 
                              block
                              outline
                              color="primary"
                              @click.native="consoleInfo()"
                            >Buy</v-btn>
                          </div>
                          
                        </div>
                      </div>
                  </v-card>
                  <v-card id="card-sell">
                      <v-icon class="padding-text" color="primary" size="40px">swap_horiz</v-icon>
                      <span>Sell</span>
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

export default {
  data(){
    return{
      e1: false,
      toolTip: 'Market Order - Buy immediately at the best available price (easy). Limit Order - Place order at a specific price (advanced). If you place a buy limit order above the market rate our system will execute the order for the market rate.',
      buySpendTotal: '0',
      buyRadioMarket: 'market',
      buyVolume: "0.0000000",
      buyPrice: "0",
      publicKey: privateInfos.btcMarkets.publicKey,
      privateKey: privateInfos.btcMarkets.privateKey,
      loading1: true,
      loading2: true,
      orderHistoryPairs: [],
      orderHistory:[],
      userBalance:[],
      error: '',
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
    fetchBalance: function (){
      BtcMarketsAPI.getBalance(this.publicKey, this.privateKey)
      .then(response => response.json())
      .then((response) => {
        this.userBalance = response
      })
      .catch((error) => {
        this.error = error.message
      })
      .finally(() => {
        this.loading1 = false
      });
    },
    fetchOrderHistory: function(pairs){
      let blabla = [];
      let orders = [];
      let flattenedOrder=[]
      pairs.map((pair) =>{
            pair.map((item) =>{
                BtcMarketsAPI.getOrderHistory(this.publicKey, this.privateKey, item.instrument, item.currency)
                  .then(response => response.json())
                  .then((response) =>{
                    let orders = response.map((order)=>{
                      if(order){//if not empty
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
                    this.error = error.message
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
    width: 80%;
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


