var numeral = require('numeral');
var http = require('http')

module.exports = {
  methods: {
    formatNumbers: function(num){
      let numberTemp = numeral(num)
      numeral.defaultFormat('$0,0')
      numberTemp = numberTemp.format()
      return numberTemp
    },
    formatNumbersCents: function(num){
      let numberTemp = numeral(num)
      numeral.defaultFormat('$0,0.00')
      numberTemp = numberTemp.format()
      return numberTemp
    },
    USFormat: function(num){
      let numberTemp = numeral(num)
      numeral.defaultFormat('0,0')
      numberTemp = numberTemp.format()
      return numberTemp
    },
    fetchCoinImg: function(coinShortName){
      let id = ''
      let coins = []
      let proxyUrl = `https://cors-anywhere.herokuapp.com/`
      let urlCoinSnapshot = `${proxyUrl}https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${id}`
      let urlCoinList = `${proxyUrl}https://www.cryptocompare.com/api/data/coinlist/`    
    }
  }
}