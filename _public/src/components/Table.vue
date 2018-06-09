<template>
  <div class="content">
    <table class="table is-fullwidth is-narrow">
      <thead>
        <tr>
          <th>Rank</th>
          <th></th>
          <th>Name</th>
          <th>Price($)</th>
          <th>Price(A$)</th>          
          <th>Market Cap(A$)</th>
          <th>Total Supply</th>
          <th>Volume(24h)</th>
          <th>Change(24h)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coin in top5coins">
          <td>{{coin.rank}}</td>
          <td>
            <figure class="image is-32x32">
              <img :src="coin.imgUrl">
            </figure>
          </td>
          <td class="has-text-weight-bold has-text-left">{{coin.name}}</td>
          <td>{{coin.priceUsd}}</td>
          <td>{{coin.priceAud}}</td>
          <td>{{coin.marketCapAud}}</td>
          <td>{{coin.totalSupply}}</td>
          <td>{{coin.volumeUsd}}</td>
          <td>
            <button v-if="coin.changeNegative" class="button is-danger">{{coin.dayPercVar}}</button>
            <button v-else="!coin.changeNegative" class="button is-success">{{coin.dayPercVar}}</button>
          </td>
        </tr>
      </tbody>
    </table>
    <figcaption class="level-right">
      <small>
        <i>*Data retrieved from 
          <a class="link is-info" href="https://coinmarketcap.com" target="_blank"> https://coinmarketcap.com</a> 
        </i> 
      </small>
    </figcaption>
  </div>
</template>
<script>
  /* eslint-disable */
  export default{
    props:['top5coins','coinQty'],
    data(){
      return{}
    }
  }
</script>
<style scoped>
  
</style>

