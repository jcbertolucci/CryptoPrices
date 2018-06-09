<template>
  <div class="content">
    <table class="table is-striped is-fullwidth">
      <thead class="is-fullwidth">
        <div>
          <tr class="tr">
            <th>Exchange</th>
            <th>Price</th>
            <th>Lowest</th>
            <th>Highest</th>
          </tr>
        </div>
      </thead>
      <div class="scroll">
        <tbody>
          <tr v-for="coinPrice in coinPrices">
            <td><b>{{coinPrice.MARKET}}</b></td>
            <td>{{coinPrice.PRICE}}</td>        
            <td>{{coinPrice.LOW24HOUR}}</td>
            <td>{{coinPrice.HIGH24HOUR}}</td>
          </tr>
        </tbody>
      </div>
    </table>
  </div>    
</template>

<script>
  /* eslint-disable */
  export default{
    data(){
      props: ['coins']
      return{
        proxyUrl: 'https://cors-anywhere.herokuapp.com/',
        coinId: 1182,
        coinPrices: {}
      }
    },
    methods:{
      fetchApiExchangePrices: function(){
        let url = `${this.proxyUrl}https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=XRP&tsym=ETH`;
        this.$http.get(url).then(function(data){
          //this.coinPrices = data.body.Data
          this.coinPrices = data.body.Data.Exchanges;
        })
      },

    },
    mounted(){
      this.fetchApiExchangePrices()
    }
  }
</script>
<style scoped>

</style>

