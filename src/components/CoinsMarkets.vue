<template>
  <div>
    <titles-template title="Exchange Prices"></titles-template>
    <div class="border rounded div-coins wrapper">
      <coinsDetails-template></coinsDetails-template>
      <div class="border exchangePrices">
        <!--<exchangePrices-template></exchangePrices-template>-->
      </div>
    </div>
    </br></br></br>
    
  </div>
  
</template>

<script>
/* eslint-disable */

  import TitlesTemplate from './Titles.vue'
  import CoinsDetails from './CoinsDetails.vue'
  import ExchangePrices from './ExchangePrices.vue'  

  export default{
    components:{
      'coinsDetails-template': CoinsDetails,
      'exchangePrices-template': ExchangePrices,
      'titles-template': TitlesTemplate
    }
  }
</script>
<style scoped>

</style>

