const BTCMarkets = require('btc-markets').default
const numberConverter = 100000000;

class BtcMarkets{
  constructor(publicKey, privateKey, instrument, currency, limit){
    this.client = new BTCMarkets(publicKey, privateKey);
    this.currency = currency ? currency : "";
    this.instrument = instrument ? instrument : "";
    this.limit = limit
  }
  async getBalance(){
    let accountBalances;
    try{
      accountBalances = await this.client.getAccountBalances();
      return accountBalances.map(function(currency){
        currency.balance = (currency.balance / numberConverter);
        return currency;
      });
    }catch(error){
      return error;
    }
  }
  async getOrderHistory(){
    let orderHistory;
    try{
      orderHistory = await this.client.getOrderHistory(this.instrument, this.currency, this.limit, null);
      return orderHistory.orders;
    }catch(error){
      console.log(error)
      return error;
    }
  }
}
exports.default = BtcMarkets;