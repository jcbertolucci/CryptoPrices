<template id="CoinsTemplate">
  <div class="reset-space">
    <div class="tab border border-top-0 border-left-0 border-right-0">
      <button class="tablinks" v-for="coin in topFiveCoins" v-bind:class="{active: coin.isActive}" @click="openCoin(coin)">{{coin.name}} 
        <p>A${{coin.priceAud}}</p>
      </button>
    </div>
    <div class="reset-space" v-for="coin in topFiveCoins" v-if="coin.isActive">
      <div class="div-prices align-center reset-space top-padding">
        <div class="text-center div-price">
          <a class="font-weight-bold is-size-5 h1-value text-top font-orange">
            A$
          </a>
          <h1 class="font-weight-bold is-size-1 font-orange h1-value ">
            {{coin.priceAud}}
          </h1>
          <h6 class="font-weight-bold is-size-6">{{coin.name}} Price</h6>
        </div>
        <div class="text-center">
          <h1 class="font-weight-bold is-size-1">{{coin.dayPercVar}}</h1>
          <h6 class="font-weight-bold is-size-6">Since Last 24h(%)</h6>
        </div>
        <div class="text-center">
          <h1 class="font-weight-bold is-size-1">{{coin.weekPercVar}}</h1>
          <h6 class="font-weight-bold is-size-6">Since Last Week(%)</h6>
        </div>
      </div>
      <div>
        <graph-template :coin="currentCoin"></graph-template>
      </div>      
    </div>
  </div>  
</template>

<script>
/* eslint-disable */
import GraphTemplate from "./CoinGraph.vue";


export default {
  components: {
    'graph-template': GraphTemplate
  },
  data() {
    return {
      currentCoin:'',
      topFiveCoins: [],
    };
  },
  methods: {
    openCoin: function(coin) {
      //deactivate all elements
      this.topFiveCoins.forEach(element => {
        element.isActive = false;
      });
      //activate clicked coin
      coin.isActive = true;
      //set the currentCoin to bind it to child component
      this.currentCoin = coin;
    },
    fetchTopCoins: function() {
      let requestData = [];
      let coins = [];
      let coin = {
        id: '',
        name: '',
        symbol: '',
        rank: '',
        price_usd: '',
        price_btc: '',
        volume_usd_24h: '',
        market_cap_usd: '',
        available_supply: '' ,
        total_supply: '',
        max_supply: '',
        percent_change_1h: '',
        percent_change_24h: '',
        percent_change_7d: '',
        last_updated: '',
        price_aud: '',
        volume_aud_24h: '',
        market_cap_aud: '',
        isActive: false
      }
      let currency = 'AUD';
      let limitCoins = '5'
      let url = `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&limit=${limitCoins}`;
           
      this.$http.get(url).then(function(data){ 
        requestData = data.body;
        requestData.forEach( function (item){
          coin = {};
          coin.isActive = item.rank === "1";
          coin.name = item.name;
          coin.priceAud = parseFloat(item.price_aud).toFixed(2);
          coin.priceUsd = parseFloat(item.price_usd).toFixed(2);
          coin.weekPercVar = item.percent_change_7d;
          coin.dayPercVar = item.percent_change_24h;
          coin.hourPercVar = item.percent_change_1h;
          coin.marketCapAud = item.market_cap_aud.format();
          coin.totalSupply = item.total_supply;

          coins.push(coin);
        })
        this.topFiveCoins = coins;
      }); 
      
    }
  },
  created(){
    this.fetchTopCoins();
  }
};
</script>

<style scoped>
.text-top{
  vertical-align: text-bottom;
}
.div-price{
  font-size: 0px;
}
.h1-value{
  display: inline-block;
}
.top-padding {
  padding-top: 20px;
}
.font-orange{
  color: rgb(224, 65, 7);
}
div h1 {
  color: hsl(256, 67%, 10%);
}
div h6 {
  color: hsl(256, 67%, 10%);
  letter-spacing: 1px;
}

/* Style the tab */

div.tab {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;
  grid-auto-rows: minmax(20px, auto);

  overflow: hidden;
  border: none;
  font-family: "";
  font-size: 24px;
}
div.div-prices {
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-gap: 1em;
  grid-auto-rows: minmax(20px, auto);
  letter-spacing: 3px;
  font-family: "Open Sans";
}


/* Change background color of buttons on hover */
div.tab button:hover {
  --color: rgb(224, 65, 7);
}
/* Create an active/current tablink class */
div.tab button.active {
  color: rgb(224, 65, 7);
}
div.tab p {
  font-size: 16px;
}
/* Style the tab content */
.tabcontent {
  display: none;
  border: 1px solid #ccc;
  border-top: none;
}
</style>