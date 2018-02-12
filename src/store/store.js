import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../../src/utils/utils.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    currentCoin:'',
    topCoins: [],
    coinTableHeader: [
      { text: "Coins", sortable:false, align: 'left', value: name, weight: '25px' },
      { text: 'Price US$', value: 'priceUSD'},
      { text: 'Price A$', value: 'priceAUD'},
      { text: 'Market Cap US$', value: 'marketCapUsd'},
      { text: 'Volume US$', value: 'volumaUsd24h'},
      { text: 'Circulating Supply', value: 'totalSupply'},
      { text: 'Change (24h)', value: 'dayPercVar'},
      { text: 'Change (7d)', value: 'weekPercVar'}
    ],
    coinTableitems: []
  },
  getters:{
    coinTableHeader: state=>{
      return state.coinTableHeader
    },
    coinTableItems: state=>{
      return state.coinTableitems
    },
    currentCoin: state => {
      return state.currentCoin
    },
    topCoins: state => {
      return state.topCoins
    }
 
  },
  mutations:{
    activateCoin: (state, payload) =>{
        //deactivate all elements
        state.topCoins.forEach(element => {
          element.isActive = false;
        });
        //activate clicked coin
        peyload.isActive = true;
        //set the currentCoin to bind it to child component
        state.currentCoin = peyload;
    },
    fetchTopCoins: (state, payload) => {
        let requestData = [];
        let coinsCryptoCompare = []
        let coins = []
        let coin = {}
        let currency = 'AUD';
        let limitCoins = '10'
        let baseImageUrl = ''
        let url = `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&limit=${limitCoins}`;
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let urlCoinList = `${proxyUrl}https://www.cryptocompare.com/api/data/coinlist/`
        
        
        //this.$http.get(url)
        fetch(url)
        .then(response => response.json())
        .then(function(data){ 
          console.log(data)
          requestData = data;
          requestData.forEach( function (item){
            
            coin = {};
            coin.value = false
            coin.isActive = item.rank === "1";
            coin.name = item.name;
            coin.priceAud = utils.formatNumbersCents(item.price_aud)
            coin.priceUsd = utils.formatNumbersCents(item.price_usd)
            coin.weekPercVar = item.percent_change_7d;
            coin.dayPercVar = item.percent_change_24h;
            coin.hourPercVar = item.percent_change_1h;
            coin.marketCapAud = utils.formatNumbersCents(item.market_cap_aud)
            coin.marketCapUsd = utils.formatNumbers(item.market_cap_usd)
            coin.totalSupply = utils.USFormat(item.total_supply);
            coin.volumeUsd = utils.formatNumbers(item['24h_volume_usd'])
            coin.imageUrl = ''

            coins.push(coin);
          })
          return coins
        })
        //To get the coins images
        .then(coins => {
          fetch(urlCoinList)
          .then(response => response.json())
          .then(data => {
            coins.map(coin => {
              coin.imageUrl = data.BaseImageUrl
            })
            Object.keys(data.Data).forEach(function(key) {
              coins.map(coin => {
                if (data.Data[key].CoinName.toLowerCase() === coin.name.toLowerCase())
                coin.imageUrl = coin.imageUrl + data.Data[key].ImageUrl
              })
            });
            state.coinTableitems = coins
          })
        })
      }

  },
  actions: {
    fetchTopCoins: (context, payload) => {
      context.commit('fetchTopCoins', payload)
    }

  }  

})