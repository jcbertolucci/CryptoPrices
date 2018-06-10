const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 8082;
const app = express();
const cors = require('cors')
const BtcMarkets = require('./ExchangesAPI/btcmarkets')
/* const NoCorsProxy = require('no-cors-proxy'); */
/* const proxy = new NoCorsProxy(port)

proxy.start(); */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  next();
});

//BTCMarkets Balance route
app.get('/btc/balance/', (req, res)=>{
  const publicKey = decodeURIComponent(req.query.publicKey)
  const privateKey = decodeURIComponent(req.query.privateKey)
  const param = Object.assign({publicKey, privateKey})

  const btc = new BtcMarkets.default(param);

  btc.getBalance().then((response)=>{
    if(response.name){
      res.send(response.name);
    }else{
      res.send(response);
    }
  })
  .catch(error => res.send(error));
});
//BTCMarkets Order History route
app.get('/btc/orderhistory/', (req, res)=>{
  const publicKey = decodeURIComponent(req.query.publicKey)
  const privateKey = decodeURIComponent(req.query.privateKey)
  const currency = decodeURIComponent(req.query.currency);
  const instrument = decodeURIComponent(req.query.instrument);
  const limit = 50
  const params = Object.assign({publicKey, privateKey, currency, instrument, limit})

  let btc = new BtcMarkets.default(params);
  btc.getOrderHistory().then((response)=>{
    res.send(response);
  })
  .catch(error => res.send(error));
})
//BTCMarkets Order History route
app.get('/btc/createOrder/', (req, res)=>{
  const publicKey = decodeURIComponent(req.query.publicKey)
  const privateKey = decodeURIComponent(req.query.privateKey)
  const currency = decodeURIComponent(req.query.currency);
  const instrument = decodeURIComponent(req.query.instrument);
  const volume = decodeURIComponent(req.query.volume);
  const price = decodeURIComponent(req.query.price);
  const orderSide = decodeURIComponent(req.query.orderSide);
  const orderType = decodeURIComponent(req.query.orderType);
  
  const params = Object.assign({publicKey, privateKey, currency, instrument, volume, price, orderSide, orderType})

  let btc = new BtcMarkets.default(params);
  btc.createOrder().then((response)=>{
    res.send(response);
  })
  .catch(error => res.send(error));
});




//Coinbase

//Server
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`)
});