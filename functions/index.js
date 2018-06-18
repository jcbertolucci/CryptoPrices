const functions = require('firebase-functions');
const express = require('express');
const app = express();
const BTCMarkets = require('btc-markets').default
const numberConverter = 100000000;
const cors = require('cors');

var originsWhitelist = [
  'https://localhost:8081',      //this is my front-end url for development
  'https://inclitibeta.firebaseapp.com/'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
// Automatically allow cross-origin requests
/* app.use(cors()); */

//BTCMarkets Balance route
app.get('/btc/balance/', (req, res)=>{
  const publicKey = decodeURIComponent(req.query.publicKey);
  const privateKey = decodeURIComponent(req.query.privateKey);

  //BTCMarkets API
  const client = new BTCMarkets(publicKey, privateKey);

  getBalance(client).then((response)=>{
    res.send(response);
  })
  .catch(error => res.send(error)); 
});

//BTCMarkets Order History route
app.get('/btc/orderHistory/', (req, res)=>{
  const publicKey = req.query.publicKey ? decodeURIComponent(req.query.publicKey) : "";
  const privateKey = req.query.privateKey ? decodeURIComponent(req.query.privateKey) : "";
  const currency = req.query.currency ? decodeURIComponent(req.query.currency) : ";"
  const instrument = req.query.instrument ? decodeURIComponent(req.query.instrument) : "";
  const limit = req.query.limit ? decodeURIComponent(req.query.limit) : 0;
  const params = Object.assign({currency, instrument, limit});

  //BTCMarkets API
  const client = new BTCMarkets(publicKey, privateKey);
  getOrderHistory(client, params).then((response)=>{
    console.error(response);
    res.send(response);
  })
  .catch(error => res.send(error)); 
});
//BTCMarkets Order History route
app.get('/btc/createOrder/', (req, res)=>{
  const publicKey = req.query.publicKey ? decodeURIComponent(req.query.publicKey) : "";
  const privateKey = req.query.privateKey ? decodeURIComponent(req.query.privateKey) : "";
  const currency = req.query.currency ? decodeURIComponent(req.query.currency) : ";"
  const instrument = req.query.instrument ? decodeURIComponent(req.query.instrument) : "";
  const volume = req.query.volume ? decodeURIComponent(req.query.volume) : 0;
  const price = req.query.price ? decodeURIComponent(req.query.price) : 0;
  const orderSide = req.query.orderSide ? decodeURIComponent(req.query.orderSide) : "";
  const orderType = req.query.orderType ? decodeURIComponent(req.query.orderType) : "";
  const clientId = req.query.clientId ? decodeURIComponent(req.query.clientId) : "13";

  const params = Object.assign({currency, instrument, volume, price, orderSide, orderType, clientId})

  //BTCMarkets API
  const client = new BTCMarkets(publicKey, privateKey);

  createOrder(client, params).then((response)=>{
    res.send(response);
  })
  .catch(error => res.send(error)); 
});

function getBalance(client){
  return new Promise((resolve) =>{
    client.getAccountBalances().then((accountBalances) =>{
      resolve(accountBalances.map(function(currency){
        currency.balance = (currency.balance / numberConverter);
        return currency;
      }))
    })
    .catch(error => error);
  })
}
function getOrderHistory(client, params){
  return new Promise((resolve) => {
    client.getOrderHistory(params.instrument, params.currency, params.limit, null).then((orderHistory) => {
      console.error(orderHistory);
      resolve(orderHistory);
    })
    .catch(error => error);
  })  
}
function createOrder(client, params){
  return new Promise((resolve) => {
    client.createOrder(params.instrument, params.currency, params.price * numberConverter, params.volume * numberConverter, params.orderSide, params.orderType, params.clientId).then((order) => {
      resolve(order)
    })
    .catch(error => error);
  })
}
exports.app = functions.https.onRequest(app);
