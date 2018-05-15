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
                <h2>BTC Markets</h2>
                <input type="text">
                <div class="content-middle-card-container-inside-card">
                <v-card id="card-account">
                    <v-icon color="primary" class="padding-text" size="35px">account_balance_wallet</v-icon>
                    <span>Account Summary</span>
                    <v-data-table
                        :headers="headerAccount"
                        :items="itemsAccount"
                        hide-actions
                        class="elevation-0 data-table"
                    >
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-left">{{ props.item.currency }}</td>
                            <td class="text-xs-left">{{ props.item.balance }}</td>
                            <td class="text-xs-left">{{ props.item.funds_orders }}</td>
                        </template>
                        <template slot="no-data">
                            <v-alert outline :value="true" color="error" icon="warning">
                                Sorry, nothing to display here :(
                            </v-alert>
                        </template>
                        <template slot="footer">
                            <td colspan="100%">
                                <strong>Total Equity in AUD (Est.): $451.56</strong>
                            </td>
                        </template>
                    </v-data-table>
                </v-card>
                <v-card id="card-buy">
                    <v-icon class="padding-text" color="primary" size="40px">swap_horiz</v-icon>
                    <span>Buy</span>
                </v-card>
                <v-card id="card-sell">
                    <v-icon class="padding-text" color="primary" size="40px">swap_horiz</v-icon>
                    <span>Sell</span>
                </v-card>
                <v-card id="card-table">
                    <v-icon class="padding-text" color="primary" size="40px">subject</v-icon>
                    <span>Order History</span>
                    <v-data-table
                        :headers="headers"
                        :items="items"
                        hide-actions
                        class="elevation-0 data-table"
                    >
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-left">{{ props.item.currency }}</td>
                            <td class="text-xs-left">{{ props.item.balance }}</td>
                            <td class="text-xs-left">{{ props.item.funds_orders }}</td>
                        </template>
                        <template slot="no-data">
                            <v-alert outline :value="true" color="error" icon="warning">
                                Sorry, nothing to display here :(
                            </v-alert>
                        </template>
                    </v-data-table>
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
export default {
  data(){
      return{
          alert: true,
          hasAnyExchange: true,
          headerAccount: [
              {text: "Currency", sortable: false, value: 'currency'},
              {text: "Balance", sortable: false, value: 'balance'},
              {text: "Funds in Order", sortable: false, value: 'funds_orders'},
          ],
          itemsAccount: [
              {currency: 'Australian Dollar', balance: 15.00, funds_orders: 0},
              {currency: 'Bitcoin', balance: 2, funds_orders: 0},
              {currency: 'Ethereum', balance: 15, funds_orders: 0},
              {currency: 'Litecoin', balance: 0, funds_orders: 0},
              {currency: 'Ripple', balance: 0, funds_orders: 0},
              {currency: 'Ethereum-Classic', balance: 0, funds_orders: 0},
              {currency: 'BCH', balance: 0, funds_orders: 0}
          ],
          headerOrders: [
              {text: "Currency", sortable: false, value: 'currency'},
              {text: "Balance", sortable: false, value: 'balance'},
              {text: "Funds in Order", sortable: false, value: 'funds_orders'},
          ],
          itemsOrders: [
              {currency: 'Australian Dollar', balance: 15.00, funds_orders: 0},
              {currency: 'Bitcoin', balance: 2, funds_orders: 0},
              {currency: 'Ethereum', balance: 15, funds_orders: 0},
          ]
      }
  }
}
</script>
<style>
.content-middle-card-container-inside-card{
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "account buy"
                         "account sell"
                         "tablee tablee";
/*     padding: 10px;      */   
    text-align: left;        
    grid-gap: 5px;     
    padding-top: 10px;                          
}
.data-table{
    text-align: left;
}
#card-account{
    grid-area:account;
    text-align: left;
}
.padding-text{
    padding:5px;
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
#content-top{
    width: 50%;
    margin: 50px auto;
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
br{
    padding:0;
}
</style>


