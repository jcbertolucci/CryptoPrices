var numeral = require('numeral');
var http = require('http')

var Utils = new Object();

Utils.formatNumbers = function (num){
      let numberTemp = numeral(num)
      numeral.defaultFormat('$0,0')
      numberTemp = numberTemp.format()
      return numberTemp
}
Utils.formatNumbersCents = function(num){
      let numberTemp = numeral(num)
      numeral.defaultFormat('$0,0.00')
      numberTemp = numberTemp.format()
      return numberTemp
}
Utils.USFormat = function(num){
      let numberTemp = numeral(num)
      numeral.defaultFormat('0,0')
      numberTemp = numberTemp.format()
      return numberTemp
}
Utils.fetchCoinImg = function(coinShortName){
  let id = ''
  let objKeys = []
  let matchingKey
  let baseLinkUrl = 'https://www.cryptocompare.com'
  let imageUrl = ''
  let coins = {}
  let coin = []
  let proxyUrl = `https://cors-anywhere.herokuapp.com/`
  let urlCoinSnapshot = `${proxyUrl}https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${id}`
  let urlCoinList = `${proxyUrl}https://www.cryptocompare.com/api/data/coinlist/`    


  fetch(urlCoinList,{})
  .then(res => res.json())
  .catch(error => console.error('Error: ', error))
  .then(response => {
    coins = response.Data

    Object.keys(coins).forEach(function(key) {
      if (coins[key].Name === coinShortName){
        return coins[key].ImageUrl
      }  
    });
  })

  return this.imageUrl
} 


export default Utils;