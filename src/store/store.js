import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../../src/utils/utils.js'
import {firebaseApp} from '../database/firebaseInit'
import axios from 'axios'
import {firestoreAuth} from '../database/firebaseInit'
import {provider} from '../database/firebaseInit'

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
    selectedPair: {name: 'American Dollar', symbol: 'USD'},
    /* selectedPair: {name: 'Australian Dollar', symbol: 'AUD'}, */
    selectedCoin: {name: 'Bitcoin', symbol: 'BTC'},
    currentCurrency: 'AUD',
    userExchanges: [],
    topCoins: [],
    coinTableitems: [],
    allCoinsTableItems: [],
    marketCoinItems:[],
    coinMarkets:[],
    totalCoins: 0,
    user: null,
    userAuth : false,
    firebaseMsg: '',
    activatedMsgSnack: false,
    topPortfolioCoins: [],
    loading: false,
    loadingCoin: true,
    error: null,
    coinsUser: [],
    newsArticles:[],
    marketSummary: {}
  },
  getters:{
    marketSummary(state){
      return state.marketSummary;
    },
    topCoins(state){
      return state.topCoins;
    },
    userExchanges(state){
      return state.userExchanges;
    },
    newsArticles(state){
      return state.newsArticles;
    },
    getCalculatedValue: (state) => {
      /* state.coinsUser.forEach((item) =>{
      }) */
      return state.coinsUser;
    },
    loading(state){
      return state.loading;
    },
    coinsUser(state){
      return state.coinsUser;
    },
    error(state){
      return state.error;
    },
    topPortfolioCoins: state => {
      return state.topPortfolioCoins;
    },
    activatedMsgSnack: state => {
      return state.activatedMsgSnack;
    },
    marketCoinItems: state => {
      return state.marketCoinItems;
    },
    firebaseMsg: state => {
      return state.firebaseMsg;
    },
    userAuth: state => {
      return state.userAuth;
    },
    user: state => {
      return state.user;
    },
    selectedPair: state => {
      return state.selectedPair;
    },
    selectedCoin: state => {
      return state.selectedCoin;
    },
    currentCurrency: state =>{
      return state.currentCurrency;
    },
    currentCoin: state =>{
      return state.currentCoin;
    },
    coinTableHeader: state =>{
      return state.coinTableHeader;
    },
    coinTableItems: state =>{
      return state.coinTableitems;
    },
    allCoinsTableItems: state =>{
      return state.allCoinsTableItems;
    },
    currentCoin: state => {
      return state.currentCoin;
    },
    topCoins: state => {
      return state.topCoins;
    },
    coinMarkets: state => {
      return state.coinMarkets;
    },
    totalCoins: state =>{
      //let ttlCoins = state.allCoinsTableItems.length
      return 1560
    },
   },
  mutations:{
    setMarketSummary(state, payload){
      state.marketSummary = payload;
    },
    setTopCoins(state, payload){
      state.topCoins = payload;
    },
    addUserExchange(state, payload){
      state.userExchanges.push(payload);
    },
    setNewsArticles(state, payload){
      state.newsArticles = payload;
    },
    setLoading(state, payload){
      state.loading = payload;
    },
    setError(state, payload){
      state.error = payload;
    },
    clearError(state){
      state.error = null;
    },
    clearUser(state){
      state.user = null;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setTopPortfolioCoins: (state, payload) => {
      state.topPortfolioCoins = payload;
    },
    setactivatedMsgSnack: (state, payload) => {
      state.activatedMsgSnack = payload;
    },
    setUserAuth: (state, payload) => {
      state.userAuth = payload;
    },
    setFirebaseMsg: (state, payload) => {
      state.firebaseMsg = payload;
    },
    setMarketCoinItems: (state, payload) => {
      state.marketCoinItems = payload;
    },
    setSelectedPair: (state, payload) => {
      state.selectedPair = payload
      store.dispatch('fetchCoinMarkets', 'MARKET');//TODO
    },
    setSelectedCoin: (state, payload) => {
      state.selectedCoin = payload;
      store.dispatch('fetchCoinMarkets', 'MARKET');
    },
    setCurrentCurrency: (state, payload) => {
      state.currentCurrency = payload;
    },
    setCurrentCoin: (state, payload) => {
      state.currentCoin = payload;
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
    //WARNING - THIS BLOCK SHOULD BE AN ACTION - REDO
    fetchPortfolioCoins: (state, payload) => {
      let coinsUser = []
      let db = firebaseApp.firestore()
      db.collection('coins').get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          if(doc.data().userId === state.user.id){
            state.coinsUser.push(doc.data().coin)
          }
        })
      })    
    },
    //WARNING - THIS BLOCK SHOULD BE AN ACTION - REDO
    saveCoinFirebase: (state, payload) =>{
      let db = firebaseApp.firestore()
      db.collection('coins').add({coin: payload, userId: state.user.id})
      state.coinsUser.push(payload)
    },
    //WARNING - THIS BLOCK SHOULD BE AN ACTION - REDO
    fetchAllCoins: (state, payload) => {
      let selectedPair = state.selectedPair
      let requestData = [];
      let coinsCryptoCompare = []
      let coins = []
      let coin = {}
      let currency = state.selectedPair.symbol;
      let baseImageUrl = ''
      /* let url = `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&limit=2000`//TODO */
      let url = `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&limit=500`//TODO
      let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      
      //this.$http.get(url)
      /* fetch(url) */
      axios.get(proxyUrl+url)
      /* .then(response => response.json()) */
      .then(data =>{ //TOTOTOTOTOOTTOTOSDOFOSTOTOSO
        /*state.setLoading = true */
        requestData = data.data;
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
          coin.exchanges = [] 
          coin.coinInfo = {}

          coins.push(coin);
        })
        return coins
      })
      //To get the coins images
      .then(coins => {
        let urlCoinList = `https://min-api.cryptocompare.com/data/all/coinlist`
        axios.get(proxyUrl+urlCoinList)
        .then(data => {
          let resultSource = data.data
          let resultData = resultSource.Data
          coins.map(coin => {
            coin.imageUrl = resultSource.BaseImageUrl
          })
          Object.keys(resultData).forEach(function(key) {
            coins.map(coin => {
              if (resultData[key].Symbol.toLowerCase() === coin.symbol.toLowerCase() || resultData[key].CoinName.toLowerCase() === coin.name.toLowerCase()){
                coin.imageUrl = coin.imageUrl + resultData[key].ImageUrl
                coin.id = resultData[key].Id
                coin.symbol = resultData[key].Symbol
              }
            })
          });
          return coins
        })
        .then(coins => {
          if(payload === 'MARKET') {//Just for Coins that need Market infos */
            let url = ""
            let symbol = ""

            Object.keys(coins).forEach( (key) => {
              symbol = coins[key].symbol.toUpperCase()
              
              //Commented because no longer used when inside dashboard
              /* if (state.selectedCoin.symbol.toUpperCase() === coins[key].symbol.toUpperCase()
                  || state.selectedCoin.symbol.toUpperCase() === coins[key].name.toUpperCase()){ */
                url = `https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${symbol}&tsym=${currency}`
                /* fetch(url)
                .then(response => response.json()) */
                axios.get(proxyUrl+url)
                .then(data => {
                    let result = data.data.Data
                    if(data.Message === "No exchanges available" || (result.AggregatedData === undefined) ){
                      coins[key].exchanges = [] 
                    }else{
                      result.AggregatedData.PRICE = utils.formatNumbersCents(result.AggregatedData.PRICE)
                      result.AggregatedData.LASTVOLUME = utils.USFormat3(result.AggregatedData.LASTVOLUME)
                      result.AggregatedData.VOLUMEDAY = utils.USFormat3(result.AggregatedData.VOLUMEDAY)
                      result.AggregatedData.OPENDAY = utils.formatNumbersCents(result.AggregatedData.OPENDAY)
                      result.AggregatedData.HIGHDAY = utils.formatNumbersCents(result.AggregatedData.HIGHDAY)
                      result.AggregatedData.LOWDAY = utils.formatNumbersCents(result.AggregatedData.LOWDAY)
                      result.AggregatedData.CHANGEPCTDAY >= 0 ? result.AggregatedData.POSITIVE = true : result.AggregatedData.POSITIVE = false
                      result.AggregatedData.CHANGEPCTDAY = utils.USFormat2(result.AggregatedData.CHANGEPCTDAY) + '%'
                      
                      coins[key].coinInfo = result.AggregatedData

                      result.Exchanges.map( (exchange) => {
                        exchange.RAWPRICE = exchange.PRICE
                        exchange.RAWVOLUME = exchange.VOLUME24HOUR
                        exchange.PRICE = utils.formatNumbersCents(exchange.PRICE)
                        exchange.LASTVOLUME = utils.USFormat3(exchange.LASTVOLUME)
                        exchange.VOLUME24HOUR = utils.USFormat3(exchange.VOLUME24HOUR)
                        exchange.OPEN24HOUR = utils.formatNumbersCents(exchange.OPEN24HOUR)
                        exchange.HIGH24HOUR = utils.formatNumbersCents(exchange.HIGH24HOUR)
                        exchange.LOW24HOUR = utils.formatNumbersCents(exchange.LOW24HOUR)
                        exchange.CHANGEPCT24HOUR >= 0 ? exchange.POSITIVE = true : exchange.POSITIVE = false
                        exchange.CHANGEPCT24HOUR = utils.USFormat2(exchange.CHANGEPCT24HOUR) + '%'
                      })
                      coins[key].exchanges = result.Exchanges
                    } 
                  return data  
                })
              //} 
            })
          }   
          return coins          
        })
        .then(coins => {
          let coin1 = coins.filter(coin => coin.name === 'Bitcoin')
          state.marketCoinItems = coins
          state.allCoinsTableItems = coins
          return coins 
        })
        state.setLoading = false
        return coins        
      })
    }    
  },
  actions: {
    FETCH_MARKET({ commit }){
      let url = 'https://api.coinmarketcap.com/v2/global/'
      let proxyUrl = 'https://cors-anywhere.herokuapp.com/'

      axios.get(url)
      .then(data => {
        commit('setMarketSummary', data.data.data)
      })

    },
    FETCH_TOP_COINS({ commit }){
      let currency = 'AUD';
      let limitCoins = '5'
      let url = `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&limit=${limitCoins}`
      let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      
      axios.get(url)
      .then(function(data){ 
        let responseData = data.data;
        commit('setTopCoins', responseData)
      })
    },
    FETCH_USER_EXCHANGES({ commit, state }){
      const db = firebaseApp.firestore();
      const exchanges = db.collection('userExchanges');
      const userExchange = exchanges.where('userId', '==', state.user.id)
      userExchange.onSnapshot((querySnapshot)=> {
        querySnapshot.forEach((doc) =>{
          if(doc.exists){
            commit('addUserExchange', doc.data().exchange);
          }
          else{
            console.log("No such document!");
          }
        })
      })
    },
    ADD_USER_EXCHANGE({ commit, state }, payload){
      let db = firebaseApp.firestore()
      db.collection('userExchanges').add({userId: state.user.id, exchange: payload})
      .then(function() {
        /* commit('addUserExchange', payload); */
        console.log("Exchange added into firestore");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    },
    FETCH_NEWS_ARTICLES({commit}){
      var newsArticles = []
      var filterArticles = []
      fetch('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=e07d207ff3204ba380935338b1acf48f')
      .then(response => response.json())
      .then((response) =>{

        filterArticles = response.articles.filter(function(article){
          return article.description.length > 3 //to avoid "..." description
        });

        function getNewsObject(item, index) {
          var obj = {
            title: item.title,
            description: item.description,
            urlToImage: item.urlToImage,
            url: item.url
          }
          return obj;
        }
        commit('setNewsArticles', filterArticles.map(getNewsObject))
      })
    },
    SAVE_COIN_FIREBASE ({commit}, payload){
      commit('saveCoinFirebase', payload)
    },
    CLEAR_ERROR ({commit}){
      commit('clearError')
    },
    SIGN_USER_IN: ({commit}, payload) => {
      commit('setLoading', true)
      commit('clearError')
      firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              email: user.email, 
              name: '',
              savedCoins: [],//TODO TO GET THE COINS
            }
            commit('setUser', newUser)
          }
        )
        .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    UPDATE_USERAUTH: (context, payload) => {
      context.commit('setUserAuth', payload)
    },
    LOG_USER_OUT: (context, payload)=>{
      firebaseApp.auth().signOut()
      context.commit('clearUser')    
      payload.push('/')  
    },
    SIGN_USER_IN_GOOGLE: ({commit}, payload) => {
      commit('setLoading', true)
      commit('clearError')
       // Using a popup.
      provider.addScope('profile');
      provider.addScope('email');
      firestoreAuth.signInWithPopup(provider).then(function(result) {
        commit('setLoading', false)
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        const newUser = {
            id: user.uid,
            email: user.email, 
            name: user.displayName,
            imgUrl: user.photoURL,
            savedCoins: []
          }
        commit('setUser', newUser)
      })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    SIGN_USER_UP: ({commit}, payload) => {
      commit('setLoading', true)
      commit('clearError')
      firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.uid,
          email: user.email,
          //name: user.displayName,
          name: '',
          savedCoins: []
        }
        commit('setUser', newUser)
      })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    FETCH_PORTFOLIO_COINS: (context, payload) => {
      context.commit('fetchPortfolioCoins', payload)
    },
    UPDATE_PAIR: (context, payload) => {
      context.commit('setSelectedPair', payload)
    },
    UPDATE_COIN: (context, payload) => {
      context.commit('setSelectedCoin', payload)
    },
    fetchTopCoins: (context, payload) => {
      context.commit('fetchTopCoins')
    },
    fetchAllCoins: (context, payload) => {
      context.commit('fetchAllCoins')
    },
    fetchCoinMarkets: (context, payload) => {
      context.commit('fetchAllCoins', payload)
    },
    setCurrentCurrency: (context, payload) => {
      context.commit('setCurrentCurrency', payload)
    },
    setCurrentCoin: (context, payload) => {
      context.commit('setCurrentCoin', payload)
    }
  }  

})