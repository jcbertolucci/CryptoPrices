<template>
  <div>
    <menu-template></menu-template>
    <div class="container div-main no-padding-left-right">
      <titles-template title="Top 5 cryptocurrencies"></titles-template>
      <table-vue :top5coins="top5coins"></table-vue>
      </br>
      <titles-template title="Market"></titles-template>
      </br>
      <titles-template title="Twitter"></titles-template>
      <!-- <twiterfeed-vue></twiterfeed-vue> -->
    </div>  
  </div>
</template>

<script>
import MenuTemplate from './Menu.vue'
import CoinsTemplate from './Coins.vue'
import NewsTemplate from './News.vue'
import TableComponent from './Table.vue'
import Coin from '../models/Coin'
import CoinList from '../models/CoinList'
import Util from '../utils/utils'



export default {
  /* eslint-disable */
  components: {
    'coins-template': CoinsTemplate,
    'news-template': NewsTemplate,
    'menu-template': MenuTemplate,
    'table-vue': TableComponent,
  },  
  data(){
    return{
      top5coins: [],
      coinsList: [],
      proxyUrl: 'https://cors-anywhere.herokuapp.com/'
    }
  },
  methods:{
    fetchTopCoins: function() {
      let requestData = [];
      let coins = []
      let currency = 'AUD';
      let limitCoins = 10
      let url = `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&limit=${limitCoins}`;
      
      this.$http.get(url).then(function(data){ 
        requestData = data.body;
        requestData.forEach( function (item){
          let coin = new Coin({});
          coin.isActive = item.rank === "1",
          coin.rank = item.rank,
          coin.name = item.name,
          coin.symbol = item.symbol,
          coin.imgUrl = '',
          coin.priceAud = Util.methods.formatNumbersCents(item.price_aud),
          coin.priceUsd = Util.methods.formatNumbersCents(item.price_usd),
          coin.weekPercVar = item.percent_change_7d,
          coin.dayPercVar = item.percent_change_24h,
          coin.volumeUsd = Util.methods.formatNumbers(item["24h_volume_usd"]),
          coin.hourPercVar = 0,
          coin.marketCapAud = Util.methods.formatNumbers(item.market_cap_aud),
          coin.totalSupply = Util.methods.USFormat(item.total_supply),
          coin.changeNegative = (item.percent_change_24h < 1)
          
          coins.push(coin);
        })
        this.top5coins = coins;
      }); 
    },
    fetchCoinList: function(){
      let requestData = [];
      let url = `${this.proxyUrl}https://www.cryptocompare.com/api/data/coinlist/`;
      let baseImageUrl = ''
      let coin = {}
      let coins = []
      this.$http.get(url).then(function(ret){
        baseImageUrl = ret.body.BaseImageUrl
        const allowed = this.top5coins.map(key => key.symbol);
        let filtered = Object.keys(ret.body.Data).filter(key => allowed.includes(key)).map(key => ret.body.Data[key])
        this.top5coins.forEach(function(item){
            ret = filtered.filter(key => key.Name === item.symbol)
            item.imgUrl = baseImageUrl + ret[0].ImageUrl
        })
      });
    }
  },
  beforeMount(){
    this.fetchTopCoins()
  },
  created(){
    this.fetchCoinList()
  }
}
</script>
<style scoped>
  h4:after {
      content: "";
      border: 0.5px solid black;
      margin-top: 15px;
      display: block;
      position: left;
      align-self: left;
      max-width: 205px
  }
  #hr-news:after{
      content: "";
      border: 0.5px solid black;
      margin-top: 15px;
      display: block;
      position: left;
      align-self: left;
      max-width: 50px
  }
  .div-coins{
    padding-top: 10px;
  }
  .reset-space{
    padding: 3px;
  }
  .border.title:after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0%;
    width: 11%;
    border-bottom: 2px solid #000000;
  }    
  .exchangePrices{
    margin: 0.5em;
  }
</style>
