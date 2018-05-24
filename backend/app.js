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
app.get('/btc/balance/:publicId/:privateId', (req, res)=>{
  this.publicId = decodeURIComponent(req.params.publicId)
  this.privateId = decodeURIComponent(req.params.privateId)
  let btc = new BtcMarkets.default(this.publicId, this.privateId);
  let response; 
  btc.getBalance().then((response)=>{
    if(response.name){
      res.send(response.name);
    }else{
      res.send(response);
    }
  });
});
//BTCMarkets Order History route
app.get('/btc/orderhistory/:instrument/:currency/:publicId/:privateId', (req, res)=>{
  this.currency = req.params.currency;
  this.instrument = req.params.instrument;
  this.limit = 50
  this.publicId = decodeURIComponent(req.params.publicId)
  this.privateId = decodeURIComponent(req.params.privateId)
  let btc = new BtcMarkets.default(this.publicId, this.privateId, this.instrument, this.currency, this.limit);
  let response; 
  btc.getOrderHistory().then((response)=>{
    res.send(response);
  })
  .catch(error => console.log(error))
});



//Coinbase

//Server
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`)
});