const Twit = require('twit')
let Utils = new Object();

var T = new Twit({
  consumer_key:         '7uuoNsQCq2FiTaWGD5reUVLXF',
  consumer_secret:      'wFdcKQfiJSpTRuHxoUXjy2tpRQiXChI94Mlh26Dc07adg9EJRp',
  access_token:         '58971264-qz97m9N0n1CVddqTGcN4DBrENNaEJQtKVJbcJwJWS',
  access_token_secret:  '	qbTTtBZP64eOJlEujIK0EYQCvuvkEaiRgt5jPEPqKCppk',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


Util.getFollowers = function(){
  T.get('followers/ids', { screen_name: 'crypto_rand' },  function (err, data, response) {
    console.log(data)
  })
}