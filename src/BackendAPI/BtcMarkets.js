import { error } from "util";

export default{
  getBalance(params){
    /*=================================
     params = {publicKey, privateKey}
    
     Generates a String to form the parameters for URL
        e.g  publicKey=xxxxxxxx&privateKey=yyyyyyyyyyy
    ===================================================*/
    const paramStr = this.generateUrlParam(params);
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    
    
    /* const url = `https://us-central1-inclitibeta.cloudfunctions.net/app/btc/balance?${paramStr}` */
    const url = `http://localhost:8082/btc/balance?${paramStr}`;

    return fetch(url)
      .then(response => response)
      .catch(error => error)
  },
  getOrderHistory(params){
     /*=================================
     params = {publicKey, privateKey, instrument, currency}
    
     Generates a String to form the parameters for URL
        e.g  publicKey=xxxxxxxx&privateKey=yyyyyyyyyyy&instrument=BTC&currency=AUD
    ===================================================*/
    const paramStr = this.generateUrlParam(params);
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    /* const url = `https://us-central1-inclitibeta.cloudfunctions.net/app/btc/orderHistory?${paramStr}` */
    const url = `http://localhost:8082/btc/orderHistory?${paramStr}`;

    return fetch(url)
      .then(response => {
        console.log(response)
        return response;
      })
      .catch(error => error)
  },
  createOrder(params){
    /*=================================
     params = {publicKey, privateKey, instrument, currency}
    
     Generates a String to form the parameters for URL
        e.g  publicKey=xxxxxxxx&privateKey=yyyyyyyyyyy&instrument=BTC&currency=AUD
    ===================================================*/
    const paramStr = this.generateUrlParam(params);
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    
    /* const url = `https://us-central1-inclitibeta.cloudfunctions.net/app/btc/createOrder?${paramStr}`; */
    const url = `http://localhost:8082/btc/createOrder?${paramStr}`;
    
    return fetch(url)
      .then((response) => {
        return response
      })
      .catch(error => error)
  },
  generateUrlParam(params){
    const paramStr = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
    return paramStr;
  }
}