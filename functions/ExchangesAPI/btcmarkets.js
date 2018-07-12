const BTCMarkets = require('btc-markets').default
const numberConverter = 100000000;

class BtcMarkets{
  /*params definition
    let publicKey = params['publicKey']
    let privateKey = params['privateKey']
    let instrument = params['instrument']
    let currency = params['currency']
    let limit = params['limit']
    let price = params['price']
    let volume = params['volume']
    let clientId = params['clientId']
  */
  constructor(params){
    this.publicKey = params['publicKey'] ? params['publicKey'] : "";
    this.privateKey = params['privateKey'] ? params['privateKey'] : "";
    this.instrument = params['instrument'] ? params['instrument'] : "";
    this.currency = params['currency'] ? params['currency'] : "";
    this.limit = params['limit'] ? params['limit'] : 0;
    this.price = params['price'] ? params['price'] : 0;
    this.volume = params['volume'] ? params['volume'] : 0;
    this.orderType = params['orderType'] ? params['orderType'] : "";
    this.orderSide = params['orderSide'] ? params['orderSide'] : "";
    this.clientId = params['clientId'] ? params['clientId'] : "13";

    //New client through btc-markets library
    this.client = new BTCMarkets(this.publicKey, this.privateKey);
  }
  getBalance(){
    try{
      const accountBalances = this.client.getAccountBalances();
      return accountBalances.map(function(currency){
        currency.balance = (currency.balance / numberConverter);
        return currency;
      });
    }catch(error){
      return error;
    }
  }
  getOrderHistory(){
    try{
      const orderHistory = this.client.getOrderHistory(this.instrument, this.currency, this.limit, null);
      return orderHistory.orders;
    }catch(error){
      return error;
    }
  }
  createOrder(){
    try{
      //console.log(this.instrument, this.currency, this.price , this.volume , this.orderSide, this.orderType, this.clientId); 
      const createdOrder = this.client.createOrder(this.instrument, this.currency, this.price * numberConverter, this.volume * numberConverter, this.orderSide, this.orderType, this.clientId);
      return createdOrder;
    }catch(error){
      return error;
    }
  } 
}
exports.default = BtcMarkets;