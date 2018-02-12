<template>
  <div>
    <v-toolbar color="deep-orange accent-4 white--text" light dense prominent>
      <i class="fab fa-btc fa-3x"></i>
      <v-toolbar-title class="headline">Top coins</v-toolbar-title>
    </v-toolbar>
    <v-data-table
      :headers="coinTableHeader"
      :items="coinTableItems"
      hide-actions
      class="elevation-10"
    >
      <template slot="items" slot-scope="props" class="table">
        <td class="text-xs-left pl-0">
          <v-btn color="grey" small flat dark>
            <img :src="props.item.imageUrl" height="30">
          </v-btn>              
          {{ props.item.name }}
        </td>
        <td class="text-xs-right">{{ props.item.priceUsd }}</td>
        <td class="text-xs-right">{{ props.item.priceAud }}</td>
        <td class="text-xs-right">{{ props.item.marketCapUsd }}</td>
        <td class="text-xs-right">{{ props.item.volumeUsd }}</td>
        <td class="text-xs-right">{{ props.item.totalSupply }}</td>
        <td class="text-xs-right pr-2">
          <v-btn color="error" class="white--text center" v-if="isNegative(props.item.dayPercVar)">{{ props.item.dayPercVar }}</v-btn>
          <v-btn color="green" class="white--text" v-else ="!isNegative(props.item.dayPercVar)">{{ props.item.dayPercVar }}</v-btn>
        </td>
        <td class="text-xs-right pr-2">
          <v-btn color="error" class="white--text" v-if="isNegative(props.item.weekPercVar)">{{ props.item.weekPercVar }}</v-btn>
          <v-btn color="green" class="white--text" v-else ="!isNegative(props.item.weekPercVar)">{{ props.item.weekPercVar }}</v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-progress-circular indeterminate v-bind:size="200" v-bind:width="3" color="deep-orange accent-4"></v-progress-circular>
      </template>
      <template slot="footer">
      <td colspan="100%">
        <i class="text caption right pr-3">Data retrivied from <a rel="stylesheet" href="https://coinmarketcap.com/" target="_blank">CoinMarket</a></i>
      </td>
    </template>
    </v-data-table>
  </div>
</template>


<!-- Vue -->
<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'coinTableHeader',
        'coinTableItems',
        'currentCoin',
        'topCoins'
      ])
    },
    data() {
      return {
      }
    },
    methods: {
      fetchTopCoins(){
        this.$store.dispatch('fetchTopCoins')//call store action
      },
      isNegative: (number) =>{
        return number < 0 ? true : false
      },   
    },
    created(){
      this.fetchTopCoins();
    }
  }  
</script>

<!-- Style -->
<style scoped>
.table{
  font-size: 25px
}
</style>


