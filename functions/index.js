const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const ONE_HOUR = 3600000

const URL_COIN_MARKET_CAP = "https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=10"

var Client = require('node-rest-client').Client;
var client = new Client();

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.fetchCoins = functions.https.onRequest((req, res) => {
    console.log("Fetching Coin Market Website");
    return request(URL_COIN_MARKET_CAP)
        .then(items => console.log(items.name))
        .then(items => response(res, items, 201))
});
function request(url) {
    return new Promise(function (fulfill, reject) {
        client.get(url, function (data, response) {
            fulfill(data)
        })
    })
}
function response(res, items, code) {
    return Promise.resolve(res.status(code)
        .type('application/json')
        .send(items))
}