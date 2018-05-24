import { error } from "util";

export default{
  getBalance(publicId, privateId){
    this.publicId = encodeURIComponent(publicId);
    this.privateId = encodeURIComponent(privateId);
    /* const proxyUrl = 'https://cors-anywhere.herokuapp.com/' */
    const url = `http://localhost:8082/btc/balance/${this.publicId}/${this.privateId}`;
    return fetch(url)
      .then(response => response)
      .catch(error => error)
  },
  getOrderHistory(publicId, privateId, instrument, currency){
    this.publicId = encodeURIComponent(publicId);
    this.privateId = encodeURIComponent(privateId);
    this.instrument = instrument;
    this.currency = currency;
    const url = `http://localhost:8082/btc/orderHistory/${this.instrument}/${this.currency}/${this.publicId}/${this.privateId}`;
    return fetch(url)
      .then(response => response)
      .catch(error => error)
  }
}