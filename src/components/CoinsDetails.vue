<template>
  <div class="content">
    <table class="table is-striped is-fullwidth">
      <thead class="is-fullwidth">
        <div>
          <tr class="tr">
            <th>Symbol</th>
            <th>Coin name</th>
            <th>Total supply</th>
            <th>Id</th>
          </tr>
        </div>
      </thead>
      <div class="scroll">
        <tbody>
          <tr v-for="coin in coins">
            <td><b>{{coin.Symbol}}</b></td>
            <td>{{coin.CoinName}}</td>        
            <td>{{coin.TotalCoinSupply}}</td>
            <td>{{coin.Id}}</td>
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
      return{
        proxyUrl: 'https://cors-anywhere.herokuapp.com/',
        coins: {},
      }
    },
    methods:{
      fetchApiCoins: function(){
        let apiResult;
        let url = `${this.proxyUrl}https://www.cryptocompare.com/api/data/coinlist/`;
        this.$http.get(url).then(function(data){
          this.coins = data.body.Data
        })
      },
      fecthCoinDetail: function(){
        let apiResult;
      }
    },
    mounted(){
      this.fetchApiCoins();
    }
  }
</script>
<style scoped>
.scroll{
  position: relative;
  max-height: 15em;
  overflow-y: scroll;
}
.tr{
  position: static;
}

</style>

