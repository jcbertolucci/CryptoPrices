import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../../src/utils/utils.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: false,
  state: {
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
    currentCoin: {},
    currentCurrency: 'USD',
    topCoins: [],
    coinTableitems: [],
    allCoinsTableItems: [],
    coinMarkets:[],
  },
  getters:{
    currentCurrency: state =>{
      return state.currentCurrency
    },
    currentCoin: state =>{
      return state.currentCoin
    },
    coinTableHeader: state =>{
      return state.coinTableHeader
    },
    coinTableItems: state =>{
      return state.coinTableitems
    },
    allCoinsTableItems: state =>{
      return state.allCoinsTableItems
    },
    currentCoin: state => {
      return state.currentCoin
    },
    topCoins: state => {
      return state.topCoins
    },
    coinMarkets: state => {
      return state.coinMarkets
    },
    totalCoins: state =>{
      let ttlCoins = state.allCoinsTableItems.length
      return 1560
    },
   },
  mutations:{
    setCurrentCurrency: (state, payload) => {
      state.currentCurrency = payload
    },
    setCurrentCoin: (state, payload) => {
      state.currentCoin = payload
    },
    activateCoin: (state, payload) =>{
        //deactivate all elements
        state.topCoins.forEach(element => {
          element.isActive = false;
        });
        //activate clicked coin
        payload.isActive = true;
        //set the currentCoin to bind it to child component
        state.currentCoin = payload;
    },
    fetchCoinMarkets: (state, payload) => {
      let requestData = [];
      let coins = []
      let coin = {}
      let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      let url = `${proxyUrl}https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${state.currentCoin.symbol}&tsym=${state.currency}`

      fetch(url)
      .then(response => response.json())
      .then(data => {
        state.coinMarkets.push(data.Data)
      })

    },    
    fetchTopCoins: (state, payload) => {
        let requestData = [];
        let coinsCryptoCompare = []
        let coins = []
        let coin = {}
        let currency = 'AUD';
        let limitCoins = '10'
        let baseImageUrl = ''
        let url = `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&limit=${limitCoins}`
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let urlCoinList = `${proxyUrl}https://www.cryptocompare.com/api/data/coinlist/`
        
        
        //this.$http.get(url)
        fetch(url)
        .then(response => response.json())
        .then(function(data){ 
          requestData = data;
          requestData.forEach( function (item){
            
            coin = {};
            coin.value = false
            coin.isActive = item.rank === "1";
            coin.name = item.name;
            coin.id = ''
            coin.symbol = '';
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
                //if (data.Data[key].CoinName.toLowerCase() === coin.name.toLowerCase())
                if(data.Data[key].Symbol.toLowerCase() === coin.symbol.toLowerCase() || data.Data[key].CoinName.toLowerCase() === coin.name.toLowerCase()) {
                  coin.imageUrl = coin.imageUrl + data.Data[key].ImageUrl
                  coin.id = data.Data[key].Id
                  coin.symbol = data.Data[key].Symbol
                }
              })
            });
            state.coinTableitems = coins
          })
        })
    },
    fetchAllCoins: (state, payload) => {
      let requestData = [];
      let coinsCryptoCompare = []
      let coins = []
      let coin = {}
      let currency = 'AUD';
      let baseImageUrl = ''
      let url = `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&limit=10`
      let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      let urlCoinList = `${proxyUrl}https://www.cryptocompare.com/api/data/coinlist/`
      
      
      //this.$http.get(url)
      fetch(url)
      .then(response => response.json())
      .then(function(data){ 
        requestData = data;
        requestData.forEach( function (item){
          
          coin = {};
          coin.value = false
          coin.isActive = item.rank === "1";
          coin.id = ''
          coin.name = item.name;
          coin.symbol = item.symbol;
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
              if (data.Data[key].Symbol.toLowerCase() === coin.symbol.toLowerCase() || data.Data[key].CoinName.toLowerCase() === coin.name.toLowerCase()){
                coin.imageUrl = coin.imageUrl + data.Data[key].ImageUrl
                coin.id = data.Data[key].Id
                coin.symbol = data.Data[key].Symbol
              }
            })
          });
          state.allCoinsTableItems = coins
        })
      })
    }    
  },
  actions: {
    fetchTopCoins: (context, payload) => {
      context.commit('fetchTopCoins')
    },
    fetchAllCoins: (context, payload) => {
      context.commit('fetchAllCoins')
    },
    fetchCoinMarkets: (context, payload) => {
      context.commit('fetchCoinMarkets')
    },
    setCurrentCurrency: (context, payload) => {
      context.commit('setCurrentCurrency', payload)
    },
    setCurrentCoin: (context, payload) => {
      context.commit('setCurrentCoin', payload)
    }
  }  

})